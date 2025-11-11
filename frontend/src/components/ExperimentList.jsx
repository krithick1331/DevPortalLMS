import { useState, useEffect } from 'react';
import ExperimentViewer from './ExperimentViewer';

export default function ExperimentList({ lesson, hiltToken, quizPassed }) {
    const [selectedExperiment, setSelectedExperiment] = useState(null);
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (quizPassed) {
            fetchProgress();
        }
    }, [lesson.id, quizPassed]);

    const fetchProgress = async () => {
        try {
            const res = await fetch(`/api/experiment/progress/${lesson.id}`, {
                headers: { 'x-hilt-token': hiltToken }
            });
            const data = await res.json();
            setProgress(data);
        } catch (error) {
            console.error('Failed to load experiment progress:', error);
        } finally {
            setLoading(false);
        }
    };

    // If quiz not passed, show lock message
    if (!quizPassed) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center p-8 bg-yellow-50 rounded-xl border-2 border-yellow-300 max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h3 className="text-2xl font-bold text-yellow-800 mb-2">Experiments Locked</h3>
                    <p className="text-yellow-700">
                        Complete the quiz with 100% score to unlock experiments.
                    </p>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'quiz' }))}
                        className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition"
                    >
                        Go to Quiz
                    </button>
                </div>
            </div>
        );
    }

    // If viewing specific experiment
    if (selectedExperiment) {
        return (
            <div className="h-full flex flex-col">
                <div className="bg-white border-b p-4">
                    <button
                        onClick={() => setSelectedExperiment(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        ← Back to Experiments
                    </button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <ExperimentViewer
                        experiment={selectedExperiment}
                        lesson={lesson}
                        hiltToken={hiltToken}
                        onExperimentPass={fetchProgress}
                    />
                </div>
            </div>
        );
    }

    // Experiment list view
    const experiments = lesson.experiments || [];
    const completedCount = Object.values(progress.experiments || {}).filter(e => e.passed).length;
    const allCompleted = progress.allExperimentsPassed;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-xl text-gray-600">Loading experiments...</div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Progress Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Experiments</h2>
                    <span className="text-lg font-semibold text-gray-600">
                        {completedCount} / {experiments.length} Completed
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-green-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(completedCount / experiments.length) * 100}%` }}
                    />
                </div>

                {allCompleted && (
                    <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg text-center">
                        <p className="text-green-700 font-semibold text-lg">
                            🎉 All experiments completed! You can now proceed to the next lesson.
                        </p>
                    </div>
                )}
            </div>

            {/* Experiment Cards */}
            <div className="grid gap-4">
                {experiments.map((exp, idx) => {
                    const expProgress = progress.experiments?.[exp.id];
                    const isPassed = expProgress?.passed;
                    const attempts = expProgress?.attempts || 0;

                    return (
                        <div
                            key={exp.id}
                            className={`bg-white rounded-xl shadow-lg p-6 border-2 transition ${isPassed ? 'border-green-500' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                                        <h3 className="text-xl font-bold">{exp.title}</h3>
                                    </div>
                                    <p className="text-gray-600">{exp.description}</p>
                                </div>

                                <div className="text-right ml-4">
                                    {isPassed ? (
                                        <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                                            ✅ Passed
                                        </span>
                                    ) : attempts > 0 ? (
                                        <span className="inline-block px-4 py-2 bg-red-100 text-red-800 rounded-lg font-semibold">
                                            ❌ Failed
                                        </span>
                                    ) : (
                                        <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-semibold">
                                            ⏳ Not Started
                                        </span>
                                    )}
                                    {attempts > 0 && (
                                        <p className="text-sm text-gray-500 mt-1">{attempts} attempt{attempts > 1 ? 's' : ''}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold">{exp.tests.length}</span> test cases •
                                    <span className="font-semibold ml-2">{exp.points}</span> points
                                </div>

                                <button
                                    onClick={() => setSelectedExperiment(exp)}
                                    className={`px-6 py-2 rounded-lg font-semibold transition ${isPassed
                                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {isPassed ? 'View Solution' : attempts > 0 ? 'Retry' : 'Start'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}