"use client";
import React from "react";
//@ts-ignore
import ProgressBar from "@ramonak/react-progress-bar";
import Link from "next/link";

interface Props {
  image: string;
  donations: number;
  title: string;
  totalAmount: number;
  amountRaised: number;
  first?: boolean;
  href: string;
  status: string;
}

const Card = ({
  image,
  donations,
  title,
  totalAmount,
  amountRaised,
  first,
  href,
  status,
}: Props) => {
  const format = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <Link
      href={href}
      className={
        "w-full h-full flex flex-col rounded-lg overflow-hidden p-2 hover:bg-slate-50 transition duration-200 " +
        (first ? "lg:col-span-2 lg:row-span-2 lg:pr-5" : "")
      }
    >
      <div
        className={
          "rounded-xl overflow-hidden relative w-full" +
          (first ? " h-48 lg:h-96" : " h-48")
        }
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full hover:scale-105 transition duration-200 object-cover"
        />
        <span className="absolute bottom-3 left-3">
          <span className="bg-black/50 text-white py-1 px-2 rounded-full text-sm tracking-tight font-medium">
            {format(donations)} donations
          </span>
        </span>
        {status === "Completed" && (
          <span className="absolute top-3 left-3 bg-green-600 text-white py-1 px-2 rounded-full text-xs font-semibold">
            Completed
          </span>
        )}
      </div>
      <h1 className="font-bold mt-4 line-clamp-1">{title}</h1>
      <div>
        <ProgressBar
          completed={(amountRaised / totalAmount) * 100}
          bgColor="#75924B"
          isLabelVisible={false}
          height="0.25rem"
          className="mt-4"
        />
        <p className="text-sm font-bold mt-2">
          PKR {amountRaised.toLocaleString()} raised
        </p>
      </div>
    </Link>
  );
};

export default Card;
