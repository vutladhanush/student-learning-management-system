import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";
import adminLogo from '../../assets/admin.png';
import hat from '../../assets/graduate-hat.png';
const AdminNav = () => {
  return (
    <div className="admin-container">
      
      <header className="admin-header">
        <div className="header-right">
          <img src={hat} alt="hat" />
          <h1>Student Management System</h1>
          <div className="profile-container">
            <i className="bi bi-person-circle"></i>
            <span>Admin</span>
          </div>
        </div>
      </header>


      {/* 🔹 Main layout */}
      <div className="admin-dashboard">
        <nav className="vertical-nav">
          <div className="nav-logo">
        <img src={adminLogo} alt="Logo" />
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
              <NavLink to="students" className={({ isActive }) => (isActive ? "active" : "")}>
                Student Data
              </NavLink>
            </li>
            <li>
              <NavLink to="faculties" className={({ isActive }) => (isActive ? "active" : "")}>
                Faculty Data
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

export default AdminNav;
