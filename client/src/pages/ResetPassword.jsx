import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        otp: "",
        dateOfBirth: "",
        newPassword: "",
    });

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const reset = async () => {
        try {
            await api.post("/auth/reset-password", form);

            alert("Password changed successfully");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Reset Password
                </h2>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Enter your details to reset your password.
                </p>

                <div className="space-y-5">

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={changeHandler}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            OTP
                        </label>

                        <input
                            type="text"
                            name="otp"
                            value={form.otp}
                            onChange={changeHandler}
                            placeholder="Enter OTP"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={form.dateOfBirth}
                            onChange={changeHandler}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={changeHandler}
                            placeholder="Enter new password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        onClick={reset}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                    >
                        Reset Password
                    </button>

                </div>

            </div>

        </div>
    );
}