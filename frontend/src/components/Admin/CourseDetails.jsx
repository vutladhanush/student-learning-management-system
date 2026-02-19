import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseDashboard = () => {
  const [courseList, setCourseList] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); // ✅ new state for filtered data
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    dept: "",
    credits: "",
    facultyName: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const API_COURSE = "http://localhost:8080/admin/courses";

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(API_COURSE);
      setCourseList(res.data);
      setFilteredCourses(res.data);  
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_COURSE}/update`, formData);
        setMessage("Course updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(`${API_COURSE}/add`, formData);
        setMessage("Course added successfully!");
      }

      // Reset form and refresh data
      setFormData({
        courseCode: "",
        courseName: "",
        dept: "",
        credits: "",
        facultyName: ""
      });

      fetchCourses();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Error occurred while saving the course!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Edit course
  const handleEdit = (course) => {
    setFormData(course);
    setEditingId(course.courseCode);
  };

  // Delete course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_COURSE}/${code}`);
      fetchCourses();
      setMessage("Course deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete course!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleSearch = async (e) => {
  e.preventDefault();

  try {
    if (searchTerm.trim() === "") {
      // If input is empty, show all
      fetchCourses();
    } else {
      const res = await axios.get(`${API_COURSE}/${searchTerm}`);
      setFilteredCourses(Array.isArray(res.data) ? res.data : [res.data]); 
      setMessage("Search results displayed successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  } catch (err) {
    console.error(err);
    setMessage("No matching course found or error occurred!");
    setFilteredCourses([]); // clear table if no result
    setTimeout(() => setMessage(""), 3000);
  }
};


  return (
    <div className="container mt-4">
      <h2>Manage Courses</h2>

      {message && (
        <div className="alert alert-info text-center mt-3">{message}</div>
      )}

      {/* Course Form */}
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-2">
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            placeholder="Course ID"
            required
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Course Name"
            required
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="dept"
            value={formData.dept}
            onChange={handleChange}
            placeholder="Department"
            required
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            placeholder="Credits"
            required
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="facultyName"
            value={formData.facultyName}
            onChange={handleChange}
            placeholder="Faculty Name"
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Course" : "Add Course"}
        </button>
      </form>

       
      <form onSubmit={handleSearch} className="d-flex align-items-center mb-4">
        <input
          type="text"
          placeholder="Search by course code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control me-2"
          style={{ width: "250px" }} // smaller width
        />
        <button type="submit" className="btn btn-secondary">
          Search
        </button>
      </form>

      {/* Course Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Credits</th>
            <th>Faculty</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr key={course.courseCode}>
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.dept}</td>
                <td>{course.credits}</td>
                <td>{course.facultyName}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(course)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(course.courseCode)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-muted text-center">
                No courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseDashboard;
