import logo from "@/public/idp-logo.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserAvatar from "./UserAvatar";
import { auth } from "auth";
import { SignOutButton } from "./signout-button";

export default async function Navbar() {
  const session = await auth();

  return (
    <>
      {session && session?.user ? (
        <header>
          <nav className="bg-[#07032B] text-white p-5">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row">
                <Link href={"/"} rel="preload" as="image">
                  <Image
                    src={logo}
                    width={70}
                    height="auto"
                    alt="logo"
                    priority="true"
                    className="mr-5"
                  ></Image>
                </Link>
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
              <div className="flex flex-row items-center gap-6">
                <SignOutButton />
                <Link href={"/"} className="flex flex-row items-center">
                  <UserAvatar />
                  <div className="flex flex-col">
                    <h3>
                      <b>{session.user?.name}</b>
                    </h3>
                    <p>Developer</p>
                  </div>
                </Link>
              </div>
            </div>
          </nav>
        </header>
      ) : null}
    </>
  );
}
