import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar, { Footer } from "./components/Navbar/Navbar";

// Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import { Logout } from "./components/pages/Logout";
import Signup from "./components/pages/Signup";

// Admin
import AdminNav from "./components/Admin/AdminNav";
import AdminDashboard from "./components/Admin/Dashboard"; // default export
import AdminCourses from "./components/Admin/CourseDetails"; // default export
import AdminGrades from "./components/Admin/GradeDetails";
import AdminFaculty  from "./components/Admin/FacultyDetails";
import AdminStudent from "./components/Admin/StudentDetails";

// Faculty
import FacultyNav from "./components/Faculty/FacultyNav";
import { FacultyDashboard } from "./components/Faculty/Dashboard";
import FacultyCourses from "./components/Faculty/Course";
import FacultyGrades from "./components/Faculty/Grades";
import ViewStudents from "./components/Faculty/ViewStudents";
import FacultyProfile from "./components/Faculty/Profie";

// Student
import StudentNav from "./components/Student/StudentNav";
import StudentDashboard from "./components/Student/Dashboard";
import StudentCourses from "./components/Student/Course";
import StudentGrades from "./components/Student/Grades";
import StudentProfile from "./components/Student/Profile";

const AppContent = () => {
  const location = useLocation();

  // Hide Navbar/Footer for student and faculty dashboard routes
  const hideNavbarFooter =
    location.pathname.startsWith("/student") ||
    location.pathname.startsWith("/faculty") ||
    location.pathname .startsWith("/admin") ;

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminNav />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="grades" element={<AdminGrades />} />
          <Route path="students" element={<AdminStudent />} />
          <Route path="faculties" element={<AdminFaculty />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<FacultyNav />}>
          <Route index element={<FacultyDashboard />} />
          <Route path="fdashboard" element={<FacultyDashboard />} />
          <Route path="viewstudents" element={<ViewStudents />} />
          <Route path="course" element={<FacultyCourses />} />
          <Route path="fgrades" element={<FacultyGrades />} />
          <Route path="fprofile" element={<FacultyProfile />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentNav />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<StudentCourses />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>
      </Routes>
      {/* {!hideNavbarFooter && <Footer />} */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
