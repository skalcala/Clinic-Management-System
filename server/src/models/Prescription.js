import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  consultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation", required: true },
  medicines: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", default: null },
    medicineName: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    instructions: { type: String, default: "" },
    quantity: { type: Number, default: 0 }
  }],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Prescription", prescriptionSchema);
