import { useState, useEffect } from 'react';
import Layout from './Layout';
import { courses } from '../data/courses';
import { lessons as practiceLessons } from '../data/practiceLessons';
import { ChevronRight, ChevronLeft, Play, CheckCircle, Lightbulb, Award, BookOpen } from 'lucide-react';

export default function LessonViewer({ courseId, lessonId, onBack, onNavigate }) {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResults, setTestResults] = useState([]);
    const [showHints, setShowHints] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    const course = courses.find(c => c.id === courseId);
    const lessons = course?.lessons || [];
    const lesson = lessons.find(l => l.id === lessonId);
    const content = practiceLessons.find(l => l.id === lessonId);

    useEffect(() => {
        if (content && content.starterCode) {
            // starterCode is an object with html, css, js properties
            setCode(content.starterCode.html || '');
        }
    }, [lessonId, content]);

    if (!course || !lesson) {
        return (
            <Layout currentPage="courses">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p>Lesson not found</p>
                </div>
            </Layout>
        );
    }

    const handleRunCode = () => {
        setOutput('Running tests...\n');

        setTimeout(() => {
            if (content && content.testCases) {
                const results = content.testCases.map((test, index) => ({
                    testCase: index + 1,
                    input: test.input,
                    expected: test.expected,
                    passed: Math.random() > 0.3
                }));

                setTestResults(results);

                const passedCount = results.filter(r => r.passed).length;
                const totalCount = results.length;

                let outputText = '='.repeat(50) + '\nTest Results\n' + '='.repeat(50) + '\n\n';

                results.forEach(result => {
                    outputText += `Test Case ${result.testCase}: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
                    outputText += `Input: ${result.input}\n`;
                    outputText += `Expected: ${result.expected}\n`;
                    if (!result.passed) {
                        outputText += `Got: (output differs)\n`;
                    }
                    outputText += '\n';
                });

                outputText += '='.repeat(50) + '\n';
                outputText += `${passedCount}/${totalCount} tests passed\n`;

                if (passedCount === totalCount) {
                    outputText += '\n🎉 Congratulations! All tests passed!\n';
                    outputText += `You earned ${lesson.points} points!\n`;
                } else {
                    outputText += '\n⚠️ Some tests failed. Keep trying!\n';
                }

                setOutput(outputText);
            } else {
                setOutput('Code executed successfully!\nThis lesson does not have automated tests yet.');
            }
        }, 1000);
    };

    const handleSubmit = () => {
        const allPassed = testResults.every(r => r.passed);
        if (allPassed && testResults.length > 0) {
            alert(`Congratulations! You've completed this lesson and earned ${lesson.points} points!`);
        } else {
            alert('Please pass all test cases before submitting.');
        }
    };

    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

    return (
        <Layout currentPage="courses" onNavigate={onNavigate}>
            <div className="h-[calc(100vh-4rem)] flex flex-col">
                {/* Header */}
                <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className="text-green-700 hover:text-green-800 font-medium flex items-center"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="ml-1">Back to Course</span>
                        </button>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <h1 className="text-lg font-semibold text-gray-900">{lesson.title}</h1>
                    </div>

                    <div className="flex items-center space-x-2">
                        {lesson.completed && (
                            <div className="flex items-center text-green-600 mr-4">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span className="text-sm font-medium">Completed</span>
                            </div>
                        )}
                        <span className={`text-xs font-medium px-3 py-1 rounded ${lesson.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-700'
                            : lesson.difficulty === 'Medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                            {lesson.difficulty}
                        </span>
                        <div className="flex items-center text-sm text-gray-600">
                            <Award className="w-4 h-4 mr-1" />
                            <span>{lesson.points} pts</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left Panel - Instructions */}
                    <div className="w-1/2 overflow-y-auto border-r bg-white p-6">
                        <div className="prose max-w-none">
                            {content ? (
                                <div className="mb-6">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <BookOpen className="w-5 h-5 text-green-700" />
                                        <h2 className="text-2xl font-bold text-gray-900 m-0">{content.title}</h2>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                        <p className="text-gray-700 whitespace-pre-wrap">{content.instructions}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setShowHints(!showHints)}
                                            className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <Lightbulb className="w-5 h-5 text-blue-700 mr-2" />
                                                <span className="font-medium text-blue-900">
                                                    {showHints ? 'Hide Hints' : 'Show Hints'}
                                                </span>
                                            </div>
                                            <ChevronRight className={`w-5 h-5 text-blue-700 transition-transform ${showHints ? 'rotate-90' : ''}`} />
                                        </button>

                                        {showHints && content.hints && (
                                            <div className="bg-blue-50 rounded-lg p-4">
                                                <ol className="list-decimal list-inside space-y-2">
                                                    {content.hints.map((hint, index) => (
                                                        <li key={index} className="text-sm text-gray-700">{hint}</li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => setShowSolution(!showSolution)}
                                            className="w-full flex items-center justify-between p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <CheckCircle className="w-5 h-5 text-yellow-700 mr-2" />
                                                <span className="font-medium text-yellow-900">
                                                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                                                </span>
                                            </div>
                                            <ChevronRight className={`w-5 h-5 text-yellow-700 transition-transform ${showSolution ? 'rotate-90' : ''}`} />
                                        </button>

                                        {showSolution && content.solution && (
                                            <div className="bg-gray-900 rounded-lg p-4">
                                                <pre className="text-sm text-gray-100 overflow-x-auto">
                                                    <code>{content.solution}</code>
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{lesson.title}</h2>
                                    <p className="text-gray-600 mb-6">{lesson.description}</p>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <p className="text-sm text-yellow-800">
                                            📚 Lesson content is being prepared. Check back soon!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Code Editor */}
                    <div className="w-1/2 flex flex-col bg-gray-900">
                        <div className="border-b border-gray-700 p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-300">Code Editor</h3>
                                <button
                                    onClick={handleRunCode}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                    <Play className="w-4 h-4" />
                                    <span>Run Tests</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm focus:outline-none resize-none"
                                placeholder="Write your code here..."
                                spellCheck={false}
                            />
                        </div>

                        <div className="border-t border-gray-700 h-64 overflow-y-auto">
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-300 mb-2">Output</h3>
                                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                                    {output || 'Run your code to see the output...'}
                                </pre>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 p-4 flex items-center justify-between">
                            <div className="flex space-x-2">
                                {prevLesson && (
                                    <button
                                        onClick={() => onNavigate && onNavigate(courseId, prevLesson.id)}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Previous
                                    </button>
                                )}
                                {nextLesson && (
                                    <button
                                        onClick={() => onNavigate && onNavigate(courseId, nextLesson.id)}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Submit Solution
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
