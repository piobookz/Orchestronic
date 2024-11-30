import { connectMongoDB } from "../../../../lib/mongodb";

import Policy from "../../../../models/policy";
import { NextResponse } from "next/server";

export async function POST(req) {
    // Parse JSON from frontend
    const { memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes } = await req.json();
    console.log(memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes)

    // Connect to MongoDB
    await connectMongoDB();

    // Create policy document
    await Policy.create({ memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes });

    return NextResponse.json({ message: "Successful set policy" }, { status: 201 });
}

export async function GET(req) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Retrieve first policy document
        const policies = await Policy.findOne({});

        // Respond with the retrieved policies
        return NextResponse.json({ data: policies }, { status: 200 });

    } catch (error) {
        console.error("Error retrieving policies:", error);

        // Respond with an error message
        return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        // Parse JSON from frontend
        const { memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes } = await req.json();
        console.log(memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes)
        
        await connectMongoDB();

        // Update the first document in the Policy collection with the new data
        const updatedPolicy = await Policy.findOneAndUpdate(
            {},
            {memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes,},
            {new: true, upsert: false} // Return the updated document
        );

        return NextResponse.json({ data: updatedPolicy }, { status: 200 });

    } catch (error) {
        console.error("Error updating policy:", error);

        // Respond with an error message
        return NextResponse.json({ error: "Failed to update policy" }, { status: 500 });
    }
}