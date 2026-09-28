import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { API, getConfig } from '../Common'

const ShowDoctor = () => {
  const { id } = useParams()
  const [doctor, setDoctor] = useState({})

  useEffect(() => {
    axios
      .get(API + '/doctors/' + id, getConfig())
      .then((response) => {
        setDoctor(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return (
    <div>
      <h1>Doctor Information</h1>

      <p>ID: {doctor.doctorId}</p>
      <p>
        Name: {doctor.firstName} {doctor.lastName}
      </p>
      <p>Specialization: {doctor.specialization}</p>
      <p>License: {doctor.licenseNumber}</p>
      <p>Email: {doctor.email}</p>
      <p>Contact: {doctor.contactNumber}</p>
      <p>Schedule: {doctor.schedule}</p>

      <Link to={'/doctors/edit/' + id}>EDIT</Link>
      {' | '}
      <Link to="/doctors">BACK</Link>
    </div>
  )
}

export default ShowDoctor
