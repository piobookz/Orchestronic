import mongoose, { Schema } from "mongoose";

const policySchema = new Schema(
    {
        memory: Number,
        memoryMes: String,

        hdd: Number,
        hddMes: String,

        ssd: Number,
        ssdMes: String,

        cpu: Number,
        cpuMes: String,

        netBand: Number,
        netBandMes: String,

        env: Number,
        envMes: String,

        apelMes: String,

        noteMes: String,
    }
)

const Policy = mongoose.models.Policy || mongoose.models("Policy", policySchema);
export default Policy;