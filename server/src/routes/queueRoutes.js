import express from "express";
import Queue from "../models/Queue.js";
import Appointment from "../models/Appointment.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router(); router.use(protect);
router.get("/", async (req, res) => {
  const start = req.query.date ? new Date(req.query.date) : new Date(); start.setHours(0,0,0,0);
  const end = new Date(start); end.setDate(end.getDate()+1);
  res.json(await Queue.find({ queueDate: { $gte: start, $lt: end } }).populate("patient doctor appointment").sort({ createdAt: 1 }));
});
router.post("/", allowRoles("admin", "receptionist"), async (req, res) => {
  try {
    const start = new Date(); start.setHours(0,0,0,0); const end = new Date(start); end.setDate(end.getDate()+1);
    const count = await Queue.countDocuments({ queueDate: { $gte: start, $lt: end } });
    const row = await Queue.create({ ...req.body, queueNumber: `Q-${String(count+1).padStart(3,"0")}` });
    if (req.body.appointment) await Appointment.findByIdAndUpdate(req.body.appointment, { status: "Checked In" });
    await writeAudit(req, "CREATE", "Queue", row._id, `Added ${row.queueNumber}`); res.status(201).json(await row.populate("patient doctor appointment"));
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.patch("/:id/status", allowRoles("admin", "receptionist", "doctor"), async (req, res) => {
  const update = { status: req.body.status };
  if (req.body.status === "Called") update.calledAt = new Date();
  if (req.body.status === "In Consultation") update.startedAt = new Date();
  if (req.body.status === "Completed") update.completedAt = new Date();
  const row = await Queue.findByIdAndUpdate(req.params.id, update, { new: true }).populate("patient doctor appointment"); await writeAudit(req, "STATUS", "Queue", row?._id, `${row?.queueNumber} → ${req.body.status}`); res.json(row);
});
export default router;
