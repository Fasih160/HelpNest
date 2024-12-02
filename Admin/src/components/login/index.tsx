"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuthStore from "@/store/authStore";
import { login } from "@/hooks/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { user, setToken, setUser } = useAuthStore();

  if (user) {
    router.push("/");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const { admin, token } = await login(email, password);
      setUser(admin);
      setToken(token);
      router.push("/");
      toast.success("Logged in successfully");
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password, or you are not an admin");
        setIsSubmitting(false);
        return;
      }
      toast.error("Something went wrong, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex min-h-screen items-center justify-center">
      <div className="dark:bg-gray-800 w-full max-w-md bg-white p-8 shadow-lg">
        <h2 className="text-gray-700 text-center text-2xl font-semibold dark:text-white">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="username"
              className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
            >
              Email
            </label>
            <input
              id="username"
              name="username"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 dark:bg-gray-700 dark:border-gray-600 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-primary dark:text-white sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="hover:bg-primary-dark flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
