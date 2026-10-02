import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CommanNavbar() {
    const navigate = useNavigate();

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark shadow-lg sticky-top"
            style={{
                background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)"
            }}
        >
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center" to="/home">
                    <img
                        src="https://imgs.search.brave.com/pfq83l9bN5IIveEo46884S1TAmPI8ItSg8zQMgr00K8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS81MjMt/NTIzMzM3OV9lbXBs/b3llZS1tYW5hZ2Vt/ZW50LXN5c3RlbS1s/b2dvLWhkLXBuZy1k/b3dubG9hZC5wbmc"
                        alt="Logo"
                        width="50"
                        height="50"
                        className="rounded-circle border border-light"
                    />

                    <span className="ms-2 fw-bold fs-4 text-warning">
                        EMS
                    </span>
                </Link>

                {/* Mobile Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Items */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mx-auto">

                        <li className="nav-item">
                            <Link className="nav-link px-3 fw-semibold" to="/home">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link px-3 fw-semibold" to="/aboutus">
                                About Us
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link px-3 fw-semibold" to="/services">
                                Services
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link px-3 fw-semibold" to="/contactus">
                                Contact Us
                            </Link>
                        </li>

                    </ul>

                    {/* Register Button */}
                    <button
                        className="btn btn-warning fw-bold rounded-pill px-4"
                        onClick={() => navigate("/registeruser")}
                    >
                        Register / Login
                    </button>

                </div>

            </div>
        </nav>
    );
}