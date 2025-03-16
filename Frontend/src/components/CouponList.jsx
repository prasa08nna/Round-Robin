import { useEffect, useState } from "react";
import axios from "axios";

export default function CouponList() {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/admin/get-coupons").then((response) => setCoupons(response.data.data));
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coupons</h2>
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
        </div>
    );
}