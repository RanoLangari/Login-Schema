import React from "react";
import "../index.css";

export default function LandingPage() {
  return (
    // create simple landing page using tailwind css
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to my website</h2>
        </div>
      </div>
    </div>
  );
}
