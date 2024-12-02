"use client";
import Main from "@/components/productDetails/main";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Fundraiser } from "@/types";
import axios from "axios";
import Grid from "@/components/grid";

const Category = () => {
  const { category, id } = useParams();
  const [fundraiser, setFundraiser] = useState<Fundraiser>();
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [loading, setLoading] = useState(true);
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
    fetchFundraiser();
    fetchFundraisers();
    setLoading(false);
  }, [id]);

  return (
    !loading && (
      <div>
        <Main fundraiser={fundraiser as Fundraiser} />
        <Grid
          title="Related Fundraisers"
          fundraisers={fundraisers.filter(
            (f) =>
              f.id !== Number(id) &&
              (f.status === "active" || f.status === "completed")
          )}
        />
      </div>
    )
  );
};

export default Category;
