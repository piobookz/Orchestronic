"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import bell from "../../../public/bell.png";
import { useAuth } from "@clerk/nextjs";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const { userId } = useAuth(); // Get user ID from Clerk
  const [message, setMessage] = useState("");
  const [projectName, setProjectName] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return; // Wait until user is available

    if (!socketRef.current) {
      // console.log("🔗 Connecting to WebSocket...");
      socketRef.current = io("http://localhost:4000", {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 5000,
      });

      socketRef.current.on("connect", () => {
        // console.log("✅ WebSocket connected");
      });

      socketRef.current.on("disconnect", (reason) => {
        // console.log(`⚠️ WebSocket disconnected: ${reason}`);
      });

      socketRef.current.on("notification", (data) => {
        if (userId === data.userId) {
          setMessage(data.message);
          setProjectName(data.projectName);

          fetch(
            `/api/notification?projectName=${data.projectName}&detail=${data.message}&userId=${data.userId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((result) => console.log("Project saved:", result))
            .catch((error) => console.error("Error saving project:", error));

          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <Image
                      src={bell}
                      width={24}
                      height={24}
                      alt="bell"
                      className="mt-[2px]"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {"New Notification"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {data.projectName} Project
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{data.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        }
      });
    }

    return () => {
      if (socketRef.current) {
        // console.log("❌ Disconnecting WebSocket...");
        socketRef.current.disconnect(); // Properly disconnect
        socketRef.current = null; // Reset reference
      }
    };
  }, [userId]); // Depend on userId

  return (
    <WebSocketContext.Provider value={{ message, projectName }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
