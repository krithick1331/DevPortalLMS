// FILE: frontend/src/App.jsx
// Complete App with all 4 courses (FET, WP, WS, ITES) based on syllabi

import { useState } from 'react';
import PracticeLessonViewer from './components/PracticeLessonViewer';
import { navbarLesson, formLesson } from './data/practiceLessons';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Course data from syllabi
  const courses = [
    {
      id: 'fet',
      title: 'FET - Front End Technologies',
      description: 'HTML, CSS, JavaScript & Bootstrap fundamentals',
      lessons: [
        { id: 'html-navbar', title: 'Build a Navigation Bar', difficulty: 'Medium', points: 20 },
        { id: 'html-form', title: 'Build a Contact Form', difficulty: 'Easy', points: 15 },
        { id: 'css-flexbox', title: 'CSS Flexbox Layout', difficulty: 'Medium', points: 25 },
        { id: 'js-dom', title: 'JavaScript DOM Manipulation', difficulty: 'Hard', points: 30 }
      ]
    },
    {
      id: 'wp',
      title: 'WP - Web Programming',
      description: 'JavaScript, Bootstrap, PHP & AJAX',
      lessons: [
        { id: 'js-functions', title: 'JavaScript Functions & Objects', difficulty: 'Medium', points: 20 },
        { id: 'bootstrap-grid', title: 'Bootstrap Grid System', difficulty: 'Easy', points: 15 },
        { id: 'php-forms', title: 'PHP Form Processing', difficulty: 'Medium', points: 25 },
        { id: 'ajax-demo', title: 'AJAX Request Handler', difficulty: 'Hard', points: 30 }
      ]
    },
    {
      id: 'ws',
      title: 'WS - Web Scripting',
      description: 'Advanced JavaScript, OOP, Events & Node.js',
      lessons: [
        { id: 'js-classes', title: 'JavaScript Classes & OOP', difficulty: 'Hard', points: 30 },
        { id: 'async-await', title: 'Async/Await & Promises', difficulty: 'Hard', points: 35 },
        { id: 'event-handling', title: 'Event Handling & Listeners', difficulty: 'Medium', points: 25 },
        { id: 'node-basics', title: 'Node.js Basics', difficulty: 'Medium', points: 30 }
      ]
    },
    {
      id: 'ites',
      title: 'ITES - Information Technology Enabled Services',
      description: 'Complete web development stack',
      lessons: [
        { id: 'html-basics', title: 'HTML Fundamentals', difficulty: 'Easy', points: 15 },
        { id: 'css-styling', title: 'CSS Styling Basics', difficulty: 'Easy', points: 15 },
        { id: 'js-intro', title: 'JavaScript Introduction', difficulty: 'Medium', points: 20 },
        { id: 'responsive-design', title: 'Responsive Web Design', difficulty: 'Hard', points: 30 }
      ]
    }
  ];

  // Render based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} courses={courses} />;

      case 'courses':
        return <CoursesPage
          onNavigate={setCurrentPage}
          courses={courses}
          onSelectLesson={setSelectedLesson}
        />;

      case 'practice':
        return <PracticeLessonViewer
          lesson={selectedLesson === 'html-navbar' ? navbarLesson : formLesson}
          onBack={() => setCurrentPage('courses')}
          onNext={() => {
            setCurrentPage('courses');
          }}
        />;

      default:
        return <HomePage onNavigate={setCurrentPage} courses={courses} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

// Home Page Component
function HomePage({ onNavigate, courses }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">🎓 DEV-Portal LMS</h1>
          <nav className="flex gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Courses
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Learn to Code Interactively
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master web development with hands-on coding challenges, instant feedback, and real-time preview.
          </p>
          <button
            onClick={() => onNavigate('courses')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
          >
            Start Learning →
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2">Interactive Editor</h3>
            <p className="text-gray-600">Code HTML, CSS, and JavaScript with live preview</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Instant Validation</h3>
            <p className="text-gray-600">Get immediate feedback with automated tests</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
            <p className="text-gray-600">Track progress and compete on leaderboards</p>
          </div>
        </div>

        {/* Course Preview */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold mb-6">Available Courses</h3>
          <div className="grid gap-4">
            {courses.map(course => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition">
                <h4 className="text-xl font-semibold mb-2">{course.title}</h4>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {course.lessons.length} lessons
                  </span>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Lessons
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Courses Page Component
function CoursesPage({ onNavigate, courses, onSelectLesson }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">🎓 DEV-Portal LMS</h1>
          <nav className="flex gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600"
            >
              Courses
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Practice Lessons</h2>

        {courses.map(course => (
          <div key={course.id} className="mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <h3 className="text-xl font-semibold text-blue-900">{course.title}</h3>
              <p className="text-blue-700">{course.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {course.lessons.map(lesson => (
                <div key={lesson.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-semibold">{lesson.title}</h4>
                    <span className={`px-3 py-1 text-sm rounded-full ${lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                      }`}>
                      {lesson.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">🏆 {lesson.points} points</span>
                    <button
                      onClick={() => {
                        onSelectLesson(lesson.id);
                        onNavigate('practice');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Start Practice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
