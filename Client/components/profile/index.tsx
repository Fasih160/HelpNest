import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Fundraiser } from "@/types";
import { Button } from "../ui/button";
import useAuthStore from "@/store/authStore";

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Last name must be at least 3 characters" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
});

const formSchemaPassword = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Profile = () => {
  const { user } = useAuthStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
    },
  });

  const formPassword = useForm<z.infer<typeof formSchemaPassword>>({
    resolver: zodResolver(formSchemaPassword),
  });

  useEffect(() => {
    form.reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
    });
  }, [user]);

  const [edit, setEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Backend integration to update user profile
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.id}`,
        values
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
      setEdit(false);
    }
  }
  // Backend integration to update user password
  async function onSubmitPassword(values: z.infer<typeof formSchemaPassword>) {
    setIsSubmittingPassword(true);
    try {
      const response = await axios.post(`/api/update/${user?.id}`, {
        password: values.password,
        newPassword: values.newPassword,
      });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmittingPassword(false);
      formPassword.reset({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="px-2 py-1.5 text-sm transition duration-200 hover:bg-slate-100 w-full">
        Profile
      </DialogTrigger>
      <DialogContent className="scrollbar scrollbar-none overflow-scroll w-full max-w-[1000px] h-full md:max-h-[520px] flex-col md:flex-row flex gap-10">
        <div className="md:w-1/2 h-full md:overflow-scroll scrollbar-none">
          <h1 className="text-2xl font-bold mb-3">Your Profile</h1>
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled={!edit} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled={!edit} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} disabled={!edit} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {edit ? (
                    <Button
                      type="submit"
                      className="bg-primary text-white w-full hover:bg-primary-dark transition duration-200"
                    >
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit(true);
                      }}
                      className="bg-primary text-white w-full hover:bg-primary-dark transition duration-200"
                    >
                      Edit
                    </Button>
                  )}
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="password">
              <Form {...formPassword}>
                <form
                  className="space-y-3"
                  onSubmit={formPassword.handleSubmit(onSubmitPassword)}
                >
                  <FormField
                    control={formPassword.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPassword.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPassword.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="bg-primary text-white w-full hover:bg-primary-dark transition duration-200"
                  >
                    {isSubmittingPassword ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
        <div className="md:w-1/2 h-full">
          <h1 className="text-2xl font-bold mb-3">Your Fundraisers</h1>
          <div className="space-y-3 text-xs md:overflow-scroll md:h-[90%] scrollbar-none">
            {user && user.fundraisers?.length > 0 ? (
              <>
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "pending"
                ).length > 0 && <h3 className="font-bold">Pending:</h3>}
                <div className="grid gap-4">
                  {user.fundraisers
                    .filter(
                      (fundraiser: Fundraiser) =>
                        fundraiser.status === "pending"
                    )
                    .map((fundraiser: Fundraiser) => (
                      <div
                        key={fundraiser.id}
                        className="border p-4 rounded-md bg-yellow-100"
                      >
                        <div className="flex justify-between">
                          <h2 className="font-bold">Creation Date</h2>
                          <h2 className="font-bold">
                            {new Date(
                              fundraiser.created_at
                            ).toLocaleDateString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Title</h2>
                          <h2 className="font-bold">{fundraiser.title}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Category</h2>
                          <h2 className="font-bold">{fundraiser.category}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Total Amount</h2>
                          <h2 className="font-bold">
                            PKR {fundraiser.totalAmount.toLocaleString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Status</h2>
                          <h2 className="font-bold text-yellow-600">
                            {fundraiser.status[0].toUpperCase() +
                              fundraiser.status.slice(1)}
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "pending"
                ).length > 0 && <hr />}
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "active"
                ).length > 0 && <h3 className="font-bold">Active:</h3>}
                <div className="grid gap-4">
                  {user.fundraisers
                    .filter(
                      (fundraiser: Fundraiser) => fundraiser.status === "active"
                    )
                    .map((fundraiser: Fundraiser) => (
                      <div
                        key={fundraiser.id}
                        className="border p-4 rounded-md bg-green-100"
                      >
                        <div className="flex justify-between">
                          <h2 className="font-bold">Creation Date</h2>
                          <h2 className="font-bold">
                            {new Date(
                              fundraiser.created_at
                            ).toLocaleDateString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Title</h2>
                          <h2 className="font-bold">{fundraiser.title}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Category</h2>
                          <h2 className="font-bold">{fundraiser.category}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Total Amount</h2>
                          <h2 className="font-bold">
                            PKR {fundraiser.totalAmount.toLocaleString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Status</h2>
                          <h2 className="font-bold text-green-600">
                            {fundraiser.status[0].toUpperCase() +
                              fundraiser.status.slice(1)}
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "active"
                ).length > 0 && <hr />}
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "completed"
                ).length > 0 && <h3 className="font-bold">Completed:</h3>}
                <div className="grid gap-4">
                  {user.fundraisers
                    .filter(
                      (fundraiser: Fundraiser) =>
                        fundraiser.status === "completed"
                    )
                    .map((fundraiser: Fundraiser) => (
                      <div
                        key={fundraiser.id}
                        className="border p-4 rounded-md bg-blue-100"
                      >
                        <div className="flex justify-between">
                          <h2 className="font-bold">Creation Date</h2>
                          <h2 className="font-bold">
                            {new Date(
                              fundraiser.created_at
                            ).toLocaleDateString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Title</h2>
                          <h2 className="font-bold">{fundraiser.title}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Category</h2>
                          <h2 className="font-bold">{fundraiser.category}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Total Amount</h2>
                          <h2 className="font-bold">
                            PKR {fundraiser.totalAmount.toLocaleString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Status</h2>
                          <h2 className="font-bold text-blue-600">
                            {fundraiser.status[0].toUpperCase() +
                              fundraiser.status.slice(1)}
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "completed"
                ).length > 0 && <hr />}
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "rejected"
                ).length > 0 && <h3 className="font-bold">Rejected:</h3>}
                <div className="grid gap-4">
                  {user.fundraisers
                    .filter(
                      (fundraiser: Fundraiser) =>
                        fundraiser.status === "rejected"
                    )
                    .map((fundraiser: Fundraiser) => (
                      <div
                        key={fundraiser.id}
                        className="border p-4 rounded-md bg-red-100"
                      >
                        <div className="flex justify-between">
                          <h2 className="font-bold">Creation Date</h2>
                          <h2 className="font-bold">
                            {new Date(
                              fundraiser.created_at
                            ).toLocaleDateString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Title</h2>
                          <h2 className="font-bold">{fundraiser.title}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Category</h2>
                          <h2 className="font-bold">{fundraiser.category}</h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Total Amount</h2>
                          <h2 className="font-bold">
                            PKR {fundraiser.totalAmount.toLocaleString()}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          <h2 className="font-bold">Status</h2>
                          <h2 className="font-bold text-red-600">
                            {fundraiser.status[0].toUpperCase() +
                              fundraiser.status.slice(1)}
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
                {user.fundraisers.filter(
                  (fundraiser: Fundraiser) => fundraiser.status === "rejected"
                ).length > 0 && <hr />}
              </>
            ) : (
              <p className="text-gray-500">You have no fundraisers.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
