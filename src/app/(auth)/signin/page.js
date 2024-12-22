"use client";

import Image from "next/image";
import logo from "../../../public/idp-logo.png";
import gitlab from "../../../public/gitlab-logo-500.svg";

export default function Signin() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Orchestronic Logo */}
      <div className="m-4 flex items-center gap-2">
        <Image src={logo} width="70" height="70" alt="Orchestronic logo" />
        <span className="text-xl font-bold text-gray-200">Orchestronic</span>
      </div>

      {/* Sign in Button */}
      <div className="flex flex-grow flex-row items-center justify-center">
        <button className="inline-flex items-center rounded-lg bg-slate-700 px-10 py-3 text-lg font-medium text-white shadow-md duration-300 hover:scale-105 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-500">
          <span className="pl-3">Sign in with GitLab</span>
          <Image src={gitlab} width="45" height="45" alt="GitLab logo" />
        </button>
      </div>
    </div>
  );
}
