"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { register } from "@/hooks/auth";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits long" })
      .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
    role: z.enum(["user", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const { setToken, setUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const { user, token } = await register(values);
      setUser(user);
      setToken(token);
      toast.success("Registered successfully");
      router.push("/");
    } catch (error: any) {
      if (error.response?.status === 422) {
        toast.error("User already exists");
        return;
      }
      toast.error("Something went wrong, please try again");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  }

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-[#f7f7f8] pt-24 md:pt-0">
      {/* Left side - Visual Section */}
      <div className="md:w-1/2 w-full bg-gradient-to-r from-[#75924B] to-[#5f743d] flex flex-col items-center justify-center text-white p-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold leading-tight">
            Join our community
          </h2>
          <p className="text-lg mt-4 max-w-md mx-auto">
            Empowering individuals to achieve their goals through the power of
            community and support.
          </p>
        </div>
      </div>

      {/* Right side - Form Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center md:items-end p-6 md:pr-32 md:pt-20">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold mb-2">
            Create an Account
          </h1>
          <h2 className="text-gray-500 text-sm mb-8">Join HelpNest</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirmPassword"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end items-center">
                <Button
                  type="submit"
                  className="py-3 px-6 bg-[#75924B] text-white rounded-lg hover:bg-[#5f743d] transition duration-300 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#75924B] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
