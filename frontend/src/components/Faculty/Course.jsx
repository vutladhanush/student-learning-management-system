import React, { useState } from "react";
import "./faculty.css";

const FacultyCourses = () => {
  const [courseCode, setCourseCode] = useState("");
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]); // NEW: store all courses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCourseCode(e.target.value);
    setCourse(null);
    setAllCourses([]); // clear all courses when entering something
    setError("");
  };

  const handleViewCourse = () => {
    if (!courseCode) return;
    setLoading(true);
    setAllCourses([]); // clear list
    fetch(`http://localhost:8080/faculty/course/${courseCode}`)
      .then((res) => {
        if (!res.ok) throw new Error("Course not found");
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  // NEW: Fetch all courses
  const handleGetAllCourses = () => {
    setLoading(true);
    setCourse(null);
    setError("");

    fetch("http://localhost:8080/faculty/courses")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch courses");
        return res.json();
      })
      .then((data) => {
        setAllCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="course-table-container">
      <h2>View Course</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter Course Code"
          value={courseCode}
          onChange={handleInputChange}
        />
        <button
          onClick={handleViewCourse}
          className="view-course-btn"
          disabled={!courseCode}
          style={{ marginLeft: "0.5rem" }}
        >
          View Course
        </button>

        {/* NEW BUTTON */}
        <button
          onClick={handleGetAllCourses}
          className="view-course-btn"
          style={{
            marginLeft: "0.5rem",
            background: "#007bff",
            color: "white",
          }}
        >
          Get All Courses
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Single Course View */}
      {course && (
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Department</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.credits}</td>
              <td>{course.dept}</td>
              <td>{course.facultyName}</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* All Courses Table */}
      {allCourses.length > 0 && (
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Department</th>
              <th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((c) => (
              <tr key={c.courseCode}>
                <td>{c.courseCode}</td>
                <td>{c.courseName}</td>
                <td>{c.credits}</td>
                <td>{c.dept}</td>
                <td>{c.facultyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyCourses;
