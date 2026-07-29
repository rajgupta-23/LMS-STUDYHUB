import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function ManageLessons() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", videoUrl: "", order: 1 });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await api.get(`/courses/${id}`);
    setCourse(res.data.course);
    setLessons(res.data.lessons);
    setForm((f) => ({ ...f, order: res.data.lessons.length + 1 }));
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.post(`/courses/${id}/lessons`, { ...form, order: Number(form.order) });
      setForm({ title: "", content: "", videoUrl: "", order: lessons.length + 2 });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not add lesson");
    } finally {
      setSaving(false);
    }
  };

  if (!course) return <div className="page-center">Loading...</div>;

  return (
    <div className="page">
      <p>
        <Link to="/instructor">&larr; Back to your courses</Link>
      </p>
      <h1>Manage Lessons — {course.title}</h1>

      <h2>Existing lessons</h2>
      {lessons.length === 0 ? (
        <p>No lessons yet. Add the first one below.</p>
      ) : (
        <ol className="lesson-list">
          {lessons.map((l) => (
            <li key={l._id}>
              <strong>{l.title}</strong>
              {l.content && <p className="muted">{l.content}</p>}
            </li>
          ))}
        </ol>
      )}

      <h2>Add a lesson</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
        <label>Content / notes</label>
        <textarea name="content" value={form.content} onChange={handleChange} rows={3} />
        <label>Video URL (optional)</label>
        <input name="videoUrl" value={form.videoUrl} onChange={handleChange} />
        <label>Order</label>
        <input type="number" name="order" value={form.order} onChange={handleChange} min={1} />
        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? "Adding..." : "Add Lesson"}
        </button>
      </form>
    </div>
  );
}
