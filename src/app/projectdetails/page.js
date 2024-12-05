"use client";

import Navbar from "../components/navbar";
import gitlab from "../../../public/gitlab-logo-500.svg";
import Image from "next/image";
import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import unfilter from "../../../public/filter-circle.svg";
import filter from "../../../public/filter-circle-fill.svg";

export default function Projectdetail() {
  const [sortAsc, setSortAsc] = useState(true);

  // const TABLE_HEAD_ENV = ["Name", "Status", "Deployed Component"];

  // const TABLE_ROWS_ENV = [
  //   { name: "Development", status: "Healthy", deploy: "0" },
  //   { name: "Production", status: "Pending", deploy: "0" },
  //   { name: "Testing", status: "Failed", deploy: "1" },
  // ];

  // Custom orders for sorting
  const order1 = ["Pending", "Failed", "Healthy"];
  const order2 = ["Healthy", "Failed", "Pending"];

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev);
  };

  // Sort rows based on the selected order and direction
  // const sortedRows = [...TABLE_ROWS_ENV].sort((a, b) => {
  //   const currentOrder = sortAsc ? order1 : order2;
  //   return currentOrder.indexOf(a.status) - currentOrder.indexOf(b.status);
  // });

  const TABLE_HEAD_CR = ["Name", "Type"];

  const TABLE_ROWS_CR = [
    { name: "VM_Development", type: "Virtual Machine" },
    { name: "VM_Production", type: "Virtual Machine" },
  ];

  return (
    <div>
      <Navbar />
      <h1 className="text-5xl font-bold mx-16 my-5">Todo List</h1>
      {/* Project Details box */}
      <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded-2xl font-normal">
        {/* subtitle */}
        <div className="flex flex-row justify-between items-center">
          <p className="text-3xl font-semibold ml-4">Application Details</p>
          <button className="mr-4 text-sm text-white bg-[#29B95F] rounded py-2 px-2">
            Send Request
          </button>
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
            <p className="text-xl font-medium mx-16 mt-5">Repository</p>
            <div className="flex flex-row mx-16">
              <Image src={gitlab} width="45" height="45" alt="logo" />
              <p className="text-lg font-normal flex items-center">
                example/todo-list
              </p>
            </div>
          </div>
        </div>

        {/* Environment
        <div className="grid grid-rows-[auto,auto] grid-flow-col mt-10">
          <div className="flex flex-row items-center h-12">
            <p className="text-xl font-medium ml-16 mr-5 mt-5">Environment</p>
            <Link href="/createenvironment">
              <button className="mr-4 mt-5 text-sm text-white bg-[#0A7AFF] rounded py-1 px-8">
                Add
              </button>
            </Link>
          </div>

          {/* Environment list
          <Card className="overflow-hidden rounded-lg shadow-lg mx-16 mt-8">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD_ENV.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-gray-100 p-4 text-black font-semibold"
                    >
                      <Typography
                        variant="small"
                        className="font-medium text-sm leading-none opacity-70 flex flex-row items-center"
                        onClick={
                          head === "Status" ? toggleSortOrder : undefined
                        }
                      >
                        {head === "Status" && (
                          <span className="mr-2">
                            <Image
                              src={sortAsc ? filter : unfilter}
                              alt="filter"
                              height="20"
                              width="20"
                            />
                          </span>
                        )}
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedRows.map(({ name, status, deploy }, index) => {
                  const isOdd = index % 2 === 1;
                  const rowBgColor = isOdd ? "bg-gray-50" : "bg-white";
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
                          className={`font-normal px-2 py-1 rounded-md ${
                            status === "Healthy"
                              ? "text-green-600 bg-green-100"
                              : status === "Pending"
                              ? "text-amber-600 bg-amber-100"
                              : "text-red-600 bg-red-100"
                          }`}
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
        </div> */}

        {/* Cloud Resources */}
        <div className="grid grid-rows-[auto,auto] grid-flow-col mt-10">
          <div className="flex flex-row items-center h-12">
            <p className="text-xl font-medium ml-16 mr-5 mt-5">
              Cloud Resources
            </p>
            <Link href="/cloudresources">
              <button className="mr-4 mt-5 text-sm text-white bg-[#0A7AFF] rounded py-1 px-8">
                Add
              </button>
            </Link>
          </div>

          {/* Cloud Resource list */}
          <Card className="overflow-hidden rounded-lg shadow-lg mx-16 mt-8">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD_CR.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-gray-100 p-4 text-black font-semibold"
                    >
                      <Typography variant="small" className="font-medium">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS_CR.map(({ name, type }, index) => {
                  const isOdd = index % 2 === 1;
                  const rowBgColor = isOdd ? "bg-gray-50" : "bg-white";
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
                          {type}
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
