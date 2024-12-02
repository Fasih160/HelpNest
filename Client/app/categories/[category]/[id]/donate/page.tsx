"use client";
import React, { useState, useEffect } from "react";
import img from "@/assets/donation.jpg";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Fundraiser } from "@/types";
import axios from "axios";
import useAuthStore from "@/store/authStore";

const Donation = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [fundraiser, setFundraiser] = useState<Fundraiser>();
  const router = useRouter();
  const { id } = useParams();
  const { user, token } = useAuthStore();
  // Backend integration to fetch fundraiser by id
  const fetchFundraiser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/fundraisers/${id}`
      );
      setFundraiser(response.data.fundraiser);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFundraiser();
  }, [id]);

  const validateStep1 = () => {
    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid amount.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!firstName || !lastName || !email || !phone) {
      toast.error("Please fill in all required details.");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      toast.error("Please complete all payment details.");
      return false;
    }
    return true;
  };
  // Backend integration to post donation
  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    } else if (step === 2 && validateStep2()) {
      setStep(step + 1);
    } else if (step === 3 && validateStep3()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/donations`,
          {
            amount,
            firstName,
            lastName,
            email,
            phone,
            paymentMethod: "card",
            paymentStatus: "pending",
            fundraiser_id: id,
            user_id: user?.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Donation successful.");
        router.back();
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
      }
    }
  };

  const remainingAmount =
    (fundraiser?.totalAmount ?? 0) - (fundraiser?.amountRaised ?? 0);

  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      <div className="relative h-[45vh]">
        <img src={img.src} alt="" className="w-full h-full object-cover" />
        <div className="bg-black/50 top-0 left-0 absolute w-full h-full"></div>
      </div>
      <div className="flex justify-center bg-[#333333] py-6 md:py-10">
        <div className="w-full max-w-4xl bg-[#F8F3E8] py-6 sm:py-8 md:py-10 px-6 sm:px-8 md:px-16 -translate-y-20 md:-translate-y-32">
          <h1 className="text-center font-semibold text-lg">
            {fundraiser?.title}
          </h1>
          <div className="mt-10 flex items-center sm:gap-4 md:gap-6 justify-center">
            <div className="flex flex-col items-center">
              <span
                className={
                  step === 1
                    ? "whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 border border-primary rounded-full text-xs sm:text-sm bg-primary text-white"
                    : "whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 border border-black rounded-full text-xs sm:text-sm"
                }
              >
                Step 1
              </span>
              <p
                className={
                  step === 1
                    ? "hidden md:block mt-2 sm:mt-3 text-black font-semibold underline underline-offset-8 decoration-primary decoration-[3px]"
                    : "hidden md:block mt-2 sm:mt-3 text-neutral-700"
                }
              >
                Your Contribution
              </p>
            </div>
            <div className="h-[1px] w-6 sm:w-10 bg-black"></div>
            <div className="flex flex-col items-center">
              <span
                className={
                  step === 2
                    ? "whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 border border-primary rounded-full text-xs sm:text-sm bg-primary text-white"
                    : "whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 border border-black rounded-full text-xs sm:text-sm"
                }
              >
                Step 2
              </span>
              <p
                className={
                  step === 2
                    ? "hidden md:block mt-2 sm:mt-3 text-black font-semibold underline underline-offset-8 decoration-primary decoration-[3px]"
                    : "hidden md:block mt-2 sm:mt-3 text-neutral-700"
                }
              >
                Your Details
              </p>
            </div>
            <div className="h-[1px] w-6 sm:w-10 bg-black"></div>
            <div className="flex flex-col items-center">
              <span
                className={
                  step === 3
                    ? "whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 border border-primary rounded-full text-xs sm:text-sm bg-primary text-white"
                    : "whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4 border border-black rounded-full text-xs sm:text-sm"
                }
              >
                Step 3
              </span>
              <p
                className={
                  step === 3
                    ? "hidden md:block mt-2 sm:mt-3 text-black font-semibold underline underline-offset-8 decoration-primary decoration-[3px]"
                    : "hidden md:block mt-2 sm:mt-3 text-neutral-700"
                }
              >
                Payment Details
              </p>
            </div>
          </div>
          {step === 1 && (
            <>
              <div className="my-6 sm:my-10">
                <p className="text-primary font-bold mb-2 text-lg sm:text-xl">
                  STEP 1
                </p>
                <h2 className="text-3xl sm:text-4xl font-medium border-b border-black pb-2 sm:pb-3">
                  Your Contribution
                </h2>
                <p className="text-xs mt-2 sm:mt-3">
                  * Indicates required field.
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-700 mb-3">
                  How much would you like to donate?{" "}
                  <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
                  <button
                    className={`border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl ${
                      amount === 500
                        ? "bg-primary text-white"
                        : remainingAmount < 500
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "hover:bg-black/10"
                    }`}
                    onClick={() => setAmount(500)}
                    disabled={remainingAmount < 500}
                  >
                    PKR 500
                  </button>
                  <button
                    className={`border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl ${
                      amount === 1000
                        ? "bg-primary text-white"
                        : remainingAmount < 1000
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "hover:bg-black/10"
                    }`}
                    onClick={() => setAmount(1000)}
                    disabled={remainingAmount < 1000}
                  >
                    PKR 1000
                  </button>
                  <button
                    className={`border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl ${
                      amount === 1500
                        ? "bg-primary text-white"
                        : remainingAmount < 1500
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "hover:bg-black/10"
                    }`}
                    onClick={() => setAmount(1500)}
                    disabled={remainingAmount < 1500}
                  >
                    PKR 1500
                  </button>
                  <button
                    className={`border border-black p-3 sm:p-5 text-center text-2xl sm:text-3xl ${
                      amount !== 500 && amount !== 1000 && amount !== 1500
                        ? "bg-primary text-white"
                        : "hover:bg-black/10"
                    }`}
                  >
                    <span className="text-base sm:text-xl">Other</span>
                    <div className="text-2xl sm:text-3xl">
                      PKR
                      <input
                        type="number"
                        min={0}
                        max={remainingAmount}
                        className="text-2xl sm:text-3xl border-b border-black w-24 mt-2 sm:mt-3 text-center bg-transparent outline-none"
                        value={amount}
                        onChange={(e) => {
                          const enteredAmount = parseFloat(e.target.value);
                          if (enteredAmount <= remainingAmount) {
                            setAmount(enteredAmount);
                          } else if (!enteredAmount || isNaN(enteredAmount)) {
                            setAmount(enteredAmount);
                          }
                        }}
                      />
                    </div>
                    <span className="text-xs">Max: PKR {remainingAmount}</span>
                  </button>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="my-6 sm:my-10">
                <p className="text-primary font-bold mb-2 text-lg sm:text-xl">
                  STEP 2
                </p>
                <h2 className="text-3xl sm:text-4xl font-medium border-b border-black pb-2 sm:pb-3">
                  Your Details
                </h2>
                <p className="text-xs mt-2 sm:mt-3">
                  * Indicates required field.
                </p>
              </div>
              <div className="mb-8 sm:mb-10">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="text-sm text-neutral-700 mb-3"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="border-b bg-transparent border-black w-full p-3 outline-none"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="lastName"
                      className="text-sm text-neutral-700 mb-3"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="border-b bg-transparent border-black w-full p-3 outline-none"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full mt-5">
                  <label
                    htmlFor="email"
                    className="text-sm text-neutral-700 mb-3"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border-b bg-transparent border-black w-full p-3 outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full mt-5">
                  <label
                    htmlFor="phone"
                    className="text-sm text-neutral-700 mb-3"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="border-b bg-transparent border-black w-full p-3 outline-none"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="my-6 sm:my-10">
                <p className="text-primary font-bold mb-2 text-lg sm:text-xl">
                  STEP 3
                </p>
                <h2 className="text-3xl sm:text-4xl font-medium border-b border-black pb-2 sm:pb-3">
                  Payment Details
                </h2>
                <p className="text-xs mt-2 sm:mt-3">
                  * Indicates required field.
                </p>
              </div>
              <div className="mb-8 sm:mb-10">
                <div className="w-full">
                  <label
                    htmlFor="cardNumber"
                    className="text-sm text-neutral-700 mb-3"
                  >
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="border-b bg-transparent border-black w-full p-3 outline-none"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="flex gap-5 mt-5">
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="expiryDate"
                      className="text-sm text-neutral-700 mb-3"
                    >
                      Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      className="border-b bg-transparent border-black w-full p-3 outline-none"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label
                      htmlFor="cvv"
                      className="text-sm text-neutral-700 mb-3"
                    >
                      CVV <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="border-b bg-transparent border-black w-full p-3 outline-none"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="XXX"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-between">
            {step !== 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="hover:text-white py-3 sm:py-4 px-6 sm:px-10 relative group text-black border-[#333333] border"
                disabled={step === 1}
              >
                <span className="absolute w-full h-full top-0 left-0 bg-[#333333] -z-10 scale-x-0 group-hover:scale-x-100 origin-left transition duration-300"></span>
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="ml-auto text-white py-3 sm:py-4 px-6 sm:px-10 relative group hover:text-black border-primary border"
            >
              <span className="absolute w-full h-full top-0 left-0 bg-primary -z-10 scale-x-100 group-hover:scale-x-0 origin-right transition duration-300"></span>
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
