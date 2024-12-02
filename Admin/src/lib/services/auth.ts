import dbConnect from "../database/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import Fundraiser from "@/models/fundraiser";
import Donation from "@/models/donation";
export async function login(credentials: any) {
  try {
    const { email, password } = credentials;
    await dbConnect();
    const user = await User.findOne({ email })
      .populate({
        path: "fundraisers",
        model: Fundraiser,
      })
      .populate({
        path: "donations",
        model: Donation,
      });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    if (user.role !== "admin") {
      throw new Error("User not authorized");
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const authOptions: any = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err: any) {
          console.log(err);
          throw new Error(err.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user: any;
      trigger: any;
      session: any;
    }) {
      if (trigger == "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.id = user.id;
        token.phone = user.phone;
        token.role = user.role;
        token.fundraisers = user.fundraisers;
        token.donations = user.donations;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.email = token.email;
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.phone = token.phone;
      session.user.role = token.role;
      session.user.fundraisers = token.fundraisers;
      session.user.donations = token.donations;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    maxAge: 10 * 60,
  },
};
