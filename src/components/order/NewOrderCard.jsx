import React, { useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketContext";

export default function NewOrderCard() {
  const socket = useSocket();

  const [newOrder, setNewOrder] = useState(null);

//  console.log(socket);

  useEffect(() => {
    if (socket) {


      


      socket.on("receiveNewOrder", (data) => {
        console.log(data);
      });
    }
  }, []);

  return (
    <div className="fixed h-screen w-full bg-[#00000062] z-50  flex items-center justify-center">
      <div className="w-[85%] p-4 min-h-[200px] bg-white rounded-lg border-2 shadow-lg ">
        <h1 className="text-center font-extrabold text-blue-600 text-3xl my-4 capitalize underline">
          Incoming order
        </h1>
        <h1>O.ID-skdlfsdalfdsa</h1>
        <h1>U.ID-kds032sd0dskjf032d</h1>
        <h1>Drop-lsdfas sdksl dkdkf</h1>
        <h1>Message-kdsf kdsfl fdsflksda f </h1>
        <h1>Time: time</h1>
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
              <tr>
                <td className="text-center py-1 px-2 border">1</td>
                <td className="text-center py-1 px-2 border">
                  Burger with chesse
                </td>
                <td className="text-center py-1 px-2 border">3</td>
                <td className="text-center py-1 px-2 border">420</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h1>
          Amount-<span className="font-extrabold text-2xl mt-4">BDT 120</span>
        </h1>

        <div className="w-full flex  mt-4 items-center justify-center gap-5">
          <button className="px-4 py-2 rounded-full text-center text-white hover:bg-red-200 bg-red-500">
            Decline
          </button>
          <button className="px-4 py-2 rounded-full text-center text-white hover:bg-blue-800 bg-blue-500">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
