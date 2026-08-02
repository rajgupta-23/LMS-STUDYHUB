import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaCheckCircle, FaClock, FaPlay } from "react-icons/fa";
import api from "../api/axios";

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await api.get("/enrollments/mine");
                setCourses(res.data.enrollments || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const completedCourses = courses.filter(
        (item) => Number(item.progress || 0) >= 100
    ).length;

    const inProgressCourses = courses.length - completedCourses;

    const averageProgress = courses.length
        ? Math.round(
            courses.reduce((sum, item) => sum + Number(item.progress || 0), 0) /
            courses.length
        )
        : 0;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="text-center">
                    <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#8264ee] border-t-transparent"></div>
                    <p className="mt-4 text-lg font-semibold text-slate-700">
                        Loading your courses...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(130,100,238,0.13),_transparent_28%),#f8fafc] py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#5b43bb] via-[#8264ee] to-[#aa97f4] p-8 text-white shadow-2xl shadow-[#8264ee]/25 md:p-10">
                    <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/15 blur-2xl"></div>
                    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#3c2a89]/25 blur-2xl"></div>
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                <FaBookOpen />
                                My Learning Journey
                            </div>
                            <h1 className="mt-5 text-3xl font-bold md:text-4xl">
                                Continue learning with confidence
                            </h1>
                            <p className="mt-3 max-w-2xl text-violet-100">
                                Pick up where you left off and track your progress across every course you enrolled in.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/20 px-5 py-4 text-center backdrop-blur-sm">
                            <div className="text-3xl font-bold">{averageProgress}%</div>
                            <div className="text-sm text-violet-100">Average progress</div>
                        </div>
                    </div>
                </section>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-[#eeeaff] p-3 text-[#8264ee]">
                                <FaBookOpen />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-800">{courses.length}</div>
                                <div className="text-sm text-slate-500">Enrolled courses</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
                                <FaClock />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-800">{inProgressCourses}</div>
                                <div className="text-sm text-slate-500">In progress</div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
                                <FaCheckCircle />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-800">{completedCourses}</div>
                                <div className="text-sm text-slate-500">Completed</div>
                            </div>
                        </div>
                    </div>
                </div>

                {courses.length === 0 ? (
                    <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-800">No courses enrolled yet</h2>
                        <p className="mt-3 text-slate-500">
                            Explore our catalog and start your first learning journey today.
                        </p>
                        <Link
                            to="/courses"
                            className="mt-6 inline-flex items-center rounded-xl bg-[#8264ee] px-6 py-3 font-semibold text-white shadow-lg shadow-[#8264ee]/25 transition hover:-translate-y-0.5 hover:bg-[#6e50dc]"
                        >
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-6 xl:grid-cols-2">
                        {courses.map((item) => {
                            const progress = Math.min(
                                100,
                                Math.max(0, Number(item.progress || 0))
                            );
                            const isCompleted = progress >= 100;
                            const course = item.course || {};

                            return (
                                <div
                                    key={item._id}
                                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={
                                                course.thumbnail ||
                                                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
                                            }
                                            alt={course.title || "Course"}
                                            className="h-full w-full object-cover"
                                        />
                                        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold shadow-sm ${isCompleted ? "bg-emerald-600 text-white" : "bg-[#8264ee] text-white"}`}>
                                            {isCompleted ? "Completed" : "In Progress"}
                                        </span>
                                        <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                                            {course.category || "Learning"}
                                        </span>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-slate-800">
                                                    {course.title || "Course"}
                                                </h3>
                                                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                                                    {course.description || "Keep building your skills with this course."}
                                                </p>
                                            </div>
                                            <div className="rounded-2xl bg-[#f0edff] p-3 text-[#8264ee]">
                                                <FaBookOpen />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="font-medium text-slate-600">Progress</span>
                                                <span className="font-semibold text-[#8264ee]">{progress}%</span>
                                            </div>
                                            <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                                                <div
                                                    className="h-2.5 rounded-full bg-gradient-to-r from-[#8264ee] to-[#b1a1f7] transition-all"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-sm text-slate-500">
                                                {isCompleted
                                                    ? "Ready for your certificate"
                                                    : "Continue from where you left off"}
                                            </span>
                                            <Link
                                                to={`/courses/${course._id}`}
                                                className="inline-flex items-center gap-2 rounded-xl bg-[#8264ee] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#8264ee]/20 transition hover:-translate-y-0.5 hover:bg-[#6e50dc]"
                                            >
                                                <FaPlay size={12} />
                                                {isCompleted ? "Review" : "Continue"}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
