import { useEffect, useState } from "react";
import axios from "axios";


export default function UserClaimHistory() {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/v1/admin/view-history`)
            .then((response) => {
                console.log("API Response:", response.data); // Debugging
                setClaims(response.data?.data || []); // Ensure claims is always an array
            })
            .catch((err) => {
                console.error("Error fetching claim history:", err);
                setError("Failed to load claim history.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Claim History</h2>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : claims.length > 0 ? (
                <ul>
                    {claims.map((claim) => (
                        <li key={claim?._id} className="mb-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <span className="font-semibold text-blue-600">{claim?.couponId?.code || "Unknown Coupon"}</span> -{" "}
                            <span className="text-sm text-gray-600">{claim?.ipAddress || "No IP"}</span> -{" "}
                            <span className="text-sm text-gray-600">{claim?.createdAt ? new Date(claim.createdAt).toLocaleString() : "No Date"}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No claims found.</p>
            )}
        </div>
    );
}
