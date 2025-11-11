import { useState, useEffect } from 'react';
import PDFViewer from './PDFViewer';
import QuizViewer from './QuizViewer';
import ExperimentList from './ExperimentList';

export default function LessonView({ lesson, hiltToken, onLessonComplete }) {
    const [activeTab, setActiveTab] = useState('study');
    const [progress, setProgress] = useState({
        quizPassed: false,
        allExperimentsPassed: false,
        nextLessonUnlocked: false
    });

    useEffect(() => {
        fetchProgress();

        // Listen for tab switch events
        const handleSwitchTab = (e) => setActiveTab(e.detail);
        window.addEventListener('switchTab', handleSwitchTab);
        return () => window.removeEventListener('switchTab', handleSwitchTab);
    }, [lesson.id]);

    const fetchProgress = async () => {
        try {
            const res = await fetch(`/api/experiment/progress/${lesson.id}`, {
                headers: { 'x-hilt-token': hiltToken }
            });
            const data = await res.json();
            setProgress(data);
        } catch (error) {
            console.error('Failed to load progress:', error);
        }
    };

    const handleQuizPass = () => {
        setProgress(prev => ({ ...prev, quizPassed: true }));
        setActiveTab('experiments');
    };

    const tabs = [
        { id: 'study', label: '📄 Study Material', enabled: true },
        { id: 'quiz', label: '📝 Quiz', enabled: true },
        { id: 'experiments', label: '🧪 Experiments', enabled: progress.quizPassed }
    ];

    return (
        <div className="h-screen flex flex-col">
            {/* Header with Lesson Info */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-3xl font-bold mb-1">{lesson.title}</h1>
                    <p className="text-gray-600">{lesson.description}</p>

                    {/* Progress Indicators */}
                    <div className="flex gap-4 mt-3 text-sm">
                        <span className={`px-3 py-1 rounded-full ${progress.quizPassed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {progress.quizPassed ? '✅ Quiz Passed' : '⏳ Quiz Pending'}
                        </span>
                        <span className={`px-3 py-1 rounded-full ${progress.allExperimentsPassed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {progress.allExperimentsPassed ? '✅ Experiments Complete' : '⏳ Experiments Pending'}
                        </span>
                        {progress.nextLessonUnlocked && (
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                                🎉 Next Lesson Unlocked!
                            </span>
                        )}
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-2 border-b">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => tab.enabled && setActiveTab(tab.id)}
                                disabled={!tab.enabled}
                                className={`px-6 py-3 font-semibold border-b-2 transition ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : tab.enabled
                                            ? 'border-transparent text-gray-600 hover:text-gray-900'
                                            : 'border-transparent text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {tab.label}
                                {!tab.enabled && ' 🔒'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-gray-50">
                {activeTab === 'study' && <PDFViewer pdfUrl={lesson.pdf} />}
                {activeTab === 'quiz' && (
                    <QuizViewer
                        lesson={lesson}
                        hiltToken={hiltToken}
                        onQuizPass={handleQuizPass}
                    />
                )}
                {activeTab === 'experiments' && (
                    <ExperimentList
                        lesson={lesson}
                        hiltToken={hiltToken}
                        quizPassed={progress.quizPassed}
                    />
                )}
            </div>

            {/* Next Lesson Button */}
            {progress.nextLessonUnlocked && (
                <div className="bg-white border-t p-4">
                    <div className="max-w-7xl mx-auto flex justify-end">
                        <button
                            onClick={onLessonComplete}
                            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition shadow-lg"
                        >
                            ✅ Proceed to Next Lesson →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}