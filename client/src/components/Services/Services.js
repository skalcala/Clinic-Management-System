import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, money } from '../Common'

const Services = () => {
  const [rows, setRows] = useState([])
  const [change, setChange] = useState(1)

  const [form, setForm] = useState({
    name: '',
    category: 'General',
    description: '',
    price: 0,
    durationMinutes: 30,
    status: 'active'
  })

  useEffect(() => {
    axios
      .get(API + '/services', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const save = () => {
    axios
      .post(API + '/services', form, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  return (
    <div>
      <h1>Services</h1>

      <div className="panel">
        <div className="form-grid">
          {Object.keys(form).map((field) => {
            if (field === 'status') {
              return (
                <select
                  key={field}
                  onChange={(e) => {
                    setForm({ ...form, [field]: e.target.value })
                  }}
                >
                  <option>active</option>
                  <option>inactive</option>
                </select>
              )
            }

            const inputType =
              field === 'price' || field === 'durationMinutes'
                ? 'number'
                : 'text'

            return (
              <input
                key={field}
                type={inputType}
                placeholder={field}
                onChange={(e) => {
                  setForm({ ...form, [field]: e.target.value })
                }}
              />
            )
          })}
        </div>

        <button onClick={save}>ADD SERVICE</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((service) => {
            return (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.description}</td>
                <td>{money(service.price)}</td>
                <td>{service.durationMinutes} min</td>
                <td>{service.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Services
