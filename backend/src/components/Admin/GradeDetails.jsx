import React, { useState, useEffect } from "react";
import axios from "axios";

const GradeDashboard = () => {
  const [grades, setGrades] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    courseId: "",
    courseName: "",
    grade: "",
  });
  const [studentsList, setStudentsList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const API_GRADE = "http://localhost:5000/grades";
  const API_USERS = "http://localhost:5000/users";
  const API_COURSES = "http://localhost:5000/courses";

  // Fetch all grades
  const fetchGrades = async () => {
    const res = await axios.get(API_GRADE);
    setGrades(res.data);
  };

  // Fetch students and courses
  const fetchStudentsAndCourses = async () => {
    const studentsRes = await axios.get(`${API_USERS}?role=student`);
    const coursesRes = await axios.get(API_COURSES);
    setStudentsList(studentsRes.data);
    setCoursesList(coursesRes.data);
  };

  useEffect(() => {
    fetchGrades();
    fetchStudentsAndCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_GRADE}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_GRADE, formData);
      }
      setFormData({ studentId: "", studentName: "", courseId: "", courseName: "", grade: "" });
      fetchGrades();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (grade) => {
    setFormData({
      studentId: grade.studentId,
      studentName: grade.studentName,
      courseId: grade.courseId,
      courseName: grade.courseName,
      grade: grade.grade,
    });
    setEditingId(grade._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_GRADE}/${id}`);
    fetchGrades();
  };

  return (
    <div className="container">
      <h2>Admin - Grade Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label>Student</label>
        <select
          name="studentId"
          value={formData.studentId}
          onChange={(e) => {
            const student = studentsList.find((s) => s._id === e.target.value);
            setFormData({
              ...formData,
              studentId: student?._id || "",
              studentName: student?.name || "",
            });
          }}
          required
        >
          <option value="">Select Student</option>
          {studentsList.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} ({s.id})
            </option>
          ))}
        </select>

        <label>Course</label>
        <select
          name="courseId"
          value={formData.courseId}
          onChange={(e) => {
            const course = coursesList.find((c) => c._id === e.target.value);
            setFormData({
              ...formData,
              courseId: course?._id || "",
              courseName: course?.title || "",
            });
          }}
          required
        >
          <option value="">Select Course</option>
          {coursesList.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title} ({c.code})
            </option>
          ))}
        </select>

        <label>Grade</label>
        <input
          name="grade"
          placeholder="Grade (A/B/C)"
          value={formData.grade}
          onChange={handleChange}
          required
        />

        <button type="submit">{editingId ? "Update" : "Add"} Grade</button>
      </form>

      {/* Grades Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Grade</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g._id}>
              <td>{g.studentId}</td>
              <td>{g.studentName}</td>
              <td>{g.courseId}</td>
              <td>{g.courseName}</td>
              <td>{g.grade}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(g)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(g._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeDashboard;
