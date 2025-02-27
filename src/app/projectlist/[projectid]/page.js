"use client";

// import gitlab from "../../../../public/gitlab-logo-500.svg";
// import Image from "next/image";
import Link from "next/link";
// import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProvider } from "../../components/ConText";
// import unfilter from "../../../public/filter-circle.svg";
// import filter from "../../../public/filter-circle-fill.svg";

export default function Projectdetails({ params }) {
  const data = useProvider();
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

  const fetchResource = async () => {
    try {
      // console.log("Fetching data for requestId:", requestId);
      const res = await fetch(`/api/resource/?requestId=${requestId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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

        // console.log("Fetched Data:", data);
      } else {
        console.log("No resource found for this requestId.");
      }
    } catch (error) {
      console.log("Error while fetching resource data:", error);
    }
  };

  useEffect(() => {
    if (requestId) {
      fetchResource();
    }
  });

  const handleDelete = async () => {
    toast.success("Resource deleted successfully");

    try {
      const response = await fetch(`/api/resource/?requestId=${requestId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete resource: ${response.statusText}`);
      }

      router.push("/projectops");
    } catch (error) {
      console.error("Error while deleting resource:", error);
      toast.error("Failed to delete resource");
    }
  };

  return (
    <div>
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
              className="ml-4 text-sm text-white bg-red-500 rounded py-3 px-5 hover:bg-red-600"
              onClick={handleDelete}
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
              <p className="text-lg font-light items-center">{resourceName}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">VM Type</p>
              <p className="text-lg font-light">{type}</p>
            </div>

            <div className="flex flex-row items-center">
              <Link href="/vmexplanation">
                <p className="text-lg text-blue-700 font-semibold w-32">
                  VM Size
                </p>
              </Link>
              <p className="text-lg font-light">{vmSize}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Region</p>
              <p className="text-lg font-light">{region}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Admin Username</p>
              <p className="text-lg font-light">{adminUser}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Admin Password</p>
              <p className="text-lg font-light">{adminPassword}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Operating System</p>
              <p className="text-lg font-light">{os}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">
                Private IP Allocation
              </p>
              <p className="text-lg font-light">{allocation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
