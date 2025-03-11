"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { getVMConnectionDetails } from './actions';
import ConnectionModal from '../../components/ConnectionModal';

export default function Projectdetails() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId"); // Get the requestId from the query

  // Project information
  const [projectDetails, setProjectDetails] = useState({
    _id: "",
    projectName: "",
    projectDescription: "",
    lastUpdate: "",
  });

  // VM resource information
  const [vmDetails, setVMDetails] = useState({
    vmName: "",
    vmSize: "",
    region: "",
    os: "",
    type: "Virtual Machine",
    allocation: "",
    resourceGroupName: "",
  });

  // Connection details
  const [connectionDetails, setConnectionDetails] = useState({
    adminUser: "",
    adminPassword: "",
    publicIP: "",
    privateIP: "",
    connectionPort: "", // 22 for SSH, 3389 for RDP
    connectionMethod: "SSH", // SSH or RDP
    isConnected: false,
  });

  // UI state
  const [uiState, setUIState] = useState({
    connectionStatus: "idle", // idle, connecting, connected, failed
    showPassword: false,
    isLoading: false
  });

  const [connectionInstructions, setConnectionInstructions] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch project details
  useEffect(() => {
    if (requestId) {
      fetchProjectDetails();
    }
  }, [requestId]);

  // Fetch resource details after project details are loaded
  useEffect(() => {
    if (requestId && projectDetails._id) {
      fetchResource();
    }
  }, [requestId, projectDetails._id]);

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
      console.log(data);
      if (data.length > 0) {
        const project = data[0];
        setProjectDetails({
          _id: project._id,
          projectName: project.projectName, // Fixed field names
          projectDescription: project.projectDescription,
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
      const res = await fetch(`/api/resource/?projectRequest=${requestId}`, {
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
        setVMDetails({
          vmName: resource.vmname,
          region: resource.region,
          os: resource.os,
          type: resource.type,
          vmSize: resource.vmsize,
          allocation: resource.allocationip,
          resourceGroupName: `rg-${projectDetails._id}`, // Format: rg-<projectId>  
        });

        setConnectionDetails({
          adminUser: resource.username,
          adminPassword: resource.password,
        });

      } else {
        console.log("No resource found for this requestId.");
      }
    } catch (error) {
      console.log("Error while fetching resource data:", error);
    }
  };


  const handleConnectVM = async () => {
    try {
      // Show loading state
      setUIState(prev => ({ ...prev, connectionStatus: "connecting", isLoading: true }));
      const loadingToast = toast.loading("Connecting to VM...");

      // Call the server action
      const result = await getVMConnectionDetails(
        vmDetails.vmName,
        vmDetails.resourceGroupName,
        vmDetails.os
      );

      toast.dismiss(loadingToast);
      setUIState(prev => ({ ...prev, isLoading: false }));

      // Handle result
      if (!result.success) {
        setUIState(prev => ({ ...prev, connectionStatus: "failed" }));
        toast.error(result.message || "Failed to connect to VM");
        return;
      }

      // Success - update UI and provide connection instructions
      setUIState(prev => ({ ...prev, connectionStatus: "connected" }));
      const { publicIP, username } = result.vmDetails;

      handleSSHConnection(publicIP, username);

      // Open the modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error connecting to VM:", error);
      setUIState(prev => ({ ...prev, connectionStatus: "failed", isLoading: false }));
      toast.error("Failed to connect to VM");
    }
  };

  const handleSSHConnection = (publicIP, username) => {
    const user = username || connectionDetails.adminUser;
    const sshCommand = `ssh ${user}@${publicIP}`;

    setConnectionDetails(prev => ({
      ...prev,
      publicIP,
      adminUser: user,
      connectionPort: "22",
      connectionMethod: "SSH"
    }));

    setConnectionInstructions(`
      <div>
        <h3 class="text-xl font-bold mb-4">SSH Connection Instructions</h3>
        
        <div class="mb-4">
          <p class="font-medium mb-1">Connection Details:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Host: ${publicIP}</li>
            <li>Port: 22</li>
            <li>Username: ${user}</li>
            <li>Password: ${connectionDetails.adminPassword}</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <p class="font-medium mb-1">Connection Command:</p>
          <div class="bg-gray-800 text-white p-2 rounded font-mono mb-2">${sshCommand}</div>
          <button id="copy-ssh-command" 
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
            Copy Command
          </button>
        </div>
        
        <div>
          <p class="font-medium mb-1">Connection Steps:</p>
          <ol class="list-decimal pl-5 space-y-1">
            <li>Open Terminal (Mac/Linux) or Command Prompt/PowerShell (Windows)</li>
            <li>Paste and run the command above</li>
            <li>Enter your password when prompted</li>
          </ol>
        </div>
      </div>
    `);

    navigator.clipboard.writeText(sshCommand)
      .then(() => toast.success("SSH command copied to clipboard"))
      .catch(() => console.error("Failed to copy command"));

    toast.success("VM is ready to connect via SSH");

    // Set up event listener for the copy button (will be added after modal renders)
    setTimeout(() => {
      const copyButton = document.getElementById('copy-ssh-command');
      if (copyButton) {
        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(sshCommand)
            .then(() => toast.success("SSH command copied to clipboard"))
            .catch(() => console.error("Failed to copy command"));
        });
      }
    }, 200);
  };


  return (
    <div>
      {/* Details Box */}
      <div className="flex flex-row items-center">
        <h1 className="text-5xl font-bold mx-16 my-5">
          {projectDetails.projectName}
        </h1>
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
            <p className="text-lg font-normal ml-5 mt-2">
              {projectDetails.projectName}
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Description</p>
            <p className="text-lg font-normal ml-16 mt-2">
              {projectDetails.projectDescription}
            </p>
          </div>
          {/* <div>
            <p className="text-xl font-medium mx-16 mt-5">Last Update</p>
            <p className="text-lg font-normal ml-16 mt-2">{projectDetails.lastUpdate}</p>
          </div> */}
          <div>
            <p className="text-xl font-medium mx-16 mt-5">Created By</p>
            <p className="text-lg font-normal ml-16 mt-2">
              {projectDetails.pathWithNamespace}
            </p>
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
            {/* Connection button */}
            <button
              onClick={handleConnectVM}
              disabled={uiState.isLoading}
              className={`px-4 py-2 rounded text-white ${uiState.connectionStatus === "connecting" ? "bg-blue-400" :
                uiState.connectionStatus === "connected" ? "bg-green-500" :
                  uiState.connectionStatus === "failed" ? "bg-red-500" :
                    "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {uiState.isLoading ? "Connecting..." :
                uiState.connectionStatus === "connected" ? "Connected" :
                  uiState.connectionStatus === "failed" ? "Failed" :
                    "Connect"}
            </button>

            {/* Connection instructions */}
            <ConnectionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <div dangerouslySetInnerHTML={{ __html: connectionInstructions }} />
            </ConnectionModal>
          </div>
        </div>

        <div className="ml-20 mt-5">
          {/* <p className="text-xl font-semibold">Create Resource Group</p> */}
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-row">
              <p className="text-lg font-semibold w-32">Name</p>
              <p className="text-lg font-light items-center">
                {vmDetails.vmName}
              </p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">VM Type</p>
              <p className="text-lg font-light">{vmDetails.type}</p>
            </div>

            <div className="flex flex-row items-center">
              <Link href="/vmexplanation">
                <p className="text-lg text-blue-700 font-semibold w-32">
                  VM Size
                </p>
              </Link>
              <p className="text-lg font-light">{vmDetails.vmSize}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Region</p>
              <p className="text-lg font-light">{vmDetails.region}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Admin Username</p>
              <p className="text-lg font-light">{connectionDetails.adminUser}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Admin Password</p>
              <div className="flex items-center">
                <p className="text-lg font-light mr-2">
                  {uiState.showPassword ? connectionDetails.adminPassword : "••••••••••••"}
                </p>
                <button
                  onClick={() => setUIState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                  className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  {uiState.showPassword ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(vmDetails.adminPassword)
                  }
                  className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 ml-2"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">Operating System</p>
              <p className="text-lg font-light">{vmDetails.os}</p>
            </div>

            <div className="flex flex-row items-center">
              <p className="text-lg font-semibold w-32">
                Private IP Allocation
              </p>
              <p className="text-lg font-light">{vmDetails.allocation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}