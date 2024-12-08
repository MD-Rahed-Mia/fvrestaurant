import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import Cookies from "js-cookie";
import OrderCard from "./order/OrderCard";
import Loading from "./loading/Loading";

function Order() {
  const [selectedStatus, setSelectedStatus] = useState("new");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(null);
  const [total, setTotal] = useState(0);

  // Fetch orders from the server based on the selected status
  const fetchOrders = async () => {
    try {
      setTotal(0);
      setOrders([]);
      setLoading(true);
      
      const id = Cookies.get("restaurantId");
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
    fetchOrders();
  }, [selectedStatus]);

  useEffect(() => {
    // console.log(orders);
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
            className={`w-28 cursor-pointer select-none ${
              selectedStatus === status
                ? "text-blue-500 relative select-none"
                : ""
            }`}
            onClick={() => {
              setSelectedStatus(status);
              setTotal(0);
              setOrders([]);
            }}
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
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default Order;
