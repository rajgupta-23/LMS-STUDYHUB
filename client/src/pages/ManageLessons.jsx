import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { FaVideo, FaTrash, FaPlus, FaArrowLeft, FaUpload, FaSpinner, FaCheckCircle } from "react-icons/fa";

const SERVER_URL = "http://localhost:5000";

export default function ManageLessons() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    order: 1,
  });
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async () => {
    try {
      setError("");
      const courseRes = await api.get(`/courses/${id}`);
      setCourse(courseRes.data.course || courseRes.data);

      const lessonRes = await api.get(`/lessons/course/${id}`);
      const lessonData = Array.isArray(lessonRes.data)
        ? lessonRes.data
        : lessonRes.data.lessons || [];

      setLessons(lessonData);
      setForm((prev) => ({
        ...prev,
        order: lessonData.length + 1,
      }));
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to load course");
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 500 * 1024 * 1024) {
      setError("Maximum video size is 500MB");
      return;
    }

    setError("");
    setVideo(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      order: lessons.length + 2,
    });
    setVideo(null);
    setPreview("");
  };

  const addLesson = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Lesson title is required.");
      return;
    }

    if (!video) {
      setError("Please select a video file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("content", form.content.trim());
      formData.append("order", form.order);
      formData.append("video", video);

      await api.post(`/lessons/course/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Lesson added successfully.");
      resetForm();
      await loadData();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to add lesson");
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;

    try {
      await api.delete(`/lessons/${lessonId}`);
      await loadData();
      setSuccess("Lesson deleted successfully.");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to delete lesson");
    }
  };

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-xl font-semibold text-slate-700">
        Loading course lessons...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#eef3ff_45%,_#f9fafb_100%)] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/instructor"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <div className="mb-8 rounded-[32px] bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl shadow-indigo-200 sm:p-10">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
            <FaVideo className="mr-2" /> Instructor Studio
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Manage lessons for your course</h1>
          <p className="mt-3 max-w-2xl text-lg text-indigo-100">{course.title}</p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <FaCheckCircle /> {success}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Existing lessons</h2>
                <p className="mt-1 text-sm text-slate-500">Organize your course content in a clean learner-friendly flow.</p>
              </div>
              <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                {lessons.length} lesson{lessons.length === 1 ? "" : "s"}
              </div>
            </div>

            {lessons.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
                No lessons yet. Add your first lesson to begin building the course.
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson._id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-300">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                            Lesson {index + 1}
                          </span>
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                            Order {lesson.order}
                          </span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold text-slate-800">{lesson.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{lesson.content || "No description added yet."}</p>

                        {lesson.videoUrl && (
                          <div className="mt-4">
                            <div className="mb-2 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                              Video ready
                            </div>
                            <video controls className="w-full rounded-2xl border border-slate-200" src={`${SERVER_URL}${lesson.videoUrl}`} />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => deleteLesson(lesson._id)}
                        className="rounded-full bg-rose-100 p-3 text-rose-600 transition hover:bg-rose-200"
                        title="Delete lesson"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <FaPlus className="text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-800">Add a new lesson</h2>
            </div>

            <form onSubmit={addLesson} className="space-y-5" encType="multipart/form-data">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Lesson Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="React Introduction"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Lesson Description</label>
                <textarea
                  name="content"
                  rows="5"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Explain this lesson and what learners will gain..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Lesson Order</label>
                <input
                  type="number"
                  name="order"
                  min="1"
                  value={form.order}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <FaUpload /> Upload Video
                </label>
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/mpeg,video/quicktime"
                  onChange={handleVideo}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
                />
                <p className="mt-2 text-sm text-slate-500">Supported: MP4, WEBM, MPEG, MOV (Max 500MB)</p>
              </div>

              {preview && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">Video preview</h3>
                  <video src={preview} controls className="w-full rounded-2xl border border-slate-200" />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3.5 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Uploading video...
                  </>
                ) : (
                  <>
                    <FaUpload /> Add Lesson
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}