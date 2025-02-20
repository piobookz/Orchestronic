"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RequestDetails({ params }) {
  const [requestId, setRequestId] = useState(null);
  const router = useRouter();
  const [resourceName, setResourceName] = useState("");
  const [region, setRegion] = useState("");
  const [os, setOS] = useState("");
  const [adminUser, setAdminUser] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [vmSize, setVMSize] = useState("");
  const [allocation, setAllocation] = useState("");
  const [alert, setAlert] = useState("");
  const [userID, setUserID] = useState("12345");
  const [type, setType] = useState("Virtual Machine");

  const regions = [
    {
      title: "Asia-Pacific",
      options: [{ value: "East Asia", label: "East Asia" }],
    },
    {
      title: "United States",
      options: [
        { value: "East US", label: "East US" },
        { value: "East US 2", label: "East US 2" },
        { value: "North Central US", label: "North Central US" },
        { value: "West US 2", label: "West US 2" },
        { value: "West US 3", label: "West US 3" },
      ],
    },
    {
      title: "Europe",
      options: [
        { value: "North Europe (Ireland)", label: "North Europe (Ireland)" },
      ],
    },
    {
      title: "France",
      options: [{ value: "France Central", label: "France Central" }],
    },
    {
      title: "Germany",
      options: [
        { value: "Germany West Central", label: "Germany West Central" },
      ],
    },
  ];

  const vmSizeOptions = [
    {
      title: "Family A (Av2-series)",
      options: [
        {
          value: "Standard_A1_v2",
          label: "Standard_A1_v2",
          cpu: "1",
          memory: "2GB",
        },
        {
          value: "Standard_A2_v2",
          label: "Standard_A2_v2",
          cpu: "2",
          memory: "4GB",
        },
        {
          value: "Standard_A4_v2",
          label: "Standard_A4_v2",
          cpu: "4",
          memory: "8GB",
        },
        {
          value: "Standard_A8_v2",
          label: "Standard_A8_v2",
          cpu: "8",
          memory: "16GB",
        },
        {
          value: "Standard_A2m_v2",
          label: "Standard_A2m_v2",
          cpu: "2",
          memory: "16GB",
        },
        {
          value: "Standard_A4m_v2",
          label: "Standard_A4m_v2",
          cpu: "4",
          memory: "32GB",
        },
        {
          value: "Standard_A8m_v2",
          label: "Standard_A8m_v2",
          cpu: "8",
          memory: "64GB",
        },
      ],
    },
    {
      title: "Family B (Basv2-series)",
      options: [
        {
          value: "Standard_B2ts_v2",
          label: "Standard_B2ts_v2",
          cpu: "2",
          memory: "1GB",
        },
        {
          value: "Standard_B2ls_v2",
          label: "Standard_B2ls_v2",
          cpu: "2",
          memory: "4GB",
        },
        {
          value: "Standard_B2s_v2",
          label: "Standard_B2s_v2",
          cpu: "2",
          memory: "8GB",
        },
        {
          value: "Standard_B4ls_v2",
          label: "Standard_B4ls_v2",
          cpu: "4",
          memory: "8GB",
        },
        {
          value: "Standard_B4s_v2",
          label: "Standard_B4s_v2",
          cpu: "4",
          memory: "16GB",
        },
        {
          value: "Standard_B8ls_v2",
          label: "Standard_B8ls_v2",
          cpu: "8",
          memory: "16GB",
        },
        {
          value: "Standard_B8s_v2",
          label: "Standard_B8s_v2",
          cpu: "8",
          memory: "32GB",
        },
        {
          value: "Standard_B16ls_v2",
          label: "Standard_B16ls_v2",
          cpu: "16",
          memory: "32GB",
        },
        {
          value: "Standard_B16s_v2",
          label: "Standard_B16s_v2",
          cpu: "16",
          memory: "64GB",
        },
        {
          value: "Standard_B32ls_v2",
          label: "Standard_B32ls_v2",
          cpu: "32",
          memory: "64GB",
        },
        {
          value: "Standard_B32s_v2",
          label: "Standard_B32s_v2",
          cpu: "32",
          memory: "128GB",
        },
      ],
    },
    {
      title: "Family D (Dsv6 sizes)",
      options: [
        {
          value: "Standard_D2s_v6",
          label: "Standard_D2s_v6",
          cpu: "2",
          memory: "8GB",
        },
        {
          value: "Standard_D4s_v6",
          label: "Standard_D4s_v6",
          cpu: "4",
          memory: "16GB",
        },
        {
          value: "Standard_D8s_v6",
          label: "Standard_D8s_v6",
          cpu: "8",
          memory: "32GB",
        },
        {
          value: "Standard_D16s_v6",
          label: "Standard_D16s_v6",
          cpu: "16",
          memory: "64GB",
        },
        {
          value: "Standard_D32s_v6",
          label: "Standard_D32s_v6",
          cpu: "32",
          memory: "128GB",
        },
        {
          value: "Standard_D48s_v6",
          label: "Standard_D48s_v6",
          cpu: "48",
          memory: "192GB",
        },
        {
          value: "Standard_D64s_v6",
          label: "Standard_D64s_v6",
          cpu: "64",
          memory: "256GB",
        },
        {
          value: "Standard_D96s_v6",
          label: "Standard_D96s_v6",
          cpu: "96",
          memory: "384GB",
        },
        {
          value: "Standard_D128s_v6",
          label: "Standard_D128s_v6",
          cpu: "128",
          memory: "512GB",
        },
      ],
    },
  ];

  useEffect(() => {
    params.then((resolvedParams) => {
      setRequestId(resolvedParams.requestId);
    });
  }, [params]);

  useEffect(() => {
    if (requestId) {
      fetchResource();
    }
  }, [requestId]);

  const fetchResource = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/resource/?requestId=${requestId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch resource: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.length > 0) {
        const resource = data[0];
        setResourceName(resource.vmname);
        setRegion(resource.region);
        setOS(resource.os);
        setAdminUser(resource.username);
        setAdminPassword(resource.password);
        setVMSize(resource.vmsize);
        setAllocation(resource.allocationip);
        setUserID(resource.userid);
        setType(resource.type);
      }

      //   console.log(
      //     "Resource data fetched successfully:",
      //     resourceName,
      //     region,
      //     os,
      //     adminUser,
      //     adminPassword,
      //     vmSize,
      //     allocation,
      //     userID,
      //     type
      //   );
    } catch (error) {
      console.log("Error while fetching resource data:", error);
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="mx-16 my-6">
        <h1 className="text-4xl font-bold">Create Cloud Resource</h1>
        <h2 className="text-lg text-gray-400 ml-1 mt-4">
          Create Cloud Resource → Todo List
        </h2>
      </div>
      {alert && (
        <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md ml-16">
          {alert}
        </div>
      )}
      {/* Form Container */}
      <div className="bg-white text-black mx-16 my-8 p-8 rounded-lg shadow-lg">
        {/* Section Title */}
        <h2 className="text-2xl font-semibold mb-6">Required Details</h2>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-8">
          {/* Cloud Provider */}
          <div>
            <label htmlFor="cloudProvider" className="font-medium block mb-2">
              Cloud Provider
            </label>
            <div className="flex items-center space-x-2 ml-2">
              {/* <Image src={Azure} width={84} height={"auto"} alt="Azure Logo" /> */}
            </div>
          </div>

          {/* Resource Type */}
          <div>
            <label htmlFor="resourceType" className="font-medium block mb-2">
              Resource Type
            </label>
            <p>{type}</p>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="font-medium block mb-2">
              Name
            </label>
            <p>{resourceName}</p>
          </div>

          {/* Region */}
          <div>
            <label htmlFor="region" className="font-medium block mb-2">
              Region
            </label>
            <p>{region}</p>
          </div>

          {/* VM Size */}
          <div>
            <label htmlFor="vmSize" className="font-medium block mb-2">
              VM Size{" "}
              <Link href={"/vmexplanation"}>
                <span className="font-light font-xs ml-2 text-blue-600">
                  Difference between the A, B, and D families
                </span>
              </Link>
            </label>
            <p>{vmSize}</p>
          </div>

          {/* Operating System */}
          <div>
            <label htmlFor="os" className="font-medium block mb-2">
              Operating System
            </label>
            <p>{os}</p>
          </div>

          {/* Admin Username */}
          <div>
            <label htmlFor="adminUsername" className="font-medium block mb-2">
              Admin Username
            </label>
            <p>{adminUser}</p>
          </div>

          {/* Admin Password */}
          <div>
            <label htmlFor="adminPassword" className="font-medium block mb-2">
              Admin Password
            </label>
            <p>{adminPassword}</p>
          </div>

          {/* Private IP Allocation */}
          <div>
            <label htmlFor="ipAllocation" className="font-medium block mb-2">
              Private IP Allocation
            </label>
            <p>{allocation}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link href={"/homepage"}>
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </Link>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            // onClick={}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
