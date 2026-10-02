import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterUser() {

    let navigate = useNavigate();

    let [isregistration, setisregistration] = useState(false);
    let [firstname, setfirstname] = useState("");
    let [lastname, setlastname] = useState("");
    let [email, setemail] = useState("");
    let [username, setusername] = useState("");
    let [password, setpassword] = useState("");
    let [confirmpassword, setconfirmpassword] = useState("");
    let [role, setrole] = useState("");
    let [contactno, setcontactno] = useState(0);
    let [empid, setempid] = useState(0);
    let [gender, setgender] = useState("");
    let app = process.env.REACT_APP_SERVER_IP

    let userlogin = (event) => {
        event.preventDefault();
        let userdetails = { username, password };
        axios.post(`https://employeemanagementsystem-4z2n.onrender.com/login`, userdetails)
            .then((response) => {
                if (response.data) {
                    let user = response.data;
                    console.log(user);
                    alert("Welcome " + user.username);
                    localStorage.setItem("userinfo", JSON.stringify(response.data))
                    localStorage.setItem("isloggedin", "true")

                    if (user.role.toLowerCase() === "admin") {
                        navigate("/admindashboard");
                    }
                    else {
                        navigate("/employeedashboard");
                    }
                }
            })
            .catch((error) => {

                alert("invalid username password");
            })
    }

    let registration = (event) => {
        event.preventDefault();
        let user = { firstname, lastname, email, username, password, confirmpassword, role, contactno, empid, gender };

        axios.get(`https://employeemanagementsystem-4z2n.onrender.com/getempbyid?empid=${empid}`)
            .then((response) => {
                let arr = Object.keys(response.data);
                if (arr.length == 0) {
                    alert("Enter valid empid");
                }
                else {
                    axios.post(`https://employeemanagementsystem-4z2n.onrender.com/regist`, user)
                        .then((response) => {
                            if (response.data == "User regidtration succefully") {
                                alert(response.data);
                                setisregistration(true);
                            }
                            else {
                                alert(response.data);
                            }

                        })
                        .catch((error) => {
                            alert("server error")
                        });
                }
            })
            .catch((error) => {
                alert("getempid server error");
            })


    }
    let validation = () => {

        if (firstname == "" || lastname == "" || username == "" || password == "" || confirmpassword == "" || email == "" || role == "" || gender == "" || contactno == 0 || empid == 0) {
            alert("Enter All fields");
            return false;
        }
        else if (!/^[A-Za-z]{2,15}$/.test(firstname)) {
            alert("Enter valid first name");
            return false;
        }
        else if (!/^[A-Za-z]{2,15}$/.test(lastname)) {
            alert("Enter valid Lastname")
            return false;
        }
        else if (!/^[a-z]{2,15}$/.test(username)) {
            alert("Enter valid username");
            return false;
        }
        else if (!/^[A-Za-z0-9]+@[a-z]+[.][a-z]{2,}$/.test(email)) {
            alert("Enter valid email");
            return false;
        }
        else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])([A-Za-z-0-9!@#$%^&*]{8,})$/.test(password)) {
            alert("Enter valid password")
            return false;
        }
        else if (password != confirmpassword) {
            alert("password and confirm password should be same");
            return false;
        }
        else if (role == "") {
            alert("select role");
            return false;
        }
        else if (!/^[0-9]{10}$/.test(contactno)) {
            alert("Enter valid contact number");
            return false;
        }
        else if (!/^[0-9]{1,}$/.test(empid)) {
            alert("Enter valid empid");
            return false;
        }
        else if (gender == "") {
            alert("select gender");
            return false;
        }
        else {
            return true;
        }

    }
    let registation1 = (event) => {
        event.preventDefault();
        if (validation()) {

            registration(event);

        }
    }
    return (
        <div className='bg'>
            {
                isregistration ?

                    <div class="card-login">
                        <div class="card-body">
                            <form onSubmit={(event) => { userlogin(event) }} className='d-flex flex-column align-items-center gap-2'>
                                <h1 class="login">User Login</h1>
                                <lable class="login">username </lable><input type='text' className='form-control w-50' onChange={(event) => { setusername(event.target.value) }}></input>
                                <lable class="login">Password</lable> <input type='password' className='form-control w-50' onChange={(event) => { setpassword(event.target.value) }}></input>
                                <div className='d-flex gap-2'>
                                    <button type='submit' className='btn btn-primary' >Login</button>
                                    <button type='button' className='btn btn-danger' onClick={() => { setisregistration(false) }}>new User ? click here</button>
                                </div>
                                {/* //card */}

                            </form>
                        </div>
                    </div>
                    : <form className='d-flex flex-column align-items-center gap-2' onSubmit={(event) => { registation1(event) }}>
                        <h1>User Registration</h1>
                        <div className='row'>
                            <div className='col'>
                                <lable>Enter First Name:</lable><input type='text' className='form-control w-100' onChange={(event) => { setfirstname(event.target.value) }}></input>
                            </div>
                            <div className='col'>
                                <lable>Enter Last Name:</lable><input type="text" className='form-control w-100' onChange={(event) => { setlastname(event.target.value) }}></input>
                            </div>
                            <div className='col'>
                                <lable>Enter Email:</lable><input type="email" className='form-control w-100' onChange={(event) => { setemail(event.target.value) }}></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <lable>Enter username:</lable><input type="text" className='form-control ' onChange={(event) => { setusername(event.target.value) }}></input>
                            </div>
                            <div className='col'>
                                <lable>Enter password:</lable><input type="password" className='form-control' onChange={(event) => { setpassword(event.target.value) }}></input>
                            </div>
                            <div className='col'>
                                <lable>Confirm password:</lable><input type="password" className='form-control' onChange={(event) => { setconfirmpassword(event.target.value) }}></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <lable>Select Role:</lable>
                                <select className='form-control' onChange={(event) => { setrole(event.target.value) }}>
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>
                            <div className='col'>
                                <lable>Mobile Number</lable><input type='number' className='form-control' onChange={(event) => { setcontactno(event.target.value) }}></input>
                            </div>
                            <div className='col'>
                                <label>Emp ID</label><input type='number' className='form-control' onChange={(event) => { setempid(event.target.value) }}></input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <lable>Select Gender :  </lable>
                                <input type="radio" name="gender" value="Male" onChange={(event) => { setgender(event.target.value) }} /> Male
                                <input type="radio" name="gender" value="Female" onChange={(event) => { setgender(event.target.value) }} /> Female

                            </div>
                        </div>
                        <div className='row d-flex gap-2'>
                            <button type="submit" className='btn btn-primary'>Register</button>
                            <button type="button" className='btn btn-primary' onClick={() => { setisregistration(true) }}>Already Registered? Login</button>
                        </div>


                    </form>
            }
        </div>
    )
}
