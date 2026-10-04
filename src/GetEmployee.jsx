import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function GetEmployee() {
  const [employees, setemployees] = useState([]);
  const [reload, setreload] = useState(false);
  const [showmodel, setshowmodel] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [middlename, setmiddlename] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [profile, setprofile] = useState("");
  const [contactno, setcontactno] = useState("");
  const [adharno, setadharno] = useState("");
  const [panno, setpanno] = useState("");
  const [dob, setdob] = useState("");

  const [dept, setdept] = useState("");
  const [desig, setdesig] = useState("");
  const [salary, setsalary] = useState("");
  const [joiningdate, setjoiningdate] = useState("");
  const [exp, setexp] = useState("");
  const [reportingmanager, setreportingmanager] = useState("");
  const [worklocation, setworklocation] = useState("");
  const [status, setstatus] = useState("");
  const [education, seteducation] = useState("");
  const [address, setaddress] = useState("");
  const [empid, setempid] = useState(0);
  let app = "https://employeemanagementsystem-4z2n.onrender.com";

  useEffect(() => {
    axios
      .get(`${app}/getemplist`)
      .then((res) => {
        setemployees(res.data);
        console.log(employees);
      })
      .catch((error) => {
        alert("API not found.");
      });
  }, [reload]);

  let delete_emp = (empid) => {
    let permit = window.confirm("Are you sure you want to delete record?");
    if (permit) {
      axios
        .delete(`${app}/deleteemp?empid=${empid}`)
        .then((res) => {
          if (res.data === "Employee Deleted Successfully.") {
            alert(res.data);
            setreload(!reload);
          }
        })
        .catch((err) => {
          alert("Error in delete operation...");
        });
    }
  };
  let update_emp = (emp) => {
    setshowmodel(true);
    setfirstname(emp.firstname);
    setmiddlename(emp.middlename);
    setlastname(emp.lastname);
    setemail(emp.email);
    setgender(emp.gender);
    setprofile(emp.profile);
    setcontactno(emp.contactno);
    setadharno(emp.adharno);
    setpanno(emp.panno);
    setdob(emp.dob);
    setdept(emp.dept);
    setdesig(emp.desig);
    setsalary(emp.salary);
    setjoiningdate(emp.joiningdate);
    setexp(emp.exp);
    setreportingmanager(emp.reportingmanager);
    setworklocation(emp.worklocation);
    setstatus(emp.status);
    seteducation(emp.education);
    setaddress(emp.address);
    setempid(emp.empid);
  };
  let handleprofile = (e) => {
    let file = e.target.files[0];
    console.log(file);
    let filepath = `./assets/images/${file.name}`;
    console.log(filepath);
    setprofile(filepath);
  };
  let validate = () => {
    if (firstname === "" || lastname === "" || middlename === "" || email === "" || gender === "" || profile === "" || contactno === "" || panno === "" || adharno === "" || dob === "" || desig === "" || dept === "" || salary === "" || exp === "" || joiningdate === "" || reportingmanager === "" || worklocation === "" || status === "" || education === "" || address === "") {
      alert("Required all fields.")
      return false;
    }
    else if (!/^[a-zA-Z]{2,15}$/.test(firstname)) {
      alert("Enter Valid firstname")
      return false;
    }
    else if (!/^[a-zA-Z]{2,15}$/.test(middlename)) {
      alert("Enter Valid middlename")
      return false;
    }
    else if (!/^[a-zA-Z]{2,15}$/.test(lastname)) {
      alert("Enter Valid lastname")
      return false;
    }
    else if (!/^[A-Za-z0-9]+@[a-z]+\.[a-z]{2,}$/.test(email)) {
      alert("Enter Valid Email.")
      return false
    }
    else if (gender !== "Male" && gender !== "Female") {
      alert("Select Gender")
      return false
    }
    else if (profile === "") {
      alert("Choose File for Profile.")
      return false
    }
    else if (!/^[0-9]{10}$/.test(contactno)) {
      alert("Enter Valid Contact.")
      return false
    }
    else if (!/^[A-Z0-9]{10}$/.test(panno)) {
      alert("Enter Valid PAN No.")
      return false
    }
    else if (!/^[0-9-]{14}$/.test(adharno)) {
      alert("Enter Valid Adhar No.")
      return false
    }
    else if (!/^[A-Za-z .]{2,}$/.test(desig)) {
      alert("Enter Valid Designation")
      return false
    }
    else if (!/^[A-Za-z ]{2,}$/.test(dept)) {
      alert("Enter Valid Department.")
      return false
    }
    else if (!/^[0-9]{2,}$/.test(salary)) {
      alert("Enter Valid Salary.")
      return false
    }
    else if (!/^[0-9]{1,2}$/.test(exp)) {
      alert("Enter Valid Experience.")
      return false
    }
    else if (!/^[A-Za-z .]{2,}$/.test(reportingmanager)) {
      alert("Enter Valid Reporting Manager.")
      return false
    }
    else if (!/^[A-Za-z ,]{2,}$/.test(worklocation)) {
      alert("Enter Valid Work Location")
      return false;
    }
    else if (status !== "Active" && status !== "Inactive") {
      alert("Select Valid Status.")
      return false;
    }
    else if (!/^[A-Za-z ']{2,}$/.test(education)) {
      alert("Enter Valid Education.")
      return false
    }
    else if (!/^[A-Za-z ,]{2,}$/.test(address)) {
      alert("Enter Valid Address.")
      return false
    }
    else {
      return true;
    }

  }
  let update = (e) => {
    e.preventDefault();
    if (validate()) {
      let newdata = {
        firstname,
        middlename,
        lastname,
        email,
        gender,
        profile,
        contactno,
        adharno,
        panno,
        dob,
        dept,
        desig,
        salary,
        joiningdate,
        exp,
        reportingmanager,
        worklocation,
        status,
        education,
        address,
      };
      axios
        .put(`${app}/updateemp?empid=${empid}`, newdata)
        .then((res) => {
          if (res.data === "Employee is Updated Successfully.") {
            alert(res.data);
            setshowmodel(false);
            setreload(!reload);
          }
        });
    }
  };

  let [searchby, setsearchby] = useState(""); //searching criteria
  let [keyword, setkeyword] = useState(""); //user input for searching
  let [searchres, setsearchres] = useState([]);

  let search_employee = () => {
    let url;
    if (searchby === "firstname") {
      url = `${app}/getempbyfname?firstname=${keyword}`;
    } else if (searchby === "lastname") {
      url = `${app}/getempbylname?lastname=${keyword}`;
    } else if (searchby === "department") {
      url = `${app}/getempbydepartment?department=${keyword}`;
    } else if (searchby === "designation") {
      url = `${app}/getempbydesignation?designation=${keyword}`;
    } else if (searchby === "empid") {
      url = `${app}/getempbyid?empid=${keyword}`;
    } else {
      alert("Enter valid criteria.");
    }

    axios
      .get(url)
      .then((res) => {
        if (res.data.length === 0) {
          alert(`No matching record found for ${searchby}.We are showing all employee records...`);
          setsearchres([])
          setreload(!reload)
        }
        else {
          if (Array.isArray(res.data)) {
            setsearchres(res.data)
          }
          else {
            setsearchres([res.data])
          }
        }
      })
      .catch((err) => {
        alert("Error");
      });
  };
  return (
    <div>
      <div className="container mt-3 d-flex flex-column flex-md-row gap-2 align-items-start align-items-md-center d-flex flex-column flex-md-row gap-2">

        <select
          className="form-select"
          onChange={(e) => {
            setsearchby(e.target.value);
          }}
        >
          <option value="">searchby</option>
          <option value="firstname">firstname</option>
          <option value="lastname">lastname</option>
          <option value="department">department</option>
          <option value="designation">designation</option>
          <option value="empid">empid</option>
        </select>
        {searchby && (
          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder={`Enter ${searchby}`}
              onChange={(e) => {
                setkeyword(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={search_employee}>
              Search
            </button>
          </div>
        )}
      </div>
      <div className="container-fluid">
        <div className="row mt-3 gy-3">
          {(searchres.length > 0 ? searchres : employees).map((emp) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card" style={{ width: "20rem" }} key={emp.empid}>
                <img
                  src={emp.profile}
                  className="card-img-top"
                  style={{ height: "15rem" }}
                  alt="..."
                />

                <div className="card-body">
                  <h5 className="card-title">
                    {emp.firstname} {emp.middlename} {emp.lastname}
                    <br />({emp.gender})
                  </h5>

                  <div className="card-text">
                    <p>
                      Empid: <strong>{emp.empid}</strong>
                    </p>
                    <p>
                      Email: <strong>{emp.email}</strong>
                    </p>
                    <p>
                      Contact: <strong>{emp.contactno}</strong>
                    </p>
                    <p>
                      Department: <strong>{emp.dept}</strong>
                    </p>
                    <p>
                      Designation: <strong>{emp.desig}</strong>
                    </p>
                    <p>
                      DOB: <strong>{emp.dob}</strong>
                    </p>
                    <p>
                      Joining Date: <strong>{emp.joiningdate}</strong>
                    </p>
                  </div>
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        update_emp(emp);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        delete_emp(emp.empid);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showmodel ? (
        <div class="modal start d-block" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Employee Update Form</h5>
                <button
                  type="button"
                  class="btn-close"
                  onClick={() => {
                    setshowmodel(false);
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={update}>
                  {/* Personal Info */}
                  <h5 className="text-dark border-bottom pb-2 mb-3">
                    Personal Details
                  </h5>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstname}
                        onChange={(e) => {
                          setfirstname(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Middle Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={middlename}
                        onChange={(e) => {
                          setmiddlename(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => {
                          setlastname(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        value={dob}
                        onChange={(e) => {
                          setdob(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Contact No</label>
                      <input
                        type="number"
                        className="form-control"
                        value={contactno}
                        onChange={(e) => {
                          setcontactno(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-control"
                        value={gender}
                        onChange={(e) => {
                          setgender(e.target.value);
                        }}
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Education</label>
                      <input
                        type="text"
                        className="form-control"
                        value={education}
                        onChange={(e) => {
                          seteducation(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => {
                          setaddress(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Aadhar No</label>
                      <input
                        type="textS"
                        className="form-control"
                        value={adharno}
                        onChange={(e) => {
                          setadharno(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">PAN No</label>
                      <input
                        type="text"
                        className="form-control"
                        value={panno}
                        onChange={(e) => {
                          setpanno(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {/* Work Info */}
                  <h5 className="text-dark border-bottom pb-2 mt-4 mb-3">
                    Work Details
                  </h5>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        value={desig}
                        onChange={(e) => {
                          setdesig(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        className="form-control"
                        value={dept}
                        onChange={(e) => {
                          setdept(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Experience (Years)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={exp}
                        onChange={(e) => {
                          setexp(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        value={salary}
                        onChange={(e) => {
                          setsalary(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Work Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={worklocation}
                        onChange={(e) => {
                          setworklocation(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Reporting Manager</label>
                      <input
                        type="text"
                        className="form-control"
                        value={reportingmanager}
                        onChange={(e) => {
                          setreportingmanager(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => {
                          setstatus(e.target.value);
                        }}
                      >
                        <option>Select Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Joining Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={joiningdate}
                        onChange={(e) => {
                          setjoiningdate(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="mb-3">
                    <label className="form-label">Profile Image</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        handleprofile(e);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Profile Preview</label>
                    <img
                      src={profile}
                      alt=""
                      className="ml-5 img-fluid"
                      style={{
                        maxWidth: "150px",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <button className="btn btn-primary px-4">Update</button>
                  </div>
                </form>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
