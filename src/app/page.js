"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Typewriter from "typewriter-effect";
import { SignInButton } from "@clerk/nextjs";
import { io } from "socket.io-client";
import Image from "next/image";
import envelope from "../../public/envelope-solid.svg";
import bell from "../../public/bell.png";

export default function HomePage() {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [userId, setUserId] = useState("");
  const [notificationList, setNotificationList] = useState([]);

  const fetch_notification = async (userId) => {
    try {
      const res = await fetch(`/api/notification?userId=${userId}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      setNotificationList(data);
      // console.log("Notifications:", data);
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      // console.log("Connected to WebSocket");
    });

    socket.on("notification", (data) => {
      // console.log("Received notification:", data);
      setMessage(data.message);
      setProjectName(data.projectName);
      setUserId(data.userId);
    });

    fetch_notification(user.id);
    return () => {
      socket.disconnect();
    };
  }, [user]);

  if (!user) {
    return (
      <div>
        <SignInButton
          mode="modal"
          className="font-light text-[1vw] md:text-[1vw] text-white px-4 py-2 border rounded-lg shadow-lg hover:bg-white hover:text-[#07032B] transition duration-300 absolute top-5 right-5 z-50"
        >
          Sign In
        </SignInButton>

        <div className="flex flex-col justify-center items-center h-screen w-full">
          <div>
            <span className="text-[5vw] md:text-[5vw] font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
              Welcome to Orchestronic
            </span>
            <br />
            <span className="text-[2vw] md:text-[2vw] font-extralight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Streamline your development workflow with us!")
                    .pauseFor(5500)
                    .deleteAll()
                    .start();
                }}
              />
            </span>
            <br />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="mx-16 my-5 text-center text-5xl font-bold text-white">
        Welcome Back, {user.firstName}!
      </p>
      <div className="m-16">
        <h1 className="mt-8 text-4xl font-bold text-white">Updates</h1>

        {notificationList.map(
          (notification) =>
            notification.detail &&
            notification.projectName &&
            notification.userId === user.id && (
              <div
                key={notification._id}
                className="mt-8 p-6 bg-white text-black font-semibold rounded-lg shadow-lg border-l-4 border-blue-500"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <Image
                    src={envelope}
                    width={24}
                    height={24}
                    alt="envelope"
                    className="mt-1"
                  />

                  {/* Notification Content */}
                  <div className="flex flex-col w-full">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {notification.projectName}
                    </h3>
                    <p className="mt-1 text-sm font-normal text-gray-700">
                      {notification.detail}
                    </p>

                    {/* Footer Section */}
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <p>Date: {new Date().toLocaleDateString()}</p>
                      <div className="flex items-center gap-2">
                        <Image
                          src={bell}
                          width={24}
                          height={24}
                          alt="bell"
                          className="mt-[2px]"
                        />
                        <p className="text-sm font-medium text-gray-700">
                          New Notification
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
