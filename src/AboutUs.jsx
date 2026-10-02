import React from "react";

export default function AboutUs() {
    return (
        <div className="container mt-5">
            <div className="card shadow p-4">

                <h2 className="text-center mb-4">About Us</h2>

                <p className="text-muted">
                    Welcome to our <strong>Employee Management System</strong>. This
                    application is designed to manage employee data efficiently and
                    simplify HR operations.
                </p>

                <p className="text-muted">
                    Our system allows organizations to handle employee records with ease,
                    including adding new employees, updating details, and removing records
                    when necessary.
                </p>

                <h5 className="mt-4"> Key Features</h5>
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">Add new employees</li>
                    <li className="list-group-item">View employee list</li>
                    <li className="list-group-item">Update employee details</li>
                    <li className="list-group-item">Delete employee records</li>
                    <li className="list-group-item">Search and filter employees</li>
                </ul>

                <h5> Our Mission</h5>
                <p className="text-muted">
                    To provide a simple, user-friendly, and efficient platform that helps
                    organizations manage their workforce effectively.
                </p>

                <h5> Technologies Used</h5>
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">React JS</li>
                    <li className="list-group-item">Bootstrap</li>
                    <li className="list-group-item">REST API / Backend Integration</li>
                </ul>

                <div className="text-end mt-3">
                    <h6 className="text-primary">Developed by: Tushar Hake</h6>
                </div>

            </div>
        </div>
    );
}