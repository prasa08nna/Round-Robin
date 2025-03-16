import { useState } from "react";
import axios from "axios";

export default function ToggleCoupon() {
    const [couponId, setCouponId] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState("");

    const handleToggle = async () => {
        try {
            await axios.put(`/api/v1/admin/coupons/${couponId}/toggle`, { isActive });
            setMessage("Coupon toggled successfully!");
            setCouponId("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to toggle coupon.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Toggle Coupon Availability</h2>
            <input
                type="text"
                value={couponId}
                onChange={(e) => setCouponId(e.target.value)}
                placeholder="Coupon ID"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
            />
            <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Active</span>
            </label>
            <button
                onClick={handleToggle}
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Toggle Coupon
            </button>
            {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>
    );
}