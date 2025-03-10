"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Azure from "../../../../public/azure-logo.png";
import toast from "react-hot-toast";

export default function RequestDetails({ params }) {
  const router = useRouter();
  const [requestId, setRequestId] = useState(null);
  const [resourceName, setResourceName] = useState("");
  const [region, setRegion] = useState("");
  const [os, setOS] = useState("");
  const [adminUser, setAdminUser] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [vmSize, setVMSize] = useState("");
  const [allocation, setAllocation] = useState("");
  const [type, setType] = useState("Virtual Machine");

  useEffect(() => {
    params.then((resolvedParams) => {
      setRequestId(resolvedParams.projectId);
    });
  }, [params]);

  useEffect(() => {
    if (!requestId) return;
    // console.log(requestId);
    const fetchResource = async () => {
      try {
        const res = await fetch(`/api/resource/?requestId=${requestId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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
          setType(resource.type);
        }
      } catch (error) {
        console.log("Error while fetching resource data:", error);
      }
    };

    fetchResource();
  }, [requestId]);

  const handleDelete = async () => {
    toast.success("Resource deleted successfully");

    try {
      await fetch(`/api/resource/?requestId=${requestId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Error while deleting resource:", error);
    }
  };

  const handleCancel = () => {
    router.push("/requestresource");
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="mx-16 my-6">
        <h1 className="text-4xl font-bold">Create Cloud Resource</h1>
      </div>

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
              <Image src={Azure} width={84} height={"auto"} alt="Azure Logo" />
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
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
