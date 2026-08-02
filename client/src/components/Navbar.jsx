import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingBar from "react-top-loading-bar";
import { useRef, useState } from "react";
import { FiSearch, FiUser, FiMenu, FiX, FiBookOpen } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const loadingBar = useRef(null);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const startLoading = () => {
    loadingBar.current?.continuousStart();
    setTimeout(() => {
      loadingBar.current?.complete();
    }, 500);
  };

  const handleLogout = () => {
    startLoading();
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      startLoading();
      navigate(`/courses?search=${search}`);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/courses", label: "Courses" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <LoadingBar color="#4f46e5" height={3} shadow ref={loadingBar} />

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link to="/" onClick={startLoading} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-200">
              <FiBookOpen />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-2xl font-extrabold text-transparent">
              StudyHub
            </span>
          </Link>

          <form onSubmit={handleSearch} className="hidden w-[320px] md:flex">
            <div className="relative w-full">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </form>

          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={startLoading}
                className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link to="/dashboard" onClick={startLoading} className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600">
                  Dashboard
                </Link>
                <Link to="/profile" onClick={startLoading} className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                  <FiUser /> Profile
                </Link>
                {user.role === "instructor" && (
                  <Link to="/instructor" onClick={startLoading} className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600">
                    Teach
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={startLoading} className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">
                  Login
                </Link>
                <Link to="/register" onClick={startLoading} className="rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02]">
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="rounded-full p-2 text-2xl text-slate-700 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileMenu(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  {link.label}
                </Link>
              ))}

              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMobileMenu(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-indigo-600">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenu(false)} className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenu(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700">
                    Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setMobileMenu(false)} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700">
                    Profile
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
