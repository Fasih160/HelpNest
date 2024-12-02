"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Donation } from "@/types";
import dayjs from "dayjs";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
  },
  colors: ["#75924B"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: 2,
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#012D19"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    fillOpacity: 1,
    hover: {
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 100,
    // Adjust max value dynamically
  },
};

const getMonthlyDonations = (donations: Donation[], year: number) => {
  const monthlyDonations = Array(12).fill(0);

  donations.forEach((donation) => {
    const donationYear = dayjs(donation.created_at).year();
    if (donationYear === year) {
      const monthIndex = dayjs(donation.created_at).month(); // January is 0, December is 11
      monthlyDonations[monthIndex] += donation.amount;
    }
  });

  return monthlyDonations;
};

const ChartOne: React.FC<{ donations: Donation[] }> = ({ donations }) => {
  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const monthlyDonations = getMonthlyDonations(donations, selectedYear);

  const series = [
    {
      name: "Total Donations",
      data: monthlyDonations,
    },
  ];

  const chartOptions = {
    ...options,
    yaxis: {
      ...options.yaxis,
      max: Math.max(...monthlyDonations) + 10, // Adjust max value dynamically
    },
  };

  // Generate a list of years from the earliest donation to the current year
  const years = Array.from(
    new Set(donations.map((donation) => dayjs(donation.created_at).year())),
  ).sort((a, b) => b - a); // Sort years in descending order

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Donations Overview
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total donations received this year
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-2.5 rounded-full bg-primary"></span>
            </span>
            <p className="font-semibold text-primary">Total Donations</p>
          </div>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="appearance-none rounded-md border border-stroke bg-gray px-3 py-1 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
