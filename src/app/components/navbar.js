"use client";

import logo from "../../../public/idp-logo.png";
import person from "../../../public/image.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#07032B] text-white p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Link href={"/homepage"}>
            <Image src={logo} width="60" height="60" className="mr-5"></Image>
          </Link>
          <ul className="flex flex-row space-x-10 text-center items-center">
            <Link href={"/homepage"} className="">
              <li>Home</li>
            </Link>
            <Link href={"/homepage"} className="">
              <li>Project</li>
            </Link>
            <Link href={"/homepage"} className="">
              <li>Policy</li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-row">
          <Image
            src={person}
            width="60"
            height="60"
            className="mr-5 rounded-full"
          ></Image>
          <div className="flex flex-col">
            <h4>Alex</h4>
            <p>Developer</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
