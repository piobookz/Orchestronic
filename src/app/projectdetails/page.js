"use client";

import gitlab from "../../../public/gitlab-logo-500.svg";
import Image from "next/image";
import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import unfilter from "../../../public/filter-circle.svg";
import filter from "../../../public/filter-circle-fill.svg";
import { useRouter } from "next/navigation";

export default function Projectdetails() {
  return (
    <div>
      {/* Details Box */}
      <div className="flex flex-row items-center">
        <h1 className="text-5xl font-bold mx-16 my-5">Todo List</h1>
        <p className="mt-2 text-lg bg-[#29B95F] px-8 py-2 rounded-full">
          Complete
        </p>
      </div>
      {/* Project Details box */}
      <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded-2xl font-normal">
        {/* subtitle */}
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold ml-4">Details</h1>
        </div>
        {/* Project name, description and source */}
        <div className="grid grid-rows-1 grid-flow-col gap-3 items-top mt-10">
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Application name</p>
            <p className="text-lg font-normal ml-16 mt-2">Todo list</p>
          </div>
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Description</p>
            <p className="text-lg font-normal ml-16 mt-2">Todo Application</p>
          </div>
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Last Update</p>
            <p className="text-lg font-normal ml-16 mt-2">Today</p>
          </div>
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Team</p>
            <p className="text-lg font-normal ml-16 mt-2">group of people</p>
          </div>
        </div>
      </div>

      {/* Cloud Resources Box */}
      <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded-2xl font-normal">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold ml-4">Cloud Resources</h1>
          <div className="flex flex-row justify-between items-center px-4">
            {/* <button
              className="text-sm text-black bg-[#E3E3E3] rounded py-3 px-5"
              // onClick={}
            >
              Configure
            </button>  */}
            <button
              className="ml-4 text-sm text-black bg-[#E3E3E3] rounded py-3 px-5"
              // onClick={}
            >
              Destroy
            </button>
          </div>
        </div>

        <div className="ml-20 mt-5">
          {/* <p className="text-xl font-semibold">Create Resource Group</p> */}
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-row">
              <p className="text-lg font-semibold w-32">Name</p>
              <p className="text-lg font-light items-center">
                TodoList-resources
              </p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">VM Size</p>
              <p className="text-lg font-light">Standard_A4m_v2</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Region</p>
              <p className="text-lg font-light">West Europe</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Admin Username</p>
              <p className="text-lg font-light">admin</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Admin Password</p>
              <p className="text-lg font-light">admin</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Operating System</p>
              <p className="text-lg font-light">Ubuntu</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">
                Private IP Allocation
              </p>
              <p className="text-lg font-light">static</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
