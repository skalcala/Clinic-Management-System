import express from "express";
import Service from "../models/Service.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router();
router.use(protect);

router.get("/", async (_req, res) => res.json(await Service.find().sort({ name: 1 })));
router.post("/", allowRoles("admin"), async (req, res) => {
  try {
    const row = await Service.create(req.body);
    await writeAudit(req, "CREATE", "Services", row._id, `Created service ${row.name}`);
    res.status(201).json(row);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", allowRoles("admin"), async (req, res) => {
  try {
    const row = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!row) return res.status(404).json({ message: "Service not found" });
    await writeAudit(req, "UPDATE", "Services", row._id, `Updated service ${row.name}`);
    res.json(row);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete("/:id", allowRoles("admin"), async (req, res) => {
  const row = await Service.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true });
  if (!row) return res.status(404).json({ message: "Service not found" });
  await writeAudit(req, "ARCHIVE", "Services", row._id, `Deactivated service ${row.name}`);
  res.json(row);
});

export default router;
