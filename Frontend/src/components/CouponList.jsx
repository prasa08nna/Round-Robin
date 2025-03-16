import { useEffect, useState } from "react";
import axios from "axios";

import axios from "axios";
import { useEffect, useState } from "react";

export default function CouponList() {
    const [coupons, setCoupons] = useState([]);
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Update this URL

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/v1/admin/get-coupons`)
            .then((response) => setCoupons(response.data.data))
            .catch((error) => {
                console.error("Error fetching coupons:", error);
                setCoupons([]); // Prevents undefined issues
            });
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coupons</h2>
            {coupons.length > 0 ? (
                <ul>
                    {coupons.map((coupon) => (
                        <li key={coupon._id} className="mb-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <span className="font-semibold text-blue-600">{coupon.code}</span> -{" "}
                            <span className={`text-sm ${coupon.isClaimed ? "text-red-500" : "text-green-500"}`}>
                                {coupon.isClaimed ? "Claimed" : coupon.isActive ? "Available" : "Not-Available"}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Loading coupons...</p>
            )}
        </div>
    );
}
