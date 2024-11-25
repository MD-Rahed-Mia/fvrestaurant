import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SocketContext = createContext(null);

const socketUri = "http://localhost:3000";

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const user = Cookies.get("user");

  useEffect(() => {
    // token
    const token = localStorage.getItem("token");
    const socketInstance = io(socketUri, {
      auth: {
        tokon: token,
      },
    });

    socketInstance.on("connect", () => {
      console.log("user is connected.");
    });
    
    socketInstance.emit("auth", user);

    setSocket(socketInstance);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
