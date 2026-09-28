import express from "express";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Queue from "../models/Queue.js";
import Consultation from "../models/Consultation.js";
import Payment from "../models/Payment.js";
import Expense from "../models/Expense.js";
import Service from "../models/Service.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.use(protect);

router.get("/dashboard", async (_req, res) => {
  const start = new Date();
  start.setHours(0,0,0,0);
  const end = new Date(start);
  end.setDate(end.getDate()+1);

  const [patients, appointments, queues, consultations, payments, expenses] = await Promise.all([
    Patient.countDocuments({ status: "active" }),
    Appointment.find({ date: { $gte: start, $lt: end } }).populate("patient doctor"),
    Queue.find({ queueDate: { $gte: start, $lt: end }, status: { $in: ["Waiting","Called","In Consultation"] } }).populate("patient doctor"),
    Consultation.countDocuments({ consultationDate: { $gte: start, $lt: end } }),
    Payment.find({ createdAt: { $gte: start, $lt: end } }),
    Expense.find({ date: { $gte: start, $lt: end } })
  ]);

  const revenue = payments.reduce((sum, p) => sum + Number(p.amountPaid || 0), 0);
  const expenseTotal = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  res.json({
    totalPatients: patients,
    todayAppointments: appointments,
    activeQueue: queues,
    completedConsultations: consultations,
    todayRevenue: revenue,
    todayExpenses: expenseTotal,
    todayNet: revenue - expenseTotal
  });
});

router.get("/summary", async (_req, res) => {
  const [payments, appointments, consultations, expenses, services] = await Promise.all([
    Payment.find(),
    Appointment.find(),
    Consultation.find(),
    Expense.find(),
    Service.find({ status: "active" })
  ]);

  const revenue = payments.reduce((sum,p)=>sum+Number(p.amountPaid||0),0);
  const expenseTotal = expenses.reduce((sum,e)=>sum+Number(e.amount||0),0);
  const statusCounts = appointments.reduce((acc,a)=>{
    acc[a.status]=(acc[a.status]||0)+1;
    return acc;
  },{});

  res.json({
    totalRevenue: revenue,
    totalExpenses: expenseTotal,
    netIncome: revenue - expenseTotal,
    paymentsCount: payments.length,
    consultationsCount: consultations.length,
    servicesCount: services.length,
    appointmentStatus: statusCounts
  });
});

export default router;
