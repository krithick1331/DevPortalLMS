import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../assets/code-img.svg';
import { AlertCircle } from 'lucide-react';

export default function LoginPage({ onNavigateToForget, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            onLoginSuccess?.();
        } else {
            setError(result.error || 'Login failed. Please check your credentials.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Info Panel */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-green-800 to-green-900 p-12 flex items-center justify-center">
                <div className="max-w-xl text-yellow-300">
                    <h1 className="text-5xl font-bold mb-8">Welcome to DEV-Portal</h1>
                    <p className="text-xl mb-8 text-justify leading-relaxed">
                        The <span className="font-semibold">Web Development Learning Management System (DEV-Portal)</span> is your dedicated online platform designed to elevate your programming skills and academic journey. DEV-Portal offers a comprehensive, user-friendly environment tailored to support your growth.
                    </p>

                    <h2 className="text-3xl font-bold mb-4">DEV - Portal Provides</h2>
                    <ul className="space-y-4 text-lg">
                        <li className="flex items-start">
                            <span className="mr-3">✓</span>
                            <span>A vast collection of carefully curated coding challenges and problems spanning various difficulty levels.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3">✓</span>
                            <span>Real-time code compilation and execution to instantly test and validate your solutions.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3">✓</span>
                            <span>Detailed progress tracking and personalized feedback to help you identify strengths and areas for improvement.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3">✓</span>
                            <span>Resources and tools aligned with competitive programming and industry-relevant software development practices.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 bg-yellow-400 flex items-center justify-center p-12">
                <div className="w-full max-w-md">
                    <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-3xl p-8 shadow-xl">
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                        <img src={Logo} alt="Logo" className="w-12 h-12" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            )}

                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-gray-700"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 text-gray-700"
                                    required
                                    disabled={loading}
                                />
                                <div className="text-right mt-2">
                                    <button
                                        type="button"
                                        onClick={onNavigateToForget}
                                        className="text-sm text-green-700 hover:text-green-800 hover:underline"
                                        disabled={loading}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </form>

                        {/* Info Text */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account? Contact your administrator.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
