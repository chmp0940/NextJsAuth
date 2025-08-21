"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  // ...existing code...
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [id, setId] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      // Redirect to the login page or home page after successful logout

      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error(error.message || "Logout failed");
    }
  };
  const getUserDetails = async () => {
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
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-fade-in">
        <div className="w-full flex justify-end mb-4">
          <button
            className="px-4 py-2 rounded-lg bg-violet-700 text-white font-semibold hover:bg-violet-800 transition-colors duration-200"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
              <path
                fill="#bbb"
                d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.418 0-8 1.79-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.21-3.582-4-8-4Z"
              />
            </svg>
          </div>
          <div className="text-lg font-bold text-gray-900">
            {data !== "nothing" ? data : "Your Name"}
          </div>
          <div className="text-sm text-gray-500">
            {id !== "nothing" ? `${id}@email.com` : "your@email.com"}
          </div>
        </div>
        <div className="w-full mb-6">
          <div className="text-gray-700 font-semibold mb-2">
            Account Settings
          </div>
          <div className="text-gray-500 text-sm mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <button
          className="w-full py-3 rounded-lg bg-violet-700 text-white font-semibold hover:bg-violet-800 transition-colors duration-200 mt-2"
          onClick={getUserDetails}
        >
          Get User Details
        </button>
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
