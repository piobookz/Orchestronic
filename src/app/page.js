"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
//import azure from "../../public/new-azure-logo.png";
// import gitlab from "../../public/gitlab-logo.png";
// import orchestronic from "../../public/idp-logo.png";
// import Navbar from "../app/components/navbar";
// import Image from "next/image";
// import { Toaster } from "react-hot-toast";
// import Typewriter from "typewriter-effect";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function HomePage() {
  const { user } = useUser();

  // If the user is signed out, show the homepage and sign-in options
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

        {/* About section
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-[20vw] rounded-xl">
          <span className="text-4xl md:text-5xl font-semibold text-white">
            About
          </span>
          <p className="text-lg md:text-xl font-light text-white text-center mx-5">
            Orchestronic is a platform provisioning infrastructure that
            automatically provisions and configures your development
            environments. It is designed to streamline your development workflow
            by providing you with the tools you need to get started quickly.
          </p>
        </div>
        Features section
        <h1 className="text-4xl md:text-5xl font-semibold text-white text-center">
          Features
        </h1>
        <div className="grid grid-cols-3 md:grid-rows-1 gap-[20vw] mt-10 mx-5">
          <div className="relative group">
            <div className="flex flex-col justify-center items-center">
              <Image src={gitlab} height={178} width={178} alt="Gitlab logo" />
              <span className="font-semibold text-lg mt-2">GITLAB</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-8 rounded-xl">
              <p className="font-semibold">Description of Step 1</p>
            </div>
          </div>

          <div className="relative group">
            <div className="flex flex-col justify-center items-center">
              <Image
                src={orchestronic}
                height={250}
                width={250}
                alt="Orchestronic logo"
              />
              <span className="font-semibold text-lg mt-2">ORCHESTRONIC</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-8 rounded-xl">
              <p className="font-semibold">Description of Step 2</p>
            </div>
          </div>

          <div className="relative group">
            <div className="flex flex-col justify-center items-center">
              <Image src={azure} height={200} width={200} alt="Azure logo" />
              <span className="font-semibold text-lg mt-2">AZURE</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-8 rounded-xl">
              <p className="font-semibold">Description of Step 3</p>
            </div>
          </div>
        </div> */}
      </div>
    );
  }

  // If the user is signed in, show a welcome message
  return (
    <>
      <p className="mx-16 my-5 text-center text-5xl font-bold text-white">
        Welcome Back, {user.firstName}!
      </p>
      <h1 className="mx-16 my-5 text-4xl font-bold text-white">Updates</h1>
    </>
  );
}
