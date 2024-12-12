import React from "react";
import { Link } from "react-router-dom";

export default function ChattingListCard({ item }) {
  return (
    <Link
      to={`/live-chat/${item._id}/${item.userId}`}
      className="w-full inline-block py-2 px-3 shadow-lg border rounded-md cursor-pointer"
    >
      {item.customerPhone}
    </Link>
  );
}
