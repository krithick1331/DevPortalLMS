// frontend/src/components/CourseDetailPage.jsx

import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import courses from '../data/courses';
import { isCourseUnlocked, getCourseStatus } from '../utils/courseLock';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  const course = courses.find(c => c.id === courseId);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/progress', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setProgress(data);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!course) {
    return <Navigate to="/courses" />;
  }

  // Check if course is unlocked
  const status = getCourseStatus(courseId, progress);

  if (!status.unlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">Course Locked</h2>
          <p className="text-gray-600 mb-4">{status.reason}</p>
          <Link
            to="/courses"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const completedLessonIds = progress.completedLessons || [];
  const completedCount = completedLessonIds.filter(id =>
    course.lessons.some(lesson => lesson.id === id)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <Link to="/courses" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Courses
          </Link>

          <div className="flex items-start gap-4">
            <span className="text-5xl">{course.icon}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Lessons:</span>
                  <span className="font-semibold ml-2">{course.lessonsCount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-semibold ml-2">{course.duration}</span>
                </div>
                <div>
                  <span className="text-gray-500">Difficulty:</span>
                  <span className="font-semibold ml-2">{course.difficulty}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span>{completedCount}/{course.lessonsCount} completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${course.color}`}
                    style={{ width: `${(completedCount / course.lessonsCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Course Lessons</h2>

          <div className="space-y-3">
            {course.lessons.map((lesson, index) => {
              const isCompleted = completedLessonIds.includes(lesson.id);
              const isLocked = index > 0 && !completedLessonIds.includes(course.lessons[index - 1].id);

              return (
                <div
                  key={lesson.id}
                  className={`border rounded-lg p-4 flex items-center justify-between ${isLocked ? 'opacity-50 bg-gray-50' : 'hover:shadow-md transition'
                    }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <div className="flex gap-3 text-sm text-gray-600 mt-1">
                        <span className={`px-2 py-1 rounded ${lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isCompleted && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        ✅ Completed
                      </span>
                    )}

                    {isLocked ? (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed flex items-center gap-2"
                      >
                        🔒 Locked
                      </button>
                    ) : (
                      <Link
                        to={`/lesson/${lesson.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        {isCompleted ? 'Review' : 'Start'}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Completion Message */}
        {completedCount === course.lessonsCount && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mt-6 text-center">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Course Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Congratulations on completing {course.title}!
            </p>
            {course.unlocks && course.unlocks.length > 0 && (
              <p className="text-green-600">
                You have unlocked: <strong>{courses.find(c => c.id === course.unlocks)?.title}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

