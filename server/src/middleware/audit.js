import AuditLog from "../models/AuditLog.js";

export async function writeAudit(req, action, module, recordId, description) {
  try {
    await AuditLog.create({
      user: req.user?._id,
      action,
      module,
      recordId: recordId ? String(recordId) : "",
      description
    });
  } catch (error) {
    console.error("Audit error:", error.message);
  }
}
