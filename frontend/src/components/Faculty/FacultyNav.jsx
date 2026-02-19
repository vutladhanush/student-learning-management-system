import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./faculty.css";
import facultyLogo from '../../assets/faculty.png';
import hat from '../../assets/graduate-hat.png';

const FacultyNav = () => {
  return (
    <div className="faculty-container">
      <header className="faculty-header">
        <div className="header-right">
          <img src={hat} alt="hat" />
          <h1>Student Management System</h1>
          <div className="profile-container">
            <i className="bi bi-person-circle"></i>
            <span>Faculty</span>
          </div>
        </div>
      </header>

      <div className="faculty-dashboard">
        <nav className="vertical-nav">
                    <div className="nav-logo">
                  <img src={facultyLogo} alt="Logo" />
                  </div>
          <ul>
            <li>
              <NavLink to="fdashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="course" className={({ isActive }) => (isActive ? "active" : "")}>
                Courses
              </NavLink>
            </li> 
             <li>
              <NavLink to="fgrades" className={({ isActive }) => (isActive ? "active" : "")}>
                Grades
              </NavLink>
            </li>
            <li>
              <NavLink to="fprofile" className={({ isActive }) => (isActive ? "active" : "")}>
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="viewstudents" className={({ isActive }) => (isActive ? "active" : "")}>
                Students
              </NavLink>
            </li>
            <li className="bottom-nav">
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FacultyNav;
