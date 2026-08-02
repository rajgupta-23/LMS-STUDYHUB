import { useEffect, useState } from "react";
import { FaCertificate, FaTrophy, FaClock } from "react-icons/fa";
import CertificateCard from "../components/CertificateCard";
import { getMyCertificates } from "../services/certificateApi";

export default function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCertificates = async () => {
            try {
                const res = await getMyCertificates();
                setCertificates(res.certificates || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCertificates();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="text-center">
                    <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                    <p className="mt-4 text-lg font-semibold text-slate-700">
                        Loading your certificates...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-700 p-8 text-white shadow-xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="flex items-center gap-3 text-3xl font-bold">
                                <FaCertificate />
                                <span>Certificates</span>
                            </div>
                            <p className="mt-3 max-w-2xl text-indigo-100">
                                Celebrate your learning milestones with verified course completion certificates.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="rounded-2xl bg-white/20 px-5 py-4 text-center backdrop-blur-sm">
                                <div className="text-2xl font-bold">{certificates.length}</div>
                                <div className="text-sm text-indigo-100">Earned</div>
                            </div>
                            <div className="rounded-2xl bg-white/20 px-5 py-4 text-center backdrop-blur-sm">
                                <div className="flex items-center justify-center gap-2 text-2xl font-bold">
                                    <FaTrophy />
                                    <span>Success</span>
                                </div>
                                <div className="text-sm text-indigo-100">Achievement unlocked</div>
                            </div>
                        </div>
                    </div>
                </div>

                {certificates.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-3xl text-indigo-600">
                            <FaClock />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold text-slate-800">
                            No certificates yet
                        </h2>
                        <p className="mt-3 text-slate-500">
                            Complete courses to unlock your first certificate and showcase your progress.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {certificates.map((certificate) => (
                            <CertificateCard key={certificate._id} certificate={certificate} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

