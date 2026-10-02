import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function UpdateLeaveStatus() {
    let [employeeleave, setemployeeleave] = useState([]);
    let app = process.env.REACT_APP_SERVER_IP

    useEffect(() => {

        axios.get(`https://employeemanagementsystem-4z2n.onrender.com/allleaves`)
            .then((response) => {
                setemployeeleave(response.data)

            })
            .catch((erroe) => {
                alert("get all employee leave error")
            }, [])
    })

    let update = (leaveid, s) => {

        axios.put(`https://employeemanagementsystem-4z2n.onrender.com/updateleavestatus?leaveid=${leaveid}&action=${s}`)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert("status update error")
            })
    }
    return (
        <div>
            <table className='table border-dark table-bordered table-info'>
                <thead className='table-dark'>
                    <tr>
                        <th>Leave Id</th>
                        <th>Employee Id</th>
                        <th>FromDate</th>
                        <th>ToDate</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeeleave.map((l) =>
                            <tr>
                                <td>{l.leaveid}</td>
                                <td>{l.employee.empid}</td>
                                <td>{l.fromdate}</td>
                                <td>{l.todate}</td>
                                <td>{l.reason}</td>
                                <td>{l.status}</td>
                                <td>
                                    <button className='btn btn-warning' onClick={() => { update(l.leaveid, "approve") }} disabled={l.status === "approve"}>Approve</button>
                                    <button className='btn btn-danger' onClick={() => { update(l.leaveid, "reject") }} disabled={l.status === "approve"}>Reject</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
