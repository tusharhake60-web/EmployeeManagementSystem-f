import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function LeaveApplication() {

  let [firstname, setFirstname] = useState("")
  let [lastname, setLastname] = useState("")
  let [fromdate, setFromdate] = useState("")
  let [todate, setTodate] = useState("")
  let [reason, setReason] = useState("")
  let [empid, setEmpid] = useState(0);
  let [allleave, setallleave] = useState([]);
  let [dt, setdt] = useState(false);
  let [showmodal, setshowmodal] = useState(false)
  let [leaveid, setLeaveid] = useState(0)
  let today = new Date().toISOString().split("T")[0];
  let app = "https://employeemanagementsystem-4z2n.onrender.com";

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("userinfo"))
    setEmpid(user.empid);
    setFirstname(user.firstname);
    setLastname(user.lastname);
  }, [])

  const fetchLeaves = () => {
    axios.get(`${app}/viewleavedetailebyemp?empid=${empid}`)
      .then((response) => {
        setallleave(response.data);
      })
      .catch(() => {
        alert("find leaveapplication problem");
      });
  };

  let applyforleave = (e) => {
    e.preventDefault()
    let leave = { firstname, lastname, todate, fromdate, reason, employee: { "empid": empid } }
    console.log("empid:", empid)
    axios.post(`${app}/applyforleave`, leave)
      .then((res) => {
        console.log(res.data)
        alert("Leave Applied")
      })
      .catch((err) => {
        alert("API not found")
      })
  }

  //  let getallleave = () => {

  //       axios.get(`https://employeemanagementsystem-4z2n.onrender.com/findleavesbyempid?empid=${empid}`)
  //           .then((response) => {
  //               setallleave(response.data);
  //               setdt(!dt)
  //               setreload(!reload)
  //           })
  //           .catch((error) => {
  //               alert("find leaveapplication problem")
  //           })
  //   }
  let getallleave = () => {
    fetchLeaves();
    setdt(!dt);
  };

  let cancelleaves = (leaveid) => {
    let permit = window.confirm("Are you sure you want to cancel leave?");
    if (permit) {
      axios.delete(`${app}/cancleleave?leaveid=${leaveid}`)
        .then((res) => {
          alert("Leave Cancelled")
          fetchLeaves();
        })
        .catch((err) => {
          alert("Error")
        })
    }
  }

  let readytoupdate = (l) => {
    setshowmodal(true);
    setFirstname(l.firstname)
    setEmpid(l.employee.empid)
    setLastname(l.lastname)
    setFromdate(l.fromdate)
    setTodate(l.todate)
    setReason(l.reason)
    setLeaveid(l.leaveid)
  }

  let updateleave = (e) => {
    e.preventDefault();
    let newleave = { fromdate, todate, reason }
    axios.put(`${app}/updateleave?leaveid=${leaveid}`, newleave)
      .then((res) => {
        alert("Leave Updated")
        setshowmodal(false)
        fetchLeaves();
      })
      .catch((err) => {
        alert("Error in update")
      })
  }

  return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center mt-2 gap-3' >
      <form className="p-5 shadow-lg" onSubmit={applyforleave}>
        <h2 className="heading text-decoration-underline">Leave Application</h2>
        <div className="row d-flex justify-content-around">
          <div className="col-md-12 mb-2">
            Emp-ID
            <input
              type="number"
              className="form-control shadow"
              value={empid}
            />
          </div>
          <div className="col-md-12 mb-2">
            Firstname
            <input
              type="text"
              className="form-control shadow"
              value={firstname}
            />
          </div>
          <div className="col-md-12 mb-2">
            Lastname
            <input
              type="text"
              className="form-control shadow"
              value={lastname}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-around">
          <div className="col-md-12 mb-2">
            From Date
            <input
              type="date"
              className="form-control shadow"
              min={today}
              onChange={(e) => { setFromdate(e.target.value) }}
            />
          </div>
          <div className="col-md-12 mb-2">
            To Date
            <input
              type="date"
              className="form-control shadow"
              min={today}
              onChange={(e) => { setTodate(e.target.value) }}
            />
          </div>
          <div className="col-md-12 mb-2">
            Reason
            <textarea
              type="address"
              className="form-control shadow"
              onChange={(e) => { setReason(e.target.value) }}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="d-flex justify-content-center gap-3 align-items-center" onclick={applyforleave}>
            <button className="btn btn-dark shadow-lg">Apply</button>
          </div>
        </div>
      </form>
      <div>
        <div className='d-flex justify-content-center'>
          <button onClick={getallleave} className='btn btn-dark'>{dt ? "Close Leaves" : "Show Leaves"}</button>
          {/* <button><Link to="/viewleaves">Show Leaves</Link></button> */}
        </div>
        {
          dt ?
            <div>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">

                  <thead>
                    <tr>
                      <th>Empid</th>
                      <th className="d-none d-md-table-cell">First Name</th>
                      <th className="d-none d-md-table-cell">Last Name</th>
                      <th>Leave id</th>
                      <th>Reason</th>
                      <th>Fromdate</th>
                      <th>Todate</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allleave.map((l) => (
                      <tr key={l.leaveid}>
                        <td>{l.employee.empid}</td>
                        <td className="d-none d-md-table-cell">{l.firstname}</td>
                        <td className="d-none d-md-table-cell">{l.lastname}</td>
                        <td>{l.leaveid}</td>
                        <td>{l.reason}</td>
                        <td>{l.fromdate}</td>
                        <td>{l.todate}</td>

                        <td
                          className={
                            l.status === "APPROVED"
                              ? "text-success fw-bold"
                              : l.status === "REJECTED"
                                ? "text-danger fw-bold"
                                : "text-warning fw-bold"
                          }
                        >
                          {l.status}
                        </td>

                        <td>
                          <div className="d-flex flex-column flex-md-row gap-2">
                            <button
                              className="btn btn-outline-primary"
                              disabled={l.status === "APPROVED"}
                              onClick={() => readytoupdate(l)}
                            >
                              Update
                            </button>

                            <button
                              className="btn btn-danger"
                              disabled={l.status === "APPROVED"}
                              onClick={() => cancelleaves(l.leaveid)}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
              {showmodal ? <div class="modal start d-block" tabindex="-1">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Leave Updation Form</h5>

                    </div>
                    <div class="modal-body">
                      <form onSubmit={updateleave}>
                        <div className="row d-flex justify-content-around">
                          <div className="col-md-12 mb-2">
                            EMP ID
                            <input
                              type="number"
                              className="form-control shadow"
                              value={empid}
                            />
                          </div>
                          <div className="col-md-12 mb-2">
                            Firstname
                            <input
                              type="text"
                              className="form-control shadow"
                              value={firstname}
                            />
                          </div>
                          <div className="col-md-12 mb-2">
                            Lastname
                            <input
                              type="text"
                              className="form-control shadow"
                              value={lastname}
                            />
                          </div>
                        </div>
                        <div className="row d-flex justify-content-around">
                          <div className="col-md-12 mb-2">
                            From Date
                            <input
                              type="date"
                              className="form-control shadow"
                              value={fromdate}
                              onChange={(e) => { setFromdate(e.target.value) }}
                            />
                          </div>
                          <div className="col-md-12 mb-2">
                            To Date
                            <input
                              type="date"
                              className="form-control shadow"
                              value={todate}
                              onChange={(e) => { setTodate(e.target.value) }}
                            />
                          </div>
                          <div className="col-md-12 mb-2">
                            Reason
                            <textarea
                              type="address"
                              className="form-control shadow"
                              value={reason}
                              onChange={(e) => { setReason(e.target.value) }}
                            />
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="d-flex justify-content-center gap-3 align-items-center" onClick={applyforleave}>
                            <button className="btn btn-dark shadow-lg">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setshowmodal(false) }}>Close</button>
                    </div>
                  </div>
                </div>
              </div> : null}
            </div>
            : null
        }

      </div>

    </div>

  )
}
