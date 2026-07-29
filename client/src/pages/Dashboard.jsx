import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "student") {
      setLoading(false);
      return;
    }
    api
      .get("/enrollments/mine")
      .then((res) => setEnrollments(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="page">
      <h1>Welcome, {user?.name}</h1>

      {user?.role === "instructor" ? (
        <p>
          Head to your <Link to="/instructor">instructor dashboard</Link> to manage your courses.
        </p>
      ) : loading ? (
        <p>Loading your courses...</p>
      ) : enrollments.length === 0 ? (
        <p>
          You're not enrolled in any courses yet. <Link to="/courses">Browse courses</Link>
        </p>
      ) : (
        <div className="enrollment-list">
          {enrollments.map((e) => (
            <Link to={`/courses/${e.course._id}`} key={e._id} className="enrollment-card">
              <h3>{e.course.title}</h3>
              <p className="muted">By {e.course.instructor?.name}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${e.progress}%` }} />
              </div>
              <span className="muted">{e.progress}% complete</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
