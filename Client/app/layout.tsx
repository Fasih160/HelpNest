"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import toast, { Toaster } from "react-hot-toast";
import { loginBack } from "@/hooks/auth";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser, setToken } = useAuthStore();

  useEffect(() => {
    handleLoginBack();
  }, []);

  const handleLoginBack = async () => {
    try {
      const res = await loginBack();
      console.log(res);
      if (!res) {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        return;
      }
      if (res?.user) setUser(res.user.user);
      if (res?.token) setToken(res.token);
    } catch (error: any) {
      setToken("");
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
