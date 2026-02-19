import React, { useEffect, useState } from "react";
import "./Student.css";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 👉 Assume student ID is stored during login  
  const loggedInStudentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!loggedInStudentId) {
      setError("No logged-in student found.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/students/${loggedInStudentId}`)
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
  }, [loggedInStudentId]);

  return (
    <div className="student-view-container">
      <h2>My Profile</h2>

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
              <th>Name</th>
              <td>{student.name}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{student.gender}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{student.department}</td>
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
              <td>{student.contactNumber}</td>
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

export default StudentProfile;
