import React from "react";

export default function OrderCard({ order }) {
  const items = order.items;

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
        <span className="font-extrabold"> {order.paymentMethod || "COD"}</span>
      </p>
      <p className="text-sm">{order.orderDate}</p>
      <p>
        Message:
        <span>
          {order.customerMessage || (
            <div className="text-sm underline">
              'customer have no instructions'
            </div>
          )}
        </span>
      </p>

      <div className="w-full mt-4">
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
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <p>
        Amount: <span className="font-extrabold">BDT {order.totalAmount}</span>
      </p>
    </div>
  );
}
