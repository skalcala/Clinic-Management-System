import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  appointmentNumber: { type: String, unique: true, index: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  type: { type: String, enum: ["Consultation", "Follow-up", "Check-up", "Medical Certificate", "Other"], default: "Consultation" },
  status: { type: String, enum: ["Scheduled", "Checked In", "Completed", "Cancelled", "No Show"], default: "Scheduled" },
  notes: { type: String, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

appointmentSchema.pre("save", async function(next) {
  if (!this.appointmentNumber) {
    const Appointment = mongoose.model("Appointment");
    const count = await Appointment.countDocuments();
    this.appointmentNumber = `APT-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model("Appointment", appointmentSchema);
