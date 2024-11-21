"use client";

import Navbar from "../components/navbar";
import React, { useState } from "react";
import Link from "next/link";
import Azure from "../../../public/azure-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Environment() {
  const router = useRouter();
  const [environmentName, setEnvironmentName] = useState("");
  const [environmentType, setEnvironmentType] = useState("Development");
  const [region, setRegion] = useState("West Europe");
  const [alert, setAlert] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(environmentName, environmentType, region);
    // Check if all fields are filled
    if (!(environmentName && environmentType && region)) {
      setAlert("Please fill out the environment name");
      return; // Prevent further execution
    }

    try {
      // Attempt to save the data
      const res = await fetch("http://localhost:3000/api/environment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          environmentName,
          environmentType,
          region,
        }),
      });

      if (res.ok) {
        router.push("/projectlist");
      } else {
        throw new Error("Failed to create environment");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        {alert && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {alert}
          </div>
        )}
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
            <Image src={Azure} alt="Azure Logo" height="auto" width={84} />
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
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
