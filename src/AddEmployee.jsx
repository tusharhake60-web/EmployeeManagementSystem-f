import React, { useState } from "react";
import axios from "axios";

export default function AddEmployee() {
  // Personal Information
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [contactno, setContactno] = useState("");
  const [gender, setGender] = useState("");
  const [edu, setEdu] = useState("");
  const [address, setAddress] = useState("");
  const [adharno, setAdharno] = useState("");
  const [panno, setPanno] = useState("");
  const [profile, setProfile] = useState("");

  // Work Information
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [exp, setExp] = useState("");
  const [salary, setSalary] = useState("");
  const [worklocation, setWorklocation] = useState("");
  const [reportingmanager, setReportingmanager] = useState("");
  const [status, setStatus] = useState("");
  const [joiningdate, setJoiningdate] = useState("");

  const handleProfile = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Backend profile is String
      const filepath = `./assets/images/${file.name}`;

      setProfile(filepath);
    }
  };

  const validate = () => {
    if (
      firstname === "" ||
      middlename === "" ||
      lastname === "" ||
      email === "" ||
      dob === "" ||
      contactno === "" ||
      gender === "" ||
      edu === "" ||
      address === "" ||
      adharno === "" ||
      panno === "" ||
      profile === "" ||
      designation === "" ||
      department === "" ||
      exp === "" ||
      salary === "" ||
      worklocation === "" ||
      reportingmanager === "" ||
      status === "" ||
      joiningdate === ""
    ) {
      alert("Please fill all fields.");
      return false;
    }

    if (!/^[a-zA-Z]{2,15}$/.test(firstname)) {
      alert("Enter valid First Name.");
      return false;
    }

    if (!/^[a-zA-Z]{2,15}$/.test(middlename)) {
      alert("Enter valid Middle Name.");
      return false;
    }

    if (!/^[a-zA-Z]{2,15}$/.test(lastname)) {
      alert("Enter valid Last Name.");
      return false;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      alert("Enter valid Email.");
      return false;
    }

    if (gender !== "Male" && gender !== "Female") {
      alert("Select valid Gender.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(contactno)) {
      alert("Enter valid 10 digit Contact Number.");
      return false;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panno)) {
      alert("Enter valid PAN Number.");
      return false;
    }

    if (!/^[0-9]{12}$/.test(adharno)) {
      alert("Enter valid 12 digit Aadhar Number.");
      return false;
    }

    if (!/^[A-Za-z .]{2,}$/.test(designation)) {
      alert("Enter valid Designation.");
      return false;
    }

    if (!/^[A-Za-z ]{2,}$/.test(department)) {
      alert("Enter valid Department.");
      return false;
    }

    if (!/^[0-9]{1,2}$/.test(exp)) {
      alert("Enter valid Experience.");
      return false;
    }

    if (!/^[0-9]+(\.[0-9]+)?$/.test(salary)) {
      alert("Enter valid Salary.");
      return false;
    }

    if (!/^[A-Za-z .]{2,}$/.test(reportingmanager)) {
      alert("Enter valid Reporting Manager.");
      return false;
    }

    if (status !== "Active" && status !== "Inactive") {
      alert("Select valid Status.");
      return false;
    }

    return true;
  };

  const addemp = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    // Object field names EXACTLY same as backend Employee entity
    const newdata = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      email: email,
      dob: dob,
      contactno: Number(contactno),
      gender: gender,
      edu: edu,
      address: address,
      adharno: Number(adharno),
      panno: panno,
      profile: profile,

      designation: designation,
      department: department,
      exp: Number(exp),
      salary: Number(salary),
      worklocation: worklocation,
      reportingmanager: reportingmanager,
      status: status,
      joiningdate: joiningdate,
    };

    console.log("Sending Data:", newdata);

    try {
      const response = await axios.post(
        "https://employeemanagementsystem-4z2n.onrender.com/addemp",
        newdata
      );

      console.log("Response:", response.data);

      if (response.data === "Employee Record Added Successfully.") {
        alert(response.data);

        // Reset form
        setFirstname("");
        setMiddlename("");
        setLastname("");
        setEmail("");
        setDob("");
        setContactno("");
        setGender("");
        setEdu("");
        setAddress("");
        setAdharno("");
        setPanno("");
        setProfile("");

        setDesignation("");
        setDepartment("");
        setExp("");
        setSalary("");
        setWorklocation("");
        setReportingmanager("");
        setStatus("");
        setJoiningdate("");
      }
    } catch (error) {
      console.error("POST Error:", error);
      alert("Error in post operation.");
    }
  };

  return (
    <div className="container mt-3 mb-5">
      <form onSubmit={addemp}>

        {/* Title */}
        <h2 className="text-center text-danger bg-warning mb-4 p-2">
          Employee Registration Form
        </h2>

        {/* ================= PERSONAL DETAILS ================= */}
        <h5 className="text-dark border-bottom pb-2 mb-3">
          Personal Details
        </h5>

        <div className="row">

          {/* First Name */}
          <div className="col-md-4 mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          {/* Middle Name */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

        </div>

        <div className="row">

          {/* Email */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* DOB */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Contact No</label>
            <input
              type="text"
              maxLength="10"
              className="form-control"
              value={contactno}
              onChange={(e) => setContactno(e.target.value)}
            />
          </div>

        </div>

        <div className="row">

          {/* Gender */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Gender</label>
            <select
              className="form-control"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Education */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Education</label>
            <input
              type="text"
              className="form-control"
              value={edu}
              onChange={(e) => setEdu(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

        </div>

        <div className="row">

          {/* Aadhar */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Aadhar No</label>
            <input
              type="text"
              maxLength="12"
              className="form-control"
              value={adharno}
              onChange={(e) => setAdharno(e.target.value)}
            />
          </div>

          {/* PAN */}
          <div className="col-md-6 mb-3">
            <label className="form-label">PAN No</label>
            <input
              type="text"
              maxLength="10"
              className="form-control"
              value={panno}
              onChange={(e) =>
                setPanno(e.target.value.toUpperCase())
              }
            />
          </div>

        </div>

        {/* ================= WORK DETAILS ================= */}

        <h5 className="text-dark border-bottom pb-2 mt-4 mb-3">
          Work Details
        </h5>

        <div className="row">

          {/* Designation */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className="form-control"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          {/* Department */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div className="col-md-4 mb-3">
            <label className="form-label">
              Experience (Years)
            </label>
            <input
              type="number"
              className="form-control"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
            />
          </div>

        </div>

        <div className="row">

          {/* Salary */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          {/* Work Location */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Work Location</label>
            <input
              type="text"
              className="form-control"
              value={worklocation}
              onChange={(e) => setWorklocation(e.target.value)}
            />
          </div>

          {/* Reporting Manager */}
          <div className="col-md-4 mb-3">
            <label className="form-label">
              Reporting Manager
            </label>
            <input
              type="text"
              className="form-control"
              value={reportingmanager}
              onChange={(e) =>
                setReportingmanager(e.target.value)
              }
            />
          </div>

        </div>

        <div className="row">

          {/* Status */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Status</label>

            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Joining Date */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Joining Date
            </label>

            <input
              type="date"
              className="form-control"
              value={joiningdate}
              onChange={(e) =>
                setJoiningdate(e.target.value)
              }
            />
          </div>

        </div>

        {/* ================= PROFILE ================= */}

        <div className="mb-3">
          <label className="form-label">
            Profile Image
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleProfile}
          />
        </div>

        {/* Profile Preview */}
        {profile && (
          <div className="mb-3">
            <label className="form-label">
              Profile Preview
            </label>

            <div>
              <img
                src={profile}
                alt="Profile"
                className="rounded-circle img-fluid"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary px-5"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}
