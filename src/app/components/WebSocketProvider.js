"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("notification", (data) => {
      setMessage(data.message);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <WebSocketContext.Provider value={{ message }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
