import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketContext";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/AxiosInstance";

export default function NewOrderCard() {
  const socket = useSocket();
  const [isActive, setIsActive] = useState(false);

  console.log(socket);

  const [newOrder, setNewOrder] = useState(null);

  //  console.log(socket);

  useEffect(() => {
    if (socket) {
      // Only set up the listener if the socket is available
      socket.on("receiveNewOrder", (data) => {
        setNewOrder(data);
        console.log(data); // Make sure to log the incoming data to see if it's received
        setIsActive(true);
      });
    }
  }, [socket]); // Include socket in the dependency array

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
        setIsActive(false);
        setNewOrder(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      throw new Error(error);
    }
  }

  return (
    <>
      {isActive ? (
        <div className="fixed h-screen w-full bg-[#00000062] z-50  flex items-center justify-center">
          <div className="w-[85%] p-4 min-h-[200px] bg-white rounded-lg border-2 shadow-lg ">
            <h1 className="text-center font-extrabold text-blue-600 text-3xl my-4 capitalize underline">
              Incoming order
            </h1>
            <h1>O.ID-{newOrder?._id}</h1>
            <h1>U.ID-{newOrder?.userId} </h1>
            <h1>Drop-{newOrder?.dropLocation} </h1>
            <h1>Message-{newOrder?.customerMessage} </h1>
            <h1>Time: {newOrder?.orderDate} </h1>
            <div>
              <table className="w-full">
                <thead>
                  <td className="text-center py-1 px-2 border font-extrabold">
                    SL
                  </td>
                  <td className="text-center py-1 px-2 border font-extrabold">
                    Item
                  </td>
                  <td className="text-center py-1 px-2 border font-extrabold">
                    Quantity
                  </td>
                  <td className="text-center py-1 px-2 border font-extrabold">
                    Price
                  </td>
                </thead>
                <tbody>
                  {newOrder?.items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center py-1 px-2 border">
                          {index + 1}
                        </td>
                        <td className="text-center py-1 px-2 border">
                          {item.name}
                        </td>
                        <td className="text-center py-1 px-2 border">
                          {item.quantity}
                        </td>
                        <td className="text-center py-1 px-2 border">
                          {item.offerPrice * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h1>
              Amount-
              <span className="font-extrabold text-2xl mt-4">
                BDT {newOrder?.totalAmount}
              </span>
            </h1>
            <h1>
              Payment Method-
              <span className="font-extrabold text-lg mt-4">
                {newOrder?.peymentMethod}
              </span>
            </h1>

            <div className="w-full flex  mt-4 items-center justify-center gap-5">
              <button className="px-4 py-2 rounded-full text-center text-white hover:bg-red-200 bg-red-500">
                Decline
              </button>
              <button
                onClick={() => handleAcceptOrder(newOrder?._id)}
                className="px-4 py-2 rounded-full text-center text-white hover:bg-blue-800 bg-blue-500"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
