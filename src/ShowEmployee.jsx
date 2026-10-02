import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
export default function ShowEmployee() {

    let [emplist, setemplist] = useState([]);



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
    }, [])


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
                }
            })
            .catch((erroe) => { "server error" })

    }
    return (

        <div>
            <div className='d-flex gap-2'>
                select searchby:<select className='' onChange={(event) => { setsearchby(event.target.value) }}>
                    <option>select</option>
                    <option value="firstname">firstname</option>
                    <option value="lastname">lastname</option>
                    <option value="designation">designation</option>
                    <option value="department">department</option>
                    <option value="empid">empid</option>
                </select>
                {searchby && <div> <input type="text" placeholder={`enter ${searchby}`} onChange={(event) => { setkeyword(event.target.value) }} />
                    <button className='btn btn-info gap-3' onClick={searchemployee}>search</button>
                </div>}



            </div>
            <div className='container-fluid'>
                <div className='row mb-5 gy-2'>
                    {
                        (searchresult.length > 0 ? searchresult : emplist).map((emp) =>
                            <div className='col'>
                                <div class="card" style={{ "width": "15rem", }}>
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
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}
