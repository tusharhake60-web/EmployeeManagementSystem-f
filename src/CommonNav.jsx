import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from './logo.jpg'

export default function CommonNav() {
  let navigate=useNavigate()
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid gap-lg-4">
          <div className="d-flex align-items-center">
            <img className="logo mx-3" src={logo} alt="Logo" />
          </div>
          <button
            className="navbar-toggler text-bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-center">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link">
                  Our Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contactus" className="nav-link">
                  Contact us
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center mt-3 mt-lg-0 pe-lg-3">
              <button className='btn text-white fw-bold px-4' style={{backgroundColor: '#0ea5e9'}} onClick={()=>{navigate("/registeruser")}}>Login/Register</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
