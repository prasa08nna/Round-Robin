import { useState } from "react";
import axios from "axios";

export default function AddUpdateCoupon() {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/v1/admin/add-coupons", { code });
            setMessage("Coupon added successfully!");
            setCode("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to add coupon.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add/Update Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Coupon Code"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Add Coupon
                </button>
            </form>
            {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </div>
    );
}