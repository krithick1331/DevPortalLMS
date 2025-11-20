// frontend/src/components/ExperimentViewer.jsx

import { useState, useEffect, useRef } from 'react';
import CodeEditor from './CodeEditor';
import { lessons as practiceLessons } from '../data/practiceLessons';
import { AlertTriangle, Lightbulb, ChevronRight, X } from 'lucide-react';

export default function ExperimentViewer({ experiment, lesson, hiltToken, onExperimentPass }) {
    // Find lesson details
    const lessonDetail = practiceLessons.find(l => l.id === experiment?.id);
    const instructions = lessonDetail?.instructions || '';
    const starterCode = lessonDetail?.starterCode || {};

    // Code and output states
    const [code, setCode] = useState(starterCode.html || starterCode.js || experiment.starterCode || '');
    const [output, setOutput] = useState('');
    const [previewHTML, setPreviewHTML] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([]);
    const [testResults, setTestResults] = useState([]);

    // UI states
    const [running, setRunning] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [passed, setPassed] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showHints, setShowHints] = useState(false);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);

    // Anti-cheat states
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [warnings, setWarnings] = useState([]);
    const [focusLostCount, setFocusLostCount] = useState(0);

    const iframeRef = useRef(null);

    // ==================== ANTI-CHEAT SETUP ====================

    useEffect(() => {
        setupAntiCheat();
        return () => cleanupAntiCheat();
    }, []);

    const setupAntiCheat = () => {
        // Prevent right-click on entire component
        document.addEventListener('contextmenu', handleContextMenu);

        // Detect tab/window blur
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleWindowBlur);
        window.addEventListener('focus', handleWindowFocus);

        // Prevent certain keyboard shortcuts
        document.addEventListener('keydown', handleKeyDown);

        // Prevent text selection in instructions
        document.addEventListener('selectstart', handleSelectStart);

        // Detect paste events
        document.addEventListener('paste', handlePaste);
    };

    const cleanupAntiCheat = () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('blur', handleWindowBlur);
        window.removeEventListener('focus', handleWindowFocus);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('selectstart', handleSelectStart);
        document.removeEventListener('paste', handlePaste);
    };

    const handleContextMenu = (e) => {
        // Allow right-click ONLY in Monaco editor
        const isMonacoEditor = e.target.closest('.monaco-editor');

        if (!isMonacoEditor) {
            e.preventDefault();
            e.stopPropagation();
            addWarning('⚠️ Right-click is disabled during practice');
            return false;
        }
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            setTabSwitchCount(prev => prev + 1);
            setFocusLostCount(prev => prev + 1);
            addWarning(`⚠️ Tab switch detected! Stay focused (#${tabSwitchCount + 1})`);
            logSuspiciousActivity('tab_switch');
        }
    };

    const handleWindowBlur = () => {
        if (!document.hidden) {
            setFocusLostCount(prev => prev + 1);
            addWarning(`⚠️ Window focus lost (#${focusLostCount + 1})`);
            logSuspiciousActivity('window_blur');
        }
    };

    const handleWindowFocus = () => {
        // Optional: Log when window regains focus
        console.log('Window refocused');
    };

    const handleKeyDown = (e) => {
        const isMonacoEditor = e.target.closest('.monaco-editor');
        const isTextArea = e.target.tagName === 'TEXTAREA';
        const isInput = e.target.tagName === 'INPUT';

        // Allow shortcuts in code editor
        if (isMonacoEditor || isTextArea || isInput) {
            return true;
        }

        // Block copy/paste in instructions
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'x')) {
            e.preventDefault();
            addWarning('⚠️ Copy/Paste/Cut disabled in instructions area');
            return false;
        }

        // Block F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            addWarning('⚠️ Developer tools are not allowed during practice');
            logSuspiciousActivity('devtools_attempt');
            return false;
        }

        // Block Ctrl+Shift+I (DevTools)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
            e.preventDefault();
            addWarning('⚠️ Developer tools are not allowed during practice');
            logSuspiciousActivity('devtools_attempt');
            return false;
        }

        // Block Ctrl+Shift+J (DevTools Console)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
            e.preventDefault();
            addWarning('⚠️ Developer tools are not allowed during practice');
            logSuspiciousActivity('devtools_attempt');
            return false;
        }

        // Block Ctrl+U (View Source)
        if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            addWarning('⚠️ View source is disabled during practice');
            return false;
        }
    };

    const handleSelectStart = (e) => {
        // Allow selection only in code editor and console
        const isMonacoEditor = e.target.closest('.monaco-editor');
        const isConsole = e.target.closest('.console-output');
        const isTestResults = e.target.closest('.test-results');

        if (!isMonacoEditor && !isConsole && !isTestResults) {
            e.preventDefault();
            return false;
        }
    };

    const handlePaste = (e) => {
        const isMonacoEditor = e.target.closest('.monaco-editor');
        const isTextArea = e.target.tagName === 'TEXTAREA';

        if (!isMonacoEditor && !isTextArea) {
            e.preventDefault();
            addWarning('⚠️ Paste is disabled in this area');
            return false;
        }
    };

    const addWarning = (message) => {
        const newWarning = {
            id: Date.now(),
            message,
            timestamp: new Date()
        };

        setWarnings(prev => [...prev, newWarning]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            setWarnings(prev => prev.filter(w => w.id !== newWarning.id));
        }, 5000);
    };

    const logSuspiciousActivity = async (activityType) => {
        try {
            await fetch('/api/activity/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hilt-token': hiltToken
                },
                body: JSON.stringify({
                    lessonId: lesson.id,
                    experimentId: experiment.id,
                    activityType,
                    timestamp: new Date(),
                    tabSwitches: tabSwitchCount
                })
            });
        } catch (error) {
            console.error('Failed to log activity:', error);
        }
    };

    // ==================== LOAD PROGRESS ====================

    useEffect(() => {
        fetchExperimentProgress();
    }, [experiment.id]);

    const fetchExperimentProgress = async () => {
        try {
            const res = await fetch(`/api/experiment/progress/${lesson.id}`, {
                headers: { 'x-hilt-token': hiltToken }
            });
            const data = await res.json();

            if (data.experiments && data.experiments[experiment.id]) {
                const expData = data.experiments[experiment.id];
                setPassed(expData.passed);
                setAttempts(expData.attempts);
                if (expData.lastCode) {
                    setCode(expData.lastCode);
                }
            }
        } catch (error) {
            console.error('Failed to load experiment progress:', error);
        }
    };

    // ==================== PREVIEW GENERATION ====================

    const generatePreview = () => {
        const htmlContent = (experiment.language === 'html') ? code : (starterCode.html || '');
        const cssContent = starterCode.css || '';
        const jsContent = (experiment.language === 'javascript') ? code : (starterCode.js || '');

        const combined = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

    // Auto-generate preview when code changes (debounced)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            generatePreview();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [code, starterCode]);

    // Generate preview on mount
    useEffect(() => {
        generatePreview();
    }, []);

    // Listen for console messages from iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (!event?.data) return;

            if (event.data.type === 'console') {
                setConsoleOutput(prev => [...prev, { type: 'log', message: event.data.data }]);
            } else if (event.data.type === 'error') {
                setConsoleOutput(prev => [...prev, { type: 'error', message: event.data.data }]);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // ==================== TEST BUILDING ====================

    const buildTestsFromTestCases = (testCases, sampleCode) => {
        const jsSample = sampleCode || '';
        const fnMatch = jsSample.match(/function\s+(\w+)\s*\(/) ||
            jsSample.match(/const\s+(\w+)\s*=\s*\(/) ||
            jsSample.match(/let\s+(\w+)\s*=\s*\(/);
        const fnName = fnMatch ? fnMatch[1] : null;

        return testCases.map(tc => {
            const rawInput = (tc.input || '').toString();
            const args = rawInput === '' ? [] : rawInput.split(',').map(s => s.trim());

            let invoke;
            if (fnName) {
                const argsStr = args.map(a => {
                    return /^-?\d+(\.\d+)?$/.test(a) ? a : JSON.stringify(a.replace(/^['"]|['"]$/g, ''));
                }).join(', ');
                invoke = `typeof ${fnName} === 'function' ? ${fnName}(${argsStr}) : undefined`;
            } else {
                const single = args[0] ? (/^-?\d+(\.\d+)?$/.test(args[0]) ? args[0] : JSON.stringify(args[0].replace(/^['"]|['"]$/g, ''))) : 'undefined';
                invoke = single;
            }

            const expectedRaw = (tc.expected || '').toString();
            const expectedIsBool = /^(true|false)$/.test(expectedRaw.toLowerCase());
            const expectedIsNumber = /^-?\d+(\.\d+)?$/.test(expectedRaw);
            const expectedVal = expectedIsBool ? expectedRaw.toLowerCase() :
                (expectedIsNumber ? expectedRaw :
                    JSON.stringify(expectedRaw.replace(/^['"]|['"]$/g, '')));

            const testCode = `try{ 
        eval(code);
        const result = ${invoke};
        return String(result) === String(${expectedVal}); 
      }catch(e){ 
        return false; 
      }`;

            return {
                description: tc.description || `Input: ${tc.input} => ${tc.expected}`,
                testCode
            };
        });
    };

    const tests = experiment.tests ||
        lessonDetail?.tests ||
        (lessonDetail?.testCases ? buildTestsFromTestCases(lessonDetail.testCases, starterCode.js || '') : []);

    // ==================== RUN TESTS ====================

    const runTests = () => {
        setRunning(true);
        setOutput('Running tests...\n');

        // Refresh preview
        try { generatePreview(); } catch (e) { console.error(e); }

        try {
            const results = tests.map((test, idx) => {
                try {
                    const testFn = new Function('code', test.testCode);
                    const result = testFn(code);
                    return {
                        description: test.description,
                        passed: !!result,
                        error: null
                    };
                } catch (error) {
                    return {
                        description: test.description,
                        passed: false,
                        error: error.message
                    };
                }
            });

            setTestResults(results);
            const allPassed = results.every(r => r.passed);
            const passedCount = results.filter(r => r.passed).length;

            setOutput(
                `Tests completed: ${passedCount}/${results.length} passed\n\n` +
                results.map((r, i) =>
                    `${r.passed ? '✅' : '❌'} Test ${i + 1}: ${r.description}${r.error ? `\n   Error: ${r.error}` : ''}`
                ).join('\n')
            );

            if (allPassed) {
                setOutput(prev => prev + '\n\n🎉 All tests passed! Click Submit to save your solution.');
            }
        } catch (error) {
            setOutput(`Error running tests: ${error.message}`);
        } finally {
            setRunning(false);
        }
    };

    // ==================== SUBMIT SOLUTION ====================

    const handleSubmit = async () => {
        if (testResults.length === 0) {
            alert('Please run tests first!');
            return;
        }

        const allPassed = testResults.every(r => r.passed);
        if (!allPassed) {
            alert('All tests must pass before submitting!');
            return;
        }

        setRunning(true);
        try {
            const res = await fetch('/api/experiment/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hilt-token': hiltToken
                },
                body: JSON.stringify({
                    lessonId: lesson.id,
                    courseId: lesson.courseId,
                    experimentId: experiment.id,
                    code,
                    testResults,
                    totalExperiments: lesson.experiments.length,
                    tabSwitchCount, // Log for monitoring
                    focusLostCount
                })
            });

            const data = await res.json();

            if (data.success && data.passed) {
                setPassed(true);
                setSubmitted(true);
                setAttempts(data.attemptNumber);

                alert(`✅ Experiment passed successfully!\n\nAttempt #${data.attemptNumber}`);

                if (data.allExperimentsCompleted) {
                    alert('🎉 All experiments in this lesson completed! You can proceed to the next lesson.');
                    onExperimentPass?.();
                }
            } else {
                alert('❌ Submission failed. Please ensure all tests pass.');
            }
        } catch (error) {
            console.error('Experiment submission failed:', error);
            alert('Failed to submit experiment. Please try again.');
        } finally {
            setRunning(false);
        }
    };

    // ==================== HINTS ====================

    const hints = lessonDetail?.hints || [];

    const showNextHint = () => {
        if (currentHintIndex < hints.length - 1) {
            setCurrentHintIndex(prev => prev + 1);
        }
    };

    // ==================== RENDER ====================

    return (
        <div className="h-full flex flex-col" onContextMenu={(e) => e.preventDefault()}>
            {/* Anti-Cheat Warning Notifications */}
            {warnings.length > 0 && (
                <div className="fixed top-4 right-4 z-50 space-y-2" style={{ maxWidth: '400px' }}>
                    {warnings.map((warning) => (
                        <div
                            key={warning.id}
                            className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-slide-in"
                        >
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">{warning.message}</span>
                            </div>
                            <button
                                onClick={() => setWarnings(prev => prev.filter(w => w.id !== warning.id))}
                                className="ml-3 hover:bg-red-700 rounded p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{experiment.title}</h2>
                        <p className="text-gray-600 mt-1">{experiment.description}</p>
                    </div>
                    <div className="text-right">
                        {passed && (
                            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                                ✅ Passed
                            </span>
                        )}
                        {attempts > 0 && (
                            <p className="text-sm text-gray-500 mt-1">Attempts: {attempts}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Side - Code Editor */}
                <div className="w-1/2 flex flex-col border-r">
                    {/* Editor Header */}
                    <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                        <span className="font-semibold">Code Editor</span>
                        <span className="text-sm text-gray-600">{experiment.language.toUpperCase()}</span>
                    </div>

                    {/* Monaco Code Editor */}
                    <div className="flex-1 overflow-auto">
                        <CodeEditor
                            value={code}
                            onChange={(value) => setCode(value)}
                            language={experiment.language}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 bg-gray-50 border-t flex gap-3">
                        <button
                            onClick={generatePreview}
                            disabled={running || !code}
                            className="flex-1 px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            ▶ Run Code
                        </button>
                        <button
                            onClick={runTests}
                            disabled={running || !code}
                            className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {running ? 'Running...' : '▶ Run Tests'}
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={running || testResults.length === 0 || !testResults.every(r => r.passed) || passed}
                            className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {passed ? '✅ Submitted' : '📤 Submit'}
                        </button>
                    </div>
                </div>

                {/* Right Side - Instructions, Output & Tests */}
                <div className="w-1/2 flex flex-col">
                    {/* Instructions & Hints */}
                    <div className="border-b p-4 bg-gray-50 max-h-64 overflow-y-auto" style={{ userSelect: 'none' }}>
                        <h3 className="font-semibold mb-3">Instructions:</h3>
                        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{instructions}</p>

                        {/* ONLY HINTS - NO SOLUTION */}
                        {hints.length > 0 && (
                            <div className="mt-4">
                                <button
                                    onClick={() => setShowHints(!showHints)}
                                    className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Lightbulb className="w-5 h-5 text-blue-700" />
                                        <span className="font-medium text-blue-900">
                                            {showHints ? 'Hide Hints' : 'Show Hints'}
                                        </span>
                                    </div>
                                    <ChevronRight className={`w-5 h-5 text-blue-700 transition-transform ${showHints ? 'rotate-90' : ''}`} />
                                </button>

                                {showHints && (
                                    <div className="mt-3 space-y-2">
                                        {hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                                            <div key={index} className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                                                <p className="text-sm font-semibold text-blue-800 mb-1">Hint {index + 1}:</p>
                                                <p className="text-sm text-gray-700">{hint}</p>
                                            </div>
                                        ))}

                                        {currentHintIndex < hints.length - 1 && (
                                            <button
                                                onClick={showNextHint}
                                                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium"
                                            >
                                                Show Next Hint ({currentHintIndex + 1}/{hints.length})
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Test Requirements */}
                    <div className="border-b p-4 bg-white test-results">
                        <h3 className="font-semibold mb-3">Test Requirements:</h3>
                        <ul className="space-y-2">
                            {tests.map((test, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    {testResults[idx] ? (
                                        <span className={testResults[idx].passed ? 'text-green-600' : 'text-red-600'}>
                                            {testResults[idx].passed ? '✅' : '❌'}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">◯</span>
                                    )}
                                    <span className="text-sm">{test.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Output Preview */}
                    <div className="flex-1 flex flex-col">
                        <div className="bg-gray-100 px-4 py-2 border-b font-semibold">
                            Output Preview
                        </div>
                        <div className="flex-1 bg-white overflow-hidden">
                            <iframe
                                ref={iframeRef}
                                srcDoc={previewHTML}
                                title="output-preview"
                                sandbox="allow-scripts"
                                className="w-full h-full border-0"
                            />
                        </div>

                        {/* Console Panel */}
                        <div className="h-40 border-t bg-gray-900 text-gray-100 font-mono text-sm overflow-auto p-2 console-output">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold">Console Output</span>
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
                                    <div
                                        key={i}
                                        className={`py-1 ${log.type === 'error' ? 'text-red-400' : 'text-green-400'}`}
                                    >
                                        {log.type === 'error' ? '❌' : '▶'} {log.message}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add CSS for animation */}
            <style jsx>{`
                @keyframes slide-in {
                  from {
                    transform: translateX(100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                .animate-slide-in {
                  animation: slide-in 0.3s ease-out;
                }
              `}</style>
        </div>
    );
}

