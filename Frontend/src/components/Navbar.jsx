import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/");
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition duration-300">
                    Coupon App
                </Link>
                <div className="flex items-center space-x-4">
                    {isAdminLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="text-gray-600 hover:text-gray-800 transition duration-300 bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Admin Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}