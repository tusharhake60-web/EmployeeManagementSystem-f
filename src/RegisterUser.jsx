import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [islogin, setislogin] = useState(false);

  // User entity fields
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [contactno, setcontactno] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [role, setrole] = useState("");
  const [gender, setgender] = useState("");
  const [empid, setempid] = useState("");

  const navigate = useNavigate();

  // -----------------------------
  // Registration Validation
  // -----------------------------
  const validation = () => {
    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      contactno.trim() === "" ||
      username.trim() === "" ||
      password === "" ||
      confirmpassword === "" ||
      role === "" ||
      gender === "" ||
      empid === ""
    ) {
      alert("Please fill all required fields.");
      return false;
    }

    if (!/^[a-zA-Z]{2,}$/.test(firstname)) {
      alert("Enter a valid firstname.");
      return false;
    }

    if (!/^[a-zA-Z]{2,15}$/.test(lastname)) {
      alert("Enter a valid lastname.");
      return false;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      alert("Enter a valid email.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(contactno)) {
      alert("Enter a valid 10 digit contact number.");
      return false;
    }

    if (!/^[a-zA-Z0-9]{4,}$/.test(username)) {
      alert("Username must contain at least 4 characters.");
      return false;
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*_?])[A-Za-z0-9!@#$%^&*_?]{8,}$/.test(
        password
      )
    ) {
      alert(
        "Password must contain at least one uppercase, lowercase, number and special character and be at least 8 characters long."
      );
      return false;
    }

    if (password !== confirmpassword) {
      alert("Password and Confirm Password do not match.");
      return false;
    }

    if (role !== "Admin" && role !== "Employee") {
      alert("Please select a valid role.");
      return false;
    }

    if (gender !== "Male" && gender !== "Female") {
      alert("Please select a valid gender.");
      return false;
    }

    if (!/^[0-9]+$/.test(empid) || Number(empid) <= 0) {
      alert("Enter a valid employee ID.");
      return false;
    }

    return true;
  };

  // -----------------------------
  // Registration
  // -----------------------------
  const registration = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    try {
      // Check employee ID first
      const empResponse = await axios.get(
        `https://employeemanagementsystem-4z2n.onrender.com/getempbyid?empid=${Number(
          empid
        )}`
      );

      const arr = Object.keys(empResponse.data);

      if (arr.length === 0) {
        alert("Please enter a valid employee ID.");
        return;
      }

      // Object exactly according to User entity
      const newuser = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        contactno: Number(contactno),
        username: username.trim(),
        password: password,
        confirmpassword: confirmpassword,
        role: role,
        gender: gender,
        empid: Number(empid),
      };

      console.log("Sending user data:", newuser);

      const response = await axios.post(
        "https://employeemanagementsystem-4z2n.onrender.com/regist",
        newuser
      );

      if (response.data === "Registration Successfull.") {
        alert(response.data);

        // Open Login form
        setislogin(true);
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data?.message ||
          error.response.data ||
          "Registration failed."
        );
      } else {
        alert("Error while registering user.");
      }
    }
  };

  // -----------------------------
  // Login Validation
  // -----------------------------
  const validationLogin = () => {
    if (username.trim() === "" || password === "") {
      alert("Username and password are required.");
      return false;
    }

    return true;
  };

  // -----------------------------
  // Login
  // -----------------------------
  const login = async (e) => {
    e.preventDefault();

    if (!validationLogin()) {
      return;
    }

    const loginData = {
      username: username.trim(),
      password: password,
    };

    try {
      const response = await axios.post(
        "https://employeemanagementsystem-4z2n.onrender.com/login",
        loginData
      );

      if (response.data) {
        const user = response.data;

        // Store logged-in user
        localStorage.setItem("userinfo", JSON.stringify(user));
        localStorage.setItem("isloggedin", "true");

        // Redirect according to role
        if (user.role && user.role.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/employee");
        }
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      {islogin ? (
        // =========================
        // LOGIN FORM
        // =========================
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
          <form
            className="mt-5 p-5 shadow-lg col-12 col-md-6 bg-dark-subtle"
            onSubmit={login}
          >
            <h2 className="heading text-decoration-underline text-center mb-4">
              Login Form
            </h2>

            <div className="row d-flex flex-column align-items-center gap-3">
              <div className="col-md-12 mb-2 w-75">
                <label className="form-label">Username</label>

                <input
                  type="text"
                  className="form-control shadow"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </div>

              <div className="col-md-12 mb-2 w-75">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control shadow"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>

              <div className="col-md-12 mb-2 w-50 d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-dark shadow">
                  Login
                </button>

                <button
                  type="button"
                  className="btn btn-outline-dark shadow"
                  onClick={() => setislogin(false)}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        // =========================
        // REGISTRATION FORM
        // =========================
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <form
            className="mt-5 p-5 shadow-lg bg-dark-subtle"
            onSubmit={registration}
          >
            <h2 className="heading text-decoration-underline text-center mb-4">
              Registration Form
            </h2>

            {/* Firstname & Lastname */}
            <div className="row d-flex justify-content-around">
              <div className="col-md-6 mb-3">
                <label className="form-label">Firstname</label>

                <input
                  type="text"
                  className="form-control shadow"
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  placeholder="Enter firstname"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Lastname</label>

                <input
                  type="text"
                  className="form-control shadow"
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                  placeholder="Enter lastname"
                />
              </div>
            </div>

            {/* Email & Contact */}
            <div className="row d-flex justify-content-around">
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control shadow"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Contact No.</label>

                <input
                  type="text"
                  maxLength="10"
                  className="form-control shadow"
                  value={contactno}
                  onChange={(e) => {
                    if (/^\d*$/.test(e.target.value)) {
                      setcontactno(e.target.value);
                    }
                  }}
                  placeholder="Enter 10 digit contact"
                />
              </div>
            </div>

            {/* Username */}
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Username</label>

                <input
                  type="text"
                  className="form-control shadow"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="row d-flex justify-content-around">
              <div className="col-md-6 mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control shadow"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Confirm Password</label>

                <input
                  type="password"
                  className="form-control shadow"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  placeholder="Confirm password"
                />
              </div>
            </div>

            {/* Role, Gender, Empid */}
            <div className="row d-flex justify-content-around">
              <div className="col-md-4 mb-3">
                <label className="form-label">Role</label>

                <select
                  className="form-control shadow"
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Gender</label>

                <select
                  className="form-control shadow"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Emp ID</label>

                <input
                  type="number"
                  min="1"
                  className="form-control shadow"
                  value={empid}
                  onChange={(e) => setempid(e.target.value)}
                  placeholder="Enter Emp ID"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="row mt-4">
              <div className="d-flex justify-content-center gap-3 align-items-center">
                <button type="submit" className="btn btn-dark shadow-lg">
                  Register
                </button>

                <button
                  type="button"
                  className="btn btn-outline-dark shadow-lg"
                  onClick={() => setislogin(true)}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
