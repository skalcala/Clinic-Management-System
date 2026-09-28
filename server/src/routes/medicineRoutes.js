import express from "express";
import Medicine from "../models/Medicine.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router(); router.use(protect);
router.get("/", async (_req, res) => res.json(await Medicine.find().sort({ name: 1 })));
router.post("/", allowRoles("admin"), async (req, res) => {
  try { const row = await Medicine.create(req.body); await writeAudit(req, "CREATE", "Medicines", row._id, `Created medicine ${row.name}`); res.status(201).json(row); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", allowRoles("admin"), async (req, res) => {
  try { const row = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); await writeAudit(req, "UPDATE", "Medicines", row?._id, `Updated medicine ${row?.name}`); res.json(row); }
  catch (e) { res.status(400).json({ message: e.message }); }
});
router.patch("/:id/stock", allowRoles("admin"), async (req, res) => {
  const amount = Number(req.body.amount || 0); const row = await Medicine.findByIdAndUpdate(req.params.id, { $inc: { stock: amount } }, { new: true }); await writeAudit(req, "STOCK", "Medicines", row?._id, `${amount >= 0 ? "Added" : "Deducted"} ${Math.abs(amount)} stock for ${row?.name}`); res.json(row);
});
router.delete("/:id", allowRoles("admin"), async (req, res) => {
  const row = await Medicine.findByIdAndUpdate(req.params.id, { status: "archived" }, { new: true }); await writeAudit(req, "ARCHIVE", "Medicines", row?._id, `Archived ${row?.name}`); res.json(row);
});
export default router;
