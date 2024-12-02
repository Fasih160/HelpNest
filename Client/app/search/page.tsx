"use client";
import Grid from "@/components/grid";
import { Search } from "@/components/ui/search";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Fundraiser } from "@/types";
import { useRouter } from "next/navigation";

const SearchPage = () => {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
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
    <div>
      <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-32">
        <h1 className="text-2xl md:text-3xl text-center font-bold">
          Search fundraisers on HelpNest
        </h1>
        <p className="text-center text-neutral-500 my-5 text-sm">
          Find fundraisers by title, keyword or a person’s name
        </p>
        <Search
          placeholders={[
            "Find by title",
            "Look up by keyword",
            "Search by individual’s name",
          ]}
          onChange={(e) => setSearch(e.target.value)}
          onSubmit={() => {
            router.push(`/search/${search}`);
          }}
        />
      </div>
      <Grid
        title="Showing All Fundraisers"
        fundraisers={fundraisers.filter(
          (fundraiser) =>
            fundraiser.status === "active" || fundraiser.status === "completed"
        )}
      />
    </div>
  );
};

export default SearchPage;
