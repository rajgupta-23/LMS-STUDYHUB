import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
  FaBookOpen,
  FaCheckCircle,
  FaCertificate,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/users/dashboard");
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#8264ee] border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-slate-700">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: <FaBookOpen />,
      number: data?.stats?.enrolled || 0,
      title: "Enrolled Courses",
      accent: "from-[#8264ee] to-[#6d28d9]",
    },
    {
      icon: <FaCheckCircle />,
      number: data?.stats?.completed || 0,
      title: "Completed Courses",
      accent: "from-[#8b5cf6] to-[#7c3aed]",
    },
    {
      icon: <FaCertificate />,
      number: data?.stats?.certificates || 0,
      title: "Certificates",
      accent: "from-[#a78bfa] to-[#8b5cf6]",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-[#8264ee] via-[#7c3aed] to-[#6d28d9] px-6 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <FaGraduationCap />
              Student Dashboard
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome back, keep learning forward.
            </h1>
            <p className="mt-4 text-lg text-violet-100">
              Track your progress, continue your courses, and celebrate your achievements in one place.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/20 p-3 text-2xl">
                <FaGraduationCap />
              </div>
              <div>
                <div className="text-2xl font-bold">{data?.stats?.enrolled || 0}</div>
                <div className="text-sm text-violet-100">Active learning paths</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`inline-flex rounded-2xl bg-gradient-to-r ${item.accent} p-3 text-xl text-white`}>
                {item.icon}
              </div>
              <h2 className="mt-5 text-4xl font-bold text-slate-800">{item.number}</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">My Courses</h2>
              <p className="mt-1 text-sm text-slate-500">
                Continue learning where you left off.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 font-semibold text-[#8264ee] transition hover:text-[#6d28d9]"
            >
              Explore More <FaArrowRight />
            </Link>
          </div>

          {data?.courses?.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-bold text-slate-800">No courses enrolled yet</h2>
              <p className="mt-3 text-slate-500">
                Browse the catalog and start your first learning journey.
              </p>
              <Link
                to="/courses"
                className="mt-6 inline-flex rounded-xl bg-[#8264ee] px-6 py-3 font-semibold text-white transition hover:bg-[#6d28d9]"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {data?.courses?.map((item) => {
                const progress = Math.min(100, Math.max(0, Number(item.progress || 0)));
                const course = item.course || {};

                return (
                  <div
                    key={item._id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <img
                      src={
                        course.thumbnail ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
                      }
                      alt={course.title || "Course"}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-800">
                        {course.title || "Course"}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {course.description || "Keep building your skills with this course."}
                      </p>

                      <div className="mt-5">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-600">Progress</span>
                          <span className="font-semibold text-[#8264ee]">{progress}%</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-2.5 rounded-full bg-gradient-to-r from-[#8264ee] to-[#a78bfa]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <Link
                        to={`/courses/${course._id}`}
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#8264ee] px-4 py-3 font-semibold text-white transition hover:bg-[#6d28d9]"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
