import React from 'react'
import EmpNavbar from './EmpNavbar'

export default function EmployeeDashboard() {
    return (
        <div className='empdash' style={{ "height": "100vh", "width": "100%" }}>
            <EmpNavbar></EmpNavbar>

            <h1 className='heading'>Welcome Employee Dashboard</h1>
        </div>
    )
}
