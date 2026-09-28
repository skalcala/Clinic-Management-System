# Clinic Management System - React + Node.js + Express + MongoDB

This version was refactored to follow the same coding structure as the class examples provided by the user.

## Frontend coding style

- Create React App (not Vite)
- `axios` for API calls
- `useState` for component state
- `useEffect` for loading data
- `BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`
- Separate components/files such as `LoadPatients`, `AddPatient`, `ShowPatient`, `EditPatient`
- `.map()` for displaying records
- `.filter()` for searching/filtering
- `.reduce()` for totals/reports
- `.then()` and `.catch()` for Axios requests
- Plain CSS design

## Stack

Frontend: React JS (Create React App)
Backend: Node.js + Express.js
Database: MongoDB + Mongoose
API: Custom REST API using Express

## Port setup

- React: http://localhost:3000
- Express API: http://localhost:5001
- MongoDB: mongodb://127.0.0.1:27017/clinicDB

Port 5001 is used because macOS AirPlay/AirTunes commonly occupies port 5000 on this machine.

## Install and Run

### 1. Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Expected:

```text
MongoDB connected
Server running on http://localhost:5001
```

### 2. Frontend

Open another Terminal:

```bash
cd client
cp .env.example .env
npm install
npm start
```

Open http://localhost:3000

## Default Admin

Email: admin@clinic.com
Password: Admin123!

## Main Modules

- Dashboard
- Patients: Load / Add / Show / Edit / Archive
- Doctors: Load / Add / Show / Edit / Inactivate
- Appointments
- Queue
- Consultations
- Prescriptions
- Medicines
- Services and fees
- Payments
- Expenses
- Reports
- User Management
- Audit Logs

## Main frontend structure

```text
client/src/
├── App.js
├── App.css
├── index.js
└── components/
    ├── AppController.js
    ├── Login.js
    ├── Dashboard.js
    ├── Common.js
    ├── Patients/
    │   ├── LoadPatients.js
    │   ├── AddPatient.js
    │   ├── ShowPatient.js
    │   └── EditPatient.js
    ├── Doctors/
    │   ├── LoadDoctors.js
    │   ├── AddDoctor.js
    │   ├── ShowDoctor.js
    │   └── EditDoctor.js
    ├── Appointments/
    ├── Queue/
    ├── Consultations/
    ├── Prescriptions/
    ├── Medicines/
    ├── Services/
    ├── Payments/
    ├── Expenses/
    ├── Reports/
    ├── Users/
    └── Audit/
```

The backend keeps the custom REST API and MongoDB models/routes.


## Code formatting update

The React source files were reformatted for classroom readability:

- one import per readable line/group
- state declarations are separated
- `useEffect()` API calls are indented
- `.then()` and `.catch()` chains are placed on separate lines
- JSX elements are expanded instead of being compressed into one line
- `.map()`, `.filter()`, and `.reduce()` callbacks are easier to follow
- event handlers such as `onChange` and `onClick` use clear indentation
- long object literals and form data are split across multiple lines

No clinic workflow was intentionally removed by this formatting update.

## Render deployment

For the backend Render Web Service, use the `server` directory as the Root Directory.

Build Command:

```bash
npm install
```

Start Command:

```bash
npm start
```

Add these Render Environment variables (enter only the VALUE in the Value field; do not paste `KEY=` again):

```text
MONGODB_URI=mongodb+srv://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_CLUSTER.mongodb.net/clinicDB?retryWrites=true&w=majority
JWT_SECRET=use-a-long-random-secret
CLIENT_URL=https://YOUR-FRONTEND.vercel.app
DEFAULT_ADMIN_EMAIL=admin@clinic.com
DEFAULT_ADMIN_PASSWORD=use-a-strong-password
NODE_ENV=production
```

The backend accepts either `MONGODB_URI` or the older `MONGO_URI`, but `MONGODB_URI` is recommended.

For Vercel, add this frontend environment variable:

```text
REACT_APP_API_URL=https://YOUR-RENDER-SERVICE.onrender.com/api
```

Then redeploy the frontend after changing the variable.

## Current deployment configuration

The React production build is configured to use this Render backend:

`https://clinic-management-system-pq7y.onrender.com/api`

For Vercel, set the project root to the repository root. The included `vercel.json` builds the `client` folder and serves `client/build`.

Recommended Vercel environment variable:

`REACT_APP_API_URL=https://clinic-management-system-pq7y.onrender.com/api`

After Vercel gives you the frontend URL, set the Render backend environment variable `CLIENT_URL` to that exact Vercel origin, for example `https://your-project.vercel.app`, and redeploy Render.
