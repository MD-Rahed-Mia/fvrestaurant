import React, { useState } from "react";
import { Button, Modal } from "antd";
import axiosInstance from "../../utils/AxiosInstance";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";

export default function DeleteAddon({ addon, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const response = await axiosInstance.delete(
      `/menu/addon/delete?addon-id=${addon._id}&id=${id}`
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

  return (
    <div>
      {/* <Button className="px-4 py-1 bg-blue-500 text-white rounded-md">
        add addons
      </Button> */}
      <AiFillDelete className="cursor-pointer" onClick={showModal} />
      <Modal
        title="Delete Addons"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <h1>Delete addons</h1>
        </div>
      </Modal>
    </div>
  );
}
