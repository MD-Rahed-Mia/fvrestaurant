import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import CategoryList from "./CategoryList";

export default function ItemPostPopup({ setEditModal }) {
  // loading
  const [postLoading, setPostLoading] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    cuisine: "",
    basedPrice: "",
    status: "in stock",
    preparationTime: "",
    isVeg: true,
    image: null,
    addonsTitle: "",
    addonsPrice: 0,
  });

  function handleOnChange(e) {
    const { name, value } = e.target;

    if (e.target.files) {
      console.log("image found");
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    console.log(formData);
  }

  // handle form submission
  async function handleAddMenu(e) {
    e.preventDefault();

    const restaurantId = Cookies.get("restaurantId");

    if (!restaurantId) {
      toast.error("Restaurant Id not found.");
      return false;
    }

    // Validate that required fields are filled
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.cuisine ||
      !formData.image
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    try {
      // set loading
      setPostLoading(true);

      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("cuisine", formData.cuisine);
      form.append("basedPrice", formData.basedPrice);
      form.append("discountRate", formData.discountRate);
      form.append("status", formData.status);
      form.append("preparationTime", formData.preparationTime);
      form.append("isVeg", formData.isVeg);
      form.append("restaurantId", restaurantId);
      form.append("addonsTitle", formData.addonsTitle);
      form.append("addonsPrice", formData.addonsPrice);

      if (formData.image) {
        form.append("image", formData.image);
      } else {
        toast.error("No image found");
      }
      //

      const response = await axiosInstance.post("/menu/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        setEditModal(false);
        setPostLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error posting item:", error);
      toast.error("Failed to post item.");
      setPostLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg p-4 shadow-lg overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Post New Item</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setEditModal(false)}
          >
            &times;
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleAddMenu}
          encType="multipart/form-data"
        >
          {/* Item Image */}
          <label className="block">
            <span className="text-gray-700 font-bold">Item Image</span>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full border rounded-md p-2"
              name="image"
              onChange={handleOnChange}
            />
          </label>

          {/* Item Name */}
          <label className="block">
            <span className="text-gray-700">Item Name</span>
            <input
              type="text"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="e.g., Chicken Burger"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              required
            />
          </label>

          {/* Item Description */}
          <label className="block">
            <span className="text-gray-700">Item Description</span>
            <textarea
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Describe the main ingredients and special features"
              name="description"
              value={formData.description}
              onChange={handleOnChange}
              required
            ></textarea>
          </label>

          {/* Category */}
          <label className="block">
            <span className="text-gray-700">Category</span>
            {/* <select
              className="mt-1 block w-full border rounded-md p-2"
              name="category"
              value={formData.category}
              onChange={handleOnChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="appetizer">Appetizer</option>
              <option value="main-course">Main Course</option>
              <option value="dessert">Dessert</option>
            </select> */}

            <CategoryList
              handleOnChange={handleOnChange}
              categoryValue={formData}
            />
          </label>

          {/* Cuisine */}
          <label className="block">
            <span className="text-gray-700">Cuisine</span>
            <select
              className="mt-1 block w-full border rounded-md p-2"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleOnChange}
            >
              <option value="" disabled>
                Select Cuisine
              </option>
              <option value="bengali">Bengali</option>
              <option value="chineese">Chinese</option>
              <option value="indian">Indian</option>
            </select>
          </label>

          {/* Price */}
          <label className="block">
            <span className="text-gray-700">Price</span>
            <input
              type="text"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="e.g., 240"
              name="basedPrice"
              value={formData.basedPrice}
              onChange={handleOnChange}
            />
          </label>

          {/* Discount Rate
          <label className="block">
            <span className="text-gray-700">Discount Rate</span>
            <input
              type="number"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="e.g., 0-100%"
              name="discountRate"
              value={formData.discountRate}
              onChange={handleOnChange}
            />
          </label> */}

          {/* Availability Status */}
          <label className="block">
            <span className="text-gray-700">Availability Status</span>
            <select
              className="mt-1 block w-full border rounded-md p-2"
              name="status"
              value={formData.status}
              onChange={handleOnChange}
            >
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </label>

          {/* Preparation Time */}
          <label className="block">
            <span className="text-gray-700">Preparation Time (minutes)</span>
            <input
              type="number"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="e.g., 15-20"
              name="preparationTime"
              value={formData.preparationTime}
              onChange={handleOnChange}
            />
          </label>

          {/* Veg/Non-Veg */}
          <label className="block">
            <span className="text-gray-700">Veg/Non-Veg</span>
            <select
              className="mt-1 block w-full border rounded-md p-2"
              name="isVeg"
              value={formData.isVeg}
              onChange={handleOnChange}
            >
              <option value={true}>Vegetarian</option>
              <option value={false}>Non-Vegetarian</option>
            </select>
          </label>

          {/* Veg/Non-Veg */}
          {/* <label className="block">
            <span className="text-gray-700">Addons</span>
            <select
              className="mt-1 block w-full border rounded-md p-2"
              name="isVeg"
              value={formData.isVeg}
              onChange={handleOnChange}
            >
              <option value={true}>Vegetarian</option>
              <option value={false}>Non-Vegetarian</option>
            </select>
          </label> */}

          {/* addons */}
          <div>
            <label htmlFor="addons">Addons</label>
            <div>
              <input
                type="text"
                name="addonsTitle"
                id="addonsTitle"
                placeholder="addons title"
                className="mt-1 block w-full border rounded-md p-2"
                value={formData.addonsTitle}
                onChange={handleOnChange}
              />

              <input
                type="number"
                name="addonsPrice"
                id="addonsPrice"
                placeholder="price"
                className="mt-1 block w-full border rounded-md p-2"
                value={formData.addonsPrice}
                onChange={handleOnChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={postLoading}
            className="w-full disabled:cursor-not-allowed disabled:bg-gray-400 bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600"
          >
            Post Item
          </button>
        </form>
      </div>
    </div>
  );
}
