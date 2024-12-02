"use client";
import React, { useEffect, useState } from "react";
import img from "@/assets/fundraiser.jpg";
import PhotosUploader from "@/components/fundraiser/uploader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuthStore from "@/store/authStore";

const Fundraiser = () => {
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [amount, setAmount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fundraiserTitle, setFundraiserTitle] = useState("");
  const [fundraiserDescription, setFundraiserDescription] = useState("");
  const [fundraiserCategory, setFundraiserCategory] = useState("");
  const router = useRouter();
  const { user, token } = useAuthStore();

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
    if (
      !images.length ||
      !fundraiserTitle ||
      !fundraiserDescription ||
      !fundraiserCategory
    ) {
      toast.error("Please complete all fields in this step.");
      return false;
    }
    return true;
  };
  // Backend integration to create a fundraiser
  const handleNext = async () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    } else if (step === 2 && validateStep2()) {
      setStep(step + 1);
    } else if (step === 3 && validateStep3()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/fundraisers`,
          {
            totalAmount: amount,
            firstName,
            lastName,
            email,
            phone,
            title: fundraiserTitle,
            description: fundraiserDescription,
            category: fundraiserCategory,
            image: images[0],
            status: "pending",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Fundraiser created successfully.");
        router.push("/");
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

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
          <div className="flex items-center sm:gap-4 md:gap-6 justify-center">
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
                Your Goal
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
                Fundraiser Details
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
                  Your Goal
                </h2>
                <p className="text-xs mt-2 sm:mt-3">
                  * Indicates required field.
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-700 mb-3">
                  How much would you like to raise?{" "}
                  <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
                  <button
                    className={
                      amount === 500
                        ? "border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl bg-primary text-white"
                        : "border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl hover:bg-black/10"
                    }
                    onClick={() => setAmount(500)}
                  >
                    PKR 500
                  </button>
                  <button
                    className={
                      amount === 1000
                        ? "border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl bg-primary text-white"
                        : "border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl hover:bg-black/10"
                    }
                    onClick={() => setAmount(1000)}
                  >
                    PKR 1000
                  </button>
                  <button
                    className={
                      amount === 1500
                        ? "border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl bg-primary text-white"
                        : "border border-black p-6 sm:p-10 text-center text-2xl sm:text-3xl hover:bg-black/10"
                    }
                    onClick={() => setAmount(1500)}
                  >
                    PKR 1500
                  </button>
                  <button
                    className={
                      amount !== 35 && amount !== 50 && amount !== 125
                        ? "border border-black p-3 sm:p-5 text-center text-2xl sm:text-3xl bg-primary text-white"
                        : "border border-black p-3 sm:p-5 text-center text-2xl sm:text-3xl hover:bg-black/10"
                    }
                  >
                    <span className="text-base sm:text-xl">Other</span>
                    <div className="text-2xl sm:text-3xl">
                      PKR{" "}
                      <input
                        type="number"
                        min={0}
                        className="text-2xl sm:text-3xl border-b border-black w-24  mt-2 sm:mt-3 text-center bg-transparent outline-none"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                      />
                    </div>
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
                  Fundraiser Details
                </h2>
                <p className="text-xs mt-2 sm:mt-3">
                  * Indicates required field.
                </p>
              </div>
              <div className="mb-8 sm:mb-10">
                <div className="w-full">
                  <p className="text-sm text-neutral-700 mb-3">
                    Fundraiser Image <span className="text-red-500">*</span>
                  </p>
                  <PhotosUploader
                    maxPhotos={1}
                    addedPhotos={images}
                    onChange={(photos: any) => setImages(photos)}
                  />
                </div>
                <div className="w-full mt-5">
                  <label
                    htmlFor="fundraiserTitle"
                    className="text-sm text-neutral-700 mb-3"
                  >
                    Fundraiser Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fundraiserTitle"
                    className="border-b bg-transparent border-black w-full p-3 outline-none"
                    value={fundraiserTitle}
                    onChange={(e) => setFundraiserTitle(e.target.value)}
                  />
                </div>
                <div className="w-full mt-5">
                  <label
                    htmlFor="fundraiserDescription"
                    className="text-sm text-neutral-700 mb-3"
                  >
                    Fundraiser Description{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="fundraiserDescription"
                    className="border-b bg-transparent border-black w-full p-3 outline-none"
                    value={fundraiserDescription}
                    onChange={(e) => setFundraiserDescription(e.target.value)}
                  />
                </div>
                <div className="w-full mt-5">
                  <label
                    htmlFor="fundraiserCategory"
                    className="text-sm text-neutral-700 mb-3"
                  >
                    Fundraiser Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="fundraiserCategory"
                    className="border-b bg-transparent border-black w-full p-3 outline-none appearance-none rounded-none"
                    value={fundraiserCategory}
                    onChange={(e) => setFundraiserCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    <option value="education">Education</option>
                    <option value="emergency">Emergency</option>
                    <option value="medical">Medical</option>
                    <option value="memorial">Memorial</option>
                    <option value="monthly-bill">Monthly Bill</option>
                    <option value="other">Other</option>
                  </select>
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

export default Fundraiser;
