import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, fullName } from '../Common'

const QueuePage = () => {
  const [rows, setRows] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patient, setPatient] = useState('')
  const [doctor, setDoctor] = useState('')
  const [change, setChange] = useState(1)

  useEffect(() => {
    axios
      .get(API + '/queue', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get(API + '/patients', getConfig())
      .then((response) => {
        setPatients(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get(API + '/doctors', getConfig())
      .then((response) => {
        setDoctors(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const add = () => {
    axios
      .post(API + '/queue', { patient, doctor }, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateStatus = (id, status) => {
    axios
      .patch(API + '/queue/' + id + '/status', { status }, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const statusOptions = [
    'Waiting',
    'Called',
    'In Consultation',
    'Completed',
    'Skipped',
    'Cancelled'
  ]

  return (
    <div>
      <h1>Queue</h1>

      <div className="panel">
        <select onChange={(e) => setPatient(e.target.value)}>
          <option value="">Patient</option>
          {patients.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {fullName(item)}
              </option>
            )
          })}
        </select>

        <select onChange={(e) => setDoctor(e.target.value)}>
          <option value="">Doctor</option>
          {doctors.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {fullName(item)}
              </option>
            )
          })}
        </select>

        <button onClick={add}>ADD TO QUEUE</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Queue</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((queue) => {
            return (
              <tr key={queue._id}>
                <td>{queue.queueNumber}</td>
                <td>{fullName(queue.patient)}</td>
                <td>{fullName(queue.doctor)}</td>
                <td>{queue.status}</td>
                <td>
                  {statusOptions.map((status) => {
                    return (
                      <button
                        key={status}
                        onClick={() => updateStatus(queue._id, status)}
                      >
                        {status}
                      </button>
                    )
                  })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default QueuePage
