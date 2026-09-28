import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, fullName } from '../Common'

const Consultations = () => {
  const [rows, setRows] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [change, setChange] = useState(1)

  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    chiefComplaint: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    notes: '',
    vitals: {
      temperature: '',
      bloodPressure: '',
      heartRate: '',
      weight: '',
      height: ''
    }
  })

  useEffect(() => {
    axios
      .get(API + '/consultations', getConfig())
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

  const save = () => {
    const consultationData = {
      ...form,
      symptoms: form.symptoms.split(',').filter(Boolean)
    }

    axios
      .post(API + '/consultations', consultationData, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  const consultationFields = [
    'chiefComplaint',
    'symptoms',
    'diagnosis',
    'treatment',
    'notes'
  ]

  const vitalFields = [
    'temperature',
    'bloodPressure',
    'heartRate',
    'weight',
    'height'
  ]

  return (
    <div>
      <h1>Consultations</h1>

      <div className="panel">
        <div className="form-grid">
          <select
            onChange={(e) => {
              setForm({ ...form, patient: e.target.value })
            }}
          >
            <option value="">Patient</option>
            {patients.map((patient) => {
              return (
                <option key={patient._id} value={patient._id}>
                  {fullName(patient)}
                </option>
              )
            })}
          </select>

          <select
            onChange={(e) => {
              setForm({ ...form, doctor: e.target.value })
            }}
          >
            <option value="">Doctor</option>
            {doctors.map((doctor) => {
              return (
                <option key={doctor._id} value={doctor._id}>
                  {fullName(doctor)}
                </option>
              )
            })}
          </select>

          {consultationFields.map((field) => {
            return (
              <input
                key={field}
                placeholder={field}
                onChange={(e) => {
                  setForm({ ...form, [field]: e.target.value })
                }}
              />
            )
          })}

          {vitalFields.map((field) => {
            return (
              <input
                key={field}
                placeholder={field}
                onChange={(e) => {
                  setForm({
                    ...form,
                    vitals: {
                      ...form.vitals,
                      [field]: e.target.value
                    }
                  })
                }}
              />
            )
          })}
        </div>

        <button onClick={save}>SAVE CONSULTATION</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Diagnosis</th>
            <th>Treatment</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((consultation) => {
            return (
              <tr key={consultation._id}>
                <td>{consultation.consultationDate?.slice(0, 10)}</td>
                <td>{fullName(consultation.patient)}</td>
                <td>{fullName(consultation.doctor)}</td>
                <td>{consultation.diagnosis}</td>
                <td>{consultation.treatment}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Consultations
