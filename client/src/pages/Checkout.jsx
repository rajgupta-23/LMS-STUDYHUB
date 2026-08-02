import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
export default function Checkout() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handlePayment = async () => {
        try {
            setLoading(true);
            setMessage("");
            const { data } = await api.post(
                "/payment/create-order",
                {
                    courseId: id
                }
            );
            if (!window.Razorpay) {
                setMessage(
                    "Payment gateway not loaded"
                );
                return;
            }
            const options = {
                key: data.key,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "StudyHub LMS",
                description:
                    "Premium Course Purchase",
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        await api.post(
                            "/payment/verify",
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,
                                razorpay_payment_id:
                                    response.razorpay_payment_id,
                                razorpay_signature:
                                    response.razorpay_signature,
                                paymentMongoId:
                                    data.paymentId
                            }
                        );
                        setMessage(
                            "Payment successful 🎉"
                        );
                        setTimeout(() => {

                            navigate(`/courses/${id}`);
                        }, 1500);
                    }
                    catch (err) {
                        console.log(
                            err
                        );
                        setMessage(
                            "Payment verification failed"
                        );
                    }
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || ""
                },
                theme: {
                    color: "#6366f1"
                }
            };
            const razorpay =
                new window.Razorpay(options);
            razorpay.open();
        }
        catch (error) {
            console.log(error);
            setMessage(
                error.response?.data?.message ||
                "Payment failed"
            );
        }
        finally {

            setLoading(false);

        }
    };
    return (

        <div className="
min-h-screen
bg-gradient-to-br
from-indigo-50
via-white
to-purple-50
flex
items-center
justify-center
px-5
">


            <div className="
max-w-5xl
w-full
grid
md:grid-cols-2
gap-8
bg-white
rounded-3xl
shadow-xl
p-8
">
                <div>
                    <h1 className="
text-4xl
font-bold
text-gray-900
">
                        Complete Your Enrollment
                    </h1>
                    <p className="
mt-4
text-gray-600
text-lg
">
                        Unlock premium learning content and
                        start your journey with StudyHub.
                    </p>
                    <div className="
mt-8
space-y-4
">
                        <div className="
flex
items-center
gap-3
">

                            <span className="
text-green-600
text-xl
">

                            </span>
                            Lifetime access
                        </div>
                        <div className="
flex
items-center
gap-3
">

                            <span className="
text-green-600
text-xl
">
                            </span>
                            HD Video Lessons
                        </div>
                        <div className="
flex
items-center
gap-3
">
                            <span className="
text-green-600
text-xl
">
                            </span>
                            Certificate after completion
                        </div>
                        <div className="
flex
items-center
gap-3
">
                            <span className="
text-green-600
text-xl
">
                            </span>
                            Mobile & Desktop Access
                        </div>
                    </div>
                </div>
                <div className="
bg-gray-50
rounded-2xl
p-8
border
">
                    <h2 className="
text-2xl
font-bold
mb-6
">
                        Order Summary
                    </h2>
                    <div className="
flex
justify-between
mb-4
">                      <span>
                            Course Price
                        </span>
                        <span className="
font-bold
">
                        </span>
                    </div>
                    <div className="
border-t
my-5
">
                    </div>
                    <div className="
flex
justify-between
text-xl
font-bold
">
                        <span>
                            Total
                        </span>
                        <span className="
text-indigo-600
">
                            ₹999
                        </span>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="
mt-8
w-full
bg-indigo-600
hover:bg-indigo-700
disabled:bg-gray-400
text-white
py-4
rounded-xl
font-bold
text-lg
transition
"
                    >
                        {
                            loading
                                ?
                                "Processing Payment..."
                                :
                                "Pay Now"
                        }
                    </button>
                    <div className="
mt-5
text-center
text-sm
text-gray-500
">
                        ecure payment powered by Razorpay
                    </div>
                    {
                        message &&
                        <p className="
mt-5
text-center
font-semibold
text-green-600
">
                            {message}
                        </p>
                    }
                </div>
            </div>
        </div>
    );

}