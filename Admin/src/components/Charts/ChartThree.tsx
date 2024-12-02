import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#75924B", "#012D19", "#8FD0EF", "#6577F3", "#3C50E0", "#FF7F50"],
  labels: [
    "Education",
    "Emergency",
    "Medical",
    "Monthly Bill",
    "Memorial",
    "Other",
  ],
  legend: {
    show: false,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC<{
  totalFundraisers: number;
  medicalFundraisers: number;
  educationFundraisers: number;
  emergencyFundraisers: number;
  memorialFundraisers: number;
  monthlyBillFundraisers: number;
  otherFundraisers: number;
}> = ({
  totalFundraisers,
  medicalFundraisers,
  educationFundraisers,
  emergencyFundraisers,
  memorialFundraisers,
  monthlyBillFundraisers,
  otherFundraisers,
}) => {
  const series = [
    (medicalFundraisers / totalFundraisers) * 100,
    (emergencyFundraisers / totalFundraisers) * 100,
    (educationFundraisers / totalFundraisers) * 100,
    (monthlyBillFundraisers / totalFundraisers) * 100,
    (memorialFundraisers / totalFundraisers) * 100,
    (otherFundraisers / totalFundraisers) * 100,
  ];
  const legendData = [
    {
      label: "Education",
      value: (educationFundraisers / totalFundraisers) * 100,
      color: "#75924B",
    },
    {
      label: "Emergency",
      value: (emergencyFundraisers / totalFundraisers) * 100,
      color: "#012D19",
    },
    {
      label: "Medical",
      value: (medicalFundraisers / totalFundraisers) * 100,
      color: "#8FD0EF",
    },
    {
      label: "Monthly Bill",
      value: (monthlyBillFundraisers / totalFundraisers) * 100,
      color: "#6577F3",
    },
    {
      label: "Memorial",
      value: (memorialFundraisers / totalFundraisers) * 100,
      color: "#3C50E0",
    },
    {
      label: "Other",
      value: (otherFundraisers / totalFundraisers) * 100,
      color: "#FF7F50",
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-4.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h5 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Categories Distribution
      </h5>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Breakdown of fundraiser categories in the current inventory.
      </p>
      <div>
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {legendData.map((item, index) => (
          <div key={index} className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <span
                className="mr-2 block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <p className="flex w-full items-center justify-between gap-2 text-sm font-medium text-black dark:text-white">
                <span>{item.label}</span>
                <span>{Math.trunc(item.value)}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
