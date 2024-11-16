"use client";

import React, { useState } from "react";

export default function PolicyEdit() {

    const [memory, setMemory] = useState("");
    const [memoryMes, setMemoryMes] = useState("");

    return (
        <main className="bg-[#07032B]">
            <h3 className="text-white">Terms and Policies</h3>
            <div className="container bg-white rounded">
                <h1>Resource Allocation Terms and Policies</h1>
                <form>
                    <input type="text" className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2" placeholder="Message"></input>
                </form>
            </div>
        </main>
    );
}