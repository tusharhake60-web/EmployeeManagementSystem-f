import React from "react";

export default function Aboutus() {
  return (
    <div className="container mt-5">
       
      {/* Header */} 
      <div className="text-center mb-5">
         
        <h2 className="fw-bold">About Us</h2> 
        <p className="text-muted">
           
          Simple Employee Management System built with modern technologies 
        </p> 
      </div> 
      {/* Main Card */} 
      <div className="card shadow-lg border-0 p-4 mb-5">
         
        <h4 className="mb-3 text-primary">Employee Management System</h4> 
        <p>
          
          This Employee Management System (EMS) is designed to simplify the
          management of employee data. It allows users to add, update, and
          delete employee records efficiently. 
        </p> 
        <p>
           
          The system is developed using <strong>React</strong> for frontend and 
          <strong> Spring Boot</strong> for backend, providing fast performance
          and secure data handling. 
        </p> 
      </div> 
      {/* Features */} 
      <div className="row text-center mb-5">
         
        <div className="col-md-4 mb-3">
           
          <div className="card shadow-sm p-3 h-100">
             
            <h5 className="text-primary">Manage Employees</h5> 
            <p>Add, update, and delete employee records easily.</p> 
          </div> 
        </div> 
        <div className="col-md-4 mb-3">
           
          <div className="card shadow-sm p-3 h-100">
             
            <h5 className="text-success">Admin Module</h5> 
            <p>Assign and track employee by the admin</p> 
          </div> 
        </div> 
        <div className="col-md-4 mb-3">
           
          <div className="card shadow-sm p-3 h-100">
             
            <h5 className="text-danger">Secure Data</h5> 
            <p>Backend validation ensures safe data handling.</p> 
          </div> 
        </div> 
      </div> 
      {/* Tech Stack */} 
      <div className="card shadow-sm p-4 mb-5">
         
        <h5 className="mb-3">Technology Used</h5> 
        <ul>
           
          <li>Frontend: React (Vite) + Bootstrap</li> 
          <li>Backend: Spring Boot (REST API)</li> <li>Database: MySQL</li> 
        </ul> 
      </div> 
      {/* Footer */} 
      <div className="text-center text-muted mb-4">
         
        <hr /> <p>Developed by You | Java Full Stack Developer</p> 
      </div> 
    </div>
  );
}
