import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Student.css";
import studentLogo from '../../assets/student.png';
import hat from '../../assets/graduate-hat.png';
const StudentNav = () => {
  const studentName = localStorage.getItem("studentName") || "Student";
  return (
    <div className="student-container">
   <header className="student-header">
      <div className="header-right">
        <img src={hat} alt="hat" />
        <h1>Student Management System</h1>
        <div className="profile-container">
          <i className="bi bi-person-circle"></i>
          <span>{studentName}</span>
        </div>
      </div>
    </header>



      {/* 🔹 Main layout */}
      <div className="student-dashboard">
        <nav className="vertical-nav">
          <div className="nav-logo">
        <img src={studentLogo} alt="Logo" />
        </div>
          <ul>
            <li>
              <NavLink to="dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="courses" className={({ isActive }) => (isActive ? "active" : "")}>
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="grades" className={({ isActive }) => (isActive ? "active" : "")}>
                Grades
              </NavLink>
            </li>
            <li>
              <NavLink to="profile" className={({ isActive }) => (isActive ? "active" : "")}>
                Profile
              </NavLink>
            </li>
        
            <li className="bottom-nav">
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Logout
              </NavLink>
            </li>
          </ul>

        </nav>

        {/* Main Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentNav;
