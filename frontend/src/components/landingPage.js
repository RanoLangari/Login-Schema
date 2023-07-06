import React, { useEffect, useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LandingPage() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/mahasiswa", {
        withCredentials: true,
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkSession = async () => {
    try {
      const response = await axios.get("http://localhost:8000/checksession", {
        withCredentials: true,
      });
      if (response.data.status !== "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    checkSession();
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between px-6 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <button onClick={() => navigate("/addmahasiswa")} className="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase bg-blue-500 rounded hover:bg-blue-600">
            Add
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                NIM
              </th>
              <th scope="col" className="px-6 py-3">
                Jurusan
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr property="row" key={item.id} className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.nama}
                </th>
                <td className="px-6 py-4">{item.nim}</td>
                <td className="px-6 py-4">{item.jurusan}</td>
                <td className="px-6 py-4">{item.createdAt}</td>
                <td className="px-6 py-4">{item.updatedAt}</td>
                <td className="px-6 py-4">
                  <button onClick={() => navigate(`/editmahasiswa/${item.id}`)} className="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase bg-green-500 rounded hover:bg-green-600">
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Delete Data?",
                        text: `Are you sure want to delete ${item.nama}?`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          try {
                            const response = await axios.delete(`http://localhost:8000/mahasiswa/${item.id}`, {
                              withCredentials: true,
                            });
                            if (response.data.status === "success") {
                              Swal.fire("Deleted!", "Success deleted.", "success");
                              getData();
                            }
                          } catch (error) {
                            console.log(error.message);
                          }
                        }
                      });
                    }}
                    className="px-6 py-3 text-xs font-medium tracking-wider text-white uppercase bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
