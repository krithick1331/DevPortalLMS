import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { lessons as practiceLessons } from '../data/practiceLessons';

export default function ExperimentViewer({ experiment, lesson, hiltToken, onExperimentPass }) {
    const lessonDetail = practiceLessons.find(l => l.id === experiment?.id);
    const instructions = lessonDetail?.instructions || '';
    const starterCode = lessonDetail?.starterCode || {};
    const [code, setCode] = useState(starterCode.html || experiment.starterCode || '');
    const [output, setOutput] = useState('');
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

    const runTests = () => {
        setRunning(true);
        setOutput('Running tests...\n');

        try {
            // Run each test
            const results = experiment.tests.map((test, idx) => {
                try {
                    // Execute test function with user code
                    const testFn = new Function('code', test.testCode);
                    const result = testFn(code);

                    return {
                        description: test.description,
                        passed: result,
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

    // Get language mode
    const getLanguageMode = () => {
        switch (experiment.language) {
            case 'html': return html();
            case 'css': return css();
            case 'javascript':
            default: return javascript();
        }
    };

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
                        <CodeMirror
                            value={code}
                            height="100%"
                            extensions={[getLanguageMode()]}
                            onChange={(value) => setCode(value)}
                            theme="light"
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
                            {experiment.tests.map((test, idx) => (
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

                    {/* Output Console */}
                    <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-gray-900 text-gray-100">
                        <pre>{output || 'Run tests to see output here...'}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
}