import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="main-horizontal-nav">
      <div className="main-nav-left">
        <h2 className="main-logo">SCMS</h2>
      </div>

      <ul className="main-horizontal-menu">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
            Signup
          </NavLink>
        </li>
         
      </ul>
    </nav>
  );
};

export default Navbar;

export const Footer = () => {
  return (
    <footer className="main-footer">
      <p>© {new Date().getFullYear()} Student Management System. All Rights Reserved.</p>
    </footer>
  );
};
