import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API, getConfig } from '../Common'

const AddDoctor = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    specialization: '',
    licenseNumber: '',
    email: '',
    contactNumber: '',
    schedule: '',
    status: 'active'
  })

  const navigate = useNavigate()

  const save = () => {
    axios
      .post(API + '/doctors', form, getConfig())
      .then(() => {
        navigate('/doctors')
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  return (
    <div>
      <h1>Add Doctor</h1>

      <div className="form-grid">
        {Object.keys(form).map((field) => {
          if (field === 'status') {
            return (
              <select
                key={field}
                value={form[field]}
                onChange={(e) => {
                  setForm({ ...form, [field]: e.target.value })
                }}
              >
                <option>active</option>
                <option>inactive</option>
              </select>
            )
          }

          return (
            <input
              key={field}
              placeholder={field}
              value={form[field]}
              onChange={(e) => {
                setForm({ ...form, [field]: e.target.value })
              }}
            />
          )
        })}
      </div>

      <button onClick={save}>ADD DOCTOR</button>
    </div>
  )
}

export default AddDoctor
