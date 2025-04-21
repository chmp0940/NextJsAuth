"use client";
import axios from "axios";  
import Link from "next/link";
import React, { useState,useEffect } from "react";


export default function VerifyEmailPage() {

  const [token, setToken] = useState("");
  const [verified,setverified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  
  const verifyUserEmail=async()=>{
    try {
      setLoading(true);
      const response=await axios.post("/api/users/verifyemail", { token })
      console.log("Email verification response:", response.data);
      setverified(true);

      
    } catch (error: unknown) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error("Error verifying email:", error.response?.data.message || error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      
    }finally{
      setLoading(false);
    }

  }

useEffect(()=>{
  console.log("useEffect is running...");
  const urlToken = window.location.search.split("=")[1];
  setToken(urlToken || "");

},[])


  useEffect(() => {
    if(token.length>0)
    {
        verifyUserEmail();
    }
  }, [token]);
  
return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">
      {token ? `${token}` : "Token not found"}
    </h2>

    {loading && (
      <div className="p-2 bg-blue-500 text-black">Verifying email...</div>
    )}

    {!loading && !verified && !error && token && (
      <h2 className="p-2 bg-orange-500 text-black">{token}</h2>
    )}

    {verified && (
      <div className="p-2 bg-green-500 text-black">
        Email verified successfully! You can now{" "}
        <Link className="underline bg-pink-600 p-2 rounded-md" href="/login">Login</Link>.
      </div>
    )}

    {error && (
      <div className="p-2 bg-red-500 text-black">
        Error verifying email. Please try again later.
      </div>
    )}
  </div>
);

}