import React from "react";
import { CiUser } from "react-icons/ci";
import { BsShieldCheck } from "react-icons/bs";
//@ts-ignore
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";
import { Fundraiser } from "@/types";
import { useParams } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Main = ({ fundraiser }: { fundraiser: Fundraiser }) => {
  const { category, id } = useParams();
  return (
    <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-32 pb-20">
      <h1 className="text-3xl md:text-4xl font-semibold mb-5">
        {fundraiser?.title}
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-3/5 xl:w-2/3">
          <img
            src={fundraiser?.image}
            alt={fundraiser?.title}
            className="rounded-xl md:rounded-2xl mb-5 w-full h-[50vh] object-cover"
          />
          <div className="flex items-center gap-3 mb-5">
            <span className="p-2 rounded-full bg-neutral-200">
              <CiUser className="text-xl md:text-2xl" />
            </span>
            <p className="text-sm md:text-base">
              {fundraiser?.firstName} {fundraiser?.lastName} is organizing this
              fundraiser.
            </p>
          </div>
          <div className="py-5 border-y">
            <div className="bg-primary flex items-center w-fit py-2 px-4 rounded-full gap-2 text-white border border-primary-dark">
              <BsShieldCheck className="text-lg md:text-xl text-white" />
              <span className="text-sm">Donation Protected</span>
            </div>
          </div>

          <div className="py-5 border-b">
            <p className="text-justify text-sm md:text-base">
              {fundraiser?.description}
            </p>
          </div>
        </div>
        <div className="lg:w-2/5 xl:w-1/3 sticky h-fit top-20 lg:top-32 shadow-lg rounded-xl p-5 flex flex-col bg-white">
          <h1 className="text-xs md:text-sm">
            <span className="text-xl md:text-2xl font-light">
              PKR {fundraiser?.amountRaised}
            </span>{" "}
            raised of PKR {fundraiser?.totalAmount} target
          </h1>
          <ProgressBar
            completed={
              (fundraiser?.amountRaised / fundraiser?.totalAmount) * 100
            }
            bgColor="#75924B"
            isLabelVisible={false}
            height="0.5rem"
            className="my-5"
          />
          <Dialog>
            <DialogTrigger className="text-left text-xs md:text-sm mb-5 underline">
              {fundraiser?.donations.length} donations
            </DialogTrigger>
            <DialogContent className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Donations</h2>
              {fundraiser?.donations.length > 0 ? (
                <div className="flex flex-col gap-4 max-h-96 overflow-y-auto">
                  {fundraiser?.donations.map((donation, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary text-white p-2 rounded-full text-xs font-semibold">
                          {donation.firstName.charAt(0)}
                          {donation.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm md:text-base font-medium">
                            {donation.firstName} {donation.lastName}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600">
                            {new Date(donation.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm md:text-base font-medium">
                          PKR {donation.amount}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">
                          Donated via{" "}
                          {donation.paymentMethod[0].toUpperCase() +
                            donation.paymentMethod.slice(1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No donations yet</p>
              )}
            </DialogContent>
          </Dialog>
          <Link
            href="/"
            className="rounded-lg text-center bg-gradient-to-b  from-yellow-500 to-yellow-600 py-3 w-full font-bold text-xs md:text-sm mb-3"
          >
            Share
          </Link>
          {fundraiser?.amountRaised < fundraiser?.totalAmount && (
            <Link
              href={`/categories/${category}/${id}/donate`}
              className="rounded-lg text-center   bg-gradient-to-b  from-yellow-500 to-yellow-600 py-3 w-full font-bold text-xs md:text-sm"
            >
              Donate Now
            </Link>
          )}
          {fundraiser?.amountRaised >= fundraiser?.totalAmount && (
            <p className="rounded-lg text-center bg-gradient-to-b from-primary to-primary-dark text-white py-3 w-full font-semibold text-xs md:text-sm">
              Fundraiser Completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
