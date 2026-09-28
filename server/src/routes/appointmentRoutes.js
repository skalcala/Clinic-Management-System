import express from "express";
import Appointment from "../models/Appointment.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router(); router.use(protect);
router.get("/", async (_req, res) => res.json(await Appointment.find().populate("patient doctor").sort({ date: -1, time: 1 })));
router.get("/:id", async (req, res) => res.json(await Appointment.findById(req.params.id).populate("patient doctor")));
router.post("/", allowRoles("admin", "receptionist"), async (req, res) => {
  try {
    const clash = await Appointment.findOne({ doctor: req.body.doctor, date: new Date(req.body.date), time: req.body.time, status: { $nin: ["Cancelled", "No Show"] } });
    if (clash) return res.status(409).json({ message: "Doctor already has an appointment at this date and time" });
    const row = await Appointment.create({ ...req.body, createdBy: req.user._id }); await writeAudit(req, "CREATE", "Appointments", row._id, `Created ${row.appointmentNumber}`); res.status(201).json(await row.populate("patient doctor"));
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", allowRoles("admin", "receptionist", "doctor"), async (req, res) => {
  try { const row = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("patient doctor"); await writeAudit(req, "UPDATE", "Appointments", row?._id, `Updated ${row?.appointmentNumber}`); res.json(row); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete("/:id", allowRoles("admin", "receptionist"), async (req, res) => {
  const row = await Appointment.findByIdAndUpdate(req.params.id, { status: "Cancelled" }, { new: true }).populate("patient doctor"); await writeAudit(req, "CANCEL", "Appointments", row?._id, `Cancelled ${row?.appointmentNumber}`); res.json(row);
});
export default router;
