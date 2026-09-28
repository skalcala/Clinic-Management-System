import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", default: null },
  queue: { type: mongoose.Schema.Types.ObjectId, ref: "Queue", default: null },
  chiefComplaint: { type: String, default: "" },
  symptoms: { type: [String], default: [] },
  vitals: {
    temperature: String,
    bloodPressure: String,
    heartRate: String,
    respiratoryRate: String,
    oxygenSaturation: String,
    weight: String,
    height: String
  },
  diagnosis: { type: String, required: true },
  treatment: { type: String, default: "" },
  notes: { type: String, default: "" },
  status: { type: String, enum: ["In Progress", "Completed"], default: "Completed" },
  consultationDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Consultation", consultationSchema);
