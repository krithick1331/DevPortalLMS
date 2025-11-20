// frontend/src/components/LessonViewer.jsx

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { lessons as practiceLessons } from '../data/practiceLessons';
import { ChevronRight, ChevronLeft, Play, CheckCircle, Lightbulb, BookOpen, AlertTriangle } from 'lucide-react';

export default function LessonViewer() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [testResults, setTestResults] = useState([]);
    const [showHints, setShowHints] = useState(false);
    // REMOVED: const [showSolution, setShowSolution] = useState(false);
    const [previewHTML, setPreviewHTML] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([]);

    // Anti-cheat states
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [warnings, setWarnings] = useState([]);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const tabSwitchCountRef = useRef(0);
    const lastFocusEventRef = useRef({ type: null, group: null, timestamp: 0 });

    const course = courses.find(c => c.lessons?.some(l => l.id === lessonId));
    const lessons = course?.lessons || [];
    const lesson = lessons.find(l => l.id === lessonId);
    const content = practiceLessons.find(l => l.id === lessonId);
    const courseId = course?.id;
    const lessonTitle = content?.title || lesson?.title || 'Lesson';
    const lessonDifficulty = lesson?.difficulty || 'Easy';
    const lessonCompleted = Boolean(lesson?.completed);

    // ==================== ANTI-CHEAT SETUP ====================

    useEffect(() => {
        setupAntiCheat();
        return () => cleanupAntiCheat();
    }, []);

    const setupAntiCheat = () => {
        // Prevent right-click
        document.addEventListener('contextmenu', handleContextMenu);

        // Detect tab/window blur
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleWindowBlur);

        // Prevent certain keyboard shortcuts
        document.addEventListener('keydown', handleKeyDown);

        // Prevent text selection in instructions
        document.addEventListener('selectstart', handleSelectStart);
    };

    const cleanupAntiCheat = () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleWindowBlur);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('selectstart', handleSelectStart);
    };

    const handleContextMenu = (e) => {
        // Allow right-click ONLY in textarea (code editor)
        const isTextarea = e.target.tagName === 'TEXTAREA';
        if (!isTextarea) {
            e.preventDefault();
            addWarning('⚠️ Right-click is disabled in practice mode');
            return false;
        }
    };

    const recordFocusLoss = (type, message, group = type) => {
        const now = Date.now();
        const lastEvent = lastFocusEventRef.current;

        // Skip duplicate notifications that fire back-to-back (e.g., blur + visibilitychange combo)
        if (lastEvent.group === group && now - lastEvent.timestamp < 500) {
            return;
        }

        lastFocusEventRef.current = { type, group, timestamp: now };

        tabSwitchCountRef.current += 1;
        setTabSwitchCount(tabSwitchCountRef.current);
        addWarning(`${message} (#${tabSwitchCountRef.current})`);
        logActivity(type);
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            recordFocusLoss('tab_switch', '⚠️ Tab switch detected! Stay focused', 'focus-loss');
        }
    };

    const handleWindowBlur = () => {
        recordFocusLoss('window_blur', '⚠️ Window focus lost', 'focus-loss');
    };

    const handleKeyDown = (e) => {
        const isTextarea = e.target.tagName === 'TEXTAREA';

        // Block copy/paste in instructions (not in code editor)
        if (!isTextarea && ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v'))) {
            e.preventDefault();
            addWarning('⚠️ Copy/Paste disabled in instructions');
            return false;
        }

        // Block F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            addWarning('⚠️ Developer tools not allowed during practice');
            return false;
        }

        // Block Ctrl+Shift+I (DevTools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            addWarning('⚠️ Developer tools not allowed during practice');
            return false;
        }
    };

    const handleSelectStart = (e) => {
        // Allow selection in textarea and console
        const isTextarea = e.target.tagName === 'TEXTAREA';
        const isConsole = e.target.closest('.console-output');

        if (!isTextarea && !isConsole) {
            e.preventDefault();
            return false;
        }
    };

    const addWarning = (message) => {
        setWarnings(prev => [...prev, { message, timestamp: new Date() }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setWarnings(prev => prev.slice(1));
        }, 5000);
    };

    const logActivity = (type) => {
        console.log(`[Activity Log] ${type} at ${new Date().toISOString()}`);
        // You can send this to backend if needed
    };

    // ==================== EXISTING FUNCTIONALITY ====================

    useEffect(() => {
        if (content && content.starterCode) {
            setCode(content.starterCode.html || '');
        }
    }, [lessonId, content]);

    const generatePreview = () => {
        const htmlContent = code || content?.starterCode?.html || '';
        const cssContent = content?.starterCode?.css || '';
        const jsContent = content?.starterCode?.js || '';

        const combined = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${cssContent}</style>
</head>
<body>
${htmlContent}
<script>
(function(){
  const oldLog = console.log;
  console.log = function(...args){
    try{ 
      window.parent.postMessage({ 
        type: 'console', 
        data: args.map(a=>String(a)).join(' ') 
      }, '*'); 
    }catch(e){}
    oldLog.apply(console, args);
  };
  
  window.onerror = function(msg, url, line, col, err){
    try{ 
      window.parent.postMessage({ 
        type: 'error', 
        data: msg + ' (Line: ' + line + ')' 
      }, '*'); 
    }catch(e){}
    return false;
  };
})();

${jsContent}
</script>
</body>
</html>`;

        setPreviewHTML(combined);
    };

    // Auto-generate preview
    useEffect(() => {
        const id = setTimeout(() => generatePreview(), 300);
        return () => clearTimeout(id);
    }, [code, content?.starterCode]);

    // Listen for console messages
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

    if (!lesson && !content) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <p>Lesson not found</p>
            </div>
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
                        if (test.validate) {
                            const passed = test.validate(code);
                            return {
                                testCase: index + 1,
                                input: test.input,
                                expected: test.expected,
                                passed: passed
                            };
                        }

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
                            const funcMatch = userCode.match(/function\s+(\w+)/);
                            if (!funcMatch) {
                                throw new Error('No function found in code');
                            }
                            const functionName = funcMatch[1];

                            const userFunc = new Function(`
                ${userCode}
                return ${functionName};
              `)();

                            let actualResult;
                            if (test.input === '' || test.input === '""' || test.input === "''") {
                                actualResult = userFunc();
                            } else {
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

                            let actualStr = String(actualResult);
                            let expectedStr = test.expected.trim();

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
                    // REMOVED: points message
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
            alert(`Congratulations! You've completed this lesson!`); // REMOVED: points
        } else {
            alert('Please pass all test cases before submitting.');
        }
    };

    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;

    const handleBackClick = () => {
        if (courseId) {
            navigate(`/course/${courseId}`);
            return;
        }
        navigate(-1);
    };

    const handleNavigateLesson = (targetLessonId) => {
        if (!targetLessonId) return;
        navigate(`/lesson/${targetLessonId}`);
    };

    // Show next hint progressively
    const showNextHint = () => {
        if (content?.hints && currentHintIndex < content.hints.length - 1) {
            setCurrentHintIndex(prev => prev + 1);
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Anti-Cheat Warnings */}
            {warnings.length > 0 && (
                <div className="fixed top-20 right-4 z-50 space-y-2">
                    {warnings.map((warning, idx) => (
                        <div key={idx} className="bg-red-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="text-sm">{warning.message}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleBackClick}
                        className="text-green-700 hover:text-green-800 font-medium flex items-center"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="ml-1">Back to Course</span>
                    </button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <h1 className="text-lg font-semibold text-gray-900">{lessonTitle}</h1>
                </div>
                <div className="flex items-center space-x-2">
                    {lessonCompleted && (
                        <div className="flex items-center text-green-600 mr-4">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span className="text-sm font-medium">Completed</span>
                        </div>
                    )}
                    <span className={`text-xs font-medium px-3 py-1 rounded ${lessonDifficulty === 'Easy'
                        ? 'bg-green-100 text-green-700'
                        : lessonDifficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                        {lessonDifficulty}
                    </span>
                    {/* REMOVED: Points display */}
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel - Instructions */}
                <div className="w-1/2 overflow-y-auto border-r bg-white p-6" style={{ userSelect: 'none' }}>
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

                                {/* ONLY HINTS - NO SOLUTION BUTTON */}
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
                                            <div className="space-y-3">
                                                {content.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                                                    <div key={index} className="bg-white rounded p-3 border-l-4 border-blue-500">
                                                        <p className="text-sm font-semibold text-blue-800 mb-1">Hint {index + 1}:</p>
                                                        <p className="text-sm text-gray-700">{hint}</p>
                                                    </div>
                                                ))}

                                                {currentHintIndex < content.hints.length - 1 && (
                                                    <button
                                                        onClick={showNextHint}
                                                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                                                    >
                                                        Show Next Hint ({currentHintIndex + 1}/{content.hints.length})
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* REMOVED: Show Solution button completely */}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{lessonTitle}</h2>
                                <p className="text-gray-600 mb-6">{lesson?.description || 'Lesson description will be available soon.'}</p>
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

                    {/* Output Preview */}
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

                            {/* Console Output */}
                            <div className="h-24 border-t bg-gray-900 text-gray-100 font-mono text-sm overflow-auto p-2 console-output">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm">Console Output</span>
                                    <button
                                        onClick={() => setConsoleOutput([])}
                                        className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
                                    >
                                        Clear
                                    </button>
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

                    {/* Navigation & Submit */}
                    <div className="border-t border-gray-700 p-4 flex items-center justify-between">
                        <div className="flex space-x-2">
                            {prevLesson && (
                                <button
                                    onClick={() => handleNavigateLesson(prevLesson.id)}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Previous
                                </button>
                            )}
                            {nextLesson && (
                                <button
                                    onClick={() => handleNavigateLesson(nextLesson.id)}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={testResults.length === 0 || !testResults.every(r => r.passed)}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Solution
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

