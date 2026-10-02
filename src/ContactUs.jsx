import React, { useState } from "react";

export default function ContactUs() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message submitted successfully!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-3">Contact Us</h2>

                <p className="text-center text-muted">
                    Feel free to contact us for any queries or support.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            name="message"
                            className="form-control"
                            rows="4"
                            placeholder="Enter your message"
                            value={form.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Send Message
                    </button>
                </form>

                <hr />

                <div className="text-center">
                    <p className="mb-1"><strong>Email:</strong> support@ems.com</p>
                    <p className="mb-1"><strong>Phone:</strong> +91 9876543210</p>
                    <p className="mb-0"><strong>Location:</strong> Pune, India</p>
                </div>
            </div>
        </div>
    );
}