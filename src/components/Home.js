import React, { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";
import RestauarntMenuCard from "./restaurant/RestauarntMenuCard";
import toast from "react-hot-toast";

const Home = () => {
  const [restaurant, setRestaurant] = useState(null);

  // menu list
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    const id = Cookies.get("user");

    async function getRestaurant() {
      if (id === undefined) {
        toast.error("Please login properly.");
        return false;
      }

      try {
        const response = await axiosInstance.get(`/restaurant/get-profile?id=${id}`);
        const data = await response.data;

        if (data.success) {
          setRestaurant(data.restaurant);
        } else {
          toast.error("Failed to fetch restaurant data.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("Restaurant not found (404).");
          } else if (error.response.status === 500) {
            toast.error("Server error (500).");
          } else {
            toast.error("Something went wrong.");
          }
        } else {
          toast.error("Network error.");
        }
        console.error("Error fetching restaurant:", error.message);
      }
    }

    async function getMenus() {
      if (id === undefined) {
        toast.error("Please login properly.");
        return false;
      }

      try {
        const response = await axiosInstance.get(`/restaurant/list-of-menu?id=${id}`);
        const data = await response.data;

        if (data?.success) {
          setMenus(data.menu);
        } else {
          toast.error("Failed to fetch menu data.");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("Menus not found (404).");
          } else if (error.response.status === 500) {
            toast.error("Server error (500).");
          } else {
            toast.error(error.response.data.message || "Something went wrong.");
          }
        } else {
          toast.error("Network error.");
        }
        console.error("Error fetching menus:", error.message);
      }
    }

    getRestaurant();
    getMenus();
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-200 to-blue-20 min-h-screen">
      {/* Header Section */}
      <div className="w-full fixed z-10 ">
        <header className="bg-white p-4 m-4 -mb-4 rounded-lg shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={restaurant?.image || "img/burger.png"}
              alt="Boom Boom Burger"
              className="w-20 h-16 rounded-md object-cover shadow-md"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-800">
                {restaurant?.name}
              </h1>
              <p className="text-xs">{restaurant?.address}</p>
            </div>
          </div>
        </header>
      </div>

      <div className="py-[120px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 gap-12">
        {menus &&
          menus?.map((item, index) => {
            return <RestauarntMenuCard menu={item} key={index} />;
          })}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
