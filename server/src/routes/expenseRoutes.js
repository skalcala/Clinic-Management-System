import express from "express";
import Expense from "../models/Expense.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router();
router.use(protect, allowRoles("admin"));

router.get("/", async (_req, res) => res.json(await Expense.find().populate("createdBy", "firstName lastName").sort({ date: -1, createdAt: -1 })));
router.post("/", async (req, res) => {
  try {
    const row = await Expense.create({ ...req.body, createdBy: req.user._id });
    await writeAudit(req, "CREATE", "Expenses", row._id, `Recorded expense ${row.description}`);
    res.status(201).json(await row.populate("createdBy", "firstName lastName"));
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", async (req, res) => {
  try {
    const row = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("createdBy", "firstName lastName");
    if (!row) return res.status(404).json({ message: "Expense not found" });
    await writeAudit(req, "UPDATE", "Expenses", row._id, `Updated expense ${row.description}`);
    res.json(row);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete("/:id", async (req, res) => {
  const row = await Expense.findByIdAndDelete(req.params.id);
  if (!row) return res.status(404).json({ message: "Expense not found" });
  await writeAudit(req, "DELETE", "Expenses", row._id, `Deleted expense ${row.description}`);
  res.json({ message: "Expense deleted" });
});

export default router;
