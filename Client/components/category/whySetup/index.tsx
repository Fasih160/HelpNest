import React from "react";
import Link from "next/link";
import img from "@/assets/whySetup.jpg";

const WhySetup = () => {
  return (
    <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-20 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight text-center mb-12">
        Why Set Up a Fundraiser on HelpNest?
      </h2>
      <div className="flex flex-col md:flex-row gap-10">
        <img
          src={img.src}
          alt="Fundraiser setup"
          className="w-full md:w-1/2 rounded-3xl shadow-lg object-cover transform transition-transform duration-300 hover:scale-105"
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 mt-5 md:mt-0">
            Easy to Set Up
          </h3>
          <p className="text-lg text-gray-600 mt-3 leading-relaxed">
            Setting up a fundraiser on HelpNest is quick and easy. Just provide
            some information about yourself and the person you are raising money
            for, and you're ready to start raising funds.
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-8">No Fees</h3>
          <p className="text-lg text-gray-600 mt-3 leading-relaxed">
            HelpNest does not charge any fees to start or run a fundraiser. All
            the money you raise goes directly to the person you are raising
            money for.
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-8">Secure</h3>
          <p className="text-lg text-gray-600 mt-3 leading-relaxed">
            HelpNest uses industry-standard security measures to protect your
            personal information and keep your fundraiser safe.
          </p>
          <Link
            href="/fundraiser"
            className="bg-primary hover:bg-primary-dark text-lg py-3 px-8 rounded-full text-white mt-8 self-start shadow-md transform transition-transform duration-300 hover:scale-105"
          >
            Start a Fundraiser
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhySetup;
