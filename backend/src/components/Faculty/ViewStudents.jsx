import React, { useState } from "react";
import "./faculty.css";

const ViewStudent = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
    setStudent(null);
    setError("");
  };

  const handleViewStudent = () => {
    if (!studentId) return;
    setLoading(true);

    // 🔗 Replace this with your actual backend endpoint
    fetch(`http://localhost:8080/faculty/student/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        return res.json();
      })
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="student-view-container">
      <h2>View Student Details</h2>

      <div className="student-input-section">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={handleInputChange}
        />
        <button
          onClick={handleViewStudent}
          className="view-course-btn"
          disabled={!studentId}
        >
          View Student
        </button>
      </div>

      {loading && <p>Loading student details...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {student && (
        <table className="student-detail-table">
          <tbody>
            <tr>
              <th>Student ID</th>
              <td>{student.id}</td>
            </tr>
            <tr>
              <th>First Name</th>
              <td>{student.firstName}</td>
            </tr>
            <tr>
              <th>Last Name</th>
              <td>{student.lastName}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{student.gender}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{student.dept}</td>
            </tr>
            <tr>
              <th>Program</th>
              <td>{student.program}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{student.dateOfBirth}</td>
            </tr>
            <tr>
              <th>Contact</th>
              <td>{student.mobileNo}</td>
            </tr>
            <tr>
              <th>CGPA</th>
              <td>{student.cgpa}</td>
            </tr>
            <tr>
              <th>Backlogs</th>
              <td>{student.backlogs}</td>
            </tr>
            <tr>
              <th>Graduation Status</th>
              <td>{student.graduationStatus}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudent;
