import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";

const Wallet = () => {
  const [totalDeliverd, setTotalDelivered] = useState(null);
  const [todayOrder, setTodayOrder] = useState(null);
  const [wallet, setWallet] = useState(null);

  // get tatal complete deliver
  useEffect(() => {
    async function getTotalDeliverdOrder() {
      const id = Cookies.get("restaurantId");
      try {
        const { data } = await axiosInstance.get(
          `/restaurant/complete-order?id=${id}` // Note: Removed the extra slash (//)
        );
        //  console.log(`data is : ${data}`);

        if (data.success) {
          setTotalDelivered(data.total);
        } else {
          setTotalDelivered(0);
        }
      } catch (error) {
        console.error(error);

        if (error.response) {
          if (error.response.status === 404) {
            setTotalDelivered(0);
          }
        }
      }
    }

    getTotalDeliverdOrder();
  }, []);

  // get today orders
  useEffect(() => {
    async function getTodayOrder() {
      const id = Cookies.get("restaurantId");
      if (!id) {
        console.error("Restaurant ID not found in cookies");
        setTodayOrder(0); // Default to 0 if ID is missing
        return;
      }

      console.log("Fetching today's orders for ID:", id);

      try {
        const { data } = await axiosInstance.get(
          `/restaurant/today-order?id=${id}`
        );
        //  console.log("Today's Orders Response:", data);

        if (data.success) {
          setTodayOrder(data.count);
        } else {
          setTodayOrder(0); // Default to 0 if success is false
        }
      } catch (error) {
        console.error("Error fetching today's orders:", error);

        if (error.response) {
          console.error("Error Response Data:", error.response.data);
          if (error.response.status === 404) {
            setTodayOrder(0);
          }
        } else {
          console.error("Error Message:", error.message);
        }
      }
    }

    getTodayOrder();
  }, []);

  // get today orders
  useEffect(() => {
    async function getWallet() {
      const id = Cookies.get("restaurantId");
      if (!id) {
        console.error("Restaurant ID not found in cookies");
        setTodayOrder(0); // Default to 0 if ID is missing
        return;
      }

      console.log("Fetching today's orders for ID:", id);

      try {
        const { data } = await axiosInstance.get(
          `/restaurant/wallet/get-wallet?id=${id}`
        );
        console.log("Today's Orders Response:", data);

        if (data.success) {
          setWallet(data.result);
        }
      } catch (error) {
        console.error("Error fetching today's orders:", error);

        if (error.response) {
          console.error("Error Response Data:", error.response.data);
        } else {
          console.error("Error Message:", error.message);
        }
      }
    }

    getWallet();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen">
      <div className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-center rounded-md py-4 mb-4 ">
        <p>My Wallet</p>
      </div>
      <div className="flex flex-row justify-between space-x-4 text-center">
        <div className="border-2 flex flex-col w-full bg-purple-500 rounded-md p-2 text-white">
          <span className="text-2xl font-black py-2">{wallet?.totalSales} TK</span>
          <span>Total Sell</span>
        </div>
        <div className="border-2 flex flex-col w-full bg-blue-500 rounded-md p-2 text-white">
          <span className="text-2xl font-black py-2">{wallet?.wallet.balance} TK</span>
          <span>Current Balance</span>
        </div>
      </div>
      <div className="flex flex-row justify-between space-x-4 text-center mt-4">
        <div className="border-2 flex flex-col w-full bg-cyan-500 rounded-md p-2 text-white">
          <span className="text-2xl font-black py-2">{totalDeliverd}</span>
          <span>Total Order</span>
        </div>
        <div className="border-2 flex flex-col w-full bg-indigo-500 rounded-md p-2 text-white">
          <span className="text-2xl font-black py-2">{todayOrder}</span>
          <span>Today Order</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-center text-lg font-bold text-gray-700">
          Latest Order
        </p>
        <div></div>
      </div>
    </div>
  );
};
export default Wallet;
