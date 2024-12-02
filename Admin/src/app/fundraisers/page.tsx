"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import toast from "react-hot-toast";
import { Fundraiser } from "@/types";
import useAuthStore from "@/store/authStore";

const FundraisersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { token } = useAuthStore();

  const getFundraisers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/fundraisers`,
      );
      setFundraisers(response.data.fundraisers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/fundraisers/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getFundraisers();
      toast.success("Status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    getFundraisers();
  }, []);

  const filteredFundraisers = fundraisers.filter((fundraiser) => {
    const matchesSearchTerm =
      fundraiser.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fundraiser.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fundraiser.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fundraiser.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fundraiser.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fundraiser.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatusFilter = statusFilter
      ? fundraiser.status === statusFilter
      : true;

    return matchesSearchTerm && matchesStatusFilter;
  });

  return (
    <div className="min-h-screen">
      <DefaultLayout>
        <Breadcrumb pageName="Fundraisers" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="whitespace-nowrap text-xl font-semibold text-black dark:text-white">
              All Fundraisers
            </h4>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <input
                type="text"
                placeholder="Search fundraisers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-5 w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary md:w-1/2"
              />
              <div className="mt-4 md:ml-4 md:mt-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary md:w-auto"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {filteredFundraisers.map((fundraiser) => (
              <div
                className="border-t border-stroke p-4 dark:border-strokedark"
                key={fundraiser.id}
              >
                <div className="flex flex-col space-y-2">
                  <p className="truncate text-sm font-medium text-black dark:text-white">
                    {fundraiser.title}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {fundraiser.category}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    PKR {fundraiser.amountRaised} / PKR {fundraiser.totalAmount}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {fundraiser.firstName} {fundraiser.lastName}
                  </p>
                  <select
                    className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={fundraiser.status}
                    onChange={(e) =>
                      handleStatusChange(fundraiser.id, e.target.value)
                    }
                    disabled={fundraiser.status === "Completed"}
                  >
                    <option value={fundraiser.status} disabled>
                      {fundraiser.status}
                    </option>
                    <option value="active">Allow</option>
                    <option value="rejected">Reject</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:grid md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium text-black dark:text-white">Title</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">Category</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">Raised</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">Total</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium text-black dark:text-white">
                Created By
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium text-black dark:text-white">Status</p>
            </div>
          </div>

          <div className="hidden md:block">
            {filteredFundraisers.map((fundraiser) => (
              <div
                className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={fundraiser.id}
              >
                <div className="col-span-3 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {fundraiser.title}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {fundraiser.category}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    PKR {fundraiser.amountRaised}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    PKR {fundraiser.totalAmount}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {fundraiser.firstName} {fundraiser.lastName}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <select
                    className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={fundraiser.status}
                    onChange={(e) =>
                      handleStatusChange(fundraiser.id, e.target.value)
                    }
                    disabled={fundraiser.status === "Completed"}
                  >
                    <option value={fundraiser.status} disabled>
                      {fundraiser.status[0].toUpperCase() +
                        fundraiser.status.slice(1)}
                    </option>
                    <option value="active">Allow</option>
                    <option value="rejected">Reject</option>
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

export default FundraisersPage;
