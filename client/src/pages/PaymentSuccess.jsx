import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {

    const location = useLocation();

    const payment = location.state;

    if (!payment) {
        return (
            <div className="text-center mt-20">
                Payment data not found
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">

            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">

                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-5xl">
                        </span>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <h1 className="text-3xl font-bold">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-500 mt-3">
                        You are successfully enrolled in this course.
                    </p>
                </div>
                <div className="mt-8 border rounded-xl p-6 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-5">
                        Payment Details
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Course</span>
                            <span className="font-medium">
                                {payment.course}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Amount</span>
                            <span className="text-green-600 font-bold">
                                ₹{payment.amount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Transaction ID</span>
                            <span>
                                {payment.transactionId}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>Date</span>
                            <span>
                                {payment.date}
                            </span>
                        </div>


                        <div className="flex justify-between">
                            <span>Status</span>
                            <span className="text-green-600 font-bold">
                                Successful
                            </span>
                        </div>


                    </div>

                </div>


                <div className="grid sm:grid-cols-2 gap-4 mt-8">


                    <Link
                        to="/dashboard"
                        className="bg-indigo-600 text-white text-center py-3 rounded-lg"
                    >
                        Go Dashboard
                    </Link>


                    <Link
                        to="/courses"
                        className="border border-indigo-600 text-indigo-600 text-center py-3 rounded-lg"
                    >
                        Continue Learning
                    </Link>


                </div>


            </div>

        </div>
    );
};
export default PaymentSuccess;