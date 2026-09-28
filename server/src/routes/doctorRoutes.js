import express from "express";
import Doctor from "../models/Doctor.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router();
router.use(protect);
router.get("/", async (_req, res) => res.json(await Doctor.find().sort({ lastName: 1 })));
router.get("/:id", async (req, res) => res.json(await Doctor.findById(req.params.id)));
router.post("/", allowRoles("admin"), async (req, res) => {
  try { const row = await Doctor.create(req.body); await writeAudit(req, "CREATE", "Doctors", row._id, `Created doctor ${row.doctorId}`); res.status(201).json(row); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", allowRoles("admin"), async (req, res) => {
  try { const row = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); await writeAudit(req, "UPDATE", "Doctors", row?._id, `Updated doctor ${row?.doctorId}`); res.json(row); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete("/:id", allowRoles("admin"), async (req, res) => {
  const row = await Doctor.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true }); await writeAudit(req, "ARCHIVE", "Doctors", row?._id, `Set doctor inactive ${row?.doctorId}`); res.json(row);
});
export default router;
