import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { API, getConfig } from '../Common'

const EditDoctor = () => {
  const { id } = useParams()
  const navigate = useNavigate()

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

  useEffect(() => {
    axios
      .get(API + '/doctors/' + id, getConfig())
      .then((response) => {
        setForm(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  const save = () => {
    axios
      .put(API + '/doctors/' + id, form, getConfig())
      .then(() => {
        navigate('/doctors/' + id)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  const fields = Object.keys(form).filter((field) => {
    const ignoredFields = ['createdAt', 'updatedAt', 'doctorId', '__v']
    return !field.startsWith('_') && !ignoredFields.includes(field)
  })

  return (
    <div>
      <h1>Edit Doctor</h1>

      <div className="form-grid">
        {fields.map((field) => {
          if (field === 'status') {
            return (
              <select
                key={field}
                value={form[field] || ''}
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
              value={form[field] || ''}
              onChange={(e) => {
                setForm({ ...form, [field]: e.target.value })
              }}
            />
          )
        })}
      </div>

      <button onClick={save}>UPDATE DOCTOR</button>
    </div>
  )
}

export default EditDoctor
