import { useState } from 'react';
import { Mail, Shield, ArrowLeft, AlertCircle, CheckCircle, Search } from 'lucide-react';

export default function ForgetPasswordPage({ onNavigateToLogin }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            // TODO: Implement actual password reset API call
            // const res = await fetch('http://localhost:3000/api/auth/forgot-password', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email })
            // });

            // Simulate API call for now
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success
            setSuccess(true);
            setEmail('');

        } catch (err) {
            setError('Failed to send reset instructions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
                    <p className="text-gray-600">We'll help you get back into your account</p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        To reset your password, submit your email address below. If we can find you in the database, an email will be sent with instructions on how to regain access.
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-green-800">Reset instructions sent!</p>
                            <p className="text-sm text-green-700 mt-1">Check your email for password reset instructions.</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                {/* Email Form */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-green-600" />
                                Search by Email Address
                            </h3>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                                        placeholder="Enter your email address"
                                        required
                                        disabled={loading}
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || !email}
                                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-4 h-4" />
                                        Send Reset Link
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Back Link */}
                <button
                    type="button"
                    onClick={onNavigateToLogin}
                    className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 font-medium hover:bg-white rounded-lg transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                </button>
            </div>
        </div>
    );
}

