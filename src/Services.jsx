import React from "react";

export default function Services() {
  return (
    <div className="container mt-5">
       
      {/* Header */} 
      <div className="text-center mb-5">
         
        <h2 className="fw-bold">Our Services</h2> 
        <p className="text-muted">
           
          What this Employee Management System provides 
        </p> 
      </div> 
      {/* Main Intro Card */} 
      <div className="card shadow-lg border-0 p-4 mb-5">
         
        <h4 className="text-primary mb-3">System Services</h4> 
        <p>
           
          Our system provides essential features to manage employees and system
          operations efficiently. It is designed to be simple, fast, and
          user-friendly. 
        </p> 
      </div> 
      {/* Services Cards */} 
      <div className="row text-center mb-5">
         
        <div className="col-md-4 mb-4">
           
          <div className="card shadow-sm p-3 h-100">
             
            <h5 className="text-primary">Employee Management</h5> 
            <p>Add, update, and delete employee records.</p> 
          </div> 
        </div> 
        <div className="col-md-4 mb-4">
           
          <div className="card shadow-sm p-3 h-100">
             
            <h5 className="text-success">Admin Module</h5> 
            <p>
               
              Manage system access, control user roles, and handle
              administrative operations. 
            </p> 
          </div> 
        </div> 
        <div className="col-md-4 mb-4">
           
          <div className="card shadow-sm p-3 h-100">
             
            <h5 className="text-danger">Data Security</h5> 
            <p>Secure backend ensures safe data handling.</p> 
          </div> 
        </div> 
      </div> 
      {/* Extra Section */} 
      <div className="card shadow-sm p-4 mb-5">
         
        <h5 className="mb-3">Additional Features</h5> 
        <ul>
           
          <li>Search and filter employees</li> 
          <li>Responsive design (mobile-friendly)</li> 
          <li>Easy-to-use interface</li> 
          <li>Fast performance with React & Spring Boot</li> 
        </ul> 
      </div> 
      {/* Footer */} 
      <div className="text-center text-muted mb-4">
         
        <hr /> <p>Developed for efficient employee handling</p> 
      </div> 
    </div>
  );
}

