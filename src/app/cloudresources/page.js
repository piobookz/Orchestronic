"use client";

import Navbar from "../components/navbar";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Azure from "../../../public/azure-logo.png";

export default function CloudResources() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      {/* Header */}
      <div className="mx-16 my-6">
        <h1 className="text-4xl font-bold">Create Cloud Resource</h1>
        <p className="text-lg text-gray-400 ml-1 mt-4">
          Create Cloud Resource → Todo List
        </p>
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
              <Image src={Azure} width={84} height={16} alt="Azure Logo" />
            </div>
          </div>

          {/* Resource Type */}
          <div>
            <label htmlFor="resourceType" className="font-medium block mb-2">
              Resource Type
            </label>
            <select
              id="resourceType"
              name="resourceType"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              defaultValue="Virtual Machine"
            >
              <option value="Virtual Machine">Virtual Machine</option>
              <option value="Storage">Storage</option>
              <option value="Database">Database</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="font-medium block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              placeholder="Enter name"
              defaultValue="VM_1"
            />
          </div>

          {/* Resource Group */}
          <div>
            <label htmlFor="resourceGroup" className="font-medium block mb-2">
              Resource Group
            </label>
            <select
              id="resourceGroup"
              name="resourceGroup"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
            >
              <option value="">Select resource group</option>
              <option value="Group1">Group1</option>
              <option value="Group2">Group2</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label htmlFor="region" className="font-medium block mb-2">
              Region
            </label>
            <select
              id="region"
              name="region"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              defaultValue="West Europe"
            >
              <option value="West Europe">West Europe</option>
              <option value="East US">East US</option>
              <option value="Asia Pacific">Asia Pacific</option>
            </select>
          </div>

          {/* VM Size */}
          <div>
            <label htmlFor="vmSize" className="font-medium block mb-2">
              VM Size
            </label>
            <select
              id="vmSize"
              name="vmSize"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
            >
              <option value="Standard_DS1_v2">Standard_DS1_v2</option>
              <option value="Standard_DS2_v2">Standard_DS2_v2</option>
              <option value="Standard_DS3_v2">Standard_DS3_v2</option>
            </select>
          </div>

          {/* Operating System */}
          <div>
            <label htmlFor="os" className="font-medium block mb-2">
              Operating System
            </label>
            <select
              id="os"
              name="os"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              defaultValue="Ubuntu"
            >
              <option value="Ubuntu">Ubuntu</option>
              <option value="Windows">Windows</option>
              <option value="RedHat">RedHat</option>
            </select>
          </div>

          {/* Admin Username */}
          <div>
            <label htmlFor="adminUsername" className="font-medium block mb-2">
              Admin Username
            </label>
            <input
              type="text"
              id="adminUsername"
              name="adminUsername"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              placeholder="Enter username"
              defaultValue="Admin"
            />
          </div>

          {/* Admin Password */}
          <div>
            <label htmlFor="adminPassword" className="font-medium block mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="adminPassword"
              name="adminPassword"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              placeholder="Enter password"
            />
          </div>

          {/* Network Interface */}
          <div>
            <label htmlFor="nic" className="font-medium block mb-2">
              Network Interface (NIC)
            </label>
            <input
              type="text"
              id="nic"
              name="nic"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              placeholder="Enter NIC name"
            />
          </div>

          {/* Private IP Allocation */}
          <div>
            <label htmlFor="ipAllocation" className="font-medium block mb-2">
              Private IP Allocation
            </label>
            <select
              id="ipAllocation"
              name="ipAllocation"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
            >
              <option value="">Select private IP allocation</option>
              <option value="Dynamic">Dynamic</option>
              <option value="Static">Static</option>
            </select>
          </div>
        </div>

        {/* Optional Details */}
        <div className="mt-6">
          <button className="text-blue-500 underline">Optional Details</button>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link href={"/homepage"}>
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </Link>
          <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
