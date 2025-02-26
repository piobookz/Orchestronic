"use client";

import gitlab from "../../../../public/gitlab-logo-500.svg";
import Image from "next/image";
import Link from "next/link";
import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useProvider } from "../../components/ConText";

export default function RequestResource() {
  const [project, setProject] = useState(null);
  const data = useProvider();
  const [TABLE_ROWS_CR, setTableRowsCR] = useState([]);
  const router = useRouter();
  const projectName = data?.projectData?.projectName;
  const projectDescription = data?.projectData?.projectDescription;
  const pathWithNamespace = data?.projectData?.pathWithNamespace;

  useEffect(() => {
    console.log("projectDetails", data?.projectData);
    console.log("projectName", projectName);
    console.log("projectDescription", projectDescription);
    console.log("pathWithNamespace", pathWithNamespace);
    const fetchResources = async () => {
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

        const data = await res.json();
        const rows = data.map((element) => ({
          id: element._id,
          name: element.vmname,
          type: element.type,
          userid: element.userid,
          projectid: element.projectid,
          statuspm: "Pending",
          statusops: "Pending",
        }));
        setTableRowsCR(rows);
      } catch (error) {
        console.log("Failed to fetch resources:", error.message);
      }
    };

    fetchResources();
  }, [project]);

  const handleRequest = async () => {
    toast.success("Request sent successfully");

    try {
      const res = await fetch("http://localhost:3000/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TABLE_ROWS_CR),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      } else {
        router.push("/projectlist");
      }
    } catch (error) {
      console.log("Error while saving request:", error.message);
    }
  };

  if (!data.projectData) {
    return <p>Loading project details...</p>;
  }

  return (
    <div>
      <h1 className="text-5xl font-bold mx-16 my-5">Todo List</h1>
      <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded-2xl font-normal">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold ml-4">Application Details</h1>
          <button
            className="mr-4 text-sm text-white bg-[#29B95F] rounded py-2 px-2"
            onClick={handleRequest}
          >
            Send Request
          </button>
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-3 items-top mt-10">
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Application name</p>
            <p className="text-lg font-normal ml-16 mt-2">{projectName}</p>
          </div>
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Description</p>
            <p className="text-lg font-normal ml-16 mt-2">
              {projectDescription}
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Repository</p>
            <div className="flex flex-row mx-16">
              <Image src={gitlab} width="45" height="45" alt="logo" />
              <p className="text-lg font-normal flex items-center">
                {pathWithNamespace}
              </p>
            </div>
          </div>
        </div>

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

          <Card className="overflow-hidden rounded-lg shadow-lg mx-16 mt-8">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-gray-100 p-4 text-black font-semibold">
                    Name
                  </th>
                  <th className="border-b border-blue-gray-100 bg-gray-100 p-4 text-black font-semibold">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS_CR.map(({ id, name, type }, index) => {
                  const isOdd = index % 2 === 1;
                  const rowBgColor = isOdd ? "bg-gray-50" : "bg-white";
                  return (
                    <tr key={id} className={`${rowBgColor} cursor-pointer`}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Link href={`/requestresource/${id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </Link>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Link href={`/requestresource/${id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {type}
                          </Typography>
                        </Link>
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
