import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero">
      <h1>Learn without limits.</h1>
      <p>StudyHub connects instructors and students in one simple learning platform.</p>
      <div className="hero-actions">
        <Link to="/courses" className="btn-primary">
          Browse Courses
        </Link>
        <Link to="/register" className="btn-outline">
          Get Started
        </Link>
      </div>
    </div>
  );
}
