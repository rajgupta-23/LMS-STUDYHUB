import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import {
    FaArrowRight,
    FaBookOpen,
    FaCamera,
    FaCertificate,
    FaCheckCircle,
    FaClock,
    FaEdit,
    FaEnvelope,
    FaGraduationCap,
    FaShieldAlt,
    FaTrophy,
    FaUserGraduate,
} from "react-icons/fa";

const defaultAvatar = "https://i.pravatar.cc/300";

const buildAvatarUrl = (avatar) => {
    if (!avatar) return defaultAvatar;
    if (avatar.startsWith("http")) return avatar;
    return `http://localhost:5000${avatar}`;
};

const Profile = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("overview");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [selectedFile, setSelectedFile] = useState(null);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        bio: "",
        avatar: defaultAvatar,
    });
    const [dashboard, setDashboard] = useState({
        stats: {
            enrolled: 0,
            completed: 0,
            certificates: 0,
        },
        courses: [],
    });

    useEffect(() => {
        if (user) {
            setProfile({
                name: user?.name || "",
                email: user?.email || "",
                bio: user?.bio || "",
                avatar: buildAvatarUrl(user?.avatar),
            });
        }
    }, [user]);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const res = await api.get("/users/dashboard");
            setDashboard(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboard();
        }
    }, [user]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setProfile((prev) => ({
            ...prev,
            avatar: URL.createObjectURL(file),
        }));
    };

    const saveProfile = async () => {
        try {
            setSaving(true);
            setMessage({ type: "", text: "" });

            const formData = new FormData();
            formData.append("name", profile.name);
            formData.append("email", profile.email);
            formData.append("bio", profile.bio || "");

            if (selectedFile) {
                formData.append("avatar", selectedFile);
            }

            const updatedUser = await updateUser(formData);
            setProfile((prev) => ({
                ...prev,
                name: updatedUser?.name || prev.name,
                email: updatedUser?.email || prev.email,
                bio: updatedUser?.bio || prev.bio,
                avatar: buildAvatarUrl(updatedUser?.avatar),
            }));
            setSelectedFile(null);
            setActiveSection("overview");
            setMessage({ type: "success", text: "Profile updated successfully." });
            await fetchDashboard();
        } catch (err) {
            console.log(err);
            setMessage({ type: "error", text: "Unable to save your profile right now." });
        } finally {
            setSaving(false);
        }
    };

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId);

        if (sectionId === "certificates") {
            navigate("/certificates");
        } else if (sectionId === "learning") {
            navigate("/my-courses");
        }
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-xl">
                    <h1 className="text-3xl font-bold text-slate-800">Please Login</h1>
                    <p className="mt-2 text-slate-500">Sign in to see your learning profile.</p>
                </div>
            </div>
        );
    }

    const sections = [
        { id: "overview", label: "Overview", icon: <FaGraduationCap /> },
        { id: "edit", label: "Edit Profile", icon: <FaEdit /> },
        { id: "certificates", label: "Certificates", icon: <FaCertificate /> },
        { id: "learning", label: "Learning", icon: <FaBookOpen /> },
    ];

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(130,100,238,0.18),_transparent_30%),linear-gradient(135deg,_#f8f7ff_0%,_#f3f0ff_45%,_#f9fafb_100%)] text-slate-800">
            <div className="bg-gradient-to-r from-[#8264ee] via-[#7c3aed] to-[#6d28d9] px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl text-white">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                            <FaShieldAlt /> Student Profile
                        </div>
                        <h1 className="text-4xl font-bold sm:text-5xl">Welcome back, {profile.name || "Learner"}</h1>
                        <p className="mt-3 text-lg text-violet-100">
                            Continue your learning journey with a polished dashboard and quick access to your profile tools.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white backdrop-blur">
                        <p className="text-sm text-violet-100">Current progress</p>
                        <p className="mt-1 text-3xl font-semibold">{dashboard.stats.completed || 0} completed</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto -mt-8 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
                    <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl shadow-violet-100">
                        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                            <img
                                src={profile.avatar}
                                alt="Profile"
                                className="h-14 w-14 rounded-full border-2 border-violet-200 object-cover"
                            />
                            <div>
                                <p className="font-semibold text-slate-800">{profile.name}</p>
                                <p className="text-sm text-slate-500 capitalize">{user.role || "student"}</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            {sections.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (item.id === "overview" || item.id === "edit") {
                                            setActiveSection(item.id);
                                        } else {
                                            handleSectionClick(item.id);
                                        }
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${activeSection === item.id
                                        ? "bg-[#8264ee] text-white shadow-lg shadow-violet-200"
                                        : "bg-white text-slate-600 hover:bg-violet-50 hover:text-[#8264ee]"
                                        }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 rounded-2xl bg-gradient-to-br from-violet-50 to-fuchsia-50 p-4">
                            <p className="text-sm font-semibold text-[#8264ee]">Keep going strong</p>
                            <p className="mt-2 text-sm text-slate-600">
                                Discover new lessons and finish your next milestone with confidence.
                            </p>
                            <Link
                                to="/courses"
                                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#8264ee] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
                            >
                                Explore Courses <FaArrowRight />
                            </Link>
                        </div>
                    </aside>

                    <div className="space-y-6">
                        {activeSection === "overview" && (
                            <div className="space-y-6">
                                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100 transition-all duration-300 hover:-translate-y-1">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8264ee]">Overview</p>
                                            <h2 className="mt-2 text-2xl font-bold text-slate-800">Your learning snapshot</h2>
                                            <p className="mt-2 text-slate-500">
                                                See your key stats, active courses, and quick actions in one place.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setActiveSection("edit")}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8264ee] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6d28d9]"
                                        >
                                            <FaEdit /> Update Profile
                                        </button>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <StatCard icon={<FaBookOpen />} num={dashboard.stats.enrolled || 0} title="Enrolled" />
                                    <StatCard icon={<FaCheckCircle />} num={dashboard.stats.completed || 0} title="Completed" />
                                    <StatCard icon={<FaCertificate />} num={dashboard.stats.certificates || 0} title="Certificates" />
                                </div>

                                <div className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
                                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100">
                                        <div className="mb-5 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800">Continue learning</h3>
                                                <p className="text-sm text-slate-500">Pick up where you left off.</p>
                                            </div>
                                            <Link
                                                to="/my-courses"
                                                className="text-sm font-semibold text-[#8264ee] transition hover:text-[#6d28d9]"
                                            >
                                                View all
                                            </Link>
                                        </div>

                                        {loading ? (
                                            <div className="space-y-3">
                                                {[1, 2, 3].map((item) => (
                                                    <div key={item} className="h-16 animate-pulse rounded-2xl bg-slate-100" />
                                                ))}
                                            </div>
                                        ) : dashboard.courses.length ? (
                                            <div className="space-y-4">
                                                {dashboard.courses.slice(0, 3).map((item) => (
                                                    <CourseItem
                                                        key={item._id}
                                                        name={item.course?.title || "Course"}
                                                        progress={`${item.progress || 0}%`}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                                                No courses enrolled yet. Start with a new course and build momentum.
                                            </div>
                                        )}
                                    </div>

                                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100">
                                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8264ee]">Quick actions</p>
                                        <h3 className="mt-2 text-xl font-bold text-slate-800">Jump to your next milestone</h3>
                                        <div className="mt-5 space-y-3">
                                            <Link
                                                to="/certificates"
                                                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#8264ee] hover:bg-violet-100"
                                            >
                                                <span>View Certificates</span>
                                                <FaArrowRight className="text-[#8264ee]" />
                                            </Link>
                                            <Link
                                                to="/my-courses"
                                                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-fuchsia-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#8264ee] hover:bg-fuchsia-100"
                                            >
                                                <span>Open My Courses</span>
                                                <FaArrowRight className="text-[#8264ee]" />
                                            </Link>
                                            <button
                                                onClick={() => setActiveSection("edit")}
                                                className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#8264ee] hover:bg-slate-100"
                                            >
                                                <span>Edit Profile</span>
                                                <FaEdit className="text-[#8264ee]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "edit" && (
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100 transition-all duration-300">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8264ee]">Edit Profile</p>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-800">Personalize your account</h2>
                                    </div>
                                    <div className="rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-[#8264ee]">
                                        <FaUserGraduate className="mr-2 inline" /> {user.role || "student"}
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-6 lg:grid-cols-[220px,1fr]">
                                    <div className="flex flex-col items-center rounded-3xl bg-slate-50 p-5 text-center">
                                        <div className="relative">
                                            <img src={profile.avatar} alt="Profile" className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg" />
                                            <label
                                                htmlFor="profileImage"
                                                className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#8264ee] text-white shadow-lg transition hover:bg-[#6d28d9]"
                                            >
                                                <FaCamera />
                                            </label>
                                            <input id="profileImage" type="file" hidden accept="image/*" capture="environment" onChange={imageHandler} />
                                        </div>
                                        <p className="mt-4 text-sm text-slate-500">Upload a fresh profile photo.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-600">Full Name</label>
                                            <input
                                                name="name"
                                                value={profile.name}
                                                onChange={changeHandler}
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#8264ee] focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-600">Email Address</label>
                                            <input
                                                name="email"
                                                value={profile.email}
                                                onChange={changeHandler}
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#8264ee] focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-slate-600">Bio</label>
                                            <textarea
                                                name="bio"
                                                value={profile.bio}
                                                onChange={changeHandler}
                                                rows="3"
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#8264ee] focus:bg-white"
                                                placeholder="Tell learners a bit about yourself"
                                            />
                                        </div>
                                        {message.text ? (
                                            <div className={`rounded-2xl border px-4 py-3 text-sm ${message.type === "error" ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                                                {message.text}
                                            </div>
                                        ) : null}
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <FaEnvelope className="text-[#8264ee]" />
                                                {profile.email}
                                            </div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <FaClock className="text-[#8264ee]" />
                                                Last updated recently
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={saveProfile}
                                                disabled={saving}
                                                className="rounded-full bg-[#8264ee] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6d28d9] disabled:cursor-not-allowed disabled:bg-violet-400"
                                            >
                                                {saving ? "Saving..." : "Save Changes"}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setProfile({
                                                        name: user?.name || "",
                                                        email: user?.email || "",
                                                        bio: user?.bio || "",
                                                        avatar: buildAvatarUrl(user?.avatar),
                                                    });
                                                    setSelectedFile(null);
                                                    setMessage({ type: "", text: "" });
                                                    setActiveSection("overview");
                                                }}
                                                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#8264ee] hover:text-[#8264ee]"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === "certificates" && (
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8264ee]">Certificates</p>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-800">Your achievements</h2>
                                    </div>
                                    <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                                        <FaTrophy className="mr-2 inline" /> {dashboard.stats.certificates || 0} earned
                                    </div>
                                </div>

                                {dashboard.stats.certificates ? (
                                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                                        {dashboard.courses.slice(0, 2).map((item, index) => (
                                            <div key={item._id || index} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5 transition hover:-translate-y-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-2xl bg-white p-3 text-[#8264ee] shadow-sm">
                                                        <FaCertificate />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{item.course?.title || "Certificate"}</p>
                                                        <p className="text-sm text-slate-500">Completion badge ready</p>
                                                    </div>
                                                </div>
                                                <Link to="/certificates" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8264ee]">
                                                    View certificate <FaArrowRight />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                                        You have not earned certificates yet. Complete a course and your achievement will appear here.
                                    </div>
                                )}
                            </div>
                        )}

                        {activeSection === "learning" && (
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8264ee]">Learning</p>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-800">Your active learning path</h2>
                                    </div>
                                    <Link to="/my-courses" className="text-sm font-semibold text-[#8264ee] transition hover:text-[#6d28d9]">
                                        Open My Courses
                                    </Link>
                                </div>

                                <div className="mt-6 space-y-4">
                                    {dashboard.courses.length ? (
                                        dashboard.courses.map((item) => (
                                            <CourseItem
                                                key={item._id}
                                                name={item.course?.title || "Course"}
                                                progress={`${item.progress || 0}%`}
                                            />
                                        ))
                                    ) : (
                                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                                            Your enrolled lessons will appear here as soon as you start learning.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, num, title }) => (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-md shadow-violet-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-center justify-center rounded-2xl bg-violet-50 p-3 text-2xl text-[#8264ee]">
            {icon}
        </div>
        <h3 className="mt-4 text-3xl font-bold text-slate-800">{num}</h3>
        <p className="mt-1 text-sm text-slate-500">{title}</p>
    </div>
);

const CourseItem = ({ name, progress }) => (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-[#8264ee]">
        <div className="mb-2 flex items-center justify-between font-semibold text-slate-700">
            <span>{name}</span>
            <span className="text-[#8264ee]">{progress}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-3 rounded-full bg-gradient-to-r from-[#8264ee] to-[#a78bfa]" style={{ width: progress }} />
        </div>
    </div>
);

export default Profile;