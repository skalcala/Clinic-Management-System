import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, money } from '../Common'

const Expenses = () => {
  const [rows, setRows] = useState([])
  const [change, setChange] = useState(1)

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: 'Utilities',
    description: '',
    amount: 0,
    paymentMethod: 'Cash',
    referenceNumber: ''
  })

  useEffect(() => {
    axios
      .get(API + '/expenses', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const save = () => {
    axios
      .post(API + '/expenses', form, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  const totalExpenses = rows.reduce((sum, expense) => {
    return sum + Number(expense.amount || 0)
  }, 0)

  const paymentMethods = ['Cash', 'GCash', 'Maya', 'Card', 'Bank', 'Other']

  return (
    <div>
      <h1>Expenses</h1>

      <div className="panel">
        <div className="form-grid">
          {Object.keys(form).map((field) => {
            if (field === 'paymentMethod') {
              return (
                <select
                  key={field}
                  value={form[field]}
                  onChange={(e) => {
                    setForm({ ...form, [field]: e.target.value })
                  }}
                >
                  {paymentMethods.map((method) => {
                    return <option key={method}>{method}</option>
                  })}
                </select>
              )
            }

            let inputType = 'text'

            if (field === 'date') {
              inputType = 'date'
            }

            if (field === 'amount') {
              inputType = 'number'
            }

            return (
              <input
                key={field}
                type={inputType}
                placeholder={field}
                value={form[field]}
                onChange={(e) => {
                  setForm({ ...form, [field]: e.target.value })
                }}
              />
            )
          })}
        </div>

        <button onClick={save}>RECORD EXPENSE</button>
      </div>

      <h3>Total Expenses: {money(totalExpenses)}</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Method</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((expense) => {
            return (
              <tr key={expense._id}>
                <td>{expense.date?.slice(0, 10)}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{money(expense.amount)}</td>
                <td>{expense.paymentMethod}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Expenses
