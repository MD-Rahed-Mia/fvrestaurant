import React from "react";
import { useState } from "react";
import { useSocket } from "../../contexts/SocketContext";
import { useEffect } from "react";

export default function ToasterNotifation() {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState(null);

  const { socket } = useSocket();

  //   play audio
  function playNotificationSound() {
    const audio = new Audio("/audio/audio.mp3");
    audio.play();
  }

  useEffect(() => {
    if (socket) {
      socket.on("notifyRestaurantRiderAccept", (data) => {
        setShowModal(true);
        setModalText(`rider accept your order.`);
        playNotificationSound();
      });

      socket.on("riderPickupOrder", (data) => {
        setShowModal(true);
        setModalText(`rider pickup order.`);
        playNotificationSound();
      });

      socket.on("riderDropParcel", (data) => {
        setShowModal(true);
        setModalText(`rider pickup order.`);
        playNotificationSound();
      });
    }
  }, [socket]);

  useEffect(() => {
    if (showModal) {
      setInterval(() => {
        setShowModal(false);
      }, 10000);
    }
  }, [showModal]);

  return (
    <>
      {showModal ? (
        <div className="fixed min-w-40 top-4 z-50 right-3 bg-white border p-4 shadow-lg">
          {modalText}
        </div>
      ) : null}
    </>
  );
}
