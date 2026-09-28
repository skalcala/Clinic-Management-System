import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API, getConfig, fullName } from '../Common'

const AuditLogs = () => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    axios
      .get(API + '/audit', getConfig())
      .then((response) => {
        setRows(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1>Audit Logs</h1>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>User</th>
            <th>Module</th>
            <th>Action</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((audit) => {
            return (
              <tr key={audit._id}>
                <td>{new Date(audit.createdAt).toLocaleString()}</td>
                <td>{audit.user ? fullName(audit.user) : 'System'}</td>
                <td>{audit.module}</td>
                <td>{audit.action}</td>
                <td>{audit.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AuditLogs
