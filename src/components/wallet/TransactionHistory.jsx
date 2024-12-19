import React from "react";
import { useState } from "react";
import { DateTime } from "luxon";

export default function TransactionHistory({ transaction }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(50);

  return (
    <div>
      <h1 className="text-center text-3xl text-gray-500 font-semibold">
        Transaction history
      </h1>

      <div>
        <table className="w-[95%] mx-auto md:w-4/5 mt-4">
          <thead>
            <tr>
              <td className="text-center border border-black font-semibold">
                SL
              </td>
              <td className="text-center border border-black font-semibold">
                Trasaction ID
              </td>
              <td className="text-center border border-black font-semibold">
                Type
              </td>
              <td className="text-center border border-black font-semibold">
                Amount
              </td>
              <td className="text-center border border-black font-semibold">
                status
              </td>
              <td className="text-center border border-black font-semibold">
                order id
              </td>
              <td className="text-center border border-black font-semibold">
                Date
              </td>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((item, index) => {
              if (limit > 100) {
                return false;
              } else {
                return (
                  <tr key={item._id}>
                    <td className="text-center border border-black text-sm  py-2 px-1">
                      {index + 1}
                    </td>
                    <td className="text-center border border-black text-sm  py-2 px-1">
                      {item._id}
                    </td>
                    <td className="text-center border border-black text-sm  py-2 px-1">
                      {item.type}
                    </td>
                    <td className="text-center border border-black text-sm  py-2 px-1">
                      {item.amount}
                    </td>
                    <td className="text-center border border-black text-sm  py-2 px-1">
                      {item.status}
                    </td>
                    <td className="text-center border border-black text-sm  py-2 px-1">
                      {item.orderId}
                    </td>
                    <td className="text-center border border-black text-sm  py-2 px-1">
                      {DateTime.fromISO(item.date, { zone: "UTC" })
                        .setZone("Asia/Dhaka")
                        .toFormat("dd MMM yyyy hh:mm a")}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
