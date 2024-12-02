import NextAuth from "next-auth";
import { Fundraiser, Donation } from ".";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      phone: string;
      fundraisers: Fundraiser[];
      donations: Donation[];
    };
  }
}
