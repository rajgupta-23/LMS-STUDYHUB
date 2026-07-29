import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course._id}`} className="course-card">
      <div className="course-thumb">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} />
        ) : (
          <div className="thumb-placeholder">{course.title[0]}</div>
        )}
      </div>
      <div className="course-card-body">
        <span className="course-category">{course.category}</span>
        <h3>{course.title}</h3>
        <p>{course.description?.slice(0, 90)}...</p>
        <div className="course-card-footer">
          <span>{course.instructor?.name}</span>
          <span className="price">{course.price > 0 ? `$${course.price}` : "Free"}</span>
        </div>
      </div>
    </Link>
  );
}
