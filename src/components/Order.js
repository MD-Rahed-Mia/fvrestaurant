import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";
import OrderCard from "./order/OrderCard";
import Loading from "./loading/Loading";

function Order() {
  const [selectedStatus, setSelectedStatus] = useState("new"); // Tracks the selected order status
  const [orders, setOrders] = useState([]); // Stores orders from the server
  const [loading, setLoading] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch orders from the server based on the selected status
  const fetchOrders = async (status) => {
    try {
      setLoading(true);
      const id = Cookies.get("user");

      if (id === undefined) {
        setLoading(true);
        return false;
      }
      const response = await axiosInstance.get(
        `/restaurant/${selectedStatus}-order?id=${id}`
      );

      const data = await response.data;

      if (data.success) {
        setOrders(data.result);
        setTotal(data.total);
        setLoading(false);
      } else {
        setOrders([]);
        setTotal(0);
        setLoading(false);
      }
      console.log(await response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Clear orders on error

      setTotal(0);
      setLoading(false);
    }
  };

  // Use effect to fetch orders whenever the selected status changes
  useEffect(() => {
    fetchOrders(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    console.log(orders);

    //  setTotal(orders?.total);
  }, [orders]);

  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-200 to-blue-200 p-4 w-full fixed top-0 z-10">
        <div className="flex flex-col items-center mb-2 mt-2 justify-between">
          <div className="w-full text-center">
            <span className="font-bold text-blue-700">My Order</span>
          </div>
        </div>
      </header>

      {/* Order Status Tabs */}
      <div className="flex  flex-row items-center justify-between font-bold text-gray-800 p-2 text-center mt-20 fixed w-full bg-white capitalize">
        {["new", "pending", "complete", "cancelled"].map((status) => (
          <div
            key={status}
            className={`w-28 cursor-pointer ${
              selectedStatus === status ? "text-blue-500 relative" : ""
            }`}
            onClick={() => setSelectedStatus(status)}
          >
            <span className="relative">
              {status}
              {selectedStatus === status ? (
                <span className="-top-3 -right-2 absolute">{total}</span>
              ) : null}
            </span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="py-[6rem]">
        {loading ? (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center">
            <Loading />
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-8 py-4">
          {orders.length > 0 ? (
            <ul className="w-full max-w-md">
              {orders.map((order, index) => {
                return <OrderCard key={index} order={order} />;
              })}
            </ul>
          ) : (
            <main className="flex items-center justify-center min-h-screen bg-white ">
              <div className="text-center">
                {/* Icon with Cart */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-full">
                    <svg
                      className="h-16 w-16 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text Content */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  No order yet!
                </h2>
              </div>
            </main>
          )}
        </div>
      </main>
    </div>
  );
}

export default Order;
