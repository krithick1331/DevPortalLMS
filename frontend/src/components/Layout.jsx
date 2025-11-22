// frontend/src/components/Layout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar - ROLE-BASED */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2">
                            <span className="text-2xl">🎓</span>
                            <span className="text-xl font-bold text-gray-800">WebEDX LMS</span>
                        </Link>

                        {/* Navigation Links - CONDITIONAL RENDERING */}
                        <div className="flex items-center gap-6">
                            {/* STUDENT-ONLY LINKS */}
                            {!isAdmin && (
                                <>
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
                                </>
                            )}

                            {/* ADMIN-ONLY LINKS */}
                            {isAdmin && (
                                <>
                                    <Link
                                        to="/admin"
                                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                                    >
                                        Admin Dashboard
                                    </Link>
                                    <Link
                                        to="/admin/lessons"
                                        className="text-gray-700 hover:text-blue-600 font-medium transition"
                                    >
                                        Manage Lessons
                                    </Link>
                                </>
                            )}

                            {/* User Menu */}
                            <div className="flex items-center gap-4 border-l pl-4">
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800">{user?.name}</p>
                                    <p className="text-gray-500 text-xs">{user?.email}</p>
                                </div>
                                {isAdmin && (
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                        Admin
                                    </span>
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
                    <p>© 2025 WebEDX LMS. Professional Learning Management System.</p>
                    <p className="text-sm text-gray-400 mt-1">Built for academic excellence.</p>
                </div>
            </footer>
        </div>
    );
}
