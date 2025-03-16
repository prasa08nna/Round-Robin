import { useState } from "react";
import axios from "axios";

export default function GuestUser() {
    const [message, setMessage] = useState("");
    const [coupon, setCoupon] = useState("");

    const handleClaimCoupon = async () => {
        try {
            const response = await axios.post("/api/v1/coupon/claim-coupons");
            setCoupon(response.data.coupon);
            setMessage("Coupon claimed successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to claim coupon.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center w-full max-w-md transform transition-all hover:scale-105">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Claim Your Coupon</h1>
            <button
                onClick={handleClaimCoupon}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 w-full"
            >
                Claim Coupon
            </button>

            {coupon && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-green-600 font-semibold">🎉 Your Coupon: <span className="font-mono">{coupon}</span></p>
                </div>
            )}

        
            {message && !coupon && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-red-500 font-semibold">⚠️ {message}</p>
                </div>
            )}
        </div>
    );
}