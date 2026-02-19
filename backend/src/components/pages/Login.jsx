import React, { useState } from "react";
import "../../App.css";

const Login = () => {
  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      role: role
    };

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    alert(result.message + " as " + result.role);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">Log in</h2>

        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Student
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="faculty"
              checked={role === "faculty"}
              onChange={() => setRole("faculty")}
            />
            Faculty
          </label>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">
            Login as {role.toLowerCase()}
          </button>
        </div>

        <div className="bottom-row">
          <label className="checkbox-inline">
            <input type="checkbox" /> Remember me
          </label>

          <a href="#" className="forgot-link">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
