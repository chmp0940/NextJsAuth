"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 400) {
        // Show popup if user already exists
        toast.error(error.response.data.message || "User already exists");
      } else {
        // Handle other errors
        toast.error(error.response?.data?.message || "Something went wrong");
      }
      console.error("Signup failed", error.message);
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
      <h1>{loading ? "Processsing" : "Signup"}</h1>
      <hr />

      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
        id="username "
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-500"
        onClick={onSignUP}
      >
        {buttonDisabled ? "NO SignUp" : "SignUp"}
      </button>
      <br />
      <Link href="/login">Visit Login</Link>
    </div>
  );
}
