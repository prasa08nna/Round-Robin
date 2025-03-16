import CouponList from "./CouponList";
import AddUpdateCoupon from "./AddUpdateCoupon";
import UserClaimHistory from "./UserClaimHistory";
import ToggleCoupon from "./ToggleCoupon";

export default function AdminPanel() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CouponList />
                <AddUpdateCoupon />
                <UserClaimHistory />
                <ToggleCoupon />
            </div>
        </div>
    );
}