import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  module: String,
  recordId: String,
  description: String
}, { timestamps: true });

export default mongoose.model("AuditLog", auditLogSchema);
