"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function Projectdetails() {
    const searchParams = useSearchParams();
    const requestId = searchParams.get("requestId"); // Get the requestId from the query
    console.log("requestId", requestId);

    const [projectDetails, setProjectDetails] = useState({
        projectName: "",
        projectDescription: "",
        lastUpdate: "",
    });

    const [resource, setResource] = useState({
        resourceName: "",
        region: "",
        os: "",
        adminUser: "",
        adminPassword: "",
        vmSize: "",
        allocation: "",
        type: "Virtual Machine",
    });

    const fetchProjectDetails = async () => {
        try {
            const res = await fetch(`/api/project/?projectId=${requestId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch project: ${res.statusText}`);
            }

            const data = await res.json();

            if (data.length > 0) {
                const project = data[0];
                setProjectDetails({
                    projectName: project.projectName, // Fixed field names
                    projectDescription: project.projectDescription,
                    lastUpdate: project.lastUpdate,
                    pathWithNamespace: project.pathWithNamespace,
                });
            } else {
                console.log("No project found for this projectId.");
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
            toast.error("Failed to load project details.");
        }
    };

    const fetchResource = async () => {
        try {

            const res = await fetch(`/api/resource/?requestId=${requestId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch resource: ${res.statusText}`);
            }

            const data = await res.json();
            console.log("data", data);

            if (data.length > 0) {
                const resource = data[0];
                setResource({
                    resourceName: resource.vmname,
                    region: resource.region,
                    os: resource.os,
                    adminUser: resource.username,
                    adminPassword: resource.password,
                    vmSize: resource.vmsize,
                    allocation: resource.allocationip,
                    type: resource.type,
                });

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
            fetchProjectDetails();
        }
    }, [requestId]);

    useEffect(() => {
        if (requestId) {
            fetchResource();
        }
    }, [requestId]);

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
            {/* Details Box */}
            <div className="flex flex-row items-center">
                <h1 className="text-5xl font-bold mx-16 my-5">{projectDetails.projectName}</h1>
                {/* <span
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
        </span> */}
            </div>
            {/* Project Details box */}
            <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded-2xl font-normal">
                {/* subtitle */}
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold ml-4">Details</h1>
                </div>
                {/* Project name, description and source */}
                <div className="grid grid-rows-1 grid-flow-col gap-3 items-top mx-2">
                    <div>
                        <p className="text-xl font-medium ml-5 -16 mt-5">
                            Application name
                        </p>
                        <p className="text-lg font-normal ml-5 mt-2">{projectDetails.projectName}</p>
                    </div>
                    <div>
                        <p className="text-xl font-medium mx-16 mt-5">Description</p>
                        <p className="text-lg font-normal ml-16 mt-2">{projectDetails.projectDescription}</p>
                    </div>
                    {/* <div>
            <p className="text-xl font-medium mx-16 mt-5">Last Update</p>
            <p className="text-lg font-normal ml-16 mt-2">{projectDetails.lastUpdate}</p>
          </div> */}
                    <div>
                        <p className="text-xl font-medium mx-16 mt-5">Create By</p>
                        <p className="text-lg font-normal ml-16 mt-2">{projectDetails.pathWithNamespace}</p>
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
                            <p className="text-lg font-light items-center">{resource.resourceName}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">VM Type</p>
                            <p className="text-lg font-light">{resource.type}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <Link href="/vmexplanation">
                                <p className="text-lg text-blue-700 font-semibold w-32">
                                    VM Size
                                </p>
                            </Link>
                            <p className="text-lg font-light">{resource.vmSize}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">Region</p>
                            <p className="text-lg font-light">{resource.region}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">Admin Username</p>
                            <p className="text-lg font-light">{resource.adminUser}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">Admin Password</p>
                            <p className="text-lg font-light">{resource.adminPassword}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">Operating System</p>
                            <p className="text-lg font-light">{resource.os}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">
                                Private IP Allocation
                            </p>
                            <p className="text-lg font-light">{resource.allocation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
