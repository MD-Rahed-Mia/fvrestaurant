import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/AxiosInstance";
import { useSocket } from "../../contexts/SocketContext";

export default function NewOrderCard() {
  const [isActive, setIsActive] = useState(false);

  const [newOrder, setNewOrder] = useState(null);

  const { socket } = useSocket();

  // play audio
  function playAudio() {
    const audio = new Audio("/audio/new_order_sound.wav");
    audio.play();
  }

  if (socket) {
    socket.on("receiveNewOrder", (data) => {
      setNewOrder(data);
      playAudio();
    });
  }
  // total amount
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    // Flattening the addons array
    const totalItemsValue = newOrder?.items.reduce((acc, item) => {
      return (acc += item.quantity * item.basedPrice);
    }, 0);

    // console.log(
    //   `amount is : ${totalItemsValue}, delviery: ${newOrder.deliveryAmount}, addont: ${newOrder.addonTotal}`
    // );

    setTotalAmount(totalItemsValue + Number(newOrder?.addonTotal));
  }, [newOrder]);

  // console.log(socket);

  // handle reject order
  async function handleRejectOrder(id) {
    try {
      if (!id) {
        toast.error("required order id.");
        return;
      }

      const response = await axiosInstance.put(
        `/restaurant/cancel-order-by-restaurant?order-id=${id}`
      );
      // console.log(await response.data);

      const data = await response.data;

      if (data?.success) {
        toast.success(data.message);

        // if (socket) {
        //   socket.emit("sendOrderToRider", data.result);
        // }

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

        if (socket) {
          socket.emit("sendOrderToRider", data.result);
        }

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
      {newOrder ? (
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
                BDT {totalAmount}
              </span>
            </h1>
            <h1>
              Payment Method-
              <span className="font-extrabold text-lg mt-4">
                {newOrder?.peymentMethod}
              </span>
            </h1>

            <div className="w-full flex  mt-4 items-center justify-center gap-5">
              <button
                onClick={() => handleRejectOrder(newOrder?._id)}
                className="px-4 py-2 rounded-full text-center text-white hover:bg-red-200 bg-red-500"
              >
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
