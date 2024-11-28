import React from "react";

export default function MenuCard({ detail }) {
  console.log("addons: : ", detail?.addons);

  return (
    <div className="bg-white relative p-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition">
      <img
        src={detail?.image || "/img/burger.png"}
        alt={detail?.name}
        className="w-32 mx-auto block my-2 h-32 sm:h-48 object-cover rounded-md"
      />

      {/* sub menu */}

      <h3 className="text-sm font-semibold text-gray-800 mx-2 mt-2">
        {detail?.name}
      </h3>
      <div>
        <span className="px-2 py-1 rounded-sm bg-orange-100 my-2 inline-block">
          {detail?.category}
        </span>
      </div>
      <div className="flex items-center justify-between px-2">
        <p className="line-through text-orange-500 text-sm">
          TK {detail?.basedPrice}
        </p>
        <p className="text-gray-600 my-1 font-extrabold">
          TK {detail?.offerPrice}
        </p>

        {/* <div className="flex items-center justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-500 "
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="px-2 font-bold text-gray-700 ">4.3</p>
        </div> */}
      </div>
      <div>
        <button className="px-3 py-1 bg-blue-600 text-white mx-auto block my-4 rounded-sm">
          add to cart
        </button>
      </div>
    </div>
  );
}
