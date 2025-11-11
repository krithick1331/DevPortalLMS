import { useState, useEffect } from 'react';

export default function QuizViewer({ lesson, hiltToken, onQuizPass }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [attempts, setAttempts] = useState([]);

    const quiz = lesson.quiz;
    const questions = quiz.questions;

    // Load quiz history on mount
    useEffect(() => {
        fetchQuizHistory();
    }, [lesson.id]);

    const fetchQuizHistory = async () => {
        try {
            const res = await fetch(`/api/quiz/history/${lesson.id}`, {
                headers: { 'x-hilt-token': hiltToken }
            });
            const data = await res.json();
            setAttempts(data.attempts || []);
            if (data.quizPassed) {
                setSubmitted(true);
                setResult({ passed: true, score: 100 });
            }
        } catch (error) {
            console.error('Failed to load quiz history:', error);
        }
    };

    const handleAnswer = (questionIndex, optionIndex) => {
        setAnswers({ ...answers, [questionIndex]: optionIndex });
    };

    const handleSubmit = async () => {
        setLoading(true);

        // Prepare answers with correctness check
        const formattedAnswers = questions.map((q, idx) => ({
            questionId: q.id || `q${idx}`,
            selectedOption: answers[idx],
            correct: answers[idx] === q.correctAnswer
        }));

        try {
            const res = await fetch('/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hilt-token': hiltToken
                },
                body: JSON.stringify({
                    lessonId: lesson.id,
                    courseId: lesson.courseId,
                    answers: formattedAnswers,
                    totalQuestions: questions.length
                })
            });

            const data = await res.json();
            setResult(data);
            setSubmitted(true);

            if (data.passed) {
                onQuizPass?.();
            }

            // Refresh history
            fetchQuizHistory();

        } catch (error) {
            console.error('Quiz submission failed:', error);
            alert('Failed to submit quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setCurrentQuestion(0);
        setSubmitted(false);
        setResult(null);
    };

    // If quiz already passed, show success
    if (submitted && result?.passed) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold text-green-700 mb-2">Perfect Score!</h2>
                    <p className="text-xl text-green-600 mb-6">
                        You scored 100% on attempt #{attempts.length}
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-6">
                        <p className="text-gray-700">
                            ✅ Experiments are now unlocked! Switch to the Experiments tab to continue.
                        </p>
                    </div>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'experiments' }))}
                        className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Go to Experiments →
                    </button>
                </div>

                {/* Attempt History */}
                {attempts.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg p-6 shadow">
                        <h3 className="font-semibold text-lg mb-4">Attempt History</h3>
                        <div className="space-y-2">
                            {attempts.map((attempt, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                    <span className="font-medium">Attempt #{attempt.attemptNumber}</span>
                                    <span className={`font-bold ${attempt.score === 100 ? 'text-green-600' : 'text-red-600'}`}>
                                        {attempt.score}%
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(attempt.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // If quiz submitted but not passed, show results and retry option
    if (submitted && result) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>

                    <div className="mb-8 text-center">
                        <div className="text-5xl font-bold mb-2">{result.score}%</div>
                        <p className="text-lg text-gray-600">
                            {result.correctAnswers} out of {result.totalQuestions} correct
                        </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-yellow-800">
                            ⚠️ You need a perfect score (100%) to unlock the experiments.
                            Review your answers and try again!
                        </p>
                    </div>

                    <button
                        onClick={handleRetry}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Quiz taking interface
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl p-8 shadow-lg">
                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                            Progress: {Math.round((currentQuestion / questions.length) * 100)}%
                        </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all"
                            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Current question */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">
                        {questions[currentQuestion].question}
                    </h3>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(currentQuestion, idx)}
                                className={`w-full p-4 text-left rounded-lg border-2 transition
                  ${answers[currentQuestion] === idx
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button
                        onClick={() => setCurrentQuestion(c => c - 1)}
                        disabled={currentQuestion === 0}
                        className="px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Previous
                    </button>

                    {currentQuestion < questions.length - 1 ? (
                        <button
                            onClick={() => setCurrentQuestion(c => c + 1)}
                            disabled={!answers[currentQuestion]}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-blue-700 transition"
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading || Object.keys(answers).length !== questions.length}
                            className="px-8 py-2 bg-green-600 text-white rounded-lg font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-green-700 transition"
                        >
                            {loading ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}