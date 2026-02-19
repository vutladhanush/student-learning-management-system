import React, { useState } from "react";
import axios from "axios";

const FacultyDashboard = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dept: "",
    mobileNo: "",
    email: "",
    });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const API_FACULTY = "http://localhost:8080/admin/faculty";

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update faculty
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        response = await axios.put(`${API_FACULTY}/update`, { ...formData, facultyId: editingId });
        setMessage("Faculty updated successfully!");
        setEditingId(null);
      } else {
        response = await axios.post(`${API_FACULTY}/add`, formData);
        setMessage("Faculty added successfully!");
        const addedFaculty = response.data;
        setFacultyList((prevList) => [...prevList, addedFaculty]);
      }

      setFormData({
        firstName: "",
        lastName: "",
        dept: "",
        mobileNo: "",
        email: "",

      });
    } catch (err) {
      console.error("Error saving faculty:", err);
      setMessage("Error saving faculty");
    }
  };

  // Edit faculty
  const handleEdit = (faculty) => {
    setFormData({
      firstName: faculty.firstName,
      lastName: faculty.lastName,
      dept: faculty.dept,
      mobileNo: faculty.mobileNo,
      email: faculty.email,
    });
    setEditingId(faculty.facultyId);
    setMessage("");
  };

  // Delete faculty
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_FACULTY}/${id}`);
      setMessage("Faculty deleted successfully!");
      setFacultyList(facultyList.filter((f) => f.facultyId !== id));
    } catch (err) {
      console.error("Error deleting faculty:", err);
      setMessage("Error deleting faculty");
    }
  };

  // Search faculty by ID
  const handleSearch = async () => {
    if (!searchTerm) {
      setMessage("Please enter Faculty ID to search");
      setFacultyList([]);
      return;
    }
    try {
      const res = await axios.get(`${API_FACULTY}/${searchTerm}`);
      if (res.data) {
        setFacultyList([res.data]);
        setMessage("");
      } else {
        setFacultyList([]);
        setMessage("No faculty found with this ID");
      }
    } catch (err) {
      console.error("Error searching faculty:", err);
      setFacultyList([]);
      setMessage("No faculty found with this ID");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Faculty</h2>

      {/* Success/Error Message */}
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      {/* Faculty Form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="dept"
          value={formData.dept}
          onChange={handleChange}
          placeholder="Department"
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          placeholder="Mobile No"
          required
          className="form-control mb-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="form-control mb-2"
        />
         
        <button type="submit" className="btn btn-primary px-3 py-1">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Search bar + button */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          placeholder="Enter Faculty ID to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control me-2"
        />
        <button type="button" className="btn btn-secondary px-3" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Faculty Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Faculty ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Dept</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.length > 0 ? (
            facultyList.map((faculty) => (
              <tr key={faculty.facultyId}>
                <td>{faculty.facultyId}</td>
                <td>{faculty.firstName}</td>
                <td>{faculty.lastName}</td>
                <td>{faculty.dept}</td>
                <td>{faculty.mobileNo}</td>
                <td>{faculty.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(faculty)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(faculty.facultyId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No faculty found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyDashboard;
