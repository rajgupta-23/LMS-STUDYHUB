import { useEffect, useState } from "react";
import api from "../api/axios";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCourses = async (q = "") => {
    setLoading(true);
    try {
      const res = await api.get("/courses", { params: q ? { search: q } : {} });
      setCourses(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses(search);
  };

  return (
    <div className="page">
      <h1>Explore Courses</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="course-grid">
          {courses.map((c) => (
            <CourseCard key={c._id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
