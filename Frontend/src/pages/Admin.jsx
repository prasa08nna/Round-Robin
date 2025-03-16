import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import CouponList from "../components/CouponList";
import AddUpdateCoupon from "../components/AddUpdateCoupon";
import UserClaimHistory from "../components/UserClaimHistory";
import ToggleCoupon from "../components/ToggleCoupon";

export default function Admin() {
    const navigate = useNavigate();
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    
    useEffect(() => {
        if (!isAdminLoggedIn) {
            navigate("/login");
        }
    }, [isAdminLoggedIn, navigate]);

    if (!isAdminLoggedIn) {
        return null; 
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-6">
                    <Routes>
                        <Route path="coupons" element={<CouponList />} />
                        <Route path="add-update" element={<AddUpdateCoupon />} />
                        <Route path="history" element={<UserClaimHistory />} />
                        <Route path="toggle" element={<ToggleCoupon />} />
                        <Route path="*" element={<CouponList />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}