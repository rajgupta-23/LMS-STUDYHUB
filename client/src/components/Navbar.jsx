import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        StudyHub
      </Link>
      <div className="nav-links">
        <Link to="/courses">Courses</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user?.role === "instructor" && <Link to="/instructor">Teach</Link>}
        {user ? (
          <button className="btn-link" onClick={handleLogout}>
            Logout ({user.name})
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-outline">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
