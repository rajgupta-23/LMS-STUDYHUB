import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

import {
  FaPlus,
  FaBook,
  FaTrash,
  FaVideo,
  FaEdit,
  FaUsers,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const res = await api.get("/courses/mine");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await api.delete(`/courses/${id}`);
      loadCourses();
    } catch (err) {
      console.log(err);
    }
  };

  const totalLessons = courses.reduce(
    (sum, course) => sum + (course.lessonCount || 0),
    0
  );

  const totalRevenue = courses.reduce(
    (sum, course) => sum + (course.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                🎓 StudyHub Instructor
              </span>

              <h1 className="text-5xl font-bold mt-6">
                Instructor Dashboard
              </h1>

              <p className="mt-4 text-indigo-100 text-lg max-w-2xl">
                Create courses, upload lessons, manage students,
                and grow your teaching business from one place.
              </p>

            </div>

            <Link
              to="/instructor/new"
              className="bg-blue-100 text-indigo-700 px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 duration-300 flex items-center gap-3"
            >
              <FaPlus />
              Create New Course
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Courses
                </p>

                <h2 className="text-4xl font-bold text-indigo-600 mt-3">
                  {courses.length}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

                <FaBook className="text-3xl text-indigo-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Lessons
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-3">
                  {totalLessons}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

                <FaVideo className="text-3xl text-green-600" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Students
                </p>

                <h2 className="text-4xl font-bold text-orange-500 mt-3">
                  0
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

                <FaUsers className="text-3xl text-orange-500" />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-7 hover:shadow-xl duration-300">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Revenue
                </p>

                <h2 className="text-4xl font-bold text-purple-600 mt-3">
                  ₹{totalRevenue}
                </h2>

              </div>

              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">

                <FaChartLine className="text-3xl text-purple-600" />

              </div>

            </div>

          </div>

        </div>

        {loading ? (
          <div className="mt-10 bg-white rounded-3xl shadow-xl p-16 text-center">

            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <h2 className="text-2xl font-bold mt-8">
              Loading Your Courses...
            </h2>

            <p className="text-gray-500 mt-3">
              Please wait while we fetch your dashboard.
            </p>

          </div>
        ) : courses.length === 0 ? (

          <div className="mt-10 bg-white rounded-3xl shadow-xl p-16 text-center">

            <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center mx-auto">

              <FaBook className="text-6xl text-indigo-600" />

            </div>

            <h2 className="text-4xl font-bold mt-8">
              No Courses Yet
            </h2>

            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
              Create your first course and start teaching students
              around the world with StudyHub.
            </p>

            <Link
              to="/instructor/new"
              className="inline-flex items-center gap-3 mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition"
            >
              <FaPlus />
              Create First Course
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">

            {courses.map((course) => (

              <div
                key={course._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                {course.thumbnail ? (
                  <img
                    src={`http://localhost:5000${course.thumbnail}`}
                    alt={course.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="h-56 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center">
                    <FaGraduationCap className="text-white text-7xl" />
                  </div>

                )}
                <div className="p-6">

                  <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-semibold">
                    {course.category || "Course"}
                  </span>
                  <h2 className="text-2xl font-bold mt-5 line-clamp-2">
                    {course.title}
                  </h2>

                  <p className="text-gray-500 mt-3 line-clamp-3">
                    {course.description || "No description available."}
                  </p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-2xl font-bold text-indigo-600">
                      {course.price > 0 ? `₹${course.price}` : "Free"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.lessonCount || 0} Lessons
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    <Link
                      to={`/courses/${course._id}`}
                      className="text-center py-3 rounded-xl border hover:bg-gray-100 font-semibold"
                    >
                      View
                    </Link>
                    <Link
                      to={`/instructor/edit/${course._id}`}
                      className="text-center py-3 rounded-xl border hover:bg-yellow-50 text-yellow-600 font-semibold flex justify-center items-center gap-2"
                    >
                      <FaEdit />
                      Edit
                    </Link>
                    <Link
                      to={`/instructor/courses/${course._id}/lessons`}
                      className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                    >
                      <FaVideo />
                      Manage Lessons
                    </Link>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="col-span-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
                    >
                      <FaTrash />
                      Delete Course
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}
        {/* Quick Actions */}

        <div className="mt-14 grid md:grid-cols-3 gap-6">

          <Link
            to="/instructor/new"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300"
          >
            <FaPlus className="text-5xl mb-5" />

            <h3 className="text-2xl font-bold">
              Create Course
            </h3>

            <p className="mt-3 text-indigo-100">
              Publish a brand-new course for your students.
            </p>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">

            <FaVideo className="text-5xl text-green-600 mb-5" />

            <h3 className="text-2xl font-bold">
              Upload Lessons
            </h3>

            <p className="mt-3 text-gray-500">
              Add videos, notes and quizzes to make your
              courses more engaging.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition">

            <FaChartLine className="text-5xl text-orange-500 mb-5" />

            <h3 className="text-2xl font-bold">
              Grow Your Courses
            </h3>

            <p className="mt-3 text-gray-500">
              Keep publishing quality content to attract
              more learners.
            </p>

          </div>

        </div>

        {/* Instructor Tips */}

        <div className="mt-14 bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold mb-8">
            🚀 Instructor Tips
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="border rounded-2xl p-6">

              <h3 className="font-bold text-xl mb-3">
                📚 Build Complete Courses
              </h3>

              <p className="text-gray-600 leading-7">
                Students prefer complete courses with
                multiple lessons, practical projects,
                quizzes and downloadable resources.
              </p>

            </div>

            <div className="border rounded-2xl p-6">

              <h3 className="font-bold text-xl mb-3">
                🎥 Use HD Videos
              </h3>

              <p className="text-gray-600 leading-7">
                Upload high-quality videos with clear
                audio. Better content improves ratings
                and student engagement.
              </p>

            </div>

            <div className="border rounded-2xl p-6">

              <h3 className="font-bold text-xl mb-3">
                ⭐ Keep Updating
              </h3>

              <p className="text-gray-600 leading-7">
                Update your courses regularly with new
                lessons to keep learners interested.
              </p>

            </div>

            <div className="border rounded-2xl p-6">

              <h3 className="font-bold text-xl mb-3">
                💰 Increase Revenue
              </h3>

              <p className="text-gray-600 leading-7">
                Publish more premium courses and provide
                value to grow your earnings.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}