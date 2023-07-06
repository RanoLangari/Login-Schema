import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

  const Register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        {
          username,
          phone,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        navigate("/verifyotpregister");
      } else {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register New Account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={Register}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-7">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-7">
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <PhoneInput
                  inputStyle={{ width: "100%" }}
                  country={"id"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                    enableSearch: true,
                  }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
          <a
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3"
            href="/login"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
