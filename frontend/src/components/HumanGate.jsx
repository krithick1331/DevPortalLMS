import { useEffect, useRef, useState } from 'react';

export default function HumanGate({ onVerified }) {
    const [moved, setMoved] = useState(false);
    const [typed, setTyped] = useState(false);
    const [sumOk, setSumOk] = useState(false);
    const inputRef = useRef(null);

    const a = useRef(10 + Math.floor(Math.random() * 40)).current;
    const b = useRef(10 + Math.floor(Math.random() * 40)).current;

    useEffect(() => {
        const onMove = () => setMoved(true);
        const onKey = () => setTyped(true);
        window.addEventListener('mousemove', onMove, { once: true });
        window.addEventListener('keydown', onKey, { once: true });
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('keydown', onKey);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const value = Number(inputRef.current.value);
        if (value !== a + b) return setSumOk(false);
        setSumOk(true);

        // request short-lived HILT token
        const res = await fetch('/api/hilt/issue', { method: 'POST', credentials: 'include' });
        const data = await res.json();
        if (data?.token) onVerified(data.token);
    };

    const ready = moved && typed;

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-2">Verification required</h2>
                <p className="text-gray-600 mb-4">
                    Please move your mouse, press any key once, and solve a simple sum to continue.
                </p>
                <ul className="text-sm text-gray-600 mb-4 list-disc pl-5">
                    <li className={moved ? 'text-green-600' : ''}>Mouse moved</li>
                    <li className={typed ? 'text-green-600' : ''}>Key pressed</li>
                </ul>

                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">{a} + {b} =</span>
                    <input
                        ref={inputRef}
                        className="border rounded px-2 py-1 w-24"
                        type="number"
                        placeholder="Answer"
                        required
                    />
                    <button
                        className={`px-4 py-2 rounded text-white ${ready ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        type="submit"
                        disabled={!ready}
                    >
                        Verify
                    </button>
                </form>

                {sumOk === false && (
                    <p className="text-red-600 text-sm mt-2">Incorrect answer. Try again.</p>
                )}
            </div>
        </div>
    );
}
