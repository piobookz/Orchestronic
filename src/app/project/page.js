"use client";

import gitlab from "../../../public/gitlab-logo-500.svg";
import Image from "next/image";
import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect, use } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

export default function Project() {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId");
    console.log("projectId", projectId);
    const [isDeleting, setIsDeleting] = useState(false);

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [rootPath, setRootPath] = useState("");

    const TABLE_HEAD_CR = ["Name", "Type"];
    const [TABLE_ROWS_CR, setTableRowsCR] = useState([]);

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const res = await fetch(`/api/project`);
                const data = await res.json();
                const project = data.find((proj) => proj._id === projectId);
                if (project) {
                    setProjectName(project.projectName);
                    setProjectDescription(project.projectDescription);
                    setRootPath(project.rootPath);
                } else {
                    console.error("Project not found");
                    // Optionally, handle the case where the project is not found
                }
            } catch (error) {
                console.error("Failed to fetch project details:", error.message);
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    useEffect(() => {
        const fetchTableRows = async () => {
            try {
                const res = await fetch(`/api/resourcelist`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                console.log("API Response for /api/resourcelist:", data);
                // Find the resources matching the projectId
                const resources = data.filter((resource) => resource.projectid === projectId); // corrected line

                // Map the data to table rows
                const rows = resources.map((element) => ({
                    id: element._id,
                    name: element.vmname,
                    type: element.type,
                    userid: element.userid,
                }));

                // Update the state with the fetched rows
                setTableRowsCR(rows);
            } catch (error) {
                console.error("Failed to fetch resources:", error.message);
            }
        };

        fetchTableRows();
    }, [projectId]);


    // useEffect(() => {
    //     const fetchProjectStatus = async () => {
    //         try {
    //             const res = await fetch("/api/request", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             });

    //             if (!res.ok) {
    //                 throw new Error(`Error: ${res.status} - ${res.statusText}`);
    //             }

    //             const data = await res.json();
    //             console.log("API Response:", data);

    //             if (!Array.isArray(data)) { // Check if data is an array directly
    //                 console.error("Unexpected API response format. Expected an array but received:", data);
    //                 return;
    //             }

    //             const requests = data; // data is already the array

    //             if (TABLE_ROWS_CR.length === 0 || !TABLE_ROWS_CR[0]) {
    //                 console.warn("No resources found for the project.");
    //                 return;
    //             }

    //             const matchingRequest = requests.find(
    //                 (item) => item.projectid === TABLE_ROWS_CR[0].projectid
    //             );

    //             if (matchingRequest) {
    //                 setSelectedButton(matchingRequest.statuspm);
    //             } else {
    //                 console.warn(
    //                     "No matching request found for project ID:",
    //                     TABLE_ROWS_CR[0].projectid
    //                 );
    //             }
    //         } catch (error) {
    //             console.error("Failed to retrieve request:", error.message);
    //         }
    //     };

    //     fetchProjectStatus();
    // }, [TABLE_ROWS_CR]); // Re-runs whenever TABLE_ROWS_CR changes

    const handleDelete = async () => {
        if (isDeleting) return;
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
            redirect("/projec");
        } catch (error) {
            console.error("Error while deleting resource:", error);
            toast.error("Failed to delete resource");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                    <p className="text-5xl font-bold ml-16 my-5">{projectName}</p>
                </div>
                <div className="flex flex-row justify-between items-center px-4">
                    {/* <button
                        className="mr-10 text-sm text-white bg-red-500 rounded py-3 px-5 hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Destroy
                    </button> */}
                </div>
            </div>

            {/* Project Details box */}
            <div className="bg-white mx-16 my-8 py-8 text-black text-xl rounded font-normal">
                {/* subtitle */}
                <div className="flex flex-row justify-between items-center">
                    <p className="text-3xl font-semibold ml-4">Application Details</p>
                </div>
                {/* Project name, description and source */}
                <div className="grid grid-rows-1 grid-flow-col gap-3 items-top mt-10">
                    <div>
                        <p className="text-xl font-medium mx-16 mt-5">Application name</p>
                        <p className="text-lg font-normal ml-16 mt-2">{projectName}</p>
                    </div>
                    <div>
                        <p className="text-xl font-medium mx-16 mt-5">Description</p>
                        <p className="text-lg font-normal ml-16 mt-2">{projectDescription}</p>
                    </div>
                    <div>
                        <p className="text-xl font-medium mx-16 mt-5">Repository</p>
                        <div className="flex flex-row mx-16">
                            <Image src={gitlab} width="45" height="45" alt="logo" />
                            <p className="text-lg font-normal flex items-center">
                                {rootPath}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cloud Resources */}
                <div className="grid grid-rows-[auto,auto] grid-flow-col mt-10">
                    <div className="flex flex-row items-center h-12">
                        <p className="text-xl font-medium ml-16 mr-5 mt-5">
                            Cloud Resources
                        </p>
                    </div>

                    {/* Cloud Resource list */}
                    <Card className="overflow-hidden rounded-lg shadow-lg mx-16 mt-8">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD_CR.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-gray-100 p-4 text-black font-semibold"
                                        >
                                            <Typography variant="small" className="font-medium">
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS_CR.map(({ id, name, type }, index) => {
                                    const isOdd = index % 2 === 1;
                                    const rowBgColor = isOdd ? "bg-gray-50" : "bg-white";
                                    // console.log(TABLE_ROWS_CR);
                                    return (
                                        <tr key={id} className={`${rowBgColor} cursor-pointer`}>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                <Link href={{ pathname: `/project/${id}`, query: { requestId: id } }}>
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
                                                <Link href={{ pathname: `/project/${id}`, query: { requestId: id } }}>
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
