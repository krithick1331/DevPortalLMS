import { useRef } from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ value, onChange, language = 'javascript' }) {
    const ref = useRef(null);

    function handleMount(editor, monaco) {
        ref.current = editor;

        const clipboardKeys = [
            monaco.KeyCode.KeyC,
            monaco.KeyCode.KeyV,
            monaco.KeyCode.KeyX
        ];

        const preventClipboardShortcut = (evt) => {
            const isClipboardCombo = (evt.ctrlKey || evt.metaKey) && clipboardKeys.includes(evt.keyCode);
            if (isClipboardCombo) {
                evt.preventDefault();
                evt.stopPropagation();
            }
        };

        // Disable keyboard shortcuts
        clipboardKeys.forEach((keyCode) => {
            editor.addCommand(monaco.KeyMod.CtrlCmd | keyCode, () => { /* no-op */ });
        });

        editor.onKeyDown(preventClipboardShortcut);

        // Undo any paste that slips through (e.g., via menu)
        editor.onDidPaste(() => {
            editor.trigger('block-paste', 'undo', null);
        });

        // Disable right-click context menu
        editor.onContextMenu((e) => {
            e.event.preventDefault();
            e.event.stopPropagation();
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
