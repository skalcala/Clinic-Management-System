import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  category: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, enum: ["Cash", "GCash", "Maya", "Card", "Bank", "Other"], default: "Cash" },
  referenceNumber: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);
