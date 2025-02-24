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


// const policySchema = new mongoose.Schema({
//     memory: {
//       type: String,
//       required: true,
//     },
//     hdd: {
//       type: String,
//       required: true,
//     },
//     ssd: {
//       type: String,
//       required: true,
//     },
//     cpu: {
//       type: String,
//       required: true,
//     },
//     netBand: {
//       type: String,
//       required: true,
//     },
//     env: {
//       type: String,
//       required: true,
//     },
//     projectId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Project',
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   });