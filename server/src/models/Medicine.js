import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genericName: { type: String, default: "" },
  category: { type: String, default: "" },
  dosageForm: { type: String, default: "" },
  strength: { type: String, default: "" },
  stock: { type: Number, default: 0, min: 0 },
  unit: { type: String, default: "pcs" },
  expirationDate: { type: Date },
  status: { type: String, enum: ["active", "archived"], default: "active" }
}, { timestamps: true });

export default mongoose.model("Medicine", medicineSchema);
