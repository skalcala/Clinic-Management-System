import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API, getConfig, fullName } from '../Common'

const LoadAppointments = () => {
  const [rows, setRows] = useState([])
  const [change, setChange] = useState(1)

  useEffect(() => {
    axios
      .get(API + '/appointments', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const cancel = (id) => {
    if (!window.confirm('Cancel appointment?')) {
      return
    }

    axios
      .delete(API + '/appointments/' + id, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>Appointments</h1>

      <Link className="button-link" to="/appointments/add">
        ADD APPOINTMENT
      </Link>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((appointment, index) => {
            return (
              <tr key={index}>
                <td>{appointment.appointmentNumber}</td>
                <td>{fullName(appointment.patient)}</td>
                <td>{fullName(appointment.doctor)}</td>
                <td>{appointment.date?.slice(0, 10)}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => cancel(appointment._id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LoadAppointments
