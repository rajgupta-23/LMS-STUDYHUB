import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    price: 0,
    thumbnail: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/courses", { ...form, price: Number(form.price) });
      navigate(`/courses/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create course");
    }
  };

  return (
    <div className="page">
      <h1>Create a New Course</h1>
      <form className="form-card" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <label>Category</label>
        <input name="category" value={form.category} onChange={handleChange} />
        <label>Price (USD, 0 for free)</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} min={0} />
        <label>Thumbnail URL (optional)</label>
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} />
        <button className="btn-primary" type="submit">
          Create Course
        </button>
      </form>
    </div>
  );
}
