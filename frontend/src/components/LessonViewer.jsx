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
    const [previewHTML, setPreviewHTML] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([]);

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

    // Generate preview HTML for iframe
    const generatePreview = () => {
        const htmlContent = content?.starterCode?.html || code || '';
        const cssContent = content?.starterCode?.css || '';
        const jsContent = content?.starterCode?.js || '';

        const combined = `<!doctype html><html><head><meta charset="utf-8"><style>${cssContent}</style></head><body>${htmlContent}
<script>
// capture console.log and errors
(function(){
  const oldLog = console.log;
  console.log = function(...args){
    try{ window.parent.postMessage({ type: 'console', data: args.map(a=>String(a)).join(' ') }, '*'); }catch(e){}
    oldLog.apply(console, args);
  };
  window.onerror = function(msg, url, line, col, err){
    try{ window.parent.postMessage({ type: 'error', data: msg + ' (Line: ' + line + ')' }, '*'); }catch(e){}
    return false;
  };
})();
\n${jsContent}
</script></body></html>`;

        setPreviewHTML(combined);
    };

    // Auto-generate preview when code or starterCode changes (debounced)
    useEffect(() => {
        const id = setTimeout(() => generatePreview(), 300);
        return () => clearTimeout(id);
    }, [code, content?.starterCode]);

    // Listen for console messages from iframe
    useEffect(() => {
        const handler = (event) => {
            if (!event?.data) return;
            if (event.data.type === 'console') {
                setConsoleOutput(prev => [...prev, { type: 'log', message: event.data.data }]);
            } else if (event.data.type === 'error') {
                setConsoleOutput(prev => [...prev, { type: 'error', message: event.data.data }]);
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

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

        if (!content || !content.testCases || content.testCases.length === 0) {
            setOutput('Code executed successfully!\nThis lesson does not have automated tests yet.');
            return;
        }

        setTimeout(() => {
            try {
                const results = content.testCases.map((test, index) => {
                    try {
                        // For HTML/CSS lessons with validate function
                        if (test.validate) {
                            const passed = test.validate(code);
                            return {
                                testCase: index + 1,
                                input: test.input,
                                expected: test.expected,
                                passed: passed
                            };
                        }

                        // For JavaScript lessons - execute the code and test it
                        const userCode = code.trim();

                        if (userCode.length === 0) {
                            return {
                                testCase: index + 1,
                                input: test.input,
                                expected: test.expected,
                                passed: false,
                                error: 'No code provided'
                            };
                        }

                        try {
                            // Extract function from user's code
                            const funcMatch = userCode.match(/function\s+(\w+)/);
                            if (!funcMatch) {
                                throw new Error('No function found in code');
                            }

                            const functionName = funcMatch[1];

                            // Execute user's code to define the function
                            const userFunc = new Function(`
              ${userCode}
              return ${functionName};
            `)();

                            // Parse test input and execute function
                            let actualResult;
                            if (test.input === '' || test.input === '""' || test.input === "''") {
                                actualResult = userFunc();
                            } else {
                                // Parse comma-separated inputs
                                const inputs = test.input.split(',').map(inp => {
                                    inp = inp.trim();
                                    if (inp.startsWith("'") && inp.endsWith("'")) {
                                        return inp.slice(1, -1);
                                    }
                                    if (inp.startsWith('"') && inp.endsWith('"')) {
                                        return inp.slice(1, -1);
                                    }
                                    return Number(inp);
                                });

                                actualResult = userFunc(...inputs);
                            }

                            // Convert result to string for comparison
                            let actualStr = String(actualResult);
                            let expectedStr = test.expected.trim();

                            // Remove quotes from expected if present
                            if (expectedStr.startsWith("'") && expectedStr.endsWith("'")) {
                                expectedStr = expectedStr.slice(1, -1);
                            }
                            if (expectedStr.startsWith('"') && expectedStr.endsWith('"')) {
                                expectedStr = expectedStr.slice(1, -1);
                            }

                            const passed = actualStr === expectedStr;

                            return {
                                testCase: index + 1,
                                input: test.input || 'none',
                                expected: test.expected,
                                actual: actualStr,
                                passed: passed
                            };

                        } catch (execError) {
                            return {
                                testCase: index + 1,
                                input: test.input,
                                expected: test.expected,
                                passed: false,
                                error: execError.message
                            };
                        }

                    } catch (error) {
                        return {
                            testCase: index + 1,
                            input: test.input,
                            expected: test.expected,
                            passed: false,
                            error: error.message
                        };
                    }
                });

                setTestResults(results);

                const passedCount = results.filter(r => r.passed).length;
                const totalCount = results.length;

                let outputText = '='.repeat(50) + '\nTest Results\n' + '='.repeat(50) + '\n\n';

                results.forEach(result => {
                    outputText += `Test Case ${result.testCase}: ${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
                    outputText += `Input: ${result.input}\n`;
                    outputText += `Expected: ${result.expected}\n`;
                    if (!result.passed) {
                        if (result.actual) {
                            outputText += `Got: ${result.actual}\n`;
                        }
                        if (result.error) {
                            outputText += `Error: ${result.error}\n`;
                        }
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

            } catch (error) {
                setOutput(`Error running tests: ${error.message}`);
                setTestResults([]);
            }
        }, 500);
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
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={generatePreview}
                                        className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                    >
                                        <Play className="w-4 h-4" />
                                        <span>Run Code</span>
                                    </button>
                                    <button
                                        onClick={handleRunCode}
                                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                    >
                                        <Play className="w-4 h-4" />
                                        <span>Run Tests</span>
                                    </button>
                                </div>
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

                        <div className="border-t border-gray-700 h-64 overflow-hidden bg-white">
                            <div className="p-0 h-full flex flex-col">
                                <div className="px-4 py-2 border-b bg-gray-50">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-0">Output Preview</h3>
                                </div>
                                <div className="flex-1">
                                    <iframe
                                        srcDoc={previewHTML}
                                        title="lesson-output"
                                        sandbox="allow-scripts"
                                        className="w-full h-full border-0"
                                    />
                                </div>
                                <div className="h-24 border-t bg-gray-900 text-gray-100 font-mono text-sm overflow-auto p-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm">Console Output</span>
                                        <button onClick={() => setConsoleOutput([])} className="text-xs px-2 py-1 bg-gray-700 rounded">Clear</button>
                                    </div>
                                    {consoleOutput.length === 0 ? (
                                        <div className="text-gray-500">Console output will appear here...</div>
                                    ) : (
                                        consoleOutput.map((log, i) => (
                                            <div key={i} className={`py-1 ${log.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                                {log.type === 'error' ? '❌' : '▶'} {log.message}
                                            </div>
                                        ))
                                    )}
                                </div>
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
