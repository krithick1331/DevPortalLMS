// useFocusBlur.js
import { useEffect } from 'react';

export default function useFocusBlur(rootSelector = 'body', blurPx = 6) {
    useEffect(() => {
        const root = document.querySelector(rootSelector);
        if (!root) return;

        const onBlur = () => root.classList.add('__blurred__');
        const onFocus = () => root.classList.remove('__blurred__');

        window.addEventListener('blur', onBlur);
        window.addEventListener('focus', onFocus);

        return () => {
            window.removeEventListener('blur', onBlur);
            window.removeEventListener('focus', onFocus);
            root.classList.remove('__blurred__');
        };
    }, [rootSelector, blurPx]);
}
