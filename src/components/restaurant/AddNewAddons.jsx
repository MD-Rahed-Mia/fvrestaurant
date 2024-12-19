import React, { useState } from "react";
import { Button, Modal } from "antd";
import axiosInstance from "../../utils/AxiosInstance";
import toast from "react-hot-toast";

export default function AddNewAddons({ id, item }) {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const response = await axiosInstance.put(
      `/menu/addon/add-new?id=${id}`,
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
      <Button
        className="px-4 py-1 bg-blue-500 text-white rounded-md"
        onClick={showModal}
      >
        add addons
      </Button>
      <Modal
        title="New Addons"
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
            {/* <Button className="px-4 block mx-auto mt-4 py-1 bg-blue-500 text-white rounded-md">
              submit
            </Button> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}
