"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Signup() {
  // ...existing code...

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUP = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user); // sends request to backend api
      /*
      This line sends an HTTP POST request to the backend API endpoint /api/users/signup with the user object as the request body. It uses the axios library to make the request.
      */
      console.log("SignUp Success", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      // console.log("Signup failed", error);
      // toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Agency radio state
  const [isAgency, setIsAgency] = React.useState<boolean | null>(null);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-fade-in">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-wide">
            Create your PopX account
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your details to sign up.
          </p>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSignUP();
          }}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-gray-700 font-medium">
              Full Name
            </label>
            <input
              className="pl-4 pr-4 py-3 border border-gray-300 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:border-violet-500 transition-all duration-200"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              className="pl-4 pr-4 py-3 border border-gray-300 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:border-violet-500 transition-all duration-200"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              className="pl-4 pr-4 py-3 border border-gray-300 rounded-lg w-full bg-white text-gray-900 focus:outline-none focus:border-violet-500 transition-all duration-200"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-gray-700 font-medium">
              Are you an Agency?
            </span>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="agency"
                  value="yes"
                  checked={isAgency === true}
                  onChange={() => setIsAgency(true)}
                  className="accent-violet-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="agency"
                  value="no"
                  checked={isAgency === false}
                  onChange={() => setIsAgency(false)}
                  className="accent-violet-600"
                />
                No
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="py-3 w-full rounded-lg font-semibold text-white bg-violet-700 hover:bg-violet-800 transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="w-full flex justify-center items-center mt-4">
          <Link
            href="/login"
            className="text-violet-700 hover:underline text-sm"
          >
            Already Registered? Login
          </Link>
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
