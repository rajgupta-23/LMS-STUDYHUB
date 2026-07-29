import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCourse from "./pages/CreateCourse";
import ManageLessons from "./pages/ManageLessons";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor"
            element={
              <PrivateRoute role="instructor">
                <InstructorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/new"
            element={
              <PrivateRoute role="instructor">
                <CreateCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/courses/:id/lessons"
            element={
              <PrivateRoute role="instructor">
                <ManageLessons />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}
