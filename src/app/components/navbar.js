"use client";

import logo from "../../../public/idp-logo.png";
import person from "../../../public/image.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-[#07032B] text-white p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Link href={"/homepage"}>
            <Image
              src={logo}
              width="70"
              height="70"
              alt="logo"
              className="mr-5"
            ></Image>
          </Link>
          <ul className="flex flex-row space-x-6 text-center items-center">
            <Link
              href="/homepage"
              className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
            >
              <li>Home</li>
            </Link>
            <Link
              href="/homepage"
              className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
            >
              <li>Project</li>
            </Link>
            <Link
              href="/homepage"
              className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
            >
              <li>Policy</li>
            </Link>
          </ul>
        </div>
        <div>
          <Link href={"/homepage"} className="flex flex-row items-center">
            <Image
              src={person}
              alt="profile"
              className="h-10 w-10 rounded-full mr-4 focus:ring"
            ></Image>
            <div className="flex flex-col">
              <h3>
                <b>Alex</b>
              </h3>
              <p>Developer</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
