import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  receiptNumber: { type: String, unique: true, index: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  consultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation", default: null },
  items: [{ description: String, amount: Number }],
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  amountPaid: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  paymentMethod: { type: String, enum: ["Cash", "GCash", "Maya", "Card", "Other"], default: "Cash" },
  status: { type: String, enum: ["Unpaid", "Partially Paid", "Paid"], default: "Unpaid" }
}, { timestamps: true });

paymentSchema.pre("save", async function(next) {
  if (!this.receiptNumber) {
    const Payment = mongoose.model("Payment");
    const count = await Payment.countDocuments();
    this.receiptNumber = `OR-${String(count + 1).padStart(5, "0")}`;
  }
  this.subtotal = (this.items || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  this.total = Math.max(0, this.subtotal - Number(this.discount || 0));
  this.balance = Math.max(0, this.total - Number(this.amountPaid || 0));
  this.status = this.amountPaid <= 0 ? "Unpaid" : this.balance > 0 ? "Partially Paid" : "Paid";
  next();
});

export default mongoose.model("Payment", paymentSchema);
