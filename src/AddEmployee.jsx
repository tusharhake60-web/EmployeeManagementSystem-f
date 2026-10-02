import axios from 'axios';

import React, { useState, useEffect } from "react";
export default function AddEmployee() {

    let [firstname, setfirstname] = useState("");
    let [middlename, setmiddlename] = useState("");
    let [lastname, setlastname] = useState("");
    let [email, setemail] = useState("");
    let [gender, setgender] = useState("");
    let [profile, setprofile] = useState("");
    let [contactno, setcontactno] = useState(0);
    let [adharno, setadharno] = useState(0);
    let [panno, setpanno] = useState("");
    let [dob, setdob] = useState("");

    let [department, setdepartment] = useState("");
    let [designation, setdesignation] = useState("");
    let [salary, setsalary] = useState(0);
    let [worklocation, setworklocation] = useState("");
    let [joiningdate, setjoiningdate] = useState("");
    let [exp, setexp] = useState(0);
    let [reportingmanager, setreportingmanager] = useState("");
    let [status, setstatus] = useState("");
    let [edu, setedu] = useState("");
    let [address, setaddress] = useState("");
    let [relode, setrelode] = useState(false);



    let handalprofile = (event) => {
        let file = event.target.files[0];
        console.log(file);
        let filepath = `./Asset/img/${file.name}`;
        console.log(filepath);
        setprofile(filepath);

    }

    useEffect(() => {

    }, [relode])

    let addemp = (event) => {
        event.preventDefault();
        let employee = {
            firstname, lastname, middlename, email, contactno, status, department, designation, dob,
            joiningdate, edu, address, reportingmanager, worklocation, salary, adharno, panno, exp, gender, profile
        }

        axios.post(`https://employeemanagementsystem-4z2n.onrender.com/addemp`, employee)
            .then((response) => {
                if (response.data === "Employee add succefull") {
                    alert(response.data);
                    setrelode(!relode);

                }
            })
            .catch((erroe) => { alert("server error") });
    }

    let validation = () => {

        if (firstname === "" || lastname === "" || email === "" || contactno === 0 || status === "" || department === "" || designation === "" || dob === "" || joiningdate === "" || edu === "" || address === "" || reportingmanager === "" || worklocation === "" || salary === 0 || adharno === 0 || panno === "" || exp === 0 || gender === "" || profile === "") {
            alert("please fill all details");
            return false;
        }

        else if (!/^[A-Za-z]{2,10}$/.test(firstname)) {
            alert("Enter first name  valid form");
            return false;
        }
        else if (!/^[A-Za-z]{2,10}$/.test(lastname)) {
            alert("Enter last neme valid form");
            return false;
        }
        else if (!/^[A-Za-z]{2,10}$/.test(middlename)) {
            alert("Enter valid middle name");
            return false;
        }
        else if (!/^[A-Za-z0-9]+@[a-z]+[.][a-z]{2,}$/.test(email)) {
            alert("Enter valid email id");
            return false;
        }
        else if (!/^[0-9]{10}$/.test(contactno)) {
            alert("Enter valid contact no");
            return false;
        }
        else if (!/^[A-Za-z]{3,}$/.test(edu)) {
            alert("Enter valid education details");
            return false;
        }
        else if (!/^[A-Za-z0-9]{3,20}$/.test(address)) {
            alert("Enter valid address");
            return false;
        }
        else if (!/^[0-9]{12}$/.test(adharno)) {
            alert("Enter valid Aadhaar no");
            return false;
        }
        else if (!/^[A-Z0-9]{10}$/.test(panno)) {
            alert("Enter valid PAN no");
            return false;
        }
        else if (!salary > 0) {
            alert("enter valid salary");
            return false;
        }
        else if (!/^[A-Za-z]{2,10}$/.test(designation)) {
            alert("Enter valid designation");
            return false;
        }
        else if (!/^[A-Za-z]{2,}$/.test(department)) {
            alert("Enter valid department");
            return false;
        }
        else if (!/^[A-Za-z]{3,}$/.test(worklocation)) {
            alert("Enter valid work location");
            return false;
        }
        else if (!/^[0-9]{1,2}$/.test(exp)) {
            alert("Enter valid experience");
            return false;
        }
        else if (!/^[A-Za-z]{2,10}$/.test(reportingmanager)) {
            alert("Enter valid reporting manager");
            return false;
        }
        else if (profile === "") {
            alert("please select profile image");
            return false;
        }
        else {
            return true;
        }
    }


    let registration = (event) => {
        event.preventDefault();
        if (validation()) {
            addemp(event);
        }
    }

    return (
        <div>
            <form onSubmit={(event) => { registration(event) }}>

                {/* Main Title */}
                <h2 className="text-center text-danger bg-warning  mb-4">
                    Employee Registration Form
                </h2>

                {/* Personal Info */}
                <h5 className="text-dark border-bottom pb-2 mb-3">
                    Personal Details
                </h5>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" onChange={(event) => { setfirstname(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Middle Name</label>
                        <input type="text" className="form-control" onChange={(event) => { setmiddlename(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" onChange={(event) => { setlastname(event.target.value) }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={(event) => { setemail(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" onChange={(event) => { setdob(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Contact No</label>
                        <input type="number" className="form-control" onChange={(event) => { setcontactno(event.target.value) }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-control" onChange={(event) => { setgender(event.target.value) }}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Education</label>
                        <input type="text" className="form-control" onChange={(event) => { setedu(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" onChange={(event) => { setaddress(event.target.value) }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Aadhar No</label>
                        <input type="number" className="form-control" onChange={(event) => { setadharno(event.target.value) }} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">PAN No</label>
                        <input type="text" className="form-control" onChange={(event) => { setpanno(event.target.value) }} />
                    </div>
                </div>

                {/* Work Info */}
                <h5 className="text-dark border-bottom pb-2 mt-4 mb-3">
                    Work Details
                </h5>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Designation</label>
                        <input type="text" className="form-control" onChange={(event) => { setdesignation(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Department</label>
                        <input type="text" className="form-control" onChange={(event) => { setdepartment(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Experience (Years)</label>
                        <input type="number" className="form-control" onChange={(event) => { setexp(event.target.value) }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Salary</label>
                        <input type="number" className="form-control" onChange={(event) => { setsalary(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Work Location</label>
                        <input type="text" className="form-control" onChange={(event) => { setworklocation(event.target.value) }} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Reporting Manager</label>
                        <input type="text" className="form-control" onChange={(event) => { setreportingmanager(event.target.value) }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select className="form-control" onChange={(event) => { setstatus(event.target.value) }}>
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Joining Date</label>
                        <input type="date" className="form-control" onChange={(event) => { setjoiningdate(event.target.value) }} />
                    </div>
                </div>

                {/* Profile Image */}
                <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <input type="file" className="form-control" onChange={(event) => { handalprofile(event) }} accept="image/*" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Profile Preview</label><br></br>
                    <img src={profile} width="250" alt=''></img>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary px-4">Submit</button>
                </div>

            </form>
        </div>
    )
}
