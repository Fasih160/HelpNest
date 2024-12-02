"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import toast from "react-hot-toast";
import { Donation } from "@/types";
import useAuthStore from "@/store/authStore";

const DonationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("");
  const { token } = useAuthStore();

  const getDonations = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/donations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDonations(response.data.donations);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentStatusChange = async (
    id: number,
    paymentStatus: string,
  ) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/donations/${id}`,
        {
          paymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getDonations();
      toast.success("Payment status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update payment status");
    }
  };

  useEffect(() => {
    getDonations();
  }, []);

  const filteredDonations = donations.filter((donation) => {
    const matchesSearchTerm =
      donation.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.amount.toString().includes(searchTerm.toLowerCase()) ||
      donation.fundraiser.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesPaymentStatusFilter = paymentStatusFilter
      ? donation.paymentStatus === paymentStatusFilter
      : true;

    return matchesSearchTerm && matchesPaymentStatusFilter;
  });

  return (
    <div className="min-h-screen">
      <DefaultLayout>
        <Breadcrumb pageName="Donations" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="whitespace-nowrap text-xl font-semibold text-black dark:text-white">
              All Donations
            </h4>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-5 w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary md:w-1/2"
              />
              <div className="mt-4 md:ml-4 md:mt-0">
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary md:w-auto"
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {filteredDonations.map((donation) => (
              <div
                className="border-t border-stroke p-4 dark:border-strokedark"
                key={donation.id}
              >
                <div className="flex flex-col space-y-2">
                  <p className="truncate text-sm font-medium text-black dark:text-white">
                    {donation.firstName} {donation.lastName}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {donation.email}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {donation.paymentMethod}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    PKR {donation.amount}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    Fundraiser: {donation.fundraiser.title}
                  </p>
                  <select
                    className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={donation.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(donation.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:grid md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">Name</p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="font-medium text-black dark:text-white">Email</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">Amount</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">
                Payment Method
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">
                Fundraiser
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-black dark:text-white">
                Payment Status
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            {filteredDonations.map((donation) => (
              <div
                className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={donation.id}
              >
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {donation.firstName} {donation.lastName}
                  </p>
                </div>
                <div className="col-span-3 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {donation.email}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    PKR {donation.amount}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {donation.paymentMethod[0].toUpperCase() +
                      donation.paymentMethod.slice(1)}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="max-w-24 text-sm text-black dark:text-white">
                    {donation.fundraiser.title}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <select
                    className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={donation.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(donation.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default DonationsPage;
