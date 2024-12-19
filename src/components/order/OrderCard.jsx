import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/AxiosInstance";
import { Button, Popconfirm } from "antd";
import { useSocket } from "../../contexts/SocketContext";
import { DateTime } from "luxon";
import OrderAddons from "./OrderAddons";

export default function OrderCard({ order }) {
  const items = order.items;

  // total amount
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    // Flattening the addons array
    const totalItemsValue = order?.items.reduce((acc, item) => {
      return (acc += item.quantity * item.basedPrice);
    }, 0);

    console.log(
      `amount is : ${totalItemsValue}, delviery: ${order.deliveryAmount}, addont: ${order.addonTotal}`
    );

    setTotalAmount(totalItemsValue + Number(order.addonTotal));
  }, [order]);

  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [addons, setAddons] = useState([]);

  useEffect(() => {
    // Flattening the addons array
    const newAddons = order?.items.reduce((acc, item) => {
      if (item.addons.length > 0) {
        return [...acc, ...item.addons]; // Spread operator to flatten
      }
      return acc;
    }, []);

    setAddons(newAddons); // Update the state with the flattened array
  }, [order]);

  useEffect(() => {
    console.log(addons);
  }, [addons]);

  useEffect(() => {
    console.log(`total amount is : ${totalAmount}`);
  }, [totalAmount]);

  useEffect(() => {
    if (isRejectModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isRejectModalOpen]);

  // handle accept order
  async function handleAcceptOrder(id) {
    try {
      if (!id) {
        toast.error("required order id.");
        return;
      }

      const response = await axiosInstance.put(
        `/restaurant/accept-order-by-restaurant?order-id=${id}`
      );
      console.log(await response.data);

      // data
      const data = await response.data;

      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      throw new Error(error);
    }
  }

  return (
    <div className="p-4 rounded-md shadow-lg mt-4 border-2 ">
      <p>
        O.ID: <span>{order._id}</span>
      </p>
      <p>
        O.Status:{" "}
        <span
          className={
            order.status === "delivered"
              ? "px-4 py-1 text-white rounded-full text-sm bg-blue-700"
              : order.status === "pending"
              ? "px-4 py-1 text-white rounded-full text-sm bg-orange-700"
              : order.status === "accept by restaurant"
              ? "px-4 py-1 text-white rounded-full text-sm bg-orange-400"
              : order.status === "cancelled by restaurant"
              ? "px-4 py-1 text-white rounded-full text-sm bg-red-700"
              : order.status === "ready for pickup"
              ? "px-4 py-1 text-white rounded-full text-sm bg-blue-400"
              : order.status === "accept by rider"
              ? "px-4 py-1 text-white rounded-full text-sm bg-orange-400"
              : null
          }
        >
          {order.status}
        </span>
      </p>
      <p>
        U.ID: <span>{order.userId}</span>
      </p>
      <p>
        Drop: <span>{order.dropLocation}</span>
      </p>

      <p>
        Payment method:
        <span className="font-extrabold"> {order.peymentMethod || "COD"}</span>
      </p>
      <p className="text-sm">
        Date:{" "}
        {DateTime.fromISO(order.orderDate)
          .setZone("Asia/Dhaka")
          .toFormat("dd MMM yyyy, hh:mm a")}
      </p>

      {order.status === "cancelled by restaurant" ? (
        <p>
          Reason-{" "}
          <span className="text-sm text-orange-600">{order.cancelReason}</span>
        </p>
      ) : null}

      <p
        className="flex
       items-center  gap-2"
      >
        Message:
        <span>
          {order.customerMessage || <div className="text-sm">" "</div>}
        </span>
      </p>

      <div className="w-full mt-4">
        <h1>Foods</h1>
        <table className="w-full border text-center">
          <thead>
            <tr>
              <td className="border px-3 text-[14px] font-extrabold">SL</td>
              <td className="border px-3 text-[14px] font-extrabold">
                Item Name
              </td>
              <td className="border px-3 text-[14px] font-extrabold">
                Quantity
              </td>
              <td className="border px-3 text-[14px] font-extrabold">Price</td>
            </tr>
          </thead>

          <tbody>
            {items &&
              items.map((item, index) => {
                return (
                  <tr className="border px-2" key={index}>
                    <td className="border px-4">{index + 1}</td>
                    <td className="text-sm border">{item.name}</td>
                    <td className="border">{item.quantity}</td>
                    <td className="border  px-4">
                      {item.quantity * item.basedPrice}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div>
        <h1>Addons</h1>

        {/* addons table */}
        <table className="w-full">
          <thead>
            <th className="border px-1 py-1">SL</th>
            <th className="border px-1 py-1">Name</th>
            <th className="border px-1 py-1">Quantity</th>
            <th className="border px-1 py-1">Price</th>
            <th className="border px-1 py-1">Sub total</th>
          </thead>
          <tbody>
            {addons?.map((add, index) => {
              return <OrderAddons item={add} index={index} />;
            })}
          </tbody>
        </table>
      </div>

      {/* <h1>
        Delivery charge: <span>{order.deliveryAmount}</span>
      </h1> */}

      <h1>
        Amount:{" "}
        <span className="font-extrabold">BDT {totalAmount.toFixed(2)}</span>
      </h1>

      {isRejectModalOpen ? (
        <RejectOrderCard
          setIsRejectModalOpen={setIsRejectModalOpen}
          id={order._id}
        />
      ) : null}

      {/* order decline and accept */}
      {order.status === "pending" ? (
        <div className="w-full flex  mt-4 items-center justify-center gap-5">
          <button
            onClick={() => setIsRejectModalOpen(true)}
            className="px-4 py-2 rounded-full text-center text-white hover:bg-red-200 bg-red-500"
          >
            Decline
          </button>
          <button
            onClick={() => handleAcceptOrder(order?._id)}
            className="px-4 py-2 rounded-full text-center text-white hover:bg-blue-800 bg-blue-500"
          >
            Accept
          </button>
        </div>
      ) : null}

      {/* food is ready for pickup */}

      {order.status === "accept by restaurant" ? (
        <h1 className="text-center mt-4">Please wait for rider</h1>
      ) : null}
      {order.status === "accept by rider" ? (
        <ReadyForPickup id={order._id} />
      ) : null}
    </div>
  );
}

function RejectOrderCard({ setIsRejectModalOpen, id }) {
  const [reason, setReason] = useState({ reason: "" });

  // handle reason
  function handleOnChange(e) {
    setReason((prev) => ({ ...prev, reason: e.target.value }));
    // console.log(reason);
  }

  // handle accept order
  async function handleRejctOrder(id) {
    try {
      if (!id) {
        toast.error("required order id.");
        return;
      }

      const response = await axiosInstance.put(
        `/restaurant/cancel-order-by-restaurant?order-id=${id}`,
        reason
      );
      // console.log(await response.data);

      // data
      const data = await response.data;

      if (data?.success) {
        toast.success(data.message);
        setIsRejectModalOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      throw new Error(error);
    }
  }

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#0000005c] flex items-center justify-center">
      <div className="w-[80%] md:w-[50%] bg-white p-6 rounded-lg shadow-lg relative">
        <textarea
          name="reason"
          placeholder="Please explain reason for cancelled order"
          id="reason"
          className="w-full p-2 border shadow-lg rounded-md"
          onChange={handleOnChange}
          value={reason.value}
        ></textarea>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setIsRejectModalOpen(false)} // Close the modal
            className="px-4 py-2 rounded-full bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleRejctOrder(id);
            }}
            className="px-4 py-2 rounded-full bg-red-500 text-white"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

function ReadyForPickup({ id }) {
  const { socket } = useSocket();
  const confirm = async () => {
    if (!id) {
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/restaurant/ready-for-pickup?order-id=${id}`
      );

      console.log(await response.data);
      const data = await response.data;

      if (data.success) {
        if (socket) {
          socket.emit("notifyParcelReadyForPickup", data.order);
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center mx-auto  mt-4">
        <Popconfirm
          title="request pickup"
          description="make sure your food is ready?"
          onConfirm={confirm}
          onOpenChange={() => console.log("open change")}
        >
          <Button className="px-4 py-2 rounded-full text-center text-white hover:bg-blue-800 bg-blue-500">
            Ready for pickup
          </Button>
        </Popconfirm>
      </div>
    </>
  );
}
