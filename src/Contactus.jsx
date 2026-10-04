import React from "react";

export default function Contactus() {
  return (
    <div className="container mt-5">
       
      {/* Header */} 
      <div className="text-center mb-5">
         
        <h2 className="fw-bold">Contact Us</h2> 
        <p className="text-muted">
           
          Get in touch with us for any queries or support 
        </p> 
      </div> 
      <div className="row">
         
        {/* Contact Form */} 
        <div className="col-md-6 mb-4">
           
          <div className="card shadow-lg border-0 p-4 h-100">
             
            <h5 className="mb-3">Send Message</h5> 
            <form>
               
              <div className="mb-3">
                 
                <label className="form-label">Name</label> 
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                /> 
              </div> 
              <div className="mb-3">
                 
                <label className="form-label">Email</label> 
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                /> 
              </div> 
              <div className="mb-3">
                 
                <label className="form-label">Message</label> 
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea> 
              </div> 
              <button className="btn btn-primary w-100">Send</button> 
            </form> 
          </div> 
        </div> 
        {/* Contact Info */} 
        <div className="col-md-6 mb-4">
           
          <div className="card shadow-sm p-4 h-100">
             
            <h5 className="mb-3">Contact Information</h5> 
            <p>
              <strong>Email:</strong> support@ems.com
            </p> 
            <p>
              <strong>Phone:</strong> +91 9876543210
            </p> 
            <p>
              <strong>Location:</strong> Pune, India
            </p> 
            <hr /> 
            <p className="text-muted">
               
              We are here to help you. Feel free to contact us for any issues
              related to the Employee Management System. 
            </p> 
          </div> 
        </div> 
      </div> 
      {/* Footer */} 
      <div className="text-center text-muted mt-4">
         
        <hr /> <p>We will respond as soon as possible</p> 
      </div> 
    </div>
  );
}
