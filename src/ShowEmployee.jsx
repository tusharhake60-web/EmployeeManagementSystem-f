import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ShowEmployee() {
  const [employees, setEmployees] = useState([]);
  const [searchby, setSearchby] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchres, setSearchres] = useState([]);

  const BASE_URL =
    "https://employeemanagementsystem-4z2n.onrender.com";

  // ============================
  // GET ALL EMPLOYEES
  // ============================
  useEffect(() => {
    axios
      .get(`${BASE_URL}/getemplist`)
      .then((res) => {
        console.log("API SUCCESS");
        console.log("STATUS:", res.status);
        console.log("DATA:", res.data);

        setEmployees(res.data);
      })
      .catch((error) => {
        console.log("FULL ERROR:", error);

        if (error.response) {
          console.log("STATUS:", error.response.status);
          console.log("DATA:", error.response.data);

          alert(
            "Backend Error: " +
            error.response.status +
            " " +
            JSON.stringify(error.response.data)
          );
        } else if (error.request) {
          console.log("REQUEST:", error.request);

          alert(
            "Request sent but no response received from backend."
          );
        } else {
          console.log("ERROR MESSAGE:", error.message);

          alert(error.message);
        }
      });
  }, []);

  // ============================
  // SEARCH EMPLOYEE
  // ============================
  const search_employee = () => {
    if (searchby === "") {
      alert("Please select search criteria.");
      return;
    }

    if (keyword.trim() === "") {
      alert(`Please enter ${searchby}.`);
      return;
    }

    let url = "";

    if (searchby === "firstname") {
      url =
        `${BASE_URL}/getempbyfname?firstname=` +
        encodeURIComponent(keyword);
    }

    else if (searchby === "lastname") {
      url =
        `${BASE_URL}/getempbylname?lastname=` +
        encodeURIComponent(keyword);
    }

    else if (searchby === "department") {
      url =
        `${BASE_URL}/getempbydepartment?department=` +
        encodeURIComponent(keyword);
    }

    else if (searchby === "designation") {
      url =
        `${BASE_URL}/getempbydesignation?designation=` +
        encodeURIComponent(keyword);
    }

    else if (searchby === "empid") {
      url =
        `${BASE_URL}/getempbyid?empid=` +
        encodeURIComponent(keyword);
    }

    console.log("SEARCH URL:", url);

    axios
      .get(url)
      .then((res) => {
        console.log("SEARCH SUCCESS:", res.data);

        if (
          res.data === null ||
          res.data === undefined ||
          (Array.isArray(res.data) && res.data.length === 0)
        ) {
          alert(
            `No employee found for ${searchby}.`
          );

          setSearchres([]);
        } else {
          if (Array.isArray(res.data)) {
            setSearchres(res.data);
          } else {
            setSearchres([res.data]);
          }
        }
      })
      .catch((error) => {
        console.log("SEARCH ERROR:", error);

        if (error.response) {
          alert(
            `Search API Error: ${error.response.status}`
          );
        } else {
          alert("Search API Error.");
        }
      });
  };

  // ============================
  // SHOW ALL
  // ============================
  const showAllEmployees = () => {
    setSearchres([]);
    setSearchby("");
    setKeyword("");
  };

  const displayEmployees =
    searchres.length > 0 ? searchres : employees;

  return (
    <div>

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <div className="container mt-4">

        <div className="row g-2">

          <div className="col-12 col-md-4">

            <select
              className="form-select"
              value={searchby}
              onChange={(e) => {
                setSearchby(e.target.value);
                setKeyword("");
                setSearchres([]);
              }}
            >

              <option value="">
                Search By
              </option>

              <option value="firstname">
                First Name
              </option>

              <option value="lastname">
                Last Name
              </option>

              <option value="department">
                Department
              </option>

              <option value="designation">
                Designation
              </option>

              <option value="empid">
                Employee ID
              </option>

            </select>

          </div>

          {searchby && (
            <>

              <div className="col-12 col-md-5">

                <input
                  type={
                    searchby === "empid"
                      ? "number"
                      : "text"
                  }
                  className="form-control"
                  placeholder={`Enter ${searchby}`}
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />

              </div>

              <div className="col-12 col-md-3">

                <button
                  className="btn btn-primary w-100"
                  onClick={search_employee}
                >
                  Search
                </button>

              </div>

            </>
          )}

        </div>

        <button
          className="btn btn-secondary mt-3"
          onClick={showAllEmployees}
        >
          Show All Employees
        </button>

      </div>

      {/* ========================= */}
      {/* EMPLOYEE CARDS */}
      {/* ========================= */}

      <div className="container-fluid mt-4">

        <div className="row gy-4">

          {displayEmployees.length > 0 ? (

            displayEmployees.map((emp) => (

              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={emp.empid}
              >

                <div className="card shadow">

                  {/* PROFILE */}

                  {emp.profile ? (

                    <img
                      src={emp.profile}
                      className="card-img-top"
                      alt="Employee Profile"
                      style={{
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />

                  ) : (

                    <div
                      className="bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{
                        height: "250px",
                      }}
                    >
                      No Profile Image
                    </div>

                  )}

                  {/* CARD BODY */}

                  <div className="card-body">

                    <h5 className="card-title text-primary">

                      {emp.firstname}{" "}
                      {emp.middlename}{" "}
                      {emp.lastname}

                    </h5>

                    <hr />

                    <p>
                      <strong>Employee ID:</strong>{" "}
                      {emp.empid}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {emp.email}
                    </p>

                    <p>
                      <strong>Contact:</strong>{" "}
                      {emp.contactno}
                    </p>

                    <p>
                      <strong>Gender:</strong>{" "}
                      {emp.gender}
                    </p>

                    <p>
                      <strong>Department:</strong>{" "}
                      {emp.department}
                    </p>

                    <p>
                      <strong>Designation:</strong>{" "}
                      {emp.designation}
                    </p>

                    <p>
                      <strong>Education:</strong>{" "}
                      {emp.edu}
                    </p>

                    <p>
                      <strong>DOB:</strong>{" "}
                      {emp.dob}
                    </p>

                    <p>
                      <strong>Joining Date:</strong>{" "}
                      {emp.joiningdate}
                    </p>

                    <p>
                      <strong>Experience:</strong>{" "}
                      {emp.exp} Years
                    </p>

                    <p>
                      <strong>Salary:</strong>{" "}
                      ₹{emp.salary}
                    </p>

                    <p>
                      <strong>Work Location:</strong>{" "}
                      {emp.worklocation}
                    </p>

                    <p>
                      <strong>Reporting Manager:</strong>{" "}
                      {emp.reportingmanager}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}

                      <span
                        className={
                          emp.status === "Active"
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {emp.status}
                      </span>

                    </p>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center">

              <h5>
                No Employee Records Found
              </h5>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}
