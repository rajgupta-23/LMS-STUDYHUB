import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CourseCard({ course }) {
  const { user } = useAuth();

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <Link to={`/courses/${course._id}`}>
        {/* Thumbnail */}
        <div className="relative h-56 overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-6xl font-bold text-white">
              {course.title?.charAt(0)}
            </div>
          )}

          <span className="absolute top-4 left-4 rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
            {course.category || "Programming"}
          </span>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {course.title}
          </h3>

          <p className="mt-3 text-sm text-gray-500 line-clamp-3">
            {course.description}
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            👨‍🏫
            <span className="ml-2 font-medium">
              {course.instructor?.name || "Instructor"}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600">
            <span>📚 {course.lessons || 0} Lessons</span>
            <span>⭐ {course.rating || 4.8}</span>
            <span>👨‍🎓 {course.students || 0}</span>
            <span>⏱️ {course.duration || "0h"}</span>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-indigo-600">
              {course.price > 0 ? `₹${course.price}` : "Free"}
            </h2>

            <span className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700">
              View →
            </span>
          </div>
        </div>
      </Link>

      {user?.role === "instructor" && (
        <div className="border-t bg-gray-50 p-5">
          <Link
            to={`/courses/${course._id}/add-lesson`}
            className="block w-full rounded-xl bg-green-600 py-3 text-center font-semibold text-white transition hover:bg-green-700"
          >
            ➕ Add Lesson
          </Link>
        </div>
      )}
    </div>
  );
}