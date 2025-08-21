// ...existing code...
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile"); // is used to redirect the user to the /profile page after a successful login.
      //This is a client-side navigation provided by Next.js’s useRouter hook.
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      // console.log("Login failed", error);
      // toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
  // ...existing code...

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-900 via-fuchsia-800 to-blue-900">
      <div className="w-full max-w-md mx-auto bg-white bg-opacity-90 rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-fade-in">
        <div className="mb-8 flex flex-col items-center">
          <span className="inline-block bg-gradient-to-r from-violet-700 to-fuchsia-600 rounded-full p-3 mb-4">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4Z"
              />
            </svg>
          </span>
          <h1 className="text-3xl font-bold text-violet-800 mb-2 tracking-wide">
            Sign in
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-violet-700 font-medium">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm2 0v.511l8 5.333 8-5.333V6H4Zm16 2.489-7.555 5.04a2 2 0 0 1-2.89 0L4 8.489V18h16V8.489Z"
                  />
                </svg>
              </span>
              <input
                className="pl-10 pr-4 py-3 border border-violet-300 rounded-lg w-full bg-white text-violet-900 focus:outline-none focus:border-violet-500 transition-all duration-200"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-violet-700 font-medium">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6-7V8a6 6 0 1 0-12 0v2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2Zm-8-2a4 4 0 1 1 8 0v2H6V8Z"
                  />
                </svg>
              </span>
              <input
                className="pl-10 pr-4 py-3 border border-violet-300 rounded-lg w-full bg-white text-violet-900 focus:outline-none focus:border-violet-500 transition-all duration-200"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="py-3 w-full rounded-lg font-semibold text-white bg-gradient-to-r from-violet-700 to-fuchsia-600 hover:from-violet-800 hover:to-fuchsia-700 transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="w-full flex justify-between items-center mt-4">
          <Link
            href="/signup"
            className="text-violet-700 hover:underline text-sm"
          >
            Don&apos;t have an account? Sign up
          </Link>
          <span className="text-gray-400 text-xs cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
