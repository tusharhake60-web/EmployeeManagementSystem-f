import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateLeaveStatus() {
  const [leaves, setLeaves] = useState([]);
  // const [leaveid,setleaveid]=useState(0);
  // const[status,setstatus]=useState("");
  let app = process.env.REACT_APP_SERVER_IP;

  const refreshData = () => {
    axios.get(`https://employeemanagementsystem-4z2n.onrender.com/allleaves`)
      .then((res) => {
        setLeaves(res.data);
      })
      .catch(() => {
        alert("Error");
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  let approve = (leaveid) => {

    axios.put(`https://employeemanagementsystem-4z2n.onrender.com/updateleavestatus?leaveid=${leaveid}&action=APPROVED`)
      .then((res) => {
        alert(res.data)
        refreshData();
      })
      .catch((err) => {
        alert("error")
      })
  }

  let rejectleave = (leaveid) => {

    axios.put(`https://employeemanagementsystem-4z2n.onrender.com/updateleavestatus?leaveid=${leaveid}&action=REJECTED`)
      .then((res) => {
        alert(res.data)
        refreshData();
      })
      .catch((err) => {
        alert("error")
      })
  }

  // let updatestatus=(leaveid,action)=>{
  //   axios.put(`http://localhost:`)
  // }

  return (
    <div className="p-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">

          <thead>
            <tr>
              <th>Empid</th>
              <th>Leave id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Reason</th>
              <th>Fromdate</th>
              <th>Todate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l.leaveid}>
                <td>{l.employee.empid}</td>
                <td>{l.leaveid}</td>
                <td>{l.firstname}</td>
                <td>{l.lastname}</td>
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
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn btn-success"
                      disabled={l.status === "APPROVED"}
                      onClick={() => approve(l.leaveid)}
                    >
                      Approve
                    </button>

                    <button
                      className="btn btn-danger"
                      disabled={l.status === "APPROVED"}
                      onClick={() => rejectleave(l.leaveid)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
