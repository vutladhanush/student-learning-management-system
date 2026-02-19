import React, { useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [studentList, setStudentList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dept: "",
    mobileNo: "",
    email: "",
    year: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(""); // Success/Error messages

  const API_STUDENT = "http://localhost:8080/admin/students";

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update student
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let response;
    if (editingId) {
      response = await axios.put(`${API_STUDENT}/update`, { ...formData, studentId: editingId });
      setMessage("Student updated successfully!");
      setEditingId(null);
    } else {
      response = await axios.post(`${API_STUDENT}/add`, formData);
      setMessage("Student added successfully!");
     const addedStudent = response.data;
  setStudentList(prevList => [...prevList, addedStudent]);
    }

    setFormData({
      firstName: "",
      lastName: "",
      dept: "",
      mobileNo: "",
      email: "",
      year: "",
    });
  } catch (err) {
    console.error("Error saving student:", err);
    setMessage("Error saving student");
  }
};

  // Edit student
  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      dept: student.dept,
      mobileNo: student.mobileNo,
      email: student.email,
      year: student.year,
    });
    setEditingId(student.studentId);
    setMessage(""); // Clear previous messages
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_STUDENT}/${id}`);
      setMessage("Student deleted successfully!");
      setStudentList(studentList.filter((s) => s.studentId !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
      setMessage("Error deleting student");
    }
  };

  // Search student by ID
  const handleSearch = async () => {
    if (!searchTerm) {
      setMessage("Please enter Student ID to search");
      setStudentList([]);
      return;
    }
    try {
      const res = await axios.get(`${API_STUDENT}/${searchTerm}`);
      if (res.data) {
        setStudentList([res.data]); // Display as array
        setMessage(""); // Clear message
      } else {
        setStudentList([]);
        setMessage("No student found with this ID");
      }
    } catch (err) {
      console.error("Error searching student:", err);
      setStudentList([]);
      setMessage("No student found with this ID");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Students</h2>

      {/* Success/Error Message */}
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}

      {/* Student Form */}
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
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year of Study"
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
          type="number"
          placeholder="Enter Student ID to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control me-2"
        />
        <button type="button" className="btn btn-secondary px-3" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Student Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Dept</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentList.length > 0 ? (
            studentList.map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.dept}</td>
                <td>{student.mobileNo}</td>
                <td>{student.email}</td>
                <td>{student.year}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(student.studentId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
