"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function Projectdetails() {
    const searchParams = useSearchParams();
    const requestId = searchParams.get("requestId"); // Get the requestId from the query

    const [projectDetails, setProjectDetails] = useState({
        _id: "",
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
        publicIP: "", // Store the public IP address
    });

    const [rg, setRG] = useState({
        rgName: "",
    });

    const [connectionStatus, setConnectionStatus] = useState("idle");
    const [showPassword, setShowPassword] = useState(false);

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
                    _id: project._id,
                    projectName: project.projectName,
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
            console.log("Resource data:", data);

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
                    publicIP: resource.publicIP || "Not available yet", // Use the stored IP or default message
                });
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

    useEffect(() => {
        if (projectDetails._id) {
            setRG({
                rgName: `rg-${projectDetails._id}`, // Format: rg-<projectId>
            });
        }
    }, [projectDetails._id]);

    const handleConnectVM = async () => {
        console.log("Connect button clicked");
        
        const { resourceName, os, adminUser, adminPassword, publicIP } = resource;
        console.log("Resource details:", { resourceName, os, adminUser, publicIP });

        // If publicIP is not available yet, show an error
        if (!publicIP || publicIP === "Not available yet") {
            console.log("Public IP not available, showing error");
            toast.error("Public IP address is not available yet. Please wait for the VM to be fully provisioned.");
            return;
        }

        try {
            setConnectionStatus("connecting");
            console.log("Connection status set to connecting");
            
            // Show a loading toast
            const loadingToast = toast.loading("Preparing connection details...");
            console.log("Loading toast displayed");
            
            // For direct connection without API call
            const directConnect = () => {
                console.log("Starting direct connect process");
                toast.dismiss(loadingToast);
                
                // For Linux or Ubuntu VMs, provide SSH command
                if (os.toLowerCase().includes("linux") || os.toLowerCase().includes("ubuntu")) {
                    console.log("Detected Linux/Ubuntu OS, preparing SSH command");
                    const sshCommand = `ssh ${adminUser}@${publicIP}`;
                    toast.success(`Run this command to connect: ${sshCommand}`);

                    // Copy to clipboard
                    navigator.clipboard.writeText(sshCommand)
                        .then(() => {
                            console.log("SSH command copied to clipboard");
                            toast.success("SSH command copied to clipboard");
                        })
                        .catch((err) => {
                            console.error("Failed to copy command:", err);
                            toast.error("Failed to copy command to clipboard");
                        });
                    
                    setConnectionStatus("connected");
                }
                // For Windows VMs, generate RDP file
                else if (os.toLowerCase().includes("windows")) {
                    console.log("Detected Windows OS, preparing RDP file");
                    const rdpContent = `full address:s:${publicIP}\nusername:s:${adminUser}\npassword:s:${adminPassword}`;

                    try {
                        // Download RDP file
                        const blob = new Blob([rdpContent], { type: "application/rdp" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${resourceName}.rdp`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        console.log("RDP file download initiated");

                        toast.success("RDP file downloaded. Open it to connect to the VM.");
                        setConnectionStatus("connected");
                    } catch (rdpError) {
                        console.error("Error creating RDP file:", rdpError);
                        toast.error("Failed to create RDP file");
                        setConnectionStatus("error");
                    }
                } else {
                    console.log("Unsupported OS:", os);
                    toast.error(`Unsupported OS for connection: ${os}`);
                    setConnectionStatus("error");
                }
            };
            
            // Use setTimeout to ensure the UI updates before processing
            setTimeout(directConnect, 500);
            
        } catch (error) {
            console.error("Error connecting to VM:", error);
            toast.error("Failed to prepare connection details: " + error.message);
            setConnectionStatus("error");
        }
    };

    const handleRefreshResource = async () => {
        toast.loading("Refreshing resource information...");
        await fetchResource();
        toast.dismiss();
        toast.success("Resource information updated");
    };

    return (
        <div>
            {/* Details Box */}
            <div className="flex flex-row items-center">
                <h1 className="text-5xl font-bold mx-16 my-5">{projectDetails.projectName}</h1>
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
                    <div>
                        <p className="text-xl font-medium mx-16 mt-5">Created By</p>
                        <p className="text-lg font-normal ml-16 mt-2">{projectDetails.pathWithNamespace}</p>
                    </div>
                </div>
            </div>

            {/* Cloud Resources Box */}
            <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded-2xl font-normal">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-3xl font-semibold ml-4">Cloud Resources</h1>
                    <div className="flex flex-row justify-between items-center px-4">
                        <button
                            className={`ml-4 text-sm text-white rounded py-3 px-5 ${
                                connectionStatus === "connecting"
                                    ? "bg-blue-400"
                                    : connectionStatus === "connected"
                                        ? "bg-green-500"
                                        : connectionStatus === "error"
                                            ? "bg-red-500"
                                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                            onClick={handleConnectVM}
                            disabled={connectionStatus === "connecting" || !resource.publicIP || resource.publicIP === "Not available yet"}
                        >
                            {connectionStatus === "connecting"
                                ? "Connecting..."
                                : connectionStatus === "connected"
                                    ? "Connected"
                                    : connectionStatus === "error"
                                        ? "Try Again"
                                        : "Connect"}
                        </button>
                        <button
                            className="ml-4 text-sm text-white bg-gray-500 hover:bg-gray-600 rounded py-3 px-5"
                            onClick={handleRefreshResource}
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="ml-20 mt-5">
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
                            <div className="flex items-center">
                                <p className="text-lg font-light mr-2">
                                    {showPassword ? resource.adminPassword : "••••••••••••"}
                                </p>
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(resource.adminPassword);
                                        toast.success("Password copied to clipboard");
                                    }}
                                    className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 ml-2"
                                >
                                    Copy
                                </button>
                            </div>
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

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">
                                Public IP Address
                            </p>
                            <p className="text-lg font-light">{resource.publicIP || "Not available"}</p>
                        </div>

                        <div className="flex flex-row items-center">
                            <p className="text-lg font-semibold w-32">
                                Resource Group
                            </p>
                            <p className="text-lg font-light">{rg.rgName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}