import express from "express";
import User from "../models/User.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router();
router.use(protect, allowRoles("admin"));

router.get("/", async (_req, res) => res.json(await User.find().select("-password").sort({ createdAt: -1 })));
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    await writeAudit(req, "CREATE", "Users", user._id, `Created ${user.role} account for ${user.email}`);
    const safe = user.toObject(); delete safe.password;
    res.status(201).json(safe);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", async (req, res) => {
  try {
    const body = { ...req.body }; delete body.password;
    const user = await User.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true }).select("-password");
    await writeAudit(req, "UPDATE", "Users", user?._id, `Updated user ${user?.email || req.params.id}`);
    res.json(user);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
export default router;
