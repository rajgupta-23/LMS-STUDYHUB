import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import {
    FaBookOpen,
    FaGraduationCap,
    FaRocket,
    FaStar,
    FaUsers,
    FaArrowRight,
} from "react-icons/fa";

const About = () => {
    const [stats, setStats] = useState({
        courses: 0,
        students: 0,
        mentors: 0,
        rating: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/about");
                setStats(res.data);
            } catch (error) {
                console.log("About Stats Error:", error);
            }
        };

        fetchStats();
    }, []);

    const highlights = [
        {
            title: "Expert Instructors",
            description:
                "Learn from professionals with real-world experience and practical teaching methods.",
            icon: <FaGraduationCap />,
            accent: "from-[#8264ee] to-[#6d28d9]",
        },
        {
            title: "Practical Learning",
            description:
                "Each course focuses on real projects, hands-on tasks, and portfolio-building skills.",
            icon: <FaBookOpen />,
            accent: "from-[#8b5cf6] to-[#7c3aed]",
        },
        {
            title: "Career Growth",
            description:
                "Build confidence, earn certificates, and unlock opportunities with every completed milestone.",
            icon: <FaRocket />,
            accent: "from-[#a78bfa] to-[#8b5cf6]",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <section className="relative overflow-hidden bg-gradient-to-r from-[#8264ee] via-[#7c3aed] to-[#6d28d9] px-6 py-24 text-white sm:py-32">
                <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"></div>

                <div className="relative mx-auto max-w-7xl text-center">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                        <FaGraduationCap />
                        Learn • Build • Grow
                    </div>
                    <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        About StudyHub
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-violet-100">
                        StudyHub is a modern online learning platform designed to help students and professionals master today’s most in-demand skills through practical, project-based learning.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <div className="overflow-hidden rounded-[32px] shadow-2xl shadow-slate-200">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
                            alt="Learning"
                            className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
                        />
                    </div>

                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8264ee]">
                            Who We Are
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                            Learn anytime, anywhere, with purpose.
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            We believe quality education should be accessible to everyone. Our courses are designed by experienced instructors and focus on practical skills that help learners become job-ready.
                        </p>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            Whether you are starting your journey or upgrading your expertise, StudyHub offers a modern learning experience with structured lessons, projects, and certificates.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        { label: "Courses", value: stats.courses, color: "from-[#8264ee] to-[#6d28d9]", icon: <FaBookOpen /> },
                        { label: "Students", value: stats.students, color: "from-[#8b5cf6] to-[#7c3aed]", icon: <FaUsers /> },
                        { label: "Mentors", value: stats.mentors, color: "from-[#a78bfa] to-[#8b5cf6]", icon: <FaGraduationCap /> },
                        { label: "Rating", value: stats.rating, color: "from-[#c4b5fd] to-[#8b5cf6]", icon: <FaStar /> },
                    ].map((item) => (
                        <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <div className={`mx-auto mb-4 inline-flex rounded-2xl bg-gradient-to-r ${item.color} p-3 text-xl text-white`}>
                                {item.icon}
                            </div>
                            <h3 className="text-4xl font-bold text-slate-800">{item.value}+</h3>
                            <p className="mt-2 text-sm font-medium text-slate-500">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8264ee]">
                            Why StudyHub
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                            Built for modern learners
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            We combine practical learning, experienced instructors, and modern technology to help learners achieve their career goals.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {highlights.map((item) => (
                            <div key={item.title} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${item.accent} p-3 text-xl text-white`}>
                                    {item.icon}
                                </div>
                                <h3 className="mt-6 text-2xl font-semibold text-slate-800">{item.title}</h3>
                                <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-r from-[#8264ee] via-[#7c3aed] to-[#6d28d9] px-6 py-24 text-white">
                <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"></div>

                <div className="relative mx-auto max-w-5xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-100">
                        Join our learning community
                    </p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Ready to start your learning journey?
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-violet-100">
                        Join thousands of learners exploring web development, AI, data science, cloud, cybersecurity, and more.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[#8264ee] shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-50"
                        >
                            Get Started <FaArrowRight />
                        </Link>
                        <Link
                            to="/courses"
                            className="rounded-xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
                        >
                            Explore Courses
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
