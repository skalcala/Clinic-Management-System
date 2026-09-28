import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, money } from '../Common'

const Reports = () => {
  const [data, setData] = useState({
    appointmentStatus: {}
  })

  useEffect(() => {
    axios
      .get(API + '/reports/summary', getConfig())
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Reports</h1>

      <div className="card-grid">
        <div className="card">
          <h3>Total Revenue</h3>
          <h2>{money(data.totalRevenue)}</h2>
        </div>

        <div className="card">
          <h3>Total Expenses</h3>
          <h2>{money(data.totalExpenses)}</h2>
        </div>

        <div className="card">
          <h3>Net Income</h3>
          <h2>{money(data.netIncome)}</h2>
        </div>

        <div className="card">
          <h3>Payments</h3>
          <h2>{data.paymentsCount || 0}</h2>
        </div>

        <div className="card">
          <h3>Consultations</h3>
          <h2>{data.consultationsCount || 0}</h2>
        </div>

        <div className="card">
          <h3>Active Services</h3>
          <h2>{data.servicesCount || 0}</h2>
        </div>
      </div>

      <div className="panel">
        <h2>Appointment Status</h2>

        {Object.entries(data.appointmentStatus || {}).map(([key, value]) => {
          return (
            <p key={key}>
              {key}: <b>{value}</b>
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default Reports
