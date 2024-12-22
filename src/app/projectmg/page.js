"use client";

import gitlab from "../../../public/gitlab-logo-500.svg";
import Image from "next/image";
import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect, use } from "react";
import unfilter from "../../../public/filter-circle.svg";
import filter from "../../../public/filter-circle-fill.svg";

export default function ProjectMG() {
  const TABLE_HEAD_CR = ["Name", "Type"];

  const [TABLE_ROWS_CR, setTableRowsCR] = useState([]);

  useEffect(() => {
    const requests = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/resource", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        //TODO: write logic to match current project
        const data = await res.json();
        // console.log(data);
        const rows = data.map((element) => ({
          id: element._id,
          name: element.vmname,
          type: element.type,
          userid: element.userid,
          projectid: element.projectid,
          status: "Pending",
        }));

        setTableRowsCR(rows);
        // console.log(data); // Logs the final state
      } catch (error) {
        console.log("Failed to send request:", error.message);
      }
    };
    requests();
  }, []);

  const [selectedButton, setSelectedButton] = useState("Pending");

  const handleChange = async (event) => {
    setSelectedButton(event);
    // console.log(event);
    const projectid = TABLE_ROWS_CR[0].projectid;

    try {
      const res = await fetch("http://localhost:3000/api/request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: event, projectid: projectid }),
      });
    } catch (error) {
      console.log("Failed to send request:", error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <p className="text-5xl font-bold ml-16 my-5">Todo List</p>
          <span
            className={`rounded-2xl px-6 py-1 mt-3 ml-8 ${
              selectedButton === "Approved"
                ? "bg-green-500"
                : selectedButton === "Rejected"
                ? "bg-red-500"
                : selectedButton === "Under Review"
                ? "bg-amber-500"
                : "bg-gray-500"
            }`}
          >
            {selectedButton}
          </span>
        </div>

        <div className="mx-16">
          <div className="flex flex-row">
            <button
              role="radio"
              onClick={() => handleChange("Approved")}
              className="ml-2 py-2 px-5 text-sm text-white rounded hover:bg-green-500 focus:bg-green-500"
            >
              Approved
            </button>
            <button
              role="radio"
              onClick={() => handleChange("Rejected")}
              className="ml-2 py-2 px-5 text-sm text-white rounded hover:bg-red-500 focus:bg-red-500"
            >
              Rejected
            </button>
            <button
              role="radio"
              onClick={() => handleChange("Under Review")}
              className="ml-2 py-2 px-5 text-sm text-white rounded hover:bg-amber-500 focus:bg-amber-500"
            >
              Under Review
            </button>
          </div>
        </div>
      </div>

      {/* Project Details box */}
      <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded font-normal">
        {/* subtitle */}
        <div className="flex flex-row justify-between items-center">
          <p className="text-3xl font-semibold ml-4">Application Details</p>
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
        {/* Cloud Resources */}
        <div className="grid grid-rows-[auto,auto] grid-flow-col mt-10">
          <div className="flex flex-row items-center h-12">
            <p className="text-xl font-medium ml-16 mr-5 mt-5">
              Cloud Resources
            </p>
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
                  // console.log(TABLE_ROWS_CR);
                  return (
                    <tr key={`${name}-${index}`} className={`${rowBgColor}`}>
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
