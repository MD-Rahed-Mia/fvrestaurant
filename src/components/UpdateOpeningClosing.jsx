import React, { useState } from 'react';
import { Modal, TimePicker, Button } from 'antd';
import Cookies from "js-cookie";
import dayjs from 'dayjs';
import axios from 'axios';
import { api_path_url, authToken } from '../secret';
import toast from "react-hot-toast"


export default function UpdateOpeningClosing({ setOpeningTime, openingTime, restaurantId }) {

    const [timer, setTimer] = useState({
        openingTime: "",
        closingTime: ""
    });

    const handleOpeningTime = (time, timeString) => {
        setTimer((prev) => ({ ...prev, openingTime: timeString }));
    };

    const handleClosingTime = (time, timeString) => {
        setTimer((prev) => ({ ...prev, closingTime: timeString }));
    };

    const showModal = () => {
        setOpeningTime(true);
    };

    const handleOk = async () => {

        const restaurantId = Cookies.get("restaurantId");


        // Send the updated times to the backend API
        try {
            const response = await axios.put(`${api_path_url}/restaurant/update-time`, {
                restaurantId,
                openingTime: timer.openingTime,
                closingTime: timer.closingTime
            }, {
                headers: {
                    "x-auth-token": authToken
                }
            });

            console.log(response.data.message);
            toast.success(response.data.message)
            setOpeningTime(false);  
        } catch (error) {
            console.error("Error updating times:", error);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };

    const handleCancel = () => {
        setOpeningTime(false);
    };

    return (
        <div>
            <Modal
                title="Update Restaurant Time"
                open={openingTime}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <label className="pr-4 inline-block">Opening time</label>
                    <TimePicker
                        className="px-4"
                        onChange={handleOpeningTime}
                        defaultOpenValue={dayjs("00:00:00", "HH:mm")}
                        format="h:mm a"
                    />
                </div>
                <br />
                <div>
                    <label className="pr-4 inline-block">Closing time</label>
                    <TimePicker
                        className="px-4"
                        onChange={handleClosingTime}
                        defaultOpenValue={dayjs("00:00:00", "HH:mm")}
                        format="h:mm a"
                    />
                </div>
            </Modal>
        </div>
    );
}
