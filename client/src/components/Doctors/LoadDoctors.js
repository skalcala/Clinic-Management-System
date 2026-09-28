import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API, getConfig } from '../Common'

const LoadDoctors = () => {
  const [rows, setRows] = useState([])
  const [change, setChange] = useState(1)

  useEffect(() => {
    axios
      .get(API + '/doctors', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const remove = (id) => {
    if (!window.confirm('Set doctor inactive?')) {
      return
    }

    axios
      .delete(API + '/doctors/' + id, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <h1>Doctors</h1>

      <Link className="button-link" to="/doctors/add">
        ADD DOCTOR
      </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Schedule</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((doctor, index) => {
            return (
              <tr key={index}>
                <td>{doctor.doctorId}</td>
                <td>
                  <Link to={'/doctors/' + doctor._id}>
                    {doctor.firstName} {doctor.lastName}
                  </Link>
                </td>
                <td>{doctor.specialization}</td>
                <td>{doctor.schedule}</td>
                <td>{doctor.status}</td>
                <td>
                  <Link to={'/doctors/edit/' + doctor._id}>Edit</Link>
                  {' '}
                  <button onClick={() => remove(doctor._id)}>
                    Inactive
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

export default LoadDoctors
