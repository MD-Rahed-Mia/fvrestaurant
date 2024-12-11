import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function EditMenuModal({ menu, setEditModal, editModal }) {
  const [formData, setFormData] = useState({
    name: menu.name,
    description: menu.description,
    category: menu.category,
    cuisine: menu.cuisine,
    basedPrice: menu.basedPrice,
    status: menu.status,
    preparationTime: menu.preparationTime,
    isVeg: menu.isVeg,
    image: null, // Assume this is the URL or base64 string from the DB initially
  });

  // Handling input changes
  function handleOnChange(e) {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      // Update image as a file if selected
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      // Update text input values
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  // Handle form submission
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
      !formData.cuisine
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    // Initialize FormData object
    const form = new FormData();

    // Append other form fields
    Object.keys(formData).forEach((key) => {
      // Don't append the image here if it's a file
      if (key === "image" && formData[key]) {
        form.append(key, formData[key]); // Append file correctly
      } else {
        form.append(key, formData[key]); // Append text fields
      }
    });

    // Append restaurantId
    form.append("restaurantId", restaurantId);

    try {
      const response = await axiosInstance.put(
        `/menu/update-menu?id=${menu._id}`,
        form,
        {
          headers: {
            "Content-Type": "form-data/multipart", // Ensure the content type is multipart/form-data
          },
        },
      );

      console.log(response);
      toast.success("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item.");
    }
  }

  useEffect(() => {
    console.log("Form data:", formData); // For debugging
  }, [formData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg p-4 shadow-lg overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Post New Item</h2>
          <button
            onClick={() => setEditModal(!editModal)}
            className="text-gray-500 hover:text-gray-700"
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
            <select
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
            </select>
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
              type="number"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="e.g., 240"
              name="basedPrice"
              value={formData.basedPrice}
              onChange={handleOnChange}
            />
          </label>

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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600"
          >
            Post Item
          </button>
        </form>
      </div>
    </div>
  );
}
