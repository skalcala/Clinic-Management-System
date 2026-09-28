import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API } from './Common'

const Login = () => {
  const [email, setEmail] = useState('admin@clinic.com')
  const [password, setPassword] = useState('Admin123!')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const login = () => {
    const loginData = {
      email,
      password
    }

    axios
      .post(API + '/auth/login', loginData)
      .then((response) => {
        localStorage.setItem(
          'clinic_token',
          response.data.token
        )

        localStorage.setItem(
          'clinic_user',
          JSON.stringify(response.data.user)
        )

        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error)
        setError(
          error.response?.data?.message || 'Failed to login'
        )
      })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Clinic Management System</h1>

        {error && (
          <p className="error">{error}</p>
        )}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Login
