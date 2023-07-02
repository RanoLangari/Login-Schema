import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function ForgotPass() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      const sendOtp = await axios.post(
        "http://localhost:8000/forgotpass",
        {
          phone,
        },
        { withCredentials: true }
      );
      if (sendOtp.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: sendOtp.data.message,
        });
        navigate("/forgotpass/otp");
      } else {
        Toast.fire({
          icon: "error",
          title: sendOtp.data.message,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
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
              <div className="mt-4">
                <a href="/login" className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Back to Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
