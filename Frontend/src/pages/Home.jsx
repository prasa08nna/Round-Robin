import Navbar from "../components/Navbar";
import GuestUser from "../components/GuestUser";

export default function Home() {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <Navbar />
            <div className="container mx-auto p-4">
              
                <div className="text-center py-20">
                    <h1 className="text-5xl font-bold text-white mb-4">Welcome to Coupon App</h1>
                    <p className="text-xl text-white mb-8">Claim your exclusive coupons and save big on your purchases!</p>
                    <GuestUser />
                </div>

                {isAdminLoggedIn && (
                    <div className="bg-white p-8 rounded-xl shadow-lg my-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Manage Coupons</h3>
                                <p className="text-gray-600">Add, update, or delete coupons.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">User History</h3>
                                <p className="text-gray-600">View user claim history.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Toggle Coupons</h3>
                                <p className="text-gray-600">Activate or deactivate coupons.</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white p-8 rounded-xl shadow-lg my-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Round-Robin Distribution</h3>
                            <p className="text-gray-600">Coupons are distributed fairly using a round-robin algorithm.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Abuse Prevention</h3>
                            <p className="text-gray-600">We use IP and browser session tracking to prevent abuse.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy to Use</h3>
                            <p className="text-gray-600">Claim your coupon with just one click!</p>
                        </div>
                    </div>
                </div>

                
                <footer className="text-center text-white py-6">
                    <p>© 2023 Coupon App. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}