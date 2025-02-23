"use client";

import logo from "../../../public/idp-logo.png";
import person from "../../../public/image.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-[#07032B] text-white p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Image
            src={logo}
            width={70}
            height="auto"
            alt="logo"
            priority="true"
            className="mr-5"
          ></Image>
          <ul className="flex flex-row space-x-6 text-center items-center">
            <Link
              href="/"
              className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
            >
              <li>Home</li>
            </Link>
            <Link
              href="/projects"
              className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
            >
              <li>Projects</li>
            </Link>
            <Link
              href="/policy"
              className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
            >
              <li>Policy</li>
            </Link>
          </ul>
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
