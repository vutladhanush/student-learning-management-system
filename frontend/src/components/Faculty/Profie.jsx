import React, { useEffect, useState } from "react";
import "./faculty.css"; 

const Profile = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedFacultyId = localStorage.getItem("facultyId");

    if (!loggedFacultyId) {
      setError("No faculty is logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/faculty/${loggedFacultyId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Unable to load faculty profile");
        return res.json();
      })
      .then((data) => {
        setFaculty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {loading && <p>Loading profile...</p>}
      {error && <p className="error-msg">{error}</p>}

      {faculty && (
        <div className="profile-card">
          <h3>{faculty.name}</h3>

          <table className="profile-table">
            <tbody>
              <tr><th>ID</th><td>{faculty.id}</td></tr>
              <tr><th>Gender</th><td>{faculty.gender}</td></tr>
              <tr><th>Department</th><td>{faculty.department}</td></tr>
              <tr><th>Designation</th><td>{faculty.designation}</td></tr>
              <tr><th>Experience</th><td>{faculty.experience} years</td></tr>
              <tr><th>Contact</th><td>{faculty.contactNumber}</td></tr>
              <tr><th>Email</th><td>{faculty.email}</td></tr>
              <tr><th>Qualification</th><td>{faculty.qualification}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Profile;
