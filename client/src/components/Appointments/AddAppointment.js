import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API, getConfig, fullName } from '../Common'

const AddAppointment = () => {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
    type: 'Consultation',
    notes: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
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
  }, [])

  const save = () => {
    axios
      .post(API + '/appointments', form, getConfig())
      .then(() => {
        navigate('/appointments')
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  return (
    <div>
      <h1>Add Appointment</h1>

      <div className="form-grid">
        <select
          onChange={(e) => {
            setForm({ ...form, patient: e.target.value })
          }}
        >
          <option value="">SELECT PATIENT</option>
          {patients.map((patient, index) => {
            return (
              <option key={index} value={patient._id}>
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
          <option value="">SELECT DOCTOR</option>
          {doctors.map((doctor, index) => {
            return (
              <option key={index} value={doctor._id}>
                {fullName(doctor)}
              </option>
            )
          })}
        </select>

        <input
          type="date"
          onChange={(e) => {
            setForm({ ...form, date: e.target.value })
          }}
        />

        <input
          type="time"
          onChange={(e) => {
            setForm({ ...form, time: e.target.value })
          }}
        />

        <input
          placeholder="REASON"
          onChange={(e) => {
            setForm({ ...form, reason: e.target.value })
          }}
        />

        <select
          onChange={(e) => {
            setForm({ ...form, type: e.target.value })
          }}
        >
          <option>Consultation</option>
          <option>Follow-up</option>
          <option>Check-up</option>
          <option>Medical Certificate</option>
          <option>Other</option>
        </select>

        <input
          placeholder="NOTES"
          onChange={(e) => {
            setForm({ ...form, notes: e.target.value })
          }}
        />
      </div>

      <button onClick={save}>ADD APPOINTMENT</button>
    </div>
  )
}

export default AddAppointment
