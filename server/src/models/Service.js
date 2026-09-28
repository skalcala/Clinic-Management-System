import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: "General" },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  durationMinutes: { type: Number, default: 30, min: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
