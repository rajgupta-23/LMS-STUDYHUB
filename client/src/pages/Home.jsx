import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [courseRes, statsRes, categoryRes] = await Promise.all([
          api.get("/courses"),
          api.get("/stats"),
          api.get("/courses/categories/list"),
        ]);

        setFeaturedCourses(courseRes.data.slice(0, 3));
        setStats(statsRes.data);
        setCategories(categoryRes.data.categories || []);
      } catch (error) {
        console.log("Home Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="bg-transparent">
      <section className="relative overflow-hidden bg-[#8264ee] text-white">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur">
                🚀 India’s Fast Growing LMS
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Learn skills that <span className="text-white/90">build your future</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-white/85">
                Master web development, AI, data science, cloud computing, and more through practical, career-focused learning.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/courses" className="rounded-2xl bg-white px-8 py-4 font-bold text-[#8264ee] shadow-lg transition hover:bg-[#f3eeff]">
                  Explore Courses
                </Link>
                <Link to="/about" className="rounded-2xl border-2 border-white px-8 py-4 font-semibold transition hover:bg-white/10">
                  Learn More
                </Link>
              </div>

              <div className="mt-12 flex items-center">
                <div className="flex -space-x-4">
                  <img src="https://i.pravatar.cc/50?img=11" alt="Student 1" className="h-12 w-12 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/50?img=12" alt="Student 2" className="h-12 w-12 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/50?img=13" alt="Student 3" className="h-12 w-12 rounded-full border-2 border-white" />
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold">{stats.students || 0}+ Students</h3>
                  <p className="text-white/85">Learning every day</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
                alt="Students learning"
                className="rounded-[28px] border border-white/20 shadow-2xl"
              />
              <div className="absolute -bottom-8 left-6 rounded-2xl bg-white p-5 text-gray-800 shadow-xl">
                <h3 className="text-xl font-bold">⭐ {stats.rating || 0} Rating</h3>
                <p className="text-gray-500">Trusted by students</p>
              </div>
              <div className="absolute right-6 top-6 rounded-2xl bg-white px-5 py-3 font-bold text-[#8264ee] shadow-lg">
                {stats.courses || 0}+ Courses
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-transparent to-violet-50/40 py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🎓", value: `${stats.students || 0}+`, label: "Active Students", color: "from-[#f3eeff] to-white text-[#8264ee]" },
              { icon: "📚", value: `${stats.courses || 0}+`, label: "Premium Courses", color: "from-[#f3eeff] to-white text-[#8264ee]" },
              { icon: "👨‍🏫", value: `${stats.instructors || 0}+`, label: "Expert Mentors", color: "from-[#f3eeff] to-white text-[#8264ee]" },
              { icon: "⭐", value: `${stats.rating || 0}`, label: "Student Rating", color: "from-[#f3eeff] to-white text-[#8264ee]" },
            ].map((item) => (
              <div key={item.label} className={`rounded-[24px] bg-gradient-to-br ${item.color} p-8 text-center shadow-lg transition hover:-translate-y-2`}>
                <div className="mb-4 text-5xl">{item.icon}</div>
                <h2 className="text-4xl font-extrabold">{item.value}</h2>
                <p className="mt-3 text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">Explore Categories</h2>
            <p className="mt-4 text-lg text-gray-500">Choose your domain and start learning with confidence.</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <div key={category} className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="text-6xl">{["💻", "🤖", "📱", "📊", "☁️", "🔒", "🎨", "⚙️"][index % 8]}</div>
                <h3 className="mt-6 text-xl font-bold text-gray-800">{category}</h3>
                <p className="mt-2 text-gray-500">Explore {category}</p>
                <Link to={`/courses?category=${category}`} className="mt-6 inline-block rounded-xl bg-[#8264ee] px-6 py-2 text-white transition hover:bg-[#6f52e3]">
                  Explore
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">Why Choose Our LMS?</h2>
            <p className="mt-4 text-gray-500">Learn from mentors, build real projects, and earn certificates that matter.</p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: "🎓", title: "Expert Instructors", text: "Learn from experienced developers and industry professionals.", color: "from-[#f3eeff] to-white" },
              { icon: "📚", title: "Practical Courses", text: "Build real projects and strengthen your portfolio.", color: "from-[#f3eeff] to-white" },
              { icon: "🏆", title: "Certificates", text: "Earn certificates after completing hands-on learning paths.", color: "from-[#f3eeff] to-white" },
            ].map((item) => (
              <div key={item.title} className={`rounded-[28px] bg-gradient-to-br ${item.color} p-8 shadow-lg transition hover:-translate-y-2`}>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-3xl text-white">{item.icon}</div>
                <h3 className="mt-6 text-2xl font-bold text-slate-800">{item.title}</h3>
                <p className="mt-4 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-800">Featured Courses</h2>
              <p className="mt-2 text-gray-500">Start learning with our most popular courses.</p>
            </div>
            <Link to="/courses" className="rounded-2xl bg-[#8264ee] px-6 py-3 font-semibold text-white transition hover:bg-[#6f52e3]">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center text-xl text-[#8264ee] shadow-lg">
              Loading courses...
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => (
                <div key={course._id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
                    alt={course.title}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-7">
                    <span className="rounded-full bg-[#f3eeff] px-3 py-1 text-sm font-semibold text-[#8264ee]">
                      {course.category}
                    </span>
                    <h3 className="mt-5 text-2xl font-bold text-slate-800">{course.title}</h3>
                    <p className="mt-3 text-gray-500">
                      Instructor: <span className="ml-2 font-semibold text-slate-700">{course.instructor?.name || "Instructor"}</span>
                    </p>
                    <div className="mt-4 flex items-center">
                      <span className="text-yellow-400">★★★★★</span>
                      <span className="ml-2 text-gray-500">{course.rating || 4.8}</span>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <h2 className="text-3xl font-bold text-[#8264ee]">₹{course.price}</h2>
                      <Link to={`/courses/${course._id}`} className="rounded-2xl bg-[#8264ee] px-6 py-3 font-semibold text-white transition hover:bg-[#6f52e3]">
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-[#8264ee] text-white">
        <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-10">
          <h2 className="text-4xl font-extrabold sm:text-5xl">Start Learning Today</h2>
          <p className="mt-6 text-lg text-white/85">Join thousands of students and build your future with practical, high-impact skills.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="rounded-2xl bg-white px-8 py-4 font-bold text-[#8264ee] transition hover:bg-[#f3eeff]">
              Get Started Free
            </Link>
            <Link to="/courses" className="rounded-2xl border-2 border-white px-8 py-4 font-semibold transition hover:bg-white/10">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;