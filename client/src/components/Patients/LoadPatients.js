import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API, getConfig } from '../Common'

const LoadPatients = () => {
  const [allPatients, setAllPatients] = useState([])
  const [search, setSearch] = useState('')
  const [change, setChange] = useState(1)

  useEffect(() => {
    axios
      .get(API + '/patients', getConfig())
      .then((response) => {
        setAllPatients(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const archivePatient = (id) => {
    if (!window.confirm('Archive this patient?')) {
      return
    }

    axios
      .delete(API + '/patients/' + id, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const filteredPatients = allPatients.filter((patient) => {
    const patientText =
      (patient.patientId || '') +
      ' ' +
      patient.firstName +
      ' ' +
      patient.lastName +
      ' ' +
      (patient.contactNumber || '')

    return patientText.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div>
      <h1>Patients</h1>

      <Link className="button-link" to="/patients/add">
        ADD PATIENT
      </Link>

      <input
        className="search"
        placeholder="SEARCH PATIENT"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.map((patient, index) => {
            return (
              <tr key={index}>
                <td>{patient.patientId}</td>
                <td>
                  <Link to={'/patients/' + patient._id}>
                    {patient.firstName} {patient.lastName}
                  </Link>
                </td>
                <td>{patient.sex}</td>
                <td>{patient.contactNumber}</td>
                <td>{patient.status}</td>
                <td>
                  <Link to={'/patients/edit/' + patient._id}>Edit</Link>
                  {' '}
                  <button onClick={() => archivePatient(patient._id)}>
                    Archive
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

export default LoadPatients
