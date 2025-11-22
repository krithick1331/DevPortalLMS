import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, language = 'javascript' }) {
    const ref = useRef(null);

    function handleMount(editor, monaco) {
        ref.current = editor;

        // NEW: Disable copy/paste/cut keyboard shortcuts
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyC, () => {
            // Prevent copy
        });
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
            // Prevent paste
        });
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyX, () => {
            // Prevent cut
        });

        // NEW: Disable right-click context menu
        editor.onContextMenu((e) => {
            e.event.preventDefault();
        });
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
                contextmenu: false,  // NEW: Disable right-click context menu
                quickSuggestions: false,
                wordBasedSuggestions: false,
                selectionHighlight: false,
                occurrencesHighlight: false,
                renderLineHighlight: 'none',
                links: false,
            }}
        />
    );
}
