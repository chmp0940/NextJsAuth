
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ProfilePage() {
  /*
  Dynamic Routing:
Next.js uses this naming convention to automatically map the URL to the corresponding page.
  */
const router=useRouter();
const [data,setData]=useState("nothing");
const [id,setId]=useState("nothing");

const logout=async ()=>{
      try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      // Redirect to the login page or home page after successful logout

        router.push("/login");
        
      } catch (error:any) {
        console.error("Logout failed:", error);
        toast.error(error.message || "Logout failed");
        
      }
}
  const getUserDetails=async ()=>{
    const res = await axios.get("/api/users/me");
    console.log(res.data);

    /*
    res is the response object returned by Axios after making the HTTP request.
    res.data contains the response body sent by the server in JSON format.
    so now we need to go inside that json object ofr info 
    so now we get the user so inside user access the _id,username 
    ****remember that the user we get here is of database format so don't use id use _id

    */

    // console.log(res.data.data.id);
    toast.success("User fetched successfully");

    setData(res.data.info.username);
    // console.log(res.data.data._id);

    setId(res.data.info._id);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <hr />
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
      <h2 className="text-2xl p-2 rounded-b-md bg-amber-400 m-2">
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>username :{data}</Link>
        )}
      </h2>
      <h2 className="text-2xl font-bold mb-4 text-amber-400">id: {id}</h2>
    </div>
  );
}
