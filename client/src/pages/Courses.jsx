import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
  FaBookOpen,
  FaClock,
  FaGraduationCap,
  FaPlay,
  FaStar,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data || []);
    } catch (error) {
      console.log("Courses Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#8264ee] border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-[#8264ee] via-[#7c3aed] to-[#6d28d9] px-6 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <FaGraduationCap />
            Learn with confidence
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Explore our premium courses
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-violet-100">
            Build practical skills with modern, industry-focused lessons designed for real-world growth.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-violet-100 p-3 text-[#8264ee]">
              <FaBookOpen />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{courses.length}</div>
              <div className="text-sm text-slate-500">Available courses</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <FaUsers />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">Live</div>
              <div className="text-sm text-slate-500">Student community</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
              <FaClock />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">Flexible</div>
              <div className="text-sm text-slate-500">Learn at your pace</div>
            </div>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800">No courses found</h2>
            <p className="mt-3 text-slate-500">Please check back later for new learning opportunities.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => {
              const rating = Number(course.rating || 0);
              const stars = "★".repeat(Math.round(rating));
              const priceLabel = course.price > 0 ? `₹${course.price}` : "Free";

              return (
                <div
                  key={course._id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        course.thumbnail?.startsWith("http")
                          ? course.thumbnail
                          : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
                      }
                      alt={course.title}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#8264ee] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {course.category || "Programming"}
                    </span>
                    <span className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#8264ee] shadow-sm">
                      {priceLabel}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${course.instructor?.name || "Instructor"}`}
                        alt={course.instructor?.name || "Instructor"}
                        className="h-12 w-12 rounded-full border border-slate-200"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {course.instructor?.name || "Unknown Instructor"}
                        </h4>
                        <p className="text-sm text-slate-500">Instructor</p>
                      </div>
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-slate-800">
                      {course.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500 line-clamp-3">
                      {course.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        <FaStar />
                        <span className="text-sm font-semibold text-slate-700">
                          {rating > 0 ? `${rating}/5` : "New"}
                        </span>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                        Bestseller
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3 border-y border-slate-100 py-4 text-center">
                      <div>
                        <h3 className="font-bold text-[#8264ee]">{course.lessons ?? 0}</h3>
                        <p className="text-xs text-slate-500">Lessons</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#8264ee]">{course.duration ?? "0h"}</h3>
                        <p className="text-xs text-slate-500">Duration</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#8264ee]">{course.students ?? 0}</h3>
                        <p className="text-xs text-slate-500">Students</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-[#8264ee]">{priceLabel}</h2>
                      <Link
                        to={`/courses/${course._id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#8264ee] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
                      >
                        View Course <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Courses;
