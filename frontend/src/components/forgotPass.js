import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ForgotPass() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/forgotpass",
        {
          phone,
        },
        { withCredentials: true }
      );
      navigate("/forgetpass/otp");

      alert("OTP sent");
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Recovery Password</h2>
            </div>
            <form onSubmit={sendOTP}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-7">
                  <label htmlFor="phone" className="sr-only">
                    Nomor Telepon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    autoComplete="phone"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nomor Telepon"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
