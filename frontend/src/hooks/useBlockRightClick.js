// Custom React hook to disable right-click context menu
// Prevents "Inspect Element", "Save Image", "Copy" options
// Essential for exam security and content protection

import { useEffect } from 'react';

export default function useBlockRightClick() {
    useEffect(() => {
        // Handler that prevents context menu from appearing
        const blockContext = (e) => {
            // Allow right click only in code editors
            const isEditor = e.target.closest('.code-editor');
            if (!isEditor) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        // Attach contextmenu event listener with capture phase
        window.addEventListener('contextmenu', blockContext, { capture: true });

        // Cleanup
        return () => {
            window.removeEventListener('contextmenu', blockContext, { capture: true });
        };
    }, []);
}