import express from "express";
import Payment from "../models/Payment.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router(); router.use(protect);
router.get("/", async (_req, res) => res.json(await Payment.find().populate("patient consultation").sort({ createdAt: -1 })));
router.post("/", allowRoles("admin", "receptionist"), async (req, res) => {
  try { const row = await Payment.create(req.body); await writeAudit(req, "CREATE", "Payments", row._id, `Created payment ${row.receiptNumber}`); res.status(201).json(await row.populate("patient consultation")); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", allowRoles("admin", "receptionist"), async (req, res) => {
  try {
    const row = await Payment.findById(req.params.id); Object.assign(row, req.body); await row.save(); await row.populate("patient consultation"); await writeAudit(req, "UPDATE", "Payments", row._id, `Updated payment ${row.receiptNumber}`); res.json(row);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
export default router;
