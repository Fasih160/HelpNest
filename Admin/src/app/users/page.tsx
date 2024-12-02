"use client";
import React, { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import toast from "react-hot-toast";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/get-all-users`,
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (id: number, role: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        role,
      });
      getUsers();
      toast.success("Role updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <DefaultLayout>
        <Breadcrumb pageName="Users" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col px-4 py-6 md:px-6 xl:px-7.5">
            <h4 className="whitespace-nowrap text-xl font-semibold text-black dark:text-white">
              All Users
            </h4>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-5 w-full rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="hidden grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:grid md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">First Name</p>
            </div>
            <div className="col-span-2 hidden items-center md:flex">
              <p className="font-medium">Last Name</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Email</p>
            </div>
            <div className="col-span-2 flex items-center whitespace-nowrap">
              <p className="font-medium">Phone</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Role</p>
            </div>
          </div>

          <div className="px-4 py-4.5 md:hidden">
            {filteredUsers.map((user) => (
              <div
                className="border-t border-stroke py-4 dark:border-strokedark"
                key={user.id}
              >
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {user.email}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    {user.phone}
                  </p>
                  <select
                    className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            {filteredUsers.map((user) => (
              <div
                className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={user.id}
              >
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {user.firstName}
                  </p>
                </div>
                <div className="col-span-2 hidden items-center md:flex">
                  <p className="text-sm text-black dark:text-white">
                    {user.lastName}
                  </p>
                </div>
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {user.email}
                  </p>
                </div>
                <div className="col-span-2 flex items-center whitespace-nowrap">
                  <p className="text-sm text-black dark:text-white">
                    {user.phone}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <select
                    className="w-full cursor-pointer appearance-none rounded border border-stroke bg-gray px-4.5 py-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
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

export default Page;
