import { useState } from 'react';
import HumanGate from './HumanGate';
import PracticeLessonViewer from './PracticeLessonViewer';

export default function ProtectedLesson({ lesson, onBack, onNext }) {
    const [token, setToken] = useState(null);

    if (!token) {
        return <HumanGate onVerified={(t) => setToken(t)} />;
    }

    // Pass token down so viewer can use it for API calls if needed
    return (
        <PracticeLessonViewer
            lesson={lesson}
            onBack={onBack}
            onNext={onNext}
            hiltToken={token}
        />
    );
}