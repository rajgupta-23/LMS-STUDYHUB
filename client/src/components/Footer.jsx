import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-300">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
                    <div>
                        <h2 className="text-3xl font-bold text-white">StudyHub</h2>
                        <p className="mt-5 max-w-md text-base leading-7 text-slate-400">
                            Learn modern technologies from industry experts. Build practical skills, complete projects, and grow into your next career step.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {[
                                { icon: <FaFacebookF />, href: "https://facebook.com", color: "hover:bg-blue-600" },
                                { icon: <FaTwitter />, href: "https://twitter.com", color: "hover:bg-sky-500" },
                                { icon: <FaInstagram />, href: "https://instagram.com", color: "hover:bg-pink-600" },
                                { icon: <FaLinkedinIn />, href: "https://linkedin.com", color: "hover:bg-blue-700" },
                                { icon: <FaGithub />, href: "https://github.com", color: "hover:bg-white hover:text-slate-900" },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm text-slate-200 transition hover:-translate-y-1 ${item.color}`}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="transition hover:text-indigo-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses" className="transition hover:text-indigo-400">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="transition hover:text-indigo-400">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="transition hover:text-indigo-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">Popular Categories</h3>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="transition hover:text-indigo-400">Web Development</li>
                            <li className="transition hover:text-indigo-400">Programming</li>
                            <li className="transition hover:text-indigo-400">Data Science</li>
                            <li className="transition hover:text-indigo-400">Artificial Intelligence</li>
                            <li className="transition hover:text-indigo-400">UI / UX Design</li>
                            <li className="transition hover:text-indigo-400">Cyber Security</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 text-lg font-semibold text-white">Contact Us</h3>
                        <div className="space-y-4 text-sm text-slate-400">
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-indigo-400" />
                                <span>support@studyhub.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-emerald-400" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-rose-400" />
                                <span>Lucknow, Uttar Pradesh, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} StudyHub. All Rights Reserved.
                    </p>
                    <div className="flex flex-wrap gap-5 text-sm text-slate-400">
                        <Link to="/privacy" className="transition hover:text-indigo-400">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="transition hover:text-indigo-400">
                            Terms & Conditions
                        </Link>
                        <Link to="/faq" className="transition hover:text-indigo-400">
                            FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
