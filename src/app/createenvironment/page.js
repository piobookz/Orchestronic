"use client";

import Navbar from "../components/navbar";
import React, { useState } from "react";
import Link from "next/link";
import Azure from "../../../public/azure-logo.png";
import Image from "next/image";

export default function Environment() {
  const [environmentName, setEnvironmentName] = useState(
    "Todo List Development"
  );
  const [environmentType, setEnvironmentType] = useState("Development");
  const [region, setRegion] = useState("West Europe");

  return (
    <div className="min-h-screen text-white">
      {/* Navber */}
      <Navbar />

      {/* Title */}
      <div className="mx-16 my-6">
        <h1 className="text-4xl font-bold">Create Environment</h1>
        <p className="text-lg text-gray-400 ml-1 mt-4">
          Create Environment → Todo List
        </p>
      </div>

      {/* Project Details */}
      <div className="bg-white text-black mx-16 my-8 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Details</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label htmlFor="environmentName" className="font-medium block mb-2">
              Environment Name
            </label>
            <input
              type="text"
              id="environmentName"
              name="environmentName"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              value={environmentName}
              onChange={(e) => setEnvironmentName(e.target.value)}
            />
          </div>

          {/* Environment type */}
          <div>
            <label htmlFor="environmentType" className="font-medium block mb-2">
              Environment Type
            </label>
            <select
              id="environmentType"
              name="environmentType"
              className="border border-slate-300 rounded w-full px-4 py-2 text-base"
              value={environmentType}
              onChange={(e) => setEnvironmentType(e.target.value)}
            >
              <option value="Development">Development</option>
              <option value="Production">Production</option>
              <option value="Testing">Testing</option>
            </select>
          </div>

          {/* Cloud Provider */}
          <div>
            <h3 className="font-medium block mb-3">Cloud Provider</h3>
            <Image src={Azure} alt="Azure Logo" height={64} width={64} />
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
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="West Europe">West Europe</option>
              <option value="East US">East US</option>
              <option value="Asia Pacific">Asia Pacific</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Link href="/homepage">
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400">
              Back
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
