import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import { lessons as practiceLessons } from '../data/practiceLessons';

export default function ExperimentViewer({ experiment, lesson, hiltToken, onExperimentPass }) {
    const lessonDetail = practiceLessons.find(l => l.id === experiment?.id);
    const instructions = lessonDetail?.instructions || '';
    const starterCode = lessonDetail?.starterCode || {};
    const [code, setCode] = useState(starterCode.html || experiment.starterCode || '');
    const [output, setOutput] = useState('');
    const [previewHTML, setPreviewHTML] = useState('');
    const [consoleOutput, setConsoleOutput] = useState([]);
    const [testResults, setTestResults] = useState([]);
    const [running, setRunning] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [passed, setPassed] = useState(false);
    const [attempts, setAttempts] = useState(0);

    // Load experiment progress
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

    // Generate preview HTML for iframe (use for HTML/CSS/JS experiments)
    const generatePreview = () => {
        // If experiment provides starter html, prefer that; otherwise use code as html
        const htmlContent = (experiment.language === 'html') ? code : (starterCode.html || '');
        const cssContent = starterCode.css || '';
        const jsContent = (experiment.language === 'javascript') ? code : (starterCode.js || '');

        const combined = `<!doctype html><html><head><meta charset="utf-8"><style>${cssContent}</style></head><body>${htmlContent}
<script>
// Capture console.log and errors and post to parent
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

    // Normalize tests: prefer explicit `experiment.tests`, then lessonDetail.tests,
    // then convert legacy `lessonDetail.testCases` into `tests` that can be executed.
    const buildTestsFromTestCases = (testCases, sampleCode) => {
        // try to detect a function name from sampleCode (starter JS)
        const jsSample = sampleCode || '';
        const fnMatch = jsSample.match(/function\s+(\w+)\s*\(/) || jsSample.match(/const\s+(\w+)\s*=\s*\(/) || jsSample.match(/let\s+(\w+)\s*=\s*\(/);
        const fnName = fnMatch ? fnMatch[1] : null;

        return testCases.map(tc => {
            // prepare args: split by comma if present
            const rawInput = (tc.input || '').toString();
            const args = rawInput === '' ? [] : rawInput.split(',').map(s => s.trim());

            // build invocation string
            let invoke;
            if (fnName) {
                // call detected function with parsed args
                const argsStr = args.map(a => {
                    // if numeric-like, leave as number, else wrap as string
                    return /^-?\d+(\.\d+)?$/.test(a) ? a : JSON.stringify(a.replace(/^['\"]|['\"]$/g, ''));
                }).join(', ');
                invoke = `typeof ${fnName} === 'function' ? ${fnName}(${argsStr}) : undefined`;
            } else {
                // fallback: try to evaluate expression from input
                const single = args[0] ? (/^-?\d+(\.\d+)?$/.test(args[0]) ? args[0] : JSON.stringify(args[0].replace(/^['\"]|['\"]$/g, ''))) : 'undefined';
                invoke = single;
            }

            // expected normalization
            const expectedRaw = (tc.expected || '').toString();
            const expectedIsBool = /^(true|false)$/.test(expectedRaw.toLowerCase());
            const expectedIsNumber = /^-?\d+(\.\d+)?$/.test(expectedRaw);
            const expectedVal = expectedIsBool ? expectedRaw.toLowerCase() : (expectedIsNumber ? expectedRaw : JSON.stringify(expectedRaw.replace(/^['\"]|['\"]$/g, '')));

            // build testCode string: eval user code then return comparison
            const testCode = `try{ eval(code);\n  const result = ${invoke};\n  return String(result) === String(${expectedVal}); }catch(e){ return false; }`;

            return {
                description: tc.description || `Input: ${tc.input} => ${tc.expected}`,
                testCode
            };
        });
    };

    const tests = experiment.tests || lessonDetail?.tests || (lessonDetail?.testCases ? buildTestsFromTestCases(lessonDetail.testCases, starterCode.js || '') : []);

    const runTests = () => {
        setRunning(true);
        setOutput('Running tests...\n');
        // refresh preview when running tests
        try { generatePreview(); } catch (e) { /* ignore */ }

        try {
            // Run each test
            const results = tests.map((test, idx) => {
                try {
                    // Execute test function with user code
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

            setOutput(`Tests completed: ${passedCount}/${results.length} passed\n\n` +
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
                    totalExperiments: lesson.experiments.length
                })
            });

            const data = await res.json();

            if (data.success && data.passed) {
                setPassed(true);
                setSubmitted(true);
                setAttempts(data.attemptNumber);
                alert(`✅ Experiment passed on attempt #${data.attemptNumber}!`);

                if (data.allExperimentsCompleted) {
                    alert('🎉 All experiments completed! You can now proceed to the next lesson.');
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

    // (Using Monaco-based CodeEditor, which receives language as a string)

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-white border-b p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{experiment.title}</h2>
                        <p className="text-gray-600 mt-1">{experiment.description}</p>
                    </div>
                    <div className="text-right">
                        {passed && <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">✅ Passed</span>}
                        {attempts > 0 && <p className="text-sm text-gray-500 mt-1">Attempts: {attempts}</p>}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Code Editor */}
                <div className="w-1/2 flex flex-col border-r">
                    <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
                        <span className="font-semibold">Code Editor</span>
                        <span className="text-sm text-gray-600">{experiment.language.toUpperCase()}</span>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <CodeEditor
                            value={code}
                            onChange={(value) => setCode(value)}
                            language={experiment.language}
                        />
                    </div>
                    <div className="p-4 bg-gray-50 border-t flex gap-3">
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

                {/* Output & Tests */}
                <div className="w-1/2 flex flex-col">
                    {/* Test Requirements */}
                    <div className="border-b p-4 bg-gray-50">
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
                                    <span>{test.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Output Preview */}
                    <div className="flex-1 flex flex-col">
                        <div className="bg-gray-100 px-4 py-2 border-t font-semibold">Output Preview</div>
                        <div className="flex-1 bg-white">
                            <iframe
                                srcDoc={previewHTML}
                                title="output-preview"
                                sandbox="allow-scripts"
                                className="w-full h-full border-0"
                            />
                        </div>

                        {/* Console Panel */}
                        <div className="h-40 border-t bg-gray-900 text-gray-100 font-mono text-sm overflow-auto p-2">
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
            </div>
        </div>
    );
}