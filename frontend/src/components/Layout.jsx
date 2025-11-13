import { useAuth } from '../contexts/AuthContext';
import { LogOut, Menu, X, Home, BookOpen, Settings, Users } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children, currentPage, onNavigate }) {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        onNavigate?.('login');
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, visible: user?.role === 'student' },
        { id: 'courses', label: 'Courses', icon: BookOpen, visible: user?.role === 'student' },
        { id: 'admin', label: 'Admin Panel', icon: Users, visible: user?.role === 'admin' },
        { id: 'settings', label: 'Settings', icon: Settings, visible: true }
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-800 to-green-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between p-6 border-b border-green-700">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-green-900">
                            D
                        </div>
                        <span className="font-bold text-xl">DEV-Portal</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 rounded hover:bg-green-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems
                        .filter(item => item.visible)
                        .map(item => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate?.(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-yellow-400 text-green-900 font-semibold'
                                            : 'text-green-100 hover:bg-green-700'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                </nav>

                {/* User Info & Logout */}
                <div className="border-t border-green-700 p-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-green-900 text-sm">
                            {user?.initials || 'U'}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-green-200">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-4 lg:px-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 rounded hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <div className="flex-1" />
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                                {user?.initials || 'U'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto bg-gray-50">
                    {children}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}