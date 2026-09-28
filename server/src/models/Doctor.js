import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  doctorId: { type: String, unique: true, index: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  licenseNumber: { type: String, default: "" },
  email: { type: String, default: "" },
  contactNumber: { type: String, default: "" },
  schedule: { type: String, default: "" },
  status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

doctorSchema.pre("save", async function(next) {
  if (!this.doctorId) {
    const Doctor = mongoose.model("Doctor");
    const count = await Doctor.countDocuments();
    this.doctorId = `DR-${String(count + 1).padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("Doctor", doctorSchema);
