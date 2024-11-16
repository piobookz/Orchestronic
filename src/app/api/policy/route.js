import { connectMongoDB } from "../../../../lib/mongodb";

import Policy from "../../../../models/policy";
import { NextResponse } from "next/server";

export async function POST(req) {
    // Parse JSON
    const { memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes } = await req.json();
    console.log(memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes)

    // Connect to MongoDB
    await connectMongoDB();

    // Create policy document
    await Policy.create({ memory, memoryMes, hdd, hddMes, ssd, ssdMes, cpu, cpuMes, netBand, netBandMes, env, envMes, apelMes, noteMes });

    return NextResponse.json({ message: "Successful set policy" }, { status: 201 });
}