import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { API, getConfig } from '../Common'

const ShowPatient = () => {
  const { id } = useParams()
  const [thePatient, setThePatient] = useState({})

  useEffect(() => {
    axios
      .get(API + '/patients/' + id, getConfig())
      .then((response) => {
        setThePatient(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return (
    <div>
      <h1>PATIENT INFORMATION</h1>

      <p>Patient ID: {thePatient.patientId}</p>
      <p>
        Name: {thePatient.firstName} {thePatient.middleName} {thePatient.lastName}
      </p>
      <p>Birth Date: {thePatient.birthDate?.slice(0, 10)}</p>
      <p>Sex: {thePatient.sex}</p>
      <p>Contact: {thePatient.contactNumber}</p>
      <p>Email: {thePatient.email}</p>
      <p>Address: {thePatient.address}</p>
      <p>Blood Type: {thePatient.bloodType}</p>
      <p>Allergies: {(thePatient.allergies || []).join(', ')}</p>
      <p>
        Medical Conditions: {(thePatient.medicalConditions || []).join(', ')}
      </p>

      <Link to={'/patients/edit/' + id}>EDIT</Link>
      {' | '}
      <Link to="/patients">BACK</Link>
    </div>
  )
}

export default ShowPatient
