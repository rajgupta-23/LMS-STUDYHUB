import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const sendOTP = async () => {
        try {
            await api.post(
                "/auth/forgot-password",
                {
                    email
                }
            );
            alert("OTP sent to email");
            navigate("/reset-password");
        }
        catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };
    return (
        <div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
">

            <div className="
bg-white
p-8
rounded-xl
shadow
w-96
">

                <h1 className="
text-2xl
font-bold
mb-6
">
                    Forgot Password
                </h1>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
w-full
border
p-3
rounded
mb-5
"
                />
                <button
                    onClick={sendOTP}
                    className="
w-full
bg-indigo-600
text-white
py-3
rounded
"
                >
                    Send OTP
                </button>
            </div>
        </div>
    );
}