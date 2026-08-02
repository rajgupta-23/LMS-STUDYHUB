import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const course = location.state;


    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow">

                    <h2 className="text-2xl font-bold text-gray-800">
                        No Course Selected
                    </h2>
                    <button
                        onClick={() => navigate("/courses")}
                        className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-lg"
                    >
                        Go To Courses
                    </button>

                </div>
            </div>
        );
    }
    const discount = 200;
    const finalPrice = course.price - discount;
    const handlePayment = () => {
        navigate("/payment-success", {
            state: {
                transactionId: "TXN" + Date.now(),
                courseId: course.courseId,
                course: course.title,
                amount: finalPrice,
                date: new Date().toLocaleDateString(),
                paymentMethod: paymentMethod
            }
        });
    };
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Checkout
                </h1>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-2xl font-semibold mb-5">
                                Course Details
                            </h2>
                            <div className="flex gap-5">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-40 h-28 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-500 mt-2">
                                        Instructor: {course.instructor}
                                    </p>
                                    <p className="text-green-600 mt-3 font-semibold">
                                        Lifetime Access
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Apply Coupon
                            </h2>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter coupon code"
                                    className="flex-1 border rounded-lg px-4 py-3"
                                />
                                <button className="bg-indigo-600 text-white px-6 rounded-lg">
                                    Apply
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6">
                            <h2 className="text-xl font-semibold mb-5">
                                Select Payment Method
                            </h2>
                            <div className="space-y-4">
                                <label className="flex gap-3 border rounded-lg p-4">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "upi"}
                                        onChange={() =>
                                            setPaymentMethod("upi")
                                        }
                                    />
                                    UPI
                                </label>
                                <label className="flex gap-3 border rounded-lg p-4">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "card"}
                                        onChange={() =>
                                            setPaymentMethod("card")
                                        }
                                    />
                                </label>
                                <label className="flex gap-3 border rounded-lg p-4">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "netbanking"}
                                        onChange={() =>
                                            setPaymentMethod("netbanking")
                                        }
                                    />
                                    Net Banking
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white rounded-xl shadow p-6 sticky top-24">
                            <h2 className="text-2xl font-semibold mb-6">
                                Order Summary
                            </h2>
                            <div className="flex justify-between mb-4">
                                <span>
                                    Course Price
                                </span>
                                <span>
                                    ₹{course.price}
                                </span>
                            </div>
                            <div className="flex justify-between mb-4 text-green-600">
                                <span>
                                    Discount
                                </span>

                                <span>
                                    -₹{discount}
                                </span>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between text-xl font-bold">
                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹{finalPrice}
                                </span>
                            </div>
                            <button
                                onClick={handlePayment}
                                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Proceed to Payment
                            </button>
                            <p className="text-sm text-gray-500 text-center mt-4">
                                Secure payment powered by Razorpay / Stripe
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Payment;