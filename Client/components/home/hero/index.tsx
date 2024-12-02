"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import img from "@/assets/home.jpg";

const Hero = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const [scroll, setScroll] = useState("opacity-0 invisible");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScroll("opacity-100 visible");
      } else {
        setScroll("opacity-0 invisible");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="text-[#18412E] h-[70vh] sm:h-[80vh] fixed w-full top-0 -z-10">
      <motion.img
        src={img.src}
        alt=""
        className="w-full h-full object-cover absolute top-0 left-0"
        style={{ scale }}
      />
      <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-6 sm:px-0">
        <p className="text-lg sm:text-xl font-semibold">
          Your actions can change lives
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold">
          A Space for Making a Difference
        </h1>
        <Link
          href="/fundraiser"
          className="bg-gray-50 hover:bg-white  px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition duration-300"
        >
          Start a Fundraiser
        </Link>
      </div>
      <div
        className={
          "absolute w-full h-full bg-black/50 top-0 left-0 transition duration-300 " +
          scroll
        }
      />
    </div>
  );
};

export default Hero;
