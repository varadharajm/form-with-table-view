import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import FormInput from "./FormInput";

const CreateEmployee = () => {
  const navigate = useNavigate();
  // Default Value for form
  const defaultValue = {
    firstName: "",
    lastName: "",
    phoneNO: "",
    email: "",
    dob: "",
    gender: "",
    role: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  };
  // Default Gender list
  const genderList = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  // Default Role list
  const roleList = [
    {
      label: "Choose...",
      value: "",
    },
    {
      label: "Backend",
      value: "Backend",
    },
    {
      label: "Frontend",
      value: "Frontend",
    },
    {
      label: "Fullstack",
      value: "Fullstack",
    },
  ];
  // id Value get from params string
  const { id } = useParams();

  const [values, setValues] = useState(defaultValue);
  const [errMsg, setErrMsg] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const [gettingData, setGettingData] = useState();
  const [edit, setEdit] = useState(false);

  // Get Data to Edit Form
  useEffect(() => {
    setEdit(true);
    fetch(`http://localhost:8000/employee/${id}`)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData, "resData", resData.role, "resData.role");

        setValues({ ...values, ...resData });
        // delete resData.id;
        // setGettingData(resData);
      })
      .catch((e) => console.log("Error :", e));
  }, [id]);

  // Create and update data to DB
  useEffect(() => {
    // console.log("errMsg : ", errMsg);
    if (Object.keys(errMsg).length === 0 && isSubmit) {
      // console.log("gettingData", gettingData);
      // console.log(gettingData === values);
      // if (gettingData == values) {
      //   alert("No Data Updated");
      //   navigate("/");
      //   return;
      // }
      // console.log("values", values);
      fetch(`http://localhost:8000/employee${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => {
          alert("saved..");
          navigate("/");
        })
        .catch((err) => console.log("Error:  ", err));
    }
  }, [errMsg]);

  // onSubmit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMsg(validateForm(values));
    setIsSubmit(true);
  };

  // Form Validation
  const validateForm = (value) => {
    const error = {};
    const emailRegex = "^[w-.]+@([w-]+.)+[w-]{2,4}$/";
    if (!value.firstName) {
      error.firstName = "First Name is required!";
    }
    if (!value.phoneNO) {
      error.phoneNO = "Phone Number is required!";
    } else if (value.phoneNO.length !== 10) {
      error.phoneNO = "Phone Number should be 10 digits";
    }
    if (!value.email) {
      error.email = "Email is required!";
    } else if (emailRegex.match(value.email)) {
      error.email = "Email should like test@test.test";
    }
    return error;
  };

  // Values assigning to default fields
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Form Designing begins
  return (
    <div className="container" onSubmit={handleSubmit}>
      <div className="card m-5">
        <div className="card-title text-center h2">Employee Form</div>
        <div className="card-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  onChange={(e) => onChange(e)}
                  placeholder="FirstName"
                  value={values.firstName}
                />
                {errMsg.firstName && values.firstName.length === 0 && (
                  <span className="text-danger">{errMsg.firstName}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  placeholder="LastName"
                  onChange={(e) => onChange(e)}
                  value={values.lastName}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>
                  Phone No <span className="text-danger">*</span>
                </label>
                <input
                  name="phoneNO"
                  type="number"
                  className="form-control"
                  id="inputPhoneNo"
                  placeholder="PhoneNumber"
                  onChange={(e) => onChange(e)}
                  value={values.phoneNO}
                />
                {errMsg.phoneNO && values.phoneNO.length === 0 ? (
                  <span className="text-danger">{errMsg.phoneNO}</span>
                ) : errMsg.phoneNO && values.phoneNO.length !== 10 ? (
                  <span className="text-danger">
                    Phone Number should be 10 digits
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-md-6">
                <label>
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  onChange={(e) => onChange(e)}
                  value={values.email}
                />

                {errMsg.email && values.email.length === 0 && (
                  <span className="text-danger">{errMsg.email}</span>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>DOB {values.dob.split("-").reverse().join("-")}</label>
                <input
                  name="dob"
                  type="date"
                  className="form-control"
                  id="inputDOB"
                  placeholder="DOB"
                  onChange={(e) => onChange(e)}
                  value={values.dob}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Gender</label>
                <div className="form-row justify-content-around">
                  <div className="form-group">
                    {genderList.map((list) => (
                      <label className="m-2" key={list.label}>
                        <input
                          type="radio"
                          name="gender"
                          value={values.gender}
                          checked={values.gender === list.value}
                          onChange={(e) => onChange(e)}
                        />
                        {list.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Role</label>
                <select
                  name="role"
                  id="inputRole"
                  onChange={(e) => onChange(e)}
                  value={values.role}
                  selected={values.role}
                  className="form-control"
                >
                  {roleList.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                onChange={(e) => onChange(e)}
                value={values.address}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>City</label>
                <input
                  name="city"
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="City"
                  onChange={(e) => onChange(e)}
                  value={values.city}
                />
              </div>
              <div className="form-group col-md-4">
                <label>State</label>
                <input
                  name="state"
                  type="text"
                  className="form-control"
                  id="inputState"
                  placeholder="State"
                  onChange={(e) => onChange(e)}
                  value={values.state}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Zip Code</label>
                <input
                  name="zipCode"
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Zip Code"
                  onChange={(e) => onChange(e)}
                  value={values.zipCode}
                />
              </div>
            </div>
            <div className="form-row justify-content-around">
              <button type="submit" className="btn btn-primary">
                {id ? "Update" : "Create"}
              </button>
              <Link to={"/"} className="btn btn-danger">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateEmployee;
