import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

export default function AddMahasiswa() {
  const Toast = swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal.stopTimer);
      toast.addEventListener("mouseleave", swal.resumeTimer);
    },
  });
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/checksession", { withCredentials: true });
        if (response.data.status !== "success") {
          navigate("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkAuth();
    // eslint-disable-next-line
  }, []);

  const addMahasiswa = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/addmahasiswa",
        {
          nama,
          nim,
          jurusan,
        },
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        Toast.fire({
          icon: "success",
          title: response.data.message,
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Tambah Mahasiswa</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={addMahasiswa}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-7">
              <label htmlFor="nama" className="sr-only">
                Nama Mahasiswa
              </label>
              <input
                id="nama"
                name="nama"
                type="nama"
                autoComplete="nama"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-7">
              <label htmlFor="phone" className="sr-only">
                NIM
              </label>
              <input
                id="nim"
                name="nim"
                type="nim"
                autoComplete="nim"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="NIM"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-7">
              <label htmlFor="phone" className="sr-only">
                Jurusan/Prodi
              </label>
              <input
                id="jurusan"
                name="jurusan"
                type="jurusan"
                autoComplete="jurusan"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Jurusan"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Tambah Mahasiswa
            </button>
          </div>
          <div className="mt-4">
            <a href="/" className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Kembali ke Tabel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
