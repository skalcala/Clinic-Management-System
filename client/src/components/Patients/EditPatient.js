import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { API, getConfig } from '../Common'

const EditPatient = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    sex: 'Male',
    address: '',
    contactNumber: '',
    email: '',
    bloodType: '',
    allergies: '',
    medicalConditions: ''
  })

  useEffect(() => {
    axios
      .get(API + '/patients/' + id, getConfig())
      .then((response) => {
        const patient = response.data

        setForm({
          ...patient,
          birthDate: patient.birthDate?.slice(0, 10) || '',
          allergies: (patient.allergies || []).join(','),
          medicalConditions: (patient.medicalConditions || []).join(',')
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  const update = () => {
    const updatedPatient = {
      ...form,
      allergies: form.allergies.split(',').filter(Boolean),
      medicalConditions: form.medicalConditions.split(',').filter(Boolean)
    }

    axios
      .put(API + '/patients/' + id, updatedPatient, getConfig())
      .then(() => {
        navigate('/patients/' + id)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  const fields = [
    'firstName',
    'middleName',
    'lastName',
    'address',
    'contactNumber',
    'email',
    'bloodType',
    'allergies',
    'medicalConditions'
  ]

  return (
    <div>
      <h1>Edit Patient</h1>

      <div className="form-grid">
        {fields.map((field) => {
          return (
            <input
              key={field}
              placeholder={field}
              value={form[field] || ''}
              onChange={(e) => {
                setForm({ ...form, [field]: e.target.value })
              }}
            />
          )
        })}

        <input
          type="date"
          value={form.birthDate || ''}
          onChange={(e) => {
            setForm({ ...form, birthDate: e.target.value })
          }}
        />

        <select
          value={form.sex || 'Male'}
          onChange={(e) => {
            setForm({ ...form, sex: e.target.value })
          }}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <button onClick={update}>UPDATE PATIENT</button>
    </div>
  )
}

export default EditPatient
