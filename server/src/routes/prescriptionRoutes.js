import express from "express";
import Prescription from "../models/Prescription.js";
import Medicine from "../models/Medicine.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router(); router.use(protect);
router.get("/", async (req, res) => {
  const query = req.query.patient ? { patient: req.query.patient } : {};
  res.json(await Prescription.find(query).populate("patient doctor consultation medicines.medicine").sort({ date: -1 }));
});
router.post("/", allowRoles("admin", "doctor"), async (req, res) => {
  try {
    const row = await Prescription.create(req.body);
    for (const item of row.medicines) {
      if (item.medicine && item.quantity > 0) await Medicine.findByIdAndUpdate(item.medicine, { $inc: { stock: -Math.abs(item.quantity) } });
    }
    await writeAudit(req, "CREATE", "Prescriptions", row._id, `Created prescription for patient ${row.patient}`);
    res.status(201).json(await row.populate("patient doctor consultation medicines.medicine"));
  } catch (e) { res.status(400).json({ message: e.message }); }
});
export default router;
