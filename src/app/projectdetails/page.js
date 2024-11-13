"use client";

import Navbar from "orchestronic/app/components/navbar";
import gitlab from "../../../public/gitlab-logo-500.svg";
import Image from "next/image";
import { Card, Typography } from "@material-tailwind/react";
import React from "react";

export default function Projectdetail() {
  const TABLE_HEAD = ["Name", "Status", "Deployed Component"];

  const TABLE_ROWS = [
    {
      name: "Development",
      status: "Manager",
      deploy: "0",
    },
    {
      name: "Production",
      status: "Developer",
      deploy: "0",
    },
  ];

  return (
    <div>
      <Navbar />
      <p className="text-4xl font-bold mx-16 my-5">Todo List</p>
      {/* Project Details box */}
      <div className="bg-white mx-16 mt-8 text-black text-xl rounded font-normal h-dvh">
        {/* subtitle */}
        <div className="flex flex-row justify-between items-center">
          <p className="text-2xl font-medium ml-4 mt-5">Application Details</p>
          <button className="mr-4 mt-5 text-sm text-white bg-[#29B95F] rounded py-2 px-2">
            Send Request
          </button>
        </div>
        {/* Project name, description and source */}
        <div className="grid grid-rows-1 grid-flow-col gap-3 items-top mt-5">
          <div>
            <p className="text-xl font-bold mx-16 mt-5">Application name</p>
            <p className="text-lg font-normal ml-16">Todo list</p>
          </div>
          <div>
            <p className="text-xl font-bold mx-16 mt-5">Description</p>
            <p className="text-lg font-normal ml-16">Todo Application</p>
          </div>
          <div>
            <p className="text-xl font-bold mx-16 mt-5">Repository</p>
            <div className="flex flex-row mx-16">
              <Image src={gitlab} width="45" height="45" alt="logo" />
              <p className="text-lg font-normal flex items-center">
                example/todo-list
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-2 grid-flow-col">
          <div className="flex flex-row items-center">
            <p className="text-xl font-bold ml-16 mr-5 mt-5">Environment</p>
            <button className="mr-4 mt-5 text-sm text-white bg-[#0A7AFF] rounded py-1 px-8">
              Add
            </button>
          </div>
          <Card className="overflow-hidden rounded-lg shadow-lg mx-16">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-blue-gray-700 font-semibold"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, status, deploy }, index) => {
                  const isEven = index % 2 === 0;
                  const rowBgColor = isEven ? "bg-gray-50" : "bg-white";
                  return (
                    <tr key={name} className={`${rowBgColor}`}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {status}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {deploy}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}
