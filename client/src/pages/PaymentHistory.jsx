import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await api.get("/payments/history");
            setPayments(res.data);
        } catch (error) {
            console.log(
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-700";

            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "failed":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleViewReceipt = (payment) => {
        if (!payment.receiptUrl) {
            alert("Receipt not available");
            return;
        }

        window.open(payment.receiptUrl, "_blank");
    };

    const handleDownloadReceipt = async (payment) => {
        if (!payment.receiptUrl) {
            alert("Receipt not available");
            return;
        }

        try {
            const response = await fetch(payment.receiptUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `Receipt-${payment.paymentId || payment.orderId}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
            alert("Unable to download receipt");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading Payment History...
                </h2>
            </div>
        );
    }

    const totalAmount = payments
        .filter((p) => p.status === "success")
        .reduce((sum, p) => sum + p.amount, 0);

    const pendingPayments = payments.filter(
        (p) => p.status === "pending"
    ).length;
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">
                            Payment History
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View all your course payment transactions.
                        </p>
                    </div>

                    <Link
                        to="/courses"
                        className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
                    >
                        Browse Courses
                    </Link>

                </div>

                {/* Table */}

                <div className="bg-white rounded-xl shadow-md overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr className="text-left">
                                <th className="px-6 py-4">Transaction ID</th>
                                <th className="px-6 py-4">Course</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-10 text-gray-500"
                                    >
                                        No payments found
                                    </td>
                                </tr>

                            ) : (

                                payments.map((payment) => (

                                    <tr
                                        key={payment._id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4 font-medium">
                                            {payment.paymentId || payment.orderId}
                                        </td>

                                        <td className="px-6 py-4">
                                            {payment.course?.title}
                                        </td>

                                        <td className="px-6 py-4 font-semibold">
                                            ₹{payment.amount}
                                        </td>

                                        <td className="px-6 py-4">
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}
                                            >
                                                {payment.status}
                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            {payment.receiptUrl ? (

                                                <div className="flex gap-4">

                                                    <button
                                                        onClick={() => handleViewReceipt(payment)}
                                                        className="text-indigo-600 hover:underline"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() => handleDownloadReceipt(payment)}
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Download
                                                    </button>

                                                </div>

                                            ) : (

                                                <span className="text-gray-400">
                                                    Receipt Not Available
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Summary */}

                <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        <h2 className="text-3xl font-bold text-indigo-600">
                            {payments.length}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Total Transactions
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        <h2 className="text-3xl font-bold text-green-600">
                            ₹{totalAmount}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Total Amount Paid
                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        <h2 className="text-3xl font-bold text-yellow-500">
                            {pendingPayments}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Pending Payments
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default PaymentHistory;