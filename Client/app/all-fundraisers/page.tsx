"use client";
import Grid from "@/components/grid";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Fundraiser } from "@/types";
import Faqs from "@/components/category/faqs";
import WhySetup from "@/components/category/whySetup";
import FundraisingTips from "@/components/category/fundraisingTips";

const Page = () => {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  // Backend integration to fetch all fundraisers
  const fetchFundraisers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/fundraisers`
      );
      setFundraisers(response.data.fundraisers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFundraisers();
  }, []);

  return (
    <>
      <div className="pt-32 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            All Fundraisers
          </h1>
          <p className="mt-5 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl">
            Discover a range of inspiring fundraisers making a real difference
            on our platform. Whether you're into supporting community efforts,
            helping those in need, or backing innovative projects, there are
            plenty of ways to make a positive impact. Explore the stories behind
            each campaign and be a part of the causes that truly matter.
          </p>
        </div>
      </div>
      <Grid
        title="Discover fundraisers inspired by what you care about"
        fundraisers={fundraisers.filter(
          (fundraiser) =>
            fundraiser.status === "active" || fundraiser.status === "completed"
        )}
      />
      <WhySetup />
      <FundraisingTips />
      <Faqs />
    </>
  );
};

export default Page;
