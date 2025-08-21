import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-wide">
          Welcome to PopX
        </h1>
        <p className="text-gray-500 text-sm mb-8 text-center">
          Learn signup state at smart, consistent onboarding etc.
        </p>
        <div className="w-full flex flex-col gap-4">
          <a
            href="/signup"
            className="py-3 w-full rounded-lg font-semibold text-white bg-violet-700 hover:bg-violet-800 transition-colors duration-300 shadow-lg text-center"
          >
            Create Account
          </a>
          <a
            href="/login"
            className="py-3 w-full rounded-lg font-semibold text-violet-700 bg-violet-100 hover:bg-violet-200 transition-colors duration-300 shadow-lg text-center"
          >
            Already Registered? Login
          </a>
        </div>
      </div>
    </div>
  );
}
