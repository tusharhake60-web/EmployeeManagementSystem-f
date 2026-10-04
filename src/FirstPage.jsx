import React from 'react'
import bg from './bg-1.jpg'
// import bg from './employee123.png'

export default function FirstPage() {
  let app="http://3.110.133.247:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT"
  console.log(app);
  return (
    <div style={{
    backgroundImage: `url(${bg})`,
    height: "89vh",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}>
      {/* <CommonNav/> */}
      <h1 className='heading p-2'><u>Welcome to Employee Management System</u></h1>
    </div>
  )
}
