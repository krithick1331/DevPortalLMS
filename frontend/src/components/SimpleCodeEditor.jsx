import React from 'react';

export default function SimpleCodeEditor({ value, onChange, language }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none"
            spellCheck={false}
            placeholder={`Enter ${language || 'code'} here...`}
        />
    );
}
