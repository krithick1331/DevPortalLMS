import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
    const [token, setToken] = useState('');

    const submit = (e) => {
        e.preventDefault();
        // Simple check - the environment variable VITE_ADMIN_TOKEN can be set in .env
        if (token) {
            onLogin(token);
        } else {
            alert('Enter admin token');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Admin Token</label>
                        <input type="password" value={token} onChange={(e) => setToken(e.target.value)} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
