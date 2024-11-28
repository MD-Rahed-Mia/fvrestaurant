import React, { useState } from "react";
import { Button, Modal } from "antd";
import axiosInstance from "../../utils/AxiosInstance";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

export default function EditAddons({ addon, id }) {
  const [formData, setFormData] = useState({
    title: addon.title,
    price: addon.price,
    status: addon.status,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const response = await axiosInstance.put(
      `/menu/addon/update?addon-id=${addon._id}&id=${id}`,
      formData
    );

    console.log(await response.data);

    const data = await response.data;

    if (data.success) {
      toast.success(data.message);
      setIsModalOpen(false);
    } else {
      toast.error(data.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  }
  return (
    <div>
      {/* <Button className="px-4 py-1 bg-blue-500 text-white rounded-md">
        add addons
      </Button> */}

      <FiEdit className="cursor-pointer" onClick={showModal} />
      <Modal
        title="Edit Addons"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="addonstitle"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="title"
              value={formData.title}
              onChange={handleOnChange}
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="addonsPrice"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="price"
              value={formData.price}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="price">Status</label>
            <select
              name="status"
              id="status"
              className="w-full px-2 py-2 mt-3"
              onChange={handleOnChange}
            >
              <option value="" disabled selected>
                select status
              </option>
              <option value={true}>active</option>
              <option value={false}>disabled</option>
            </select>
          </div>

          <div>
            {/* <Button className="px-4 block mx-auto mt-4 py-1 bg-blue-500 text-white rounded-md">
              submit
            </Button> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}
