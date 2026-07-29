import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api
      .get("/courses/mine")
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    await api.delete(`/courses/${id}`);
    load();
  };

  return (
    <div className="page">
      <div className="page-header-row">
        <h1>Your Courses</h1>
        <Link to="/instructor/new" className="btn-primary">
          + New Course
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>You haven't created any courses yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c._id}>
                <td>
                  <Link to={`/courses/${c._id}`}>{c.title}</Link>
                </td>
                <td>{c.category}</td>
                <td>{c.price > 0 ? `$${c.price}` : "Free"}</td>
                <td>
                  <Link to={`/instructor/courses/${c._id}/lessons`} className="btn-link">
                    Manage Lessons
                  </Link>
                </td>
                <td>
                  <button className="btn-link danger" onClick={() => handleDelete(c._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
