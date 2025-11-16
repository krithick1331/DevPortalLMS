import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import course data
import { courses } from './data/courses';

// Auth pages
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';

// Student pages
import Dashboard from './components/Dashboard';
import CoursesPage from './components/CoursesPage';
import CourseDetailPage from './components/CourseDetailPage';
import LessonViewer from './components/LessonViewer';
import AdminDashboard from './components/AdminDashboard';
import AdminDashboardPage from './pages/AdminDashboard';
// import ProfilePage from './components/ProfilePage';

// Security hooks
import useFocusBlur from './hooks/useFocusBlur';
import useBlockClipboardAndSelection from './hooks/useBlockClipboardAndSelection';
import useBlockRightClick from './hooks/useBlockRightClick';

function AppContent() {
  const { user, loading, isAdmin } = useAuth();

  // Routing state
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [adminTab, setAdminTab] = useState('overview');

  // Apply security hooks globally
  useFocusBlur('body', 6);
  useBlockClipboardAndSelection();
  useBlockRightClick();

  // Auto-navigate after login
  useEffect(() => {
    if (user && currentPage === 'login') {
      setCurrentPage('home');
    }
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading DEV-Portal...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // AUTH PAGES (Not logged in)
  // ============================================
  if (!user) {
    if (currentPage === 'forget') {
      return (
        <ForgetPasswordPage
          onNavigateToLogin={() => setCurrentPage('login')}
        />
      );
    }

    return (
      <LoginPage
        onNavigateToForget={() => setCurrentPage('forget')}
        onLoginSuccess={() => setCurrentPage('home')}
      />
    );
  }

  // ADMIN DASHBOARD (if admin)
  // -------------------------------------------------
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
            {/* Admin Tabs */}
            <div className="flex space-x-2 border-b">
              <button
                onClick={() => setAdminTab('overview')}
                className={`px-4 py-2 font-medium border-b-2 transition ${adminTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              >
                Analytics
              </button>
              <button
                onClick={() => setAdminTab('cms')}
                className={`px-4 py-2 font-medium border-b-2 transition ${adminTab === 'cms' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              >
                Content Management
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {adminTab === 'overview' && <AdminDashboard />}
          {adminTab === 'cms' && <AdminDashboardPage />}
        </div>
      </div>
    );
  }


  // ============================================
  // NAVIGATION HANDLERS
  // ============================================
  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== 'course-detail' && page !== 'lesson') {
      setSelectedCourse(null);
      setSelectedLesson(null);
    }
  };

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
    setCurrentPage('course-detail');
  };

  const handleSelectLesson = (courseId, lessonId) => {
    setSelectedCourse(courseId);
    setSelectedLesson(lessonId);
    setCurrentPage('lesson');
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setSelectedLesson(null);
    setCurrentPage('courses');
  };

  const handleBackToCourseDetail = () => {
    setSelectedLesson(null);
    setCurrentPage('course-detail');
  };

  // ============================================
  // STUDENT PAGE ROUTING
  // ============================================
  switch (currentPage) {
    case 'home':
    case 'dashboard':
      return <Dashboard onNavigate={handleNavigate} />;

    case 'courses':
      return (
        <CoursesPage
          onSelectCourse={handleSelectCourse}
          onNavigate={handleNavigate}
        />
      );

    case 'course-detail':
      return (
        <CourseDetailPage
          courseId={selectedCourse}
          onSelectLesson={handleSelectLesson}
          onBack={handleBackToCourses}
          onNavigate={handleNavigate}
        />
      );

    case 'lesson':
      return (
        <LessonViewer
          courseId={selectedCourse}
          lessonId={selectedLesson}
          onBack={handleBackToCourseDetail}
          onNavigate={handleNavigate}
        />
      );

    case 'profile':
      return <ProfilePage onNavigate={handleNavigate} />;

    default:
      return <Dashboard onNavigate={handleNavigate} />;
  }
}

// ============================================
// MAIN APP WITH AUTH PROVIDER
// ============================================
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
