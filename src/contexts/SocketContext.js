import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // console.log(rider)

  useEffect(() => {
    const restaurantId = Cookies.get("restaurantId");

    console.log(restaurantId);

    if (!restaurantId) return;
    const newSocket = io(process.env.REACT_APP_SOCKET_URI, {
      auth: {
        token: restaurantId,
      },
    });

    newSocket.on("connect", () => {
      console.log("Socket is connected.");
    });

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    newSocket.emit("auth", restaurantId);

    newSocket.on("connectionStatus", (data) => {
      console.log(data.status);
      if (data.status === "connected") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    });

    setSocket(newSocket);
  }, []); // Re-run effect when rider changes

  return (
    <SocketContext.Provider value={{ socket, isActive }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
