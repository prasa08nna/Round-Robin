import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <ul className="space-y-2">
                <li>
                    <NavLink
                        to="/admin/coupons"
                        className={({ isActive }) =>
                            `w-full block p-2 rounded-lg ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
                        }
                    >
                        Coupons
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/add-update"
                        className={({ isActive }) =>
                            `w-full block p-2 rounded-lg ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
                        }
                    >
                        Add/Update Coupon
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/history"
                        className={({ isActive }) =>
                            `w-full block p-2 rounded-lg ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
                        }
                    >
                        User Claim History
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/toggle"
                        className={({ isActive }) =>
                            `w-full block p-2 rounded-lg ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
                        }
                    >
                        Toggle Coupon
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}