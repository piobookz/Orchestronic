import mongoose, { Schema } from "mongoose";

const policySchema = new Schema(
    {
        memory: { type: String },
        memoryMes: { type: String },

        hdd: { type: String },
        hddMes: { type: String },

        ssd: { type: String },
        ssdMes: { type: String },

        cpu: { type: String },
        cpuMes: { type: String },

        netBand: { type: String },
        netBandMes: { type: String },

        env: { type: String },
        envMes: { type: String },

        apelMes: { type: String },

        noteMes: { type: String },
    }
)

// if (mongoose.models.Policy) {
//     delete mongoose.models.Policy;
// }
// const Policy = mongoose.model("Policy", policySchema);

const Policy = mongoose.models.Policy || mongoose.model("Policy", policySchema);
export default Policy;