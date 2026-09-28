import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import User from "./models/User.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL
]
  .filter(Boolean)
  .flatMap((origin) => origin.split(","))
  .map((origin) => origin.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true
  })
);

app.use(express.json());


app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Clinic Management System API is running",
    health: "/api/health"
  });
});


app.get(
  "/api/health",
  (req, res) => {

    res.json({
      ok: true,
      name: "Clinic Management System API"
    });

  }
);


app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/patients", patientRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/queue", queueRoutes);

app.use(
  "/api/consultations",
  consultationRoutes
);

app.use(
  "/api/prescriptions",
  prescriptionRoutes
);

app.use(
  "/api/medicines",
  medicineRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/audit",
  auditRoutes
);

app.use(
  "/api/services",
  serviceRoutes
);

app.use(
  "/api/expenses",
  expenseRoutes
);


app.use(
  (req, res) => {

    res.status(404).json({
      message: "API route not found"
    });

  }
);


app.use(
  (err, req, res, next) => {

    console.error(
      "SERVER ERROR:",
      err
    );

    res.status(500).json({
      message:
        err.message ||
        "Server error"
    });

  }
);


const startServer = async () => {

  try {

    console.log(
      "Starting Clinic Management System..."
    );


    console.log(
      "Connecting to MongoDB..."
    );


    await connectDB();


    const adminEmail =
      process.env.DEFAULT_ADMIN_EMAIL ||
      "admin@clinic.com";


    const adminPassword =
      process.env.DEFAULT_ADMIN_PASSWORD ||
      "Admin123!";


    const existingAdmin =
      await User.findOne({
        email: adminEmail
      });


    if (!existingAdmin) {

      await User.create({

        firstName: "System",

        lastName: "Admin",

        email: adminEmail,

        password: adminPassword,

        role: "admin",

        status: "active"

      });


      console.log(
        "Default admin created"
      );

    }


    const PORT = Number(process.env.PORT) || 5001;


    app.listen(
      PORT,
      "0.0.0.0",
      () => {

        console.log(
          `Server running on port ${PORT}`
        );

      }
    );

  }

  catch (error) {

    console.error(
      "FAILED TO START SERVER:"
    );

    console.error(
      error
    );

  }

};


startServer();
