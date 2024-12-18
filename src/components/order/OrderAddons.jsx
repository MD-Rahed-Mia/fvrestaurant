import React from "react";

export default function OrderAddons({ item, index }) {
  return (
    <tr className=" text-center  text-sm border px-2" key={index}>
      <td className=" text-center  text-sm border px-4">{index + 1}</td>
      <td className=" text-center  text-sm  border">{item.title}</td>
      <td className=" text-center  text-sm border">{item.quantity}</td>
      <td className=" text-center  text-sm border">{item.price}</td>
      <td className=" text-center  text-sm border  px-4">{item.quantity * item.price}</td>
    </tr>
  );
}
