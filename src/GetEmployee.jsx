import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import React, { useState, useEffect } from "react";
export default function GetEmployee() {

    let [emplist, setemplist] = useState([]);
    let [relode, setrelode] = useState(false);
    let [showmodal, setshowmodal] = useState(false);

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
    let [empid, setempid] = useState(0);

    //search by
    let [searchby, setsearchby] = useState("");
    let [keyword, setkeyword] = useState("");
    let [searchresult, setsearchresult] = useState([]);


    useEffect(() => {

        axios.get(`https://employeemanagementsystem-4z2n.onrender.com/getemplist`)
            .then((response) => {
                setemplist(response.data);
            })
            .catch((error) => { "server error" });
    }, [relode])

    let deleteemp = (empid) => {
        let permit = window.confirm("you want delete this reecorde permenantly??")

        if (permit) {
            axios.delete(`https://employeemanagementsystem-4z2n.onrender.com/deleteemp?empid=${empid}`)
                .then((response) => {
                    alert(response.data)
                    setrelode(!relode);
                })
                .catch((error) => { "server error delete method" });
        }
    }
    let readytoupdate = (emp) => {
        setshowmodal(true);
        setfirstname(emp.firstname);
        setmiddlename(emp.middlename);
        setlastname(emp.middlename);
        setemail(emp.email);
        setaddress(emp.address);
        setadharno(emp.adharno);
        setcontactno(emp.contactno)
        setdepartment(emp.department)
        setdesignation(emp.designation)
        setdob(emp.dob)
        setedu(emp.edu)
        setstatus(emp.status)
        setreportingmanager(emp.reportingmanager)
        setexp(emp.exp)
        setworklocation(emp.worklocation)
        setsalary(emp.salary)
        setprofile(emp.profile)
        setpanno(emp.panno)
        setjoiningdate(emp.joiningdate)
        setempid(emp.empid)


    }

    let handalprofile = (event) => {
        let file = event.target.files[0];
        console.log(file);
        let filepath = `./Asset/img/${file.name}`;
        console.log(filepath);
        setprofile(filepath);

    }

    let updateempdetail = (event) => {
        event.preventDefault();

        let updateempdetail = { firstname, lastname, middlename, email, dob, contactno, gender, edu, address, adharno, panno, profile, designation, department, exp, salary, worklocation, reportingmanager, status, joiningdate }

        axios.put(`https://employeemanagementsystem-4z2n.onrender.com/updateemp?empid=${empid}`, updateempdetail)
            .then((response) => {
                alert(response.data);
                setshowmodal(false)
                setrelode(!relode);

            })
            .catch((error) => {
                alert("update server error");
            });
    }
    let searchemployee = () => {
        let url;

        if (searchby === "firstname") {
            url = `https://employeemanagementsystem-4z2n.onrender.com/getempbyfname?firstname=${keyword}`;
        }
        else if (searchby === "lastname") {
            url = `https://employeemanagementsystem-4z2n.onrender.com/getempbylname?lastname=${keyword}`
        }
        else if (searchby === "designation") {
            url = `https://employeemanagementsystem-4z2n.onrender.com/getempbydesignation?designation=${keyword}`
        }
        else if (searchby === "department") {
            url = `https://employeemanagementsystem-4z2n.onrender.com/getempbydepartment?department=${keyword}`
        }
        else if (searchby === "empid") {
            let keyword1 = parseInt(keyword);
            url = `https://employeemanagementsystem-4z2n.onrender.com/getempbyid?empid=${keyword1}`
        }
        else {
            alert("select serch by option")
        }


        axios.get(url)
            .then((response) => {

                if (response.data.length === 0 || response.data === null) {
                    alert(`no recorde fount for given ${keyword}. wew are showing all employee list`);
                    setsearchresult([]);
                    //setrelode(!relode);
                }
                else {
                    setsearchresult([])
                    if (Array.isArray(response.data)) {
                        setsearchresult(response.data)
                    }
                    else {
                        setsearchresult([response.data]);
                    }
                    console.log(response.data);
                }
            })
            .catch((erroe) => { "server error" })

    }
    return (

        <div>
            <div className='d-flex gap-2'>
                select searchby:<select onChange={(event) => { setsearchby(event.target.value) }}>
                    <option>select</option>
                    <option value="firstname">firstname</option>
                    <option value="lastname">lastname</option>
                    <option value="designation">designation</option>
                    <option value="department">department</option>
                    <option value="empid">empid</option>
                </select>
                {searchby && <div> <input type="text" placeholder={`enter ${searchby}`} onChange={(event) => { setkeyword(event.target.value) }} />
                    <button className='btn btn-info gap-2' onClick={searchemployee}>search</button>
                </div>}



            </div>
            <div className='container-fluid'>
                <div className='row mb-5 gy-3'>
                    {
                        (searchresult.length > 0 ? searchresult : emplist).map((emp) =>
                            <div className='col'>
                                <div class="card" style={{ "width": "18rem" }}>
                                    <img src={emp.profile} class="card-img-top" alt="..."></img>
                                    <div class="card-body">
                                        <h5 class="card-title">{emp.firstname} {emp.middlename} {emp.lastname}</h5>
                                        <p class="card-text">
                                            <p>Emp Id :<strong>{emp.empid}</strong></p>
                                            <p>Email:<strong>{emp.email}</strong></p>
                                            <p>ContactNo:<strong>{emp.contactno}</strong></p>
                                            <p>Department:<strong>{emp.department}</strong></p>
                                            <p>Designation:<strong>{emp.designation}</strong></p>
                                            <p>Dob:<strong>{emp.dob}</strong></p>
                                        </p>
                                        <div className='d-flex gap-2 justify-content-center'>
                                            <button className='btn btn-danger' onClick={() => (deleteemp(emp.empid))}>Delete</button>
                                            <button className='btn btn-warning' onClick={() => { readytoupdate(emp) }}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            {showmodal ? <div class="modal start d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update Employee</h5>
                            <button type="button" class="btn-close" aria-label="Close" onClick={() => { setshowmodal(false) }}></button>
                        </div>
                        <div class="modal-body">




                            <form onSubmit={(event) => { updateempdetail(event) }}>

                                {/* Personal Info */}
                                <h5 className="text-dark border-bottom pb-2 mb-3">
                                    Personal Details
                                </h5>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="form-control" onChange={(event) => { setfirstname(event.target.value) }} value={firstname} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Middle Name</label>
                                        <input type="text" className="form-control" onChange={(event) => { setmiddlename(event.target.value) }} value={middlename} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="form-control" onChange={(event) => { setlastname(event.target.value) }} value={lastname} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" onChange={(event) => { setemail(event.target.value) }} value={email} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input type="date" className="form-control" onChange={(event) => { setdob(event.target.value) }} value={dob} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Contact No</label>
                                        <input type="number" className="form-control" onChange={(event) => { setcontactno(event.target.value) }} value={contactno} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Gender</label>
                                        <select className="form-control" onChange={(event) => { setgender(event.target.value) }} value={gender}>
                                            <option>Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Education</label>
                                        <input type="text" className="form-control" onChange={(event) => { setedu(event.target.value) }} value={edu} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control" onChange={(event) => { setaddress(event.target.value) }} value={address} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Aadhar No</label>
                                        <input type="number" className="form-control" onChange={(event) => { setadharno(event.target.value) }} value={adharno} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">PAN No</label>
                                        <input type="text" className="form-control" onChange={(event) => { setpanno(event.target.value) }} value={panno} />
                                    </div>
                                </div>

                                {/* Work Info */}
                                <h5 className="text-dark border-bottom pb-2 mt-4 mb-3">
                                    Work Details
                                </h5>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Designation</label>
                                        <input type="text" className="form-control" onChange={(event) => { setdesignation(event.target.value) }} value={designation} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Department</label>
                                        <input type="text" className="form-control" onChange={(event) => { setdepartment(event.target.value) }} value={department} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Experience (Years)</label>
                                        <input type="number" className="form-control" onChange={(event) => { setexp(event.target.value) }} value={exp} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Salary</label>
                                        <input type="number" className="form-control" onChange={(event) => { setsalary(event.target.value) }} value={salary} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Work Location</label>
                                        <input type="text" className="form-control" onChange={(event) => { setworklocation(event.target.value) }} value={worklocation} />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Reporting Manager</label>
                                        <input type="text" className="form-control" onChange={(event) => { setreportingmanager(event.target.value) }} value={reportingmanager} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <select className="form-control" onChange={(event) => { setstatus(event.target.value) }} value={status}>
                                            <option>Select Status</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Joining Date</label>
                                        <input type="date" className="form-control" onChange={(event) => { setjoiningdate(event.target.value) }} value={joiningdate} />
                                    </div>
                                </div>

                                {/* Profile Image */}
                                <div className="mb-3">
                                    <label className="form-label">Profile Image</label>
                                    <input type="file" className="form-control" onChange={(event) => { handalprofile(event) }} accept="image/*" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Profile Preview</label><br></br>
                                    <img src={profile} width="250" value={profile}></img>
                                </div>

                                <div className="text-center">
                                    <button className="btn btn-primary px-4">Update</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div> : null}
        </div>
    )
}
