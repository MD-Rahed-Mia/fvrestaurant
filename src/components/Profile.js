import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api_path_url, authToken } from "../secret";
import Cookies from "js-cookie";

const MainProfile = () => {
  const profile = [{ name: "Ibrahim", img: "./img/Ibrahimtest.jpg" }];

  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = Cookies.get("restaurantId");

    console.log(id);

    async function fetchUserInformation() {
      try {
        const apiResponse = await fetch(
          `${api_path_url}/restaurant/get-profile?id=${id}`,
          {
            headers: {
              "x-auth-token": authToken,
            },
            method: "GET",
          },
        );

        const result = await apiResponse.json();

        if (result?.success) {
          setUser(result?.restaurant);
        }

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserInformation();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center min-h-screen p-2">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-sm">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-6 px-6">
          <div className="flex justify-center">
            <div className="relative">
              <img
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                src={user?.image}
                alt={user?.name}
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full shadow-md">
                <svg
                  className="w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h2 className="mt-4 text-white text-center text-xl font-bold">
            {user?.name}
          </h2>
        </div>

        {/* Profile Details */}
        <div className="p-2 space-y-6">
          {/* Restaurant*/}
          {/* Address */}
          <div className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Address</span>
            <span className=" text-gray-500">{user?.address}</span>
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Phone Number</span>
            <span className=" text-gray-500">{user?.phone}</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.71 5.03a1.998 1.998 0 002.58 0L21 8M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9-6-9 6"
                ></path>
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Email</span>
            <span className=" text-gray-500">
              {user?.email || "email is not setup."}
            </span>
          </div>

          {/* Password */}
          <div className="flex items-center space-x-2 rounded-lg shadow-md p-2">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg
                className="h-6 w-6 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.71 5.03a1.998 1.998 0 002.58 0L21 8M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9-6-9 6"
                ></path>
              </svg>
            </div>
            <span className="text-gray-700 font-semibold">Password</span>
            <span className=" text-gray-500">******</span>
          </div>
        </div>
        {/* Edit Profile Button */}
        <div className="p-2">
          <Link
            to="/"
            className="w-full block text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-md hover:from-purple-700 hover:to-blue-700 transition duration-300 ease-in-out"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
