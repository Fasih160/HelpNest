"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import { LiaDonateSolid, LiaHandHoldingUsdSolid } from "react-icons/lia";
import { Fundraiser } from "@/types";
import axios from "axios";

const Page = () => {
  const { category } = useParams();
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [selectedFundraiser, setSelectedFundraiser] =
    useState<Fundraiser | null>(null);

  const fetchFundraisers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/fundraisers/category/${category}`,
      );
      setFundraisers(response.data.fundraisers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFundraisers();
  }, [category]);

  const handleSelectFundraiser = (fundraiser: Fundraiser) => {
    setSelectedFundraiser(fundraiser);
  };

  return (
    <div className="min-h-screen">
      <DefaultLayout>
        <Breadcrumb
          pageName={(category[0].toUpperCase() + category.slice(1)) as string}
        />
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <CardDataStats
            title="Total Fundraisers"
            total={fundraisers.length.toString()}
          >
            <LiaHandHoldingUsdSolid
              className="fill-primary dark:fill-white"
              size={22}
            />
          </CardDataStats>
          <CardDataStats
            title="Total Donations"
            total={
              "PKR " +
              fundraisers
                .reduce((acc, curr) => acc + curr.amountRaised, 0)
                .toString()
            }
          >
            <LiaDonateSolid
              className="fill-primary dark:fill-white"
              size={22}
            />
          </CardDataStats>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Fundraisers List */}
          <div className="border-b border-[#D1D5DB] md:border-b-0 md:border-r md:pr-5">
            <h2 className="mb-4 text-xl font-semibold">Fundraisers</h2>
            <ul className="space-y-4">
              {fundraisers.map((fundraiser) => (
                <li
                  key={fundraiser.id}
                  className={`cursor-pointer rounded p-4 hover:bg-[#F3F4F6] dark:hover:bg-[#374151] ${
                    selectedFundraiser?.id === fundraiser.id
                      ? "bg-[#E5E7EB] dark:bg-[#4B5563]"
                      : "bg-white dark:bg-[#374151]"
                  }`}
                  onClick={() => handleSelectFundraiser(fundraiser)}
                >
                  <h3 className="text-lg font-semibold">{fundraiser.title}</h3>
                  <p>{fundraiser.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Fundraiser Donations */}
          <div>
            {selectedFundraiser ? (
              <div>
                <h2 className="mb-4 text-xl font-semibold">
                  Donations for {selectedFundraiser.title}
                </h2>
                <ul className="space-y-4">
                  {selectedFundraiser.donations.length > 0 ? (
                    selectedFundraiser.donations.map((donation) => (
                      <li
                        key={donation.id}
                        className="rounded bg-[#F9FAFB] p-4 dark:bg-[#374151]"
                      >
                        <p className="font-semibold">
                          {donation.firstName} {donation.lastName}
                        </p>
                        <p>Amount: PKR {donation.amount}</p>
                        <p>Payment Method: {donation.paymentMethod}</p>
                        <p>Status: {donation.paymentStatus}</p>
                      </li>
                    ))
                  ) : (
                    <p>No donations yet for this fundraiser.</p>
                  )}
                </ul>
              </div>
            ) : (
              <p>Please select a fundraiser to view its donations.</p>
            )}
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default Page;
