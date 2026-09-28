import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  API,
  getConfig,
  money,
  fullName
} from './Common'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    todayAppointments: [],
    activeQueue: []
  })

  useEffect(() => {
    axios
      .get(API + '/reports/dashboard', getConfig())
      .then((response) => {
        setDashboard(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h3>Total Patients</h3>
          <h2>{dashboard.totalPatients || 0}</h2>
        </div>

        <div className="card">
          <h3>Today's Appointments</h3>
          <h2>{dashboard.todayAppointments?.length || 0}</h2>
        </div>

        <div className="card">
          <h3>Active Queue</h3>
          <h2>{dashboard.activeQueue?.length || 0}</h2>
        </div>

        <div className="card">
          <h3>Consultations</h3>
          <h2>{dashboard.completedConsultations || 0}</h2>
        </div>

        <div className="card">
          <h3>Today's Revenue</h3>
          <h2>{money(dashboard.todayRevenue)}</h2>
        </div>

        <div className="card">
          <h3>Today's Expenses</h3>
          <h2>{money(dashboard.todayExpenses)}</h2>
        </div>

        <div className="card">
          <h3>Today's Net</h3>
          <h2>{money(dashboard.todayNet)}</h2>
        </div>
      </div>

      <div className="panel">
        <h2>Today's Appointments</h2>

        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.todayAppointments?.map(
              (appointment, index) => {
                return (
                  <tr key={index}>
                    <td>{appointment.appointmentNumber}</td>
                    <td>{fullName(appointment.patient)}</td>
                    <td>{fullName(appointment.doctor)}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.status}</td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
