import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const API =
  process.env.REACT_APP_API_URL || 'http://localhost:5001/api'

export const getConfig = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('clinic_token')
    }
  }
}

export const fullName = (person) => {
  if (!person) {
    return '-'
  }

  return (person.firstName + ' ' + person.lastName).trim()
}

export const money = (amount) => {
  return (
    '₱' +
    Number(amount || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  )
}

export const Layout = ({ children }) => {
  const navigate = useNavigate()
  const user = JSON.parse(
    localStorage.getItem('clinic_user') || 'null'
  )

  const logout = () => {
    localStorage.removeItem('clinic_token')
    localStorage.removeItem('clinic_user')
    navigate('/')
  }

  if (!user) {
    return children
  }

  return (
    <div className="layout">
      <div className="sidebar">
        <h2>Clinic Management System</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/queue">Queue</Link>
        <Link to="/consultations">Consultations</Link>
        <Link to="/prescriptions">Prescriptions</Link>
        <Link to="/medicines">Medicines</Link>
        <Link to="/services">Services</Link>
        <Link to="/payments">Payments</Link>
        <Link to="/reports">Reports</Link>

        {user.role === 'admin' && (
          <Link to="/expenses">Expenses</Link>
        )}

        {user.role === 'admin' && (
          <Link to="/users">Users</Link>
        )}

        {user.role === 'admin' && (
          <Link to="/audit">Audit Logs</Link>
        )}

        <button onClick={logout}>Logout</button>
      </div>

      <div className="main-content">
        <div className="topbar">
          <span>
            {user.firstName} {user.lastName}
          </span>
          <span>{user.role}</span>
        </div>

        {children}
      </div>
    </div>
  )
}
