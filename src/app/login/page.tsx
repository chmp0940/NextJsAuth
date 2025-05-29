/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [loading, setLoading] = React.useState(false); // for showing on frontend page about loading or login on frontend page

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
  /*
  The finally block in your onLogin function is used to run code after the try and catch blocks, no matter what happens—whether the login is successful or an error occurs.
  */

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center  py-2 bg-amber-300 w-max px-4 rounded-lg shadow-lg h-4/5">
        {loading ? (
          <Image
            src="/Spinner-5.gif"
            alt="Loading..."
            width={48}
            height={48}
            className="w-12 h-12 mb-4"
          />
        ) : (
          <h1 className="text-4xl mb-4 text-fuchsia-900">Login</h1>
        )}
        <hr />

        <label htmlFor="email" className="text-fuchsia-900">
          email
        </label>
        <input
          className="p-2 border bg-amber-50 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password" className="text-fuchsia-900">
          password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg bg-amber-50 mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password} // it means it will show the value in user.password
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-amber-100 bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login here
        </button>
        <Link href="/signup" className="text-fuchsia-900">
          Visit Signup page
        </Link>
      </div>
    </div>
  );
}
