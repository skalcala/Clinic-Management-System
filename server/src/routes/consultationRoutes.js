import express from "express";
import Consultation from "../models/Consultation.js";
import Queue from "../models/Queue.js";
import Appointment from "../models/Appointment.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router(); router.use(protect);
router.get("/", async (req, res) => {
  const query = req.query.patient ? { patient: req.query.patient } : {};
  res.json(await Consultation.find(query).populate("patient doctor appointment").sort({ consultationDate: -1 }));
});
router.post("/", allowRoles("admin", "doctor"), async (req, res) => {
  try {
    const row = await Consultation.create(req.body);
    if (row.queue) await Queue.findByIdAndUpdate(row.queue, { status: "Completed", completedAt: new Date() });
    if (row.appointment) await Appointment.findByIdAndUpdate(row.appointment, { status: "Completed" });
    await writeAudit(req, "CREATE", "Consultations", row._id, `Completed consultation for patient ${row.patient}`);
    res.status(201).json(await row.populate("patient doctor appointment"));
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", allowRoles("admin", "doctor"), async (req, res) => {
  try { const row = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("patient doctor appointment"); await writeAudit(req, "UPDATE", "Consultations", row?._id, "Updated consultation"); res.json(row); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
export default router;
