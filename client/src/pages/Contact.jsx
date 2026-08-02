import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaCheckCircle,
    FaChevronDown,
    FaClock,
    FaEnvelope,
    FaHeadset,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaPhoneAlt,
    FaRocket,
    FaShieldAlt,
    FaUserGraduate,
} from "react-icons/fa";

const accent = "#8264ee";

const contactOptions = [
    {
        icon: FaEnvelope,
        label: "Email us",
        detail: "support@studyhub.com",
        href: "mailto:support@studyhub.com",
        color: "text-[#8264ee] bg-[#f3eeff]",
    },
    {
        icon: FaPhoneAlt,
        label: "Call us",
        detail: "+91 98765 43210",
        href: "tel:+919876543210",
        color: "text-[#8264ee] bg-[#f3eeff]",
    },
    {
        icon: FaClock,
        label: "Support hours",
        detail: "Mon–Fri, 9 AM–6 PM IST",
        color: "text-[#8264ee] bg-[#f3eeff]",
    },
];

const supportHighlights = [
    {
        title: "Fast response",
        text: "Get help within one business day for course, payment, or account issues.",
        icon: FaRocket,
    },
    {
        title: "Trusted guidance",
        text: "Our support team helps with enrollment, certificates, and learning roadmap questions.",
        icon: FaShieldAlt,
    },
    {
        title: "Career-focused help",
        text: "We assist you in choosing the right learning path for your goals.",
        icon: FaUserGraduate,
    },
];

const faqs = [
    {
        question: "How do I enroll in a course?",
        answer:
            "Create an account, choose a course from our catalog, and select Enroll. Your course will appear in My Courses immediately after payment is confirmed.",
    },
    {
        question: "Will I receive a certificate?",
        answer:
            "Yes. You can download a certificate of completion after you have completed all required lessons in an eligible course.",
    },
    {
        question: "Can I learn on my phone?",
        answer:
            "Absolutely. StudyHub works across desktop, tablet, and mobile browsers, so you can keep learning wherever you are.",
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [openFaq, setOpenFaq] = useState(0);

    const handleChange = ({ target: { name, value } }) => {
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setSuccess("");

        window.setTimeout(() => {
            setSuccess("Thank you — your message has been received. Our team will be in touch soon.");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setLoading(false);
        }, 900);
    };

    return (
        <div className="overflow-hidden bg-slate-50 text-slate-900">
            <section className="relative isolate overflow-hidden bg-[#8264ee] px-6 py-20 text-white sm:py-28">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,.12),transparent_25%)]" />
                <div className="mx-auto max-w-5xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-white/95 shadow-sm">
                        <FaHeadset aria-hidden="true" /> Student support
                    </span>
                    <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-6xl">
                        We’re here to guide your learning journey
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
                        From enrollment and payments to certificates and course guidance, our team is ready to help you move forward with confidence.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/95">
                        <span className="rounded-full border border-white/25 bg-white/15 px-4 py-2 shadow-sm">⚡ Fast support response</span>
                        <span className="rounded-full border border-white/25 bg-white/15 px-4 py-2 shadow-sm">🎓 Course guidance</span>
                        <span className="rounded-full border border-white/25 bg-white/15 px-4 py-2 shadow-sm">✅ Certificate help</span>
                    </div>
                </div>
            </section>

            <section className="relative z-10 -mt-8 px-6">
                <div className="mx-auto grid max-w-6xl gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/10 md:grid-cols-3">
                    {contactOptions.map(({ icon: Icon, label, detail, href, color }) => {
                        const content = (
                            <>
                                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
                                    <Icon aria-hidden="true" />
                                </span>
                                <span>
                                    <span className="block text-sm font-medium text-slate-500">{label}</span>
                                    <span className="mt-0.5 block font-semibold text-slate-900">{detail}</span>
                                </span>
                            </>
                        );

                        return href ? (
                            <a
                                key={label}
                                href={href}
                                className="flex items-center gap-4 rounded-2xl p-4 transition hover:bg-slate-50"
                            >
                                {content}
                            </a>
                        ) : (
                            <div key={label} className="flex items-center gap-4 rounded-2xl p-4">
                                {content}
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8264ee]">Get in touch</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tell us what you need.</h2>
                    <p className="mt-5 max-w-lg leading-7 text-slate-600">
                        Send our learning support team a message and we’ll point you in the right direction. We typically reply within one business day.
                    </p>

                    <div className="mt-8 rounded-[24px] border border-[#efe8ff] bg-[#f7f3ff] p-6">
                        <div className="flex gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#8264ee] shadow-sm">
                                <FaMapMarkerAlt aria-hidden="true" />
                            </span>
                            <div>
                                <h3 className="font-semibold">StudyHub Learning Centre</h3>
                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    Gomti Nagar, Lucknow
                                    <br />
                                    Uttar Pradesh 226010, India
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {supportHighlights.map(({ title, text, icon: Icon }) => (
                            <div key={title} className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm text-white">
                                    <Icon aria-hidden="true" />
                                </div>
                                <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#f3eeff] px-3 py-1 text-sm font-semibold text-[#8264ee]">Need help?</span>
                        <span className="rounded-full bg-[#f3eeff] px-3 py-1 text-sm font-semibold text-[#8264ee]">Response within 24 hrs</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">Send a message</h2>
                    <p className="mt-2 text-sm text-slate-500">Fields marked with an asterisk are required.</p>

                    {success && (
                        <div
                            className="mt-6 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                            role="status"
                        >
                            <FaCheckCircle className="mt-0.5 shrink-0" aria-hidden="true" />
                            {success}
                        </div>
                    )}

                    <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                label="Full name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                            />
                            <Field
                                label="Email address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                        </div>

                        <Field
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                        />

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="message">
                                Message <span className="text-[#8264ee]">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Share a few details so we can help quickly."
                                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#8264ee] focus:ring-4 focus:ring-[#efe8ff]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#8264ee] px-5 py-3.5 font-semibold text-white transition hover:bg-[#6f52e3] focus:outline-none focus:ring-4 focus:ring-[#e8dcff] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Sending message…" : <><FaPaperPlane aria-hidden="true" /> Send message</>}
                        </button>
                    </form>
                </div>
            </section>

            <section className="border-y border-slate-200 bg-white px-6 py-20">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8264ee]">Quick answers</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight">Frequently asked questions</h2>
                    </div>

                    <div className="mt-10 divide-y divide-slate-200 rounded-[24px] border border-slate-200 px-6">
                        {faqs.map((item, index) => (
                            <div key={item.question}>
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold"
                                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                    aria-expanded={openFaq === index}
                                >
                                    <span>{item.question}</span>
                                    <FaChevronDown
                                        className={`shrink-0 text-[#8264ee] transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                                        aria-hidden="true"
                                    />
                                </button>

                                {openFaq === index && (
                                    <p className="max-w-3xl pb-5 text-sm leading-7 text-slate-600">{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#8264ee] px-6 py-16 text-center text-white">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to start learning?</h2>
                    <p className="mt-4 text-white/90">Explore practical courses built to help you make real progress.</p>
                    <Link
                        to="/courses"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-[#8264ee] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#f3eeff]"
                    >
                        Explore courses <FaArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

function Field({ label, name, type = "text", value, onChange, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor={name}>
                {label} <span className="text-[#8264ee]">*</span>
            </label>
            <input
                id={name}
                type={type}
                name={name}
                required
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#8264ee] focus:ring-4 focus:ring-[#efe8ff]"
            />
        </div>
    );
}
