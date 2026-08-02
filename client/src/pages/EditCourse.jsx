import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditCourse() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        thumbnail: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCourse();
    }, []);

    const loadCourse = async () => {
        try {
            const res = await api.get(`/courses/${id}`);

            const course = res.data.course || res.data;

            setForm({
                title: course.title || "",
                description: course.description || "",
                category: course.category || "",
                price: course.price || "",
                thumbnail: course.thumbnail || ""
            });

            setLoading(false);
        } catch (err) {
            console.log(err);
            setError("Course not found");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            await api.put(`/courses/${id}`, {
                ...form,
                price: Number(form.price)
            });

            alert("Course Updated Successfully");

            navigate(`/courses/${id}`);
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Update failed");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">
                {error}
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-indigo-600 font-semibold hover:underline"
                >
                    ← Back
                </button>

                <h1 className="text-3xl font-bold mb-2">
                    Edit Course
                </h1>

                <p className="text-gray-500 mb-8">
                    Update your course information.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Title */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Course Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Description
                        </label>

                        <textarea
                            rows="5"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Price (₹)
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            min="0"
                            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    {/* Thumbnail URL */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Thumbnail URL
                        </label>

                        <input
                            type="text"
                            name="thumbnail"
                            value={form.thumbnail}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />

                        {form.thumbnail && (
                            <img
                                src={form.thumbnail}
                                alt="Thumbnail Preview"
                                className="mt-4 w-full h-64 object-cover rounded-xl border"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                        )}
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        disabled={saving}
                        className={`w-full py-3 rounded-xl text-white font-semibold transition ${saving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {saving ? "Updating..." : "Update Course"}
                    </button>
                </form>
            </div>
        </div>
    );
}