import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard'

import LoadPatients from './Patients/LoadPatients'
import AddPatient from './Patients/AddPatient'
import ShowPatient from './Patients/ShowPatient'
import EditPatient from './Patients/EditPatient'

import LoadDoctors from './Doctors/LoadDoctors'
import AddDoctor from './Doctors/AddDoctor'
import ShowDoctor from './Doctors/ShowDoctor'
import EditDoctor from './Doctors/EditDoctor'

import LoadAppointments from './Appointments/LoadAppointments'
import AddAppointment from './Appointments/AddAppointment'

import QueuePage from './Queue/QueuePage'
import Consultations from './Consultations/Consultations'
import Prescriptions from './Prescriptions/Prescriptions'
import Medicines from './Medicines/Medicines'
import Services from './Services/Services'
import Payments from './Payments/Payments'
import Expenses from './Expenses/Expenses'
import Reports from './Reports/Reports'
import Users from './Users/Users'
import AuditLogs from './Audit/AuditLogs'

import { Layout } from './Common'

const Protected = ({ children }) => {
  const token = localStorage.getItem('clinic_token')

  if (!token) {
    return <Navigate to="/" />
  }

  return <Layout>{children}</Layout>
}

const AppController = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        <Route
          path="/patients"
          element={
            <Protected>
              <LoadPatients />
            </Protected>
          }
        />

        <Route
          path="/patients/add"
          element={
            <Protected>
              <AddPatient />
            </Protected>
          }
        />

        <Route
          path="/patients/:id"
          element={
            <Protected>
              <ShowPatient />
            </Protected>
          }
        />

        <Route
          path="/patients/edit/:id"
          element={
            <Protected>
              <EditPatient />
            </Protected>
          }
        />

        <Route
          path="/doctors"
          element={
            <Protected>
              <LoadDoctors />
            </Protected>
          }
        />

        <Route
          path="/doctors/add"
          element={
            <Protected>
              <AddDoctor />
            </Protected>
          }
        />

        <Route
          path="/doctors/:id"
          element={
            <Protected>
              <ShowDoctor />
            </Protected>
          }
        />

        <Route
          path="/doctors/edit/:id"
          element={
            <Protected>
              <EditDoctor />
            </Protected>
          }
        />

        <Route
          path="/appointments"
          element={
            <Protected>
              <LoadAppointments />
            </Protected>
          }
        />

        <Route
          path="/appointments/add"
          element={
            <Protected>
              <AddAppointment />
            </Protected>
          }
        />

        <Route
          path="/queue"
          element={
            <Protected>
              <QueuePage />
            </Protected>
          }
        />

        <Route
          path="/consultations"
          element={
            <Protected>
              <Consultations />
            </Protected>
          }
        />

        <Route
          path="/prescriptions"
          element={
            <Protected>
              <Prescriptions />
            </Protected>
          }
        />

        <Route
          path="/medicines"
          element={
            <Protected>
              <Medicines />
            </Protected>
          }
        />

        <Route
          path="/services"
          element={
            <Protected>
              <Services />
            </Protected>
          }
        />

        <Route
          path="/payments"
          element={
            <Protected>
              <Payments />
            </Protected>
          }
        />

        <Route
          path="/expenses"
          element={
            <Protected>
              <Expenses />
            </Protected>
          }
        />

        <Route
          path="/reports"
          element={
            <Protected>
              <Reports />
            </Protected>
          }
        />

        <Route
          path="/users"
          element={
            <Protected>
              <Users />
            </Protected>
          }
        />

        <Route
          path="/audit"
          element={
            <Protected>
              <AuditLogs />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppController
