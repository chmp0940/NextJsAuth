"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Signup() {
  /*
  router.push:

  Adds a new entry to the browser's history stack.
  The user can navigate back to the previous page using the back button.
  router.replace:

  Replaces the current entry in the browser's history stack.
  The user cannot navigate back to the previous page.
  */

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center  py-5 bg-amber-300 w-max px-10 rounded-lg shadow-lg h-4/5">
        {loading ? (
          <Image
            src="/Spinner-5.gif"
            alt="Loading..."
            width={48}
            height={48}
            className="w-12 h-12 mb-4"
          />
        ) : (
          <h1 className="text-4xl mb-4 text-fuchsia-900">SignUp</h1>
        )}
        <hr />

        <label htmlFor="username" className="text-fuchsia-900">
          username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
          id="username "
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email" className="text-fuchsia-900">
          email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password" className="text-fuchsia-900">
          password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-amber-100 bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSignUP}
        >
          {buttonDisabled ? "NO SignUp" : "SignUp"}
        </button>
        <br />
        <Link href="/login">Visit Login</Link>
      </div>
    </div>
  );
}
