// frontend/src/components/Layout.jsx

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar - NO POINTS DISPLAY */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <span className="text-2xl">🎓</span>
                            <span className="text-xl font-bold text-gray-800">DEV-Portal LMS</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-6">
                            <Link
                                to="/dashboard"
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/courses"
                                className="text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Courses
                            </Link>

                            {/* User Menu */}
                            <div className="flex items-center gap-4 border-l pl-4">
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-gray-500 text-xs">{user?.email}</p>
                                </div>

                                {user?.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200"
                                    >
                                        Admin
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2025 DEV-Portal LMS. Professional Learning Management System.</p>
                    <p className="text-sm text-gray-400 mt-1">Built for academic excellence.</p>
                </div>
            </footer>
        </div>
    );
}
