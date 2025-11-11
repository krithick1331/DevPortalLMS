// Custom React hook to disable cut, copy, paste, and text selection
// Prevents students from copying questions or code during exams
// Also prevents AI tools from scraping content via clipboard

import { useEffect } from 'react';

export default function useBlockClipboardAndSelection() {
    useEffect(() => {
        // Event handler that prevents default clipboard actions
        const blockClipboard = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        // Register event listeners for copy, cut, and paste
        window.addEventListener('copy', blockClipboard, { capture: true });
        window.addEventListener('cut', blockClipboard, { capture: true });
        window.addEventListener('paste', blockClipboard, { capture: true });

        // Inject CSS to disable text selection globally
        const styleElement = document.createElement('style');
        styleElement.textContent = `
      /* Disable text selection on all elements except inputs */
      *::selection { background: transparent !important; }
      body, html, * {
        user-select: none !important;
        -webkit-user-select: none !important;
        -ms-user-select: none !important;
        -moz-user-select: none !important;
      }
      /* Allow selection in input fields for usability */
      input, textarea, [contenteditable] {
        user-select: text !important;
        -webkit-user-select: text !important;
        -ms-user-select: text !important;
        -moz-user-select: text !important;
      }
    `;
        document.head.appendChild(styleElement);

        // Cleanup function
        return () => {
            window.removeEventListener('copy', blockClipboard, { capture: true });
            window.removeEventListener('cut', blockClipboard, { capture: true });
            window.removeEventListener('paste', blockClipboard, { capture: true });
            styleElement.remove();
        };
    }, []);
}