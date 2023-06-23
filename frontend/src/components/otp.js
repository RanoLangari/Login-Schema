import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/verifyotp",
        {
          otp: otp,
        },
        { withCredentials: true }
      );
      if (res.data.status === "success") {
        navigate("/resetpass");
      } else {
        alert("OTP salah");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Masukan OTP</h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={verifyOTP}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-7">
                    <label htmlFor="otp" className="sr-only">
                      OTP
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="otp"
                      autoComplete="otp"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      {/* <!-- Heroicon name: solid/lock-closed --> */}
                      <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M3 4a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    Konfirmasi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
