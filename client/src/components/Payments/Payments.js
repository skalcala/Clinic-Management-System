import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, fullName, money } from '../Common'

const Payments = () => {
  const [rows, setRows] = useState([])
  const [patients, setPatients] = useState([])
  const [change, setChange] = useState(1)

  const [form, setForm] = useState({
    patient: '',
    description: 'Consultation Fee',
    amount: 0,
    discount: 0,
    amountPaid: 0,
    paymentMethod: 'Cash'
  })

  useEffect(() => {
    axios
      .get(API + '/payments', getConfig())
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
  }, [change])

  const save = () => {
    const paymentData = {
      patient: form.patient,
      items: [
        {
          description: form.description,
          amount: Number(form.amount)
        }
      ],
      discount: Number(form.discount),
      amountPaid: Number(form.amountPaid),
      paymentMethod: form.paymentMethod
    }

    axios
      .post(API + '/payments', paymentData, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  const paymentMethods = ['Cash', 'GCash', 'Maya', 'Card', 'Other']

  return (
    <div>
      <h1>Payments</h1>

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

          <input
            placeholder="Description"
            onChange={(e) => {
              setForm({ ...form, description: e.target.value })
            }}
          />

          <input
            type="number"
            placeholder="Amount"
            onChange={(e) => {
              setForm({ ...form, amount: e.target.value })
            }}
          />

          <input
            type="number"
            placeholder="Discount"
            onChange={(e) => {
              setForm({ ...form, discount: e.target.value })
            }}
          />

          <input
            type="number"
            placeholder="Amount Paid"
            onChange={(e) => {
              setForm({ ...form, amountPaid: e.target.value })
            }}
          />

          <select
            onChange={(e) => {
              setForm({ ...form, paymentMethod: e.target.value })
            }}
          >
            {paymentMethods.map((method) => {
              return <option key={method}>{method}</option>
            })}
          </select>
        </div>

        <button onClick={save}>SAVE PAYMENT</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Receipt</th>
            <th>Patient</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Balance</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((payment) => {
            return (
              <tr key={payment._id}>
                <td>{payment.receiptNumber}</td>
                <td>{fullName(payment.patient)}</td>
                <td>{money(payment.total)}</td>
                <td>{money(payment.amountPaid)}</td>
                <td>{money(payment.balance)}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Payments
