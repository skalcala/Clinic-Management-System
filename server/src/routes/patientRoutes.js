import express from "express";
import Patient from "../models/Patient.js";
import { protect, allowRoles } from "../middleware/auth.js";
import { writeAudit } from "../middleware/audit.js";

const router = express.Router();
router.use(protect);

router.get("/", async (req, res) => {
  const { search = "", status = "" } = req.query;
  const query = {};
  if (status) query.status = status;
  if (search) query.$or = [
    { patientId: { $regex: search, $options: "i" } },
    { firstName: { $regex: search, $options: "i" } },
    { lastName: { $regex: search, $options: "i" } },
    { contactNumber: { $regex: search, $options: "i" } }
  ];
  res.json(await Patient.find(query).sort({ createdAt: -1 }));
});
router.get("/:id", async (req, res) => res.json(await Patient.findById(req.params.id)));
router.post("/", allowRoles("admin", "receptionist"), async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    await writeAudit(req, "CREATE", "Patients", patient._id, `Registered ${patient.patientId} ${patient.firstName} ${patient.lastName}`);
    res.status(201).json(patient);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.put("/:id", allowRoles("admin", "receptionist"), async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    await writeAudit(req, "UPDATE", "Patients", patient?._id, `Updated patient ${patient?.patientId || req.params.id}`);
    res.json(patient);
  } catch (e) { res.status(400).json({ message: e.message }); }
});
router.delete("/:id", allowRoles("admin", "receptionist"), async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, { status: "archived" }, { new: true });
  await writeAudit(req, "ARCHIVE", "Patients", patient?._id, `Archived patient ${patient?.patientId || req.params.id}`);
  res.json(patient);
});
export default router;
