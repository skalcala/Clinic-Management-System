import express from "express";
import AuditLog from "../models/AuditLog.js";
import { protect, allowRoles } from "../middleware/auth.js";
const router = express.Router();
router.get("/", protect, allowRoles("admin"), async (_req, res) => res.json(await AuditLog.find().populate("user", "firstName lastName email role").sort({ createdAt: -1 }).limit(300)));
export default router;
