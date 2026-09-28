import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API, getConfig } from '../Common'

const AddPatient = () => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [sex, setSex] = useState('Male')
  const [address, setAddress] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [allergies, setAllergies] = useState('')
  const [medicalConditions, setMedicalConditions] = useState('')

  const navigate = useNavigate()

  const addPatient = () => {
    const patientData = {
      firstName,
      middleName,
      lastName,
      birthDate,
      sex,
      address,
      contactNumber,
      email,
      bloodType,
      allergies: allergies.split(',').filter(Boolean),
      medicalConditions: medicalConditions.split(',').filter(Boolean)
    }

    axios
      .post(API + '/patients', patientData, getConfig())
      .then(() => {
        window.alert('Patient added')
        navigate('/patients')
      })
      .catch((error) => {
        window.alert(error.response?.data?.message || 'Error')
      })
  }

  return (
    <div>
      <h1>Add Patient</h1>

      <div className="form-grid">
        <input
          placeholder="FIRST NAME"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          placeholder="MIDDLE NAME"
          onChange={(e) => setMiddleName(e.target.value)}
        />

        <input
          placeholder="LAST NAME"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="date"
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <select onChange={(e) => setSex(e.target.value)}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          placeholder="ADDRESS"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          placeholder="CONTACT"
          onChange={(e) => setContactNumber(e.target.value)}
        />

        <input
          placeholder="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="BLOOD TYPE"
          onChange={(e) => setBloodType(e.target.value)}
        />

        <input
          placeholder="ALLERGIES comma separated"
          onChange={(e) => setAllergies(e.target.value)}
        />

        <input
          placeholder="MEDICAL CONDITIONS comma separated"
          onChange={(e) => setMedicalConditions(e.target.value)}
        />
      </div>

      <button onClick={addPatient}>ADD PATIENT</button>
      {' '}
      <Link to="/patients">BACK</Link>
    </div>
  )
}

export default AddPatient
