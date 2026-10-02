import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ViewLeaveDetails() {
    let [empleaves, setempleaves] = useState([]);
    let [modal, setmodal] = useState(false);

    let [firstname, setfirstname] = useState("");
    let [lastname, setlastname] = useState("");
    let [empid, setempid] = useState(0);
    let [fromdate, setfromdate] = useState("");
    let [todate, settodate] = useState("");
    let [reason, setreason] = useState("");
    let [leaveid, setleaveid] = useState(0);
    let [relode, setrelode] = useState(false);
    // let [allleave, setallleave] = useState([]);
    let app = process.env.REACT_APP_SERVER_IP

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("userinfo"))
        axios.get(`https://employeemanagementsystem-4z2n.onrender.com/viewleavedetailebyemp?empid=${user.empid}`)
            .then((response) => {
                setempleaves(response.data);
            })
            .catch((error) => {
                alert("get leave by empid server error")
            })
    }, [relode])

    let cancleleave = (leaveid) => {

        let permit = window.confirm("you want to delete this recorde permanat")
        if (permit) {
            axios.delete(`https://employeemanagementsystem-4z2n.onrender.com/cancleleave?leaveid=${leaveid}`)
                .then((response) => {
                    alert(response.data)
                })
                .catch((error) => {
                    alert("server error cancle leave")
                })
        }
    }
    let readytoupdate = (l) => {
        setmodal(true)
        setempid(l.employee.empid)
        setfirstname(l.firstname)
        setlastname(l.lastname)
        setreason(l.reason)
        setfromdate(l.fromdate)
        settodate(l.todate)
        setleaveid(l.leaveid)
    }
    let updateleave = (event) => {
        event.preventDefault();
        let newleave = { fromdate, todate, reason }
        axios.put(`https://employeemanagementsystem-4z2n.onrender.com/updateleave?leaveid=${leaveid}`, newleave)
            .then((response) => {
                if (response.data === "Leave status update succefully") {
                    alert(response.data)
                    setmodal(false)
                    setrelode(!relode);
                }
                else {
                    alert(response.data)
                }
            })
            .catch((error) => { alert("update leave error") })
    }
    return (

        <div>
            <table className='table border-dark table-info table-bordered'>
                <thead>
                    <tr>
                        <th>EmpId</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Reason</th>
                        <th>fromdare</th>
                        <th>todate</th>
                        <th>status</th>
                        <th>Leave Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empleaves.map((l) =>
                            <tr>
                                <td>{l.employee.empid}</td>
                                <td>{l.firstname}</td>
                                <td>{l.lastname}</td>
                                <td>{l.reason}</td>
                                <td>{l.fromdate}</td>
                                <td>{l.todate}</td>
                                <td>{l.status}</td>
                                <td>{l.leaveid}</td>
                                <td className='d-flex gap-2'>
                                    <button className='btn btn-warning' onClick={() => { cancleleave(l.leaveid) }}>cancle</button>
                                    <button className='btn btn-danger' disabled={l.status === "approve"} onClick={() => { readytoupdate(l) }}>Update</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {modal ? <div class="modal start d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Update</h5>
                            <button type="button" class="btn-close" onClick={() => { setmodal(false) }} aria-label="Close"></button>
                        </div>
                        <div class="modal-body bt-2">
                            <form onSubmit={(e) => { updateleave(e) }}>
                                <div className="row">
                                    <div className="col-md-6">

                                        <div className="mb-3">
                                            <label className="form-label">Emp Id</label>
                                            <input type="number" className="form-control" value={empid} onChange={(e) => setempid(e.target.value)} />
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
                                            <input type="date" className="form-control" onChange={(e) => { setfromdate(e.target.value) }} value={fromdate} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">To Date</label>
                                            <input type="date" className="form-control" onChange={(e) => { settodate(e.target.value) }} value={todate} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Reason</label>
                                            <input type="text" className="form-control" onChange={(e) => { setreason(e.target.value) }} value={reason} />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div> : null}
        </div>
    )
}
