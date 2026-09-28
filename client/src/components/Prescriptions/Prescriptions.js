import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, fullName } from '../Common'

const Prescriptions = () => {
  const [rows, setRows] = useState([])
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [medicines, setMedicines] = useState([])
  const [change, setChange] = useState(1)

  const [form, setForm] = useState({
    patient: '',
    doctor: '',
    medicine: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    quantity: 1
  })

  useEffect(() => {
    axios
      .get(API + '/prescriptions', getConfig())
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

    axios
      .get(API + '/medicines', getConfig())
      .then((response) => {
        setMedicines(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [change])

  const save = () => {
    const prescriptionData = {
      patient: form.patient,
      doctor: form.doctor,
      medicines: [
        {
          medicine: form.medicine,
          dosage: form.dosage,
          frequency: form.frequency,
          duration: form.duration,
          instructions: form.instructions,
          quantity: Number(form.quantity)
        }
      ]
    }

    axios
      .post(API + '/prescriptions', prescriptionData, getConfig())
      .then(() => {
        setChange(change + 1)
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  const textFields = [
    'dosage',
    'frequency',
    'duration',
    'instructions',
    'quantity'
  ]

  return (
    <div>
      <h1>Prescriptions</h1>

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

          <select
            onChange={(e) => {
              setForm({ ...form, medicine: e.target.value })
            }}
          >
            <option value="">Medicine</option>
            {medicines.map((medicine) => {
              return (
                <option key={medicine._id} value={medicine._id}>
                  {medicine.name}
                </option>
              )
            })}
          </select>

          {textFields.map((field) => {
            return (
              <input
                key={field}
                placeholder={field}
                type={field === 'quantity' ? 'number' : 'text'}
                onChange={(e) => {
                  setForm({ ...form, [field]: e.target.value })
                }}
              />
            )
          })}
        </div>

        <button onClick={save}>SAVE PRESCRIPTION</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Medicines</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((prescription) => {
            const medicineList = (prescription.medicines || [])
              .map((item) => {
                return item.medicine?.name + ' ' + item.dosage
              })
              .join(', ')

            return (
              <tr key={prescription._id}>
                <td>{prescription.date?.slice(0, 10)}</td>
                <td>{fullName(prescription.patient)}</td>
                <td>{fullName(prescription.doctor)}</td>
                <td>{medicineList}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Prescriptions
