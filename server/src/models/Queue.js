import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
  queueNumber: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", default: null },
  queueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["Waiting", "Called", "In Consultation", "Completed", "Skipped", "Cancelled"], default: "Waiting" },
  calledAt: Date,
  startedAt: Date,
  completedAt: Date
}, { timestamps: true });

export default mongoose.model("Queue", queueSchema);
