"use client";

import logo from "../../../public/idp-logo.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role;

  const menuItems = {
    dev: [
      { href: "/", label: "Home" },
      { href: "/projectlist", label: "Projects" },
      { href: "/policy", label: "Policy" },
    ],
    pm: [
      { href: "/", label: "Home" },
      { href: "/projectlist", label: "Projects" },
      { href: "/requestlist", label: "Request List" },
      { href: "/policy", label: "Policy" },
    ],
    ops: [
      { href: "/", label: "Home" },
      { href: "/projectlist", label: "Projects" },
      { href: "/requestlist", label: "Request List" },
      { href: "/policy", label: "Policy" },
      { href: "/manage-user", label: "Manage User" },
    ],
  };

  return (
    <nav className="bg-[#07032B] text-white p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <Image
            src={logo}
            width={70}
            height={70} // Provide explicit height for better optimization
            alt="logo"
            priority={true}
            className="mr-5"
          />
          <SignedIn>
            {userRole && (
              <ul className="flex flex-row space-x-6 text-center items-center">
                {menuItems[userRole]?.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
                  >
                    <li>{label}</li>
                  </Link>
                ))}
              </ul>
            )}
          </SignedIn>
        </div>
        <div>
          <SignedOut>
            <SignInButton
              mode="modal"
              className="font-light text-lg text-white px-4 py-2 border rounded-lg shadow-lg hover:bg-white hover:text-[#07032B] transition duration-300"
            >
              Sign In
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton className="p-2 hover:bg-[rgba(255,255,255,0.15)] rounded transition duration-300" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
