import React from 'react'
import bg from './bg-1.jpg'

export default function AdminDashboard() {
  return (
    <div style={{
            backgroundImage: `url(${bg})`,
            height: "89vh",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
      <h1 className='heading'><u>Welcome to Admin Dashboard</u></h1>
    </div>
  )
}
