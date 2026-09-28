import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, fullName } from '../Common'

const Users = () => {
  const [rows, setRows] = useState([])
  const [change, setChange] = useState(1)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'receptionist',
    contactNumber: ''
  })

  useEffect(() => {
    axios
      .get(API + '/users', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const save = () => {
    axios
      .post(API + '/users', form, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  const fields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'contactNumber'
  ]

  return (
    <div>
      <h1>Users</h1>

      <div className="panel">
        <div className="form-grid">
          {fields.map((field) => {
            return (
              <input
                key={field}
                type={field === 'password' ? 'password' : 'text'}
                placeholder={field}
                onChange={(e) => {
                  setForm({ ...form, [field]: e.target.value })
                }}
              />
            )
          })}

          <select
            onChange={(e) => {
              setForm({ ...form, role: e.target.value })
            }}
          >
            <option value="receptionist">Receptionist</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button onClick={save}>CREATE USER</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((user) => {
            return (
              <tr key={user._id}>
                <td>{fullName(user)}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
