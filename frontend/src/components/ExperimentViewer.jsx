import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import SimpleCodeEditor from './SimpleCodeEditor';

export default function ExperimentViewer() {
    const { experimentId } = useParams();
    const [experiment, setExperiment] = useState(null);
    const [code, setCode] = useState('');
    const [testResults, setTestResults] = useState([]);
    const [consoleOutput, setConsoleOutput] = useState('');
    const [previewHTML, setPreviewHTML] = useState('');
    const [running, setRunning] = useState(false);
    const [passed, setPassed] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [editorReady, setEditorReady] = useState(false);

    // Load experiment data
    useEffect(() => {
        const loadExperiment = async () => {
            try {
                // For now, use mock data. In production, fetch from /api/experiments/:id
                const experiments = [
                    {
                        id: '1',
                        title: 'JavaScript Basics',
                        description: 'Learn JavaScript fundamentals',
                        starterCode: 'function hello() {\n  return "Hello, World!";\n}',
                        tests: [
                            { id: 1, name: 'Should return hello message', code: 'assert(hello() === "Hello, World!")' }
                        ]
                    }
                ];
                const exp = experiments.find(e => e.id === experimentId);
                setExperiment(exp || experiments[0]);
                setCode(exp?.starterCode || experiments[0].starterCode);
            } catch (error) {
                console.error('Failed to load experiment:', error);
            }
        };
        loadExperiment();
    }, [experimentId]);

    const generatePreview = useCallback(() => {
        if (!code) {
            setPreviewHTML('');
            return;
        }

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
          .output { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #4CAF50; }
          .error { border-left-color: #f44336; }
          pre { background: #f0f0f0; padding: 10px; border-radius: 4px; overflow-x: auto; }
          console-output { display: block; white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <div class="output" id="output"></div>
        <script>
          const logs = [];
          const errors = [];
          
          window.addEventListener('error', (e) => {
            errors.push(e.message);
            window.parent.postMessage({ type: 'error', message: e.message }, '*');
          });

          const originalLog = console.log;
          console.log = function(...args) {
            const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
            logs.push(msg);
            window.parent.postMessage({ type: 'log', message: msg }, '*');
          };

          try {
            ${code}
          } catch (err) {
            console.error('Error:', err.message);
            window.parent.postMessage({ type: 'error', message: err.message }, '*');
          }

          const output = document.getElementById('output');
          if (logs.length > 0 || errors.length > 0) {
            output.innerHTML = '<pre>' + (logs.concat(errors)).join('\\n') + '</pre>';
          } else {
            output.innerHTML = '<p>Code executed. Open console to see output.</p>';
          }
        </script>
      </body>
      </html>
    `;
        setPreviewHTML(html);
    }, [code]);

    useEffect(() => {
        generatePreview();
    }, [code, generatePreview]);

    // Listen for messages from iframe
    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data.type === 'log') {
                setConsoleOutput(prev => prev + e.data.message + '\n');
            } else if (e.data.type === 'error') {
                setConsoleOutput(prev => prev + '❌ ' + e.data.message + '\n');
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const runCode = () => {
        setConsoleOutput('');
        setRunning(true);
        setTimeout(() => setRunning(false), 500);
    };

    const runTests = async () => {
        setRunning(true);
        setConsoleOutput('');
        try {
            // Simple test runner (mock)
            const results = experiment?.tests?.map(test => ({
                id: test.id,
                name: test.name,
                passed: Math.random() > 0.3, // Mock: 70% pass rate
                error: null
            })) || [];
            setTestResults(results);
        } catch (error) {
            console.error('Test execution failed:', error);
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
            setPassed(true);
            setSubmitted(true);
            alert('✅ Experiment passed successfully!');
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit experiment. Please try again.');
        } finally {
            setRunning(false);
        }
    };

    if (!experiment) return <div className="p-6 text-center">Loading experiment...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{experiment.title}</h1>
            <p className="text-gray-600 mb-6">{experiment.description}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-100 p-3 border-b">
                        <h3 className="font-semibold">Code Editor</h3>
                    </div>
                    <div className="h-96 overflow-hidden">
                        {editorReady ? (
                            <CodeEditor
                                value={code}
                                onChange={setCode}
                                language="javascript"
                            />
                        ) : (
                            <SimpleCodeEditor
                                value={code}
                                onChange={setCode}
                                onReady={() => setEditorReady(true)}
                            />
                        )}
                    </div>
                </div>

                {/* Preview & Console */}
                <div className="flex flex-col gap-6">
                    {/* Preview */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-gray-100 p-3 border-b">
                            <h3 className="font-semibold">Live Preview</h3>
                        </div>
                        <div className="h-48 overflow-auto bg-white">
                            {previewHTML ? (
                                <iframe
                                    srcDoc={previewHTML}
                                    sandbox="allow-scripts"
                                    className="w-full h-full border-none"
                                />
                            ) : (
                                <div className="p-4 text-gray-500">Write code to see preview</div>
                            )}
                        </div>
                    </div>

                    {/* Console */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-gray-100 p-3 border-b">
                            <h3 className="font-semibold">Console Output</h3>
                        </div>
                        <div className="h-32 overflow-auto bg-gray-900 text-green-400 p-3 font-mono text-sm">
                            {consoleOutput || '// Output appears here'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
                <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Test Results</h3>
                    <div className="space-y-2">
                        {testResults.map(test => (
                            <div
                                key={test.id}
                                className={`p-3 rounded ${test.passed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}
                            >
                                <span className={test.passed ? 'text-green-700' : 'text-red-700'}>
                                    {test.passed ? '✓' : '✗'} {test.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="mt-6 flex gap-3 flex-wrap">
                <button
                    onClick={runCode}
                    disabled={running}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold"
                >
                    {running ? 'Running...' : 'Run Code'}
                </button>
                <button
                    onClick={runTests}
                    disabled={running}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold"
                >
                    {running ? 'Testing...' : 'Run Tests'}
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={running || submitted}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition font-semibold"
                >
                    {submitted ? 'Submitted ✓' : 'Submit'}
                </button>
            </div>

            {passed && (
                <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-6 rounded">
                    <p className="text-green-700 font-semibold">🎉 Experiment completed successfully!</p>
                </div>
            )}
        </div>
    );
}
