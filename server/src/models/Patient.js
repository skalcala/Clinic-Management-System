import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true, index: true },
  firstName: { type: String, required: true, trim: true },
  middleName: { type: String, default: "" },
  lastName: { type: String, required: true, trim: true },
  birthDate: { type: Date, required: true },
  sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, default: "" },
  contactNumber: { type: String, required: true },
  email: { type: String, default: "" },
  emergencyContact: {
    name: { type: String, default: "" },
    relationship: { type: String, default: "" },
    phone: { type: String, default: "" }
  },
  bloodType: { type: String, default: "" },
  allergies: { type: [String], default: [] },
  medicalConditions: { type: [String], default: [] },
  status: { type: String, enum: ["active", "archived"], default: "active" }
}, { timestamps: true });

patientSchema.pre("save", async function(next) {
  if (!this.patientId) {
    const Patient = mongoose.model("Patient");
    const count = await Patient.countDocuments();
    this.patientId = `PT-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

export default mongoose.model("Patient", patientSchema);
