import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'

export default function LeaveApplication() {

    let [firstname, setfirstname] = useState("");
    let [lastname, setlastname] = useState("");
    let [empid, setempid] = useState(0);
    let [fromdate, setfromdate] = useState("");
    let [todate, settodate] = useState("");
    let [reason, setreason] = useState("");

    let today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userinfo"))
        setfirstname(user.firstname)
        setlastname(user.lastname)
        setempid(user.empid)
    }, [])
    let applyleave = (e) => {
        e.preventDefault();
        let leave = { firstname, lastname, fromdate, todate, reason, employee: { "empid": empid } }
        axios.post(`https://employeemanagementsystem-4z2n.onrender.com/applyforleave`, leave)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert("server error");
            })
    }

    return (
        <div  >

            <div className="container mt-5">
                <div className="card shadow p-4">
                    <h2 className="text-center mb-4">Leave Application</h2>

                    <form onSubmit={(e) => { applyleave(e) }}>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label className="form-label">Emp Id</label>
                                    <input type="number" className="form-control" onChange={(e) => setempid(e.target.value)} value={empid} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" className="form-control" value={firstname} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text" className="form-control" value={lastname} />
                                </div>
                                <div className="mb-3">setresone
                                    <label className="form-label">From Date</label>
                                    <input type="date" className="form-control" min={today} onChange={(e) => { setfromdate(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">To Date</label>
                                    <input type="date" className="form-control" onChange={(e) => { settodate(e.target.value) }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Reason</label>
                                    <input type="text" className="form-control" onChange={(e) => { setreason(e.target.value) }} />
                                </div>
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-info ">
                                    Apply Leave
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
