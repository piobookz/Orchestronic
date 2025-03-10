"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Typewriter from "typewriter-effect";
import { SignInButton } from "@clerk/nextjs";
import { io } from "socket.io-client";
import Image from "next/image";
import envelope from "../../public/envelope-solid.svg";

export default function HomePage() {
  const { user } = useUser();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("notification", (data) => {
      // console.log("Received notification:", data);
      setMessage(data.message);
    });

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

        {message && (
          <div className="mt-8 p-6 bg-white text-black font-semibold rounded-md">
            <div className="flex flex-row">
              <Image
                src={envelope}
                width="20"
                height="20"
                alt="envelope"
                className="mr-4"
              />
              {message}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
