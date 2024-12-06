import React, { useState } from "react";
import Footer from "../../Layout/Footer";
import ItemPostPopup from "../menu/ItemPostPopup";
import EditMenuModal from "../menu/EditMenuModal";
import { RxCross2 } from "react-icons/rx";

import { BsThreeDots } from "react-icons/bs";
import AddNewAddons from "./AddNewAddons";
import { Button } from "antd";
import EditAddons from "./EditAddons";
import DeleteAddon from "./DeleteAddons";

export default function RestauarntMenuCard({ menu }) {
  const [editModal, setEditModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 // console.log(menu.addons);
  return (
    <>
      {/* Delivery Info Section */}
      {/* <section className="bg-white mt-28 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <svg
            className="h-6 w-6 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5} // Fixed attribute
            stroke="currentColor"
          >
            <path
              strokeLinecap="round" // Fixed attribute
              strokeLinejoin="round" // Fixed attribute
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <span className="text-lg font-semibold text-gray-800">4.7</span>
          <span className="text-sm text-gray-600">5000+ ratings</span>
        </div>
      </section> */}

      {/* Items Section */}

      {/* Item Example */}
      <div className="border bg-white relative  transition min-w-full">
        <img
          src={menu?.image || "/img/no-image.webp"}
          alt="Smokey BBQ Chicken Cheese Burger"
          className="w-full block mx-auto max-w-48 object-cover rounded-md"
        />

        <div className="absolute text-black top-4 right-4 ">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <RxCross2 /> : <BsThreeDots />}
          </button>
        </div>

        {/* menus */}
        <div>
          {isMenuOpen ? (
            <MenuCardMenu
              item={menu}
              editModal={editModal}
              setEditModal={setEditModal}
            />
          ) : null}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 mx-2 mt-2">
          {menu?.name}
        </h3>
        <div className="flex items-center flex-col justify-between">
          <p className="text-gray-600 mx-2 my-1">
            Price {menu?.basedPrice || menu?.basePrice}TK
          </p>
          <p className="text-gray-600 mx-2 my-1">Category: {menu?.category}</p>
          <p className="text-gray-600 mx-2 my-1">Cuisine: {menu?.cuisine}</p>

          <div className="flex flex-row items-center">
            <svg
              className="h-5 w-5 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5} // Fixed attribute
              stroke="currentColor"
            >
              <path
                strokeLinecap="round" // Fixed attribute
                strokeLinejoin="round" // Fixed attribute
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span className="px-2 font-bold text-gray-700">4.7</span>
          </div>
        </div>

        {/* addons here */}
        {menu?.addons.length > 0 ? <MenuAddons menu={menu} /> : null}
      </div>

      {/* Repeat more items as needed */}

      {editModal ? (
        <EditMenuModal
          menu={menu}
          setEditModal={setEditModal}
          editModal={editModal}
        />
      ) : null}

      <Footer />
    </>
  );
}

const MenuCardMenu = ({ item, editModal, setEditModal }) => {
  return (
    <>
      <div className="p-4 border-2 shadow-md absolute top-10 right-4 rounded-md bg-white">
        <ul>
          <Button
            onClick={() => setEditModal(!editModal)}
            className="px-4 my-2 py-1 w-full bg-blue-500 text-white rounded-md"
          >
            Edit menu
          </Button>
          <li>
            <AddNewAddons id={item._id} />
          </li>
        </ul>
      </div>
    </>
  );
};

const MenuAddons = ({ menu }) => {
  return (
    <div>
      <label htmlFor="addons" className="px-4 p-2 text-lg ">
        Addons list
      </label>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <td className="border px-2 py-1">SL</td>
              <td className="border px-2 py-1">Title</td>
              <td className="border px-2 py-1">Price</td>
              <td className="border px-2 py-1">status</td>
              <td className="border px-2 py-1">action</td>
            </tr>
          </thead>
          {menu?.addons.length > 0
            ? menu?.addons.map((item, index) => {
                return (
                  <tr>
                    <td className="border px-2 py-1">{index + 1}</td>
                    <td className="border px-2 py-1">{item.title}</td>
                    <td className="border px-2 py-1">{item.price}</td>
                    <td className="border px-2 py-1">
                      {item.status ? (
                        <span className="px-1 py-1 bg-blue-300 text-[12px]">
                          active
                        </span>
                      ) : (
                        <span className="px-1 py-1 bg-orange-300 text-[12px]">
                          disabled
                        </span>
                      )}
                    </td>
                    <td className="border px-2 py-1">
                      <div className="flex items-center justify-center gap-3">
                      <EditAddons addon={item} id={menu._id} />
                      <DeleteAddon addon={item} id={menu._id} />
                      </div>
                    </td>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
    </div>
  );
};
