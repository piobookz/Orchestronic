"use client";

import Navbar from "../components/navbar";
import React, { useState } from "react";

export default function PolicyEdit() {

    // Memory (RAM)
    const [memory, setMemory] = useState("");
    const [memoryMes, setMemoryMes] = useState("");

    // Storage - Hard Disk Drive (HDD)
    const [hdd, setHDD] = useState("");
    const [hddMes, setHDDMes] = useState("");

    // Storage - Solid State Drive (SSD)
    const [ssd, setSSD] = useState("");
    const [ssdMes, setSSDMes] = useState("");

    // CPU Cores
    const [cpu, setCPU] = useState("");
    const [cpuMes, setCPUMes] = useState("");

    // Network Bandwidth
    const [netBand, setNetBand] = useState("");
    const [netBandMes, setNetBandMes] = useState("");

    // Environment Limits
    const [env, setEnv] = useState("");
    const [envMes, setEnvMes] = useState("");

    // Approval Process for Exceeding Limits
    const [apelMes, setApelMes] = useState("");

    // Note
    const [noteMes, setNoteMes] = useState("");

    return (
        <div>
            <Navbar />
            <p className="text-5xl font-bold mx-16 my-5">Terms and Policies</p>

            {/* Details box */}
            <div className="bg-white mx-16 my-8 py-8 text-black text-x1 rounded font-normal">

                {/* Subtitle */}
                <div className="flex flex-row justify-between items-center">
                    <p className="text-3xl font-semibold ml-4">
                        Resource Allocation Terms and Policies
                    </p>
                    <button className="mr-4 py-2 px-10 text-sm text-black bg-[#E3E3E3] rounded">
                        Save
                    </button>
                </div>

                {/* Policy details */}
                <div>
                    <form>

                        {/* Memory (RAM) */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">Memory (RAM)</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="memory" className="text-lg font-normal">
                                        Maximum
                                    </label>
                                    <label for="memory-message" className="mt-2 text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <select
                                        id="memory"
                                        value={memory}
                                        onChange={(e) => setMemory(e.target.value)}
                                        className="w-1/3 bg-gray-50 border">
                                        <option selected>Choose maximum memory (RAM)</option>
                                        <option value="32GB">32 GB</option>
                                    </select>
                                    <textarea
                                        id="memory-message"
                                        value={memoryMes}
                                        onChange={(e) => setMemoryMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border"
                                        placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Storage - Hard Disk Drive (HDD) */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">Storage - Hard Disk Drive (HDD)</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="hdd" className="text-lg font-normal">
                                        Maximum
                                    </label>
                                    <label for="hdd-message" className="mt-2 text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <select
                                        id="hdd"
                                        value={hdd}
                                        onChange={(e) => setHDD(e.target.value)}
                                        className="w-1/3 bg-gray-50 border">
                                        <option selected>Choose maximum HDD</option>
                                        <option value="1TB">1 TB</option>
                                    </select>
                                    <textarea
                                        id="hdd-message"
                                        value={hddMes}
                                        onChange={(e) => setHDDMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border" placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Storage - Solid State Drive (SSD) */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">Storage - Solid State Drive (SSD)</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="ssd" className="text-lg font-normal">
                                        Storage
                                    </label>
                                    <label for="ssd-message" className="mt-2 text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <select
                                        id="ssd"
                                        value={ssd}
                                        onChange={(e) => setSSD(e.target.value)}
                                        className="w-1/3 bg-gray-50 border">
                                        <option selected>Choose maximum SSD</option>
                                        <option value="500GB">500 GB</option>
                                    </select>
                                    <textarea
                                        id="ssd-message"
                                        value={ssdMes}
                                        onChange={(e) => setSSDMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border" placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* CPU Cores */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">CPU Cores</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="cpu" className="text-lg font-normal">
                                        Maximum
                                    </label>
                                    <label for="cpu-message" className="mt-2 text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <select
                                        id="cpu"
                                        value={cpu}
                                        onChange={(e) => setCPU(e.target.value)}
                                        className="w-1/3 bg-gray-50 border">
                                        <option selected>Choose maximum CPU Cors</option>
                                        <option value="16CPU">16 CPU</option>
                                    </select>
                                    <textarea
                                        id="cpu-message"
                                        value={cpuMes}
                                        onChange={(e) => setCPUMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border" placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Network Bandwidth */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">Network Bandwidth</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="netBand" className="text-lg font-normal">
                                        Maximum
                                    </label>
                                    <label for="netBand-message" className="mt-2 text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <select
                                        id="netBand"
                                        value={netBand}
                                        onChange={(e) => setNetBand(e.target.value)}
                                        className="w-1/3 bg-gray-50 border">
                                        <option selected>Choose maximum Network Bandwidth</option>
                                        <option value="1Gbps">1 Gbps</option>
                                    </select>
                                    <textarea
                                        id="netBand-message"
                                        value={netBandMes}
                                        onChange={(e) => setNetBandMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border" placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Environment Limits */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">Environment Limits</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="env" className="text-lg font-normal">
                                        Maximum
                                    </label>
                                    <label for="env-message" className="mt-2 text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <select
                                        id="env"
                                        value={env}
                                        onChange={(e) => setEnv(e.target.value)}
                                        className="w-1/3 bg-gray-50 border">
                                        <option selected>Choose environment limits</option>
                                        <option value="5env">5 environments</option>
                                    </select>
                                    <textarea
                                        id="env-message"
                                        value={envMes}
                                        onChange={(e) => setEnvMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border" placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Approval Process for Exceeding Limits */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">Approval Process for Exceeding Limits</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="apel-message" className="text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <textarea
                                        id="apel-message"
                                        value={apelMes}
                                        onChange={(e) => setApelMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border" placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Note */}
                        <div>
                            <p className="text-xl font-medium ml-4 mt-5">Note</p>
                            <div className="flex flex-row">
                                <div className="flex flex-col mx-16 mt-2">
                                    <label for="note-message" className="text-lg font-normal">
                                        Message
                                    </label>
                                </div>
                                <div className="flex flex-col mx-20 mt-2 w-full text-lg font-normal">
                                    <textarea
                                        id="note-message"
                                        value={noteMes}
                                        onChange={(e) => setNoteMes(e.target.value)}
                                        rows="3" className="mt-2 px-3 py-1 bg-gray-50 rounded-lg border" placeholder="Comment..."></textarea>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}