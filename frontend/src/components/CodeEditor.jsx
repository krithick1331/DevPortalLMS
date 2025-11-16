import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, language = 'javascript' }) {
    const ref = useRef(null);

    function handleMount(editor, monaco) {
        ref.current = editor;
    }

    return (
        <Editor
            height="100%"
            language={language}
            value={value}
            onChange={(v) => onChange && onChange(v)}
            theme="vs-dark"
            onMount={handleMount}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
            }}
        />
    );
}
