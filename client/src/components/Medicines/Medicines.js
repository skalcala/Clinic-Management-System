import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig } from '../Common'

const Medicines = () => {
  const [rows, setRows] = useState([])
  const [change, setChange] = useState(1)

  const [form, setForm] = useState({
    name: '',
    genericName: '',
    category: '',
    dosageForm: '',
    strength: '',
    stock: 0,
    unit: 'pcs',
    expirationDate: ''
  })

  useEffect(() => {
    axios
      .get(API + '/medicines', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const save = () => {
    axios
      .post(API + '/medicines', form, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  return (
    <div>
      <h1>Medicines</h1>

      <div className="panel">
        <div className="form-grid">
          {Object.keys(form).map((field) => {
            let inputType = 'text'

            if (field === 'stock') {
              inputType = 'number'
            }

            if (field === 'expirationDate') {
              inputType = 'date'
            }

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

        <button onClick={save}>ADD MEDICINE</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Generic</th>
            <th>Strength</th>
            <th>Stock</th>
            <th>Expiration</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((medicine) => {
            return (
              <tr key={medicine._id}>
                <td>{medicine.name}</td>
                <td>{medicine.genericName}</td>
                <td>{medicine.strength}</td>
                <td>
                  {medicine.stock} {medicine.unit}
                </td>
                <td>{medicine.expirationDate?.slice(0, 10)}</td>
                <td>{medicine.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Medicines
