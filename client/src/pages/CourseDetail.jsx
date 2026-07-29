import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");

  const load = async () => {
    const res = await api.get(`/courses/${id}`);
    setData(res.data);
  };

  const loadEnrollment = async () => {
    if (user?.role !== "student") return;
    try {
      const res = await api.get("/enrollments/mine");
      const match = res.data.find((e) => e.course._id === id);
      setEnrollment(match || null);
    } catch {
      setEnrollment(null);
    }
  };

  useEffect(() => {
    load();
    loadEnrollment();
  }, [id, user]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setMessage("");
    try {
      await api.post("/enrollments", { courseId: id });
      setMessage("Enrolled! Scroll down to start marking lessons complete.");
      loadEnrollment();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not enroll");
    } finally {
      setEnrolling(false);
    }
  };

  const handleCompleteLesson = async (lessonId) => {
    try {
      await api.post("/enrollments/complete-lesson", { courseId: id, lessonId });
      loadEnrollment();
    } catch (err) {
      setMessage(err.response?.data?.message || "Could not update progress");
    }
  };

  if (!data) return <div className="page-center">Loading...</div>;

  const { course, lessons } = data;

  return (
    <div className="page">
      <div className="course-header">
        <span className="course-category">{course.category}</span>
        <h1>{course.title}</h1>
        <p className="muted">
          By {course.instructor?.name} · {course.price > 0 ? `$${course.price}` : "Free"}
        </p>
        <p>{course.description}</p>
        {user?.role === "student" && !enrollment && (
          <button className="btn-primary" onClick={handleEnroll} disabled={enrolling}>
            {enrolling ? "Enrolling..." : "Enroll now"}
          </button>
        )}
        {enrollment && (
          <div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${enrollment.progress}%` }} />
            </div>
            <span className="muted">{enrollment.progress}% complete</span>
          </div>
        )}
        {message && <p className="hint">{message}</p>}
      </div>

      <h2>Lessons</h2>
      {lessons.length === 0 ? (
        <p>No lessons published yet.</p>
      ) : (
        <ol className="lesson-list">
          {lessons.map((l) => {
            const done = enrollment?.completedLessons?.includes(l._id);
            return (
              <li key={l._id}>
                <strong>{l.title}</strong>
                {l.content && <p className="muted">{l.content}</p>}
                {enrollment && (
                  <button
                    className="btn-link"
                    disabled={done}
                    onClick={() => handleCompleteLesson(l._id)}
                  >
                    {done ? "✓ Completed" : "Mark as complete"}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
