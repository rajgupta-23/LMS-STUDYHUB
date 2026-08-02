import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaImage, FaDollarSign, FaTag, FaSpinner, FaCheckCircle } from "react-icons/fa";
import api from "../api/axios";

const categories = [
  "General",
  "Programming",
  "Web Development",
  "App Development",
  "AI & ML",
  "Data Science",
  "Cyber Security",
  "Business",
  "Design",
  "Marketing",
];

export default function CreateCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    price: "",
    thumbnail: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
    if (success) setSuccess(false);
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Please enter a course title.";
    if (!form.description.trim()) return "Please add a course description.";
    if (!form.price || Number(form.price) < 0) return "Please enter a valid price.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/courses", {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price),
      });

      setSuccess(true);
      setTimeout(() => navigate(`/courses/${res.data._id}`), 900);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#eef3ff_45%,_#f9fafb_100%)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[32px] bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
            <FaBookOpen className="mr-2" /> Instructor Workspace
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Create a standout course</h1>
          <p className="mt-3 max-w-2xl text-lg text-indigo-100">
            Share your expertise with learners through a polished course page that looks professional from the start.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100 sm:p-8">
            {error && (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                <FaCheckCircle /> Course created successfully. Redirecting...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Course Title</label>
                <div className="relative">
                  <FaBookOpen className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="React Masterclass"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  rows="5"
                  name="description"
                  required
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what learners will gain from this course..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                  <div className="relative">
                    <FaTag className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                    >
                      {categories.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Price (₹)</label>
                  <div className="relative">
                    <FaDollarSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      min="0"
                      step="1"
                      name="price"
                      required
                      value={form.price}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                      placeholder="499"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Thumbnail URL</label>
                <div className="relative">
                  <FaImage className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    name="thumbnail"
                    value={form.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500">A strong thumbnail helps your course stand out in discovery.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3.5 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Creating Course...
                  </>
                ) : (
                  "Create Course"
                )}
              </button>
            </form>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100 sm:p-8">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-cyan-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Preview</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-800">Your course card</h2>
              <p className="mt-2 text-sm text-slate-600">This preview updates as you fill in the details.</p>
            </div>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
              <img
                src={form.thumbnail || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"}
                alt="Course preview"
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80";
                }}
              />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                    {form.category || "General"}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">₹{form.price || 0}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-800">
                  {form.title || "Your amazing course title"}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {form.description || "Add a compelling description to attract learners and explain the value of your course."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}