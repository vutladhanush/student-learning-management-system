import React, { useState } from "react";
import "./Student.css";

const StudentGrades = () => {
  const [studentId, setStudentId] = useState("");
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
    setGrades([]);
    setError("");
  };

  const handleViewGrades = () => {
    if (!studentId) return;
    setLoading(true);

    // Replace this URL with your backend endpoint for fetching grades by student ID
    fetch(`http://localhost:8000/api/grades/student/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found or no grades available");
        return res.json();
      })
      .then((data) => {
        setGrades(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="course-table-container">
      <h2>View My Grades</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={handleInputChange}
        />
        <button
          onClick={handleViewGrades}
          className="view-course-btn"
          disabled={!studentId}
          style={{ marginLeft: "0.5rem" }}
        >
          View Grades
        </button>
      </div>

      {loading && <p>Loading grades...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {grades.length > 0 && (
        <table className="grades-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Credits</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((item) => (
              <tr key={item.courseId}>
                <td>{item.courseName}</td>
                <td>{item.instructor}</td>
                <td>{item.credits}</td>
                <td>{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentGrades;
