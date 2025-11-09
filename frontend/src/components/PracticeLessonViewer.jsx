// FILE: frontend/src/components/PracticeLessonViewer.jsx
// freeCodeCamp-style Interactive Practice Lesson Component

import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Check, X, ChevronRight, Lightbulb } from 'lucide-react';

export default function PracticeLessonViewer({ lesson, onBack, onNext, hiltToken }) {
  const [activeTab, setActiveTab] = useState('html');
  const [code, setCode] = useState({
    html: lesson?.starterCode?.html || '',
    css: lesson?.starterCode?.css || '',
    js: lesson?.starterCode?.js || ''
  });
  const [testResults, setTestResults] = useState([]);
  const [allTestsPassed, setAllTestsPassed] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showHints, setShowHints] = useState(false);

  const previewRef = useRef(null);

  // Update preview whenever code changes
  useEffect(() => {
    updatePreview();
  }, [code]);

  const updatePreview = () => {
    if (!previewRef.current) return;

    const iframe = previewRef.current;
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${code.css}</style>
      </head>
      <body>
        ${code.html}
        <script>
          // Wrap JS code in try-catch to handle errors
          try {
            ${code.js}
          } catch (error) {
            console.error('Error in user code:', error);
          }
        </script>
      </body>
      </html>
    `;

    // Use srcdoc instead of directly manipulating document
    iframe.srcdoc = fullHTML;
  };

  const runTests = () => {
    if (!lesson?.testCases || lesson.testCases.length === 0) {
      addToConsole('⚠️ No test cases defined for this lesson', 'warning');
      return;
    }

    const iframe = previewRef.current;

    // Create a message handler for test results
    const handleTestResult = (event) => {
      if (event.data && event.data.type === 'TEST_RESULT') {
        const { results } = event.data;
        setTestResults(results);

        const allPassed = results.every(r => r.passed);
        setAllTestsPassed(allPassed);

        // Add to console
        addToConsole('🔄 Running tests...', 'info');
        results.forEach(result => {
          const icon = result.passed ? '✅' : '❌';
          const type = result.passed ? 'success' : 'error';
          addToConsole(`${icon} Test ${result.index}: ${result.description}`, type);
        });
      }
    };

    // Add message listener
    window.addEventListener('message', handleTestResult);

    // Create test runner code
    const testRunnerScript = `
      const testCases = ${JSON.stringify(lesson.testCases)};
      const results = testCases.map((test, index) => {
        try {
          const testFunc = new Function('document', 'window', test.validation);
          const passed = testFunc(document, window);
          return {
            description: test.description,
            passed: Boolean(passed),
            index: index + 1
          };
        } catch (error) {
          return {
            description: test.description,
            passed: false,
            error: error.message,
            index: index + 1
          };
        }
      });
      window.parent.postMessage({ type: 'TEST_RESULT', results }, '*');
    `;

    // Inject test runner into iframe
    const fullHTML = iframe.srcdoc;
    iframe.srcdoc = fullHTML.replace('</body>', `<script>${testRunnerScript}</script></body>`);

    setTestResults(results);

    const allPassed = results.every(r => r.passed);
    setAllTestsPassed(allPassed);

    // Add to console
    addToConsole('🔄 Running tests...', 'info');
    results.forEach(result => {
      const icon = result.passed ? '✅' : '❌';
      const type = result.passed ? 'success' : 'error';
      addToConsole(`${icon} Test ${result.index}: ${result.description}`, type);
    });

    const passedCount = results.filter(r => r.passed).length;
    addToConsole(`\n📊 ${passedCount}/${results.length} tests passed`,
      allPassed ? 'success' : 'info');

    if (allPassed) {
      addToConsole('\n🎉 All tests passed! You can submit now.', 'success');
    } else {
      addToConsole('\n⚠️ Some tests failed. Keep trying!', 'warning');
    }
  };

  const addToConsole = (message, type = 'info') => {
    setConsoleOutput(prev => [...prev, { message, type, timestamp: new Date() }]);
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const resetCode = () => {
    setCode({
      html: lesson?.starterCode?.html || '',
      css: lesson?.starterCode?.css || '',
      js: lesson?.starterCode?.js || ''
    });
    setTestResults([]);
    setAllTestsPassed(false);
    clearConsole();
    addToConsole('🔄 Code reset to starter template', 'info');
  };

  const handleSubmit = async () => {
    if (!allTestsPassed) {
      addToConsole('⚠️ Please pass all tests before submitting', 'warning');
      return;
    }

    addToConsole('📤 Submitting solution...', 'info');

    // Send to backend API
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hilt-token': hiltToken
        },
        body: JSON.stringify({
          lessonId: lesson.id,
          courseId: lesson.courseId,
          code,
          testResults,
          points: lesson.points
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Submission failed');
      }

      addToConsole(data.message, 'success');
      setTimeout(() => {
        if (onNext) onNext();
      }, 2000);
    } catch (error) {
      addToConsole('❌ Submission failed. Please try again.', 'error');
    }
  };

  if (!lesson) {
    return <div className="p-8 text-center">No lesson data available</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <h1 className="text-lg font-semibold">{lesson.title}</h1>
          <span className={`px-2 py-1 text-xs rounded ${lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
            {lesson.difficulty}
          </span>
          <span className="text-sm text-gray-500">🏆 {lesson.points} points</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Instructions */}
        <div className="w-1/3 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Instructions</h2>

            <div className="space-y-2 mb-6">
              {lesson.instructions?.map((instruction, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-gray-500">{i + 1}.</span>
                  <p className="text-gray-700">{instruction}</p>
                </div>
              ))}
            </div>

            {/* Test Cases Status */}
            {testResults.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Test Results</h3>
                <div className="space-y-1">
                  {testResults.map((result, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 p-2 rounded text-sm ${result.passed
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                        }`}
                    >
                      {result.passed ? <Check size={16} /> : <X size={16} />}
                      <span>{result.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hints */}
            {lesson.hints && lesson.hints.length > 0 && (
              <div>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-2"
                >
                  <Lightbulb size={16} />
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </button>

                {showHints && (
                  <div className="space-y-2">
                    {lesson.hints.map((hint, i) => (
                      <div key={i} className="bg-blue-50 p-3 rounded text-sm">
                        💡 {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Editor & Preview */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="h-2/5 border-b bg-white">
            {/* File Tabs */}
            <div className="flex border-b bg-gray-50">
              {['html', 'css', 'js'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-r ${activeTab === tab
                    ? 'bg-white border-b-2 border-b-blue-500 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              value={code[activeTab]}
              onChange={(e) => setCode({ ...code, [activeTab]: e.target.value })}
              className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
              placeholder={`Write your ${activeTab.toUpperCase()} code here...`}
            />
          </div>

          {/* Preview */}
          <div className="h-3/5 flex flex-col">
            <div className="bg-gray-800 text-white px-4 py-2 text-sm font-semibold">
              Preview
            </div>
            <iframe
              ref={previewRef}
              title="Preview"
              className="flex-1 bg-white border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-modals"
              allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom Panel - Console & Actions */}
      <div className="h-48 bg-gray-900 text-gray-100 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
          <span className="text-sm font-semibold">Console</span>
          <div className="flex gap-2">
            <button
              onClick={clearConsole}
              className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              Clear
            </button>
            <button
              onClick={resetCode}
              className="flex items-center gap-1 text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              <RotateCcw size={12} />
              Reset
            </button>
            <button
              onClick={runTests}
              className="flex items-center gap-1 text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
            >
              <Play size={12} />
              Run Tests
            </button>
            {allTestsPassed && (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1 text-xs px-3 py-1 bg-green-600 hover:bg-green-700 rounded"
              >
                <Check size={12} />
                Submit
              </button>
            )}
          </div>
        </div>

        {/* Console Output */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1">
          {consoleOutput.length === 0 ? (
            <p className="text-gray-500">Click "Run Tests" to validate your code...</p>
          ) : (
            consoleOutput.map((log, i) => (
              <div
                key={i}
                className={`${log.type === 'error' ? 'text-red-400' :
                  log.type === 'success' ? 'text-green-400' :
                    log.type === 'warning' ? 'text-yellow-400' :
                      'text-gray-300'
                  }`}
              >
                {log.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
