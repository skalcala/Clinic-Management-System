import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["admin", "receptionist", "doctor"], default: "receptionist" },
  contactNumber: { type: String, default: "" },
  status: { type: String, enum: ["active", "disabled"], default: "active" }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(value) {
  return bcrypt.compare(value, this.password);
};

export default mongoose.model("User", userSchema);
