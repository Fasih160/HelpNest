"use client";
import Grid from "@/components/grid";
import Hero from "@/components/category/hero";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { categoryData } from "@/constants";
import { Fundraiser } from "@/types";
import axios from "axios";
import Faqs from "@/components/category/faqs";
import WhySetup from "@/components/category/whySetup";
import FundraisingTips from "@/components/category/fundraisingTips";

const Category = () => {
  const { category } = useParams();
  const { title, image, subHeading } =
    categoryData.find((c) => c.name === category) || {};
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  // Backend integration to fetch fundraisers by category
  const fetchFundraisers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/fundraisers/category/${category}`
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
    <div>
      <Hero title={title || ""} image={image || ""} />
      <Grid
        title={subHeading ?? ""}
        fundraisers={fundraisers.filter(
          (fundraiser) =>
            fundraiser.status === "active" || fundraiser.status === "completed"
        )}
      />
      <WhySetup />
      <FundraisingTips />
      <Faqs />
    </div>
  );
};

export default Category;
