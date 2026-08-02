import React from "react";
import { FaCertificate, FaDownload, FaGraduationCap } from "react-icons/fa";

const SERVER_URL = "http://localhost:5000";

const CertificateCard = ({ certificate }) => {
    const courseTitle =
        certificate?.course?.title ||
        certificate?.courseTitle ||
        "Completed Course";

    const studentName =
        certificate?.student?.name ||
        certificate?.user?.name ||
        "Student";

    const issuedDate = certificate?.issuedAt
        ? new Date(certificate.issuedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
        : "Recently issued";

    const certificateUrl =
        certificate?.certificateUrl || certificate?.url || certificate?.fileUrl;

    const handleOpenCertificate = () => {
        if (!certificateUrl) return;

        const fullUrl = certificateUrl.startsWith("http")
            ? certificateUrl
            : `${SERVER_URL}${certificateUrl}`;

        window.open(fullUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                    <FaCertificate size={24} />
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    Verified
                </span>
            </div>

            <div className="mt-5">
                <h3 className="text-lg font-semibold text-slate-800">
                    {courseTitle}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                    Issued to <span className="font-semibold text-slate-700">{studentName}</span>
                </p>
                <p className="mt-1 text-sm text-slate-500">Issued on {issuedDate}</p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-600">
                <FaGraduationCap className="text-indigo-500" />
                <span>Course Completion Certificate</span>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                    {certificate?.status || "Completed"}
                </span>

                <button
                    onClick={handleOpenCertificate}
                    disabled={!certificateUrl}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${certificateUrl
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "cursor-not-allowed bg-slate-200 text-slate-500"
                        }`}
                >
                    <FaDownload />
                    {certificateUrl ? "View" : "Pending"}
                </button>
            </div>
        </div>
    );
};

export default CertificateCard;
