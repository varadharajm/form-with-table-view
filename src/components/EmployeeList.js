/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loadData, setLoadData] = useState(true);

  // pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const records = data && data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data && data.length / dataPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) setCurrentPage(currentPage + 1);
  };
  // pagination end

  // Getting data from api
  useEffect(() => {
    fetch("http://localhost:8000/employee")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((e) => {
        console.log("Error : ", e);
      });
    setLoadData(false);
  }, [loadData]);
  console.log(records);

  // Delete Data from DB
  const removeData = (id) => {
    fetch(`http://localhost:8000/employee/${id}`, {
      method: "DELETE",
    }).then(() => {
      setLoadData(true);
      alert("Deleted Successfully");
    });
  };
  // Table Design Begins
  return (
    <div className="container mt-5 ml-1">
      <div className="card cardwidth">
        <div className="card-title text-center h2">Employee Details</div>
        <div className="card-body">
          <div>
            <Link to={"/create"} className="btn btn-success align-text-bottom">
              Add New
            </Link>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>zip Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records &&
                records.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.phoneNO}</td>
                    <td>{item.email}</td>
                    <td>{item.dob}</td>
                    <td>{item.gender}</td>
                    <td>{item.role}</td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.zipCode}</td>
                    <td className="">
                      <a
                        onClick={() => navigate("/edit/" + item.id)}
                        className="btn btn-success"
                        style={{ "font-size": "xx-small" }}
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => removeData(item.id)}
                        className="btn btn-danger"
                        style={{ "font-size": "xx-small" }}
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={prePage}>
                  Prev
                </a>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? `active` : ""}`}
                  key={i}
                >
                  <a className="page-link" onClick={() => changePage(n)}>
                    {n}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default EmployeeList;
