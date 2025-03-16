import { useEffect, useState } from "react";
import axios from "axios";

export default function UserClaimHistory() {
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        axios.get("/api/v1/admin/view-history").then((response) => setClaims(response.data.data));
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Claim History</h2>
            <ul>
                {claims.map((claim) => (
                    <li key={claim._id} className="mb-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <span className="font-semibold text-blue-600">{claim.couponId.code}</span> -{" "}
                        <span className="text-sm text-gray-600">{claim.ipAddress}</span> -{" "}
                        <span className="text-sm text-gray-600">{new Date(claim.createdAt).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}