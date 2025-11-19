// frontend/src/components/Dashboard.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses';
import { getCourseStatus } from '../utils/courseLock';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');

            // Fetch user info
            const userRes = await fetch('http://localhost:3000/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser(userData.user);
            }

            // Fetch progress (optional, don't fail if not available)
            try {
                const progressRes = await fetch('http://localhost:3000/api/progress', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (progressRes.ok) {
                    const progressData = await progressRes.json();
                    setProgress(progressData);
                }
            } catch (err) {
                console.warn('Progress endpoint not available:', err);
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading dashboard...</div>
            </div>
        );
    }

    const totalLessons = courses.reduce((sum, course) => sum + course.lessonsCount, 0);
    const completedLessons = (progress.completedLessons || []).length;
    const overallProgress = ((completedLessons / totalLessons) * 100).toFixed(1);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-600">Continue your web development journey</p>
                </div>

                {/* Overall Progress Card - NO POINTS */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                        <h3 className="text-sm font-semibold text-blue-800 mb-2">Overall Progress</h3>
                        <p className="text-3xl font-bold text-blue-600">{overallProgress}%</p>
                        <p className="text-sm text-gray-600 mt-1">
                            {completedLessons} of {totalLessons} lessons completed
                        </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6">
                        <h3 className="text-sm font-semibold text-green-800 mb-2">Courses Unlocked</h3>
                        <p className="text-3xl font-bold text-green-600">
                            {courses.filter(c => getCourseStatus(c.id, progress).unlocked).length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">out of {courses.length} courses</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-6">
                        <h3 className="text-sm font-semibold text-purple-800 mb-2">Active Course</h3>
                        <p className="text-xl font-bold text-purple-600">
                            {courses.find(c => {
                                const status = getCourseStatus(c.id, progress);
                                const hasProgress = (progress.completedLessons || []).some(id =>
                                    c.lessons.some(lesson => lesson.id === id)
                                );
                                return status.unlocked && hasProgress &&
                                    (progress.completedLessons || []).filter(id => c.lessons.some(l => l.id === id)).length < c.lessonsCount;
                            })?.title || 'None'}
                        </p>
                    </div>
                </div>

                {/* Course Progress Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Course Progress</h2>

                    <div className="space-y-4">
                        {courses.map(course => {
                            const status = getCourseStatus(course.id, progress);
                            const completedCount = (progress.completedLessons || []).filter(id =>
                                course.lessons.some(lesson => lesson.id === id)
                            ).length;
                            const percentage = (completedCount / course.lessonsCount) * 100;

                            return (
                                <div key={course.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{course.icon}</span>
                                            <div>
                                                <h3 className="font-bold">{course.title}</h3>
                                                <p className="text-sm text-gray-600">{course.difficulty}</p>
                                            </div>
                                        </div>

                                        {status.unlocked ? (
                                            <Link
                                                to={`/course/${course.id}`}
                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                            >
                                                {percentage > 0 && percentage < 100 ? 'Continue' : percentage === 100 ? 'Review' : 'Start'}
                                            </Link>
                                        ) : (
                                            <span className="px-4 py-2 bg-gray-200 text-gray-600 rounded flex items-center gap-2">
                                                🔒 Locked
                                            </span>
                                        )}
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">
                                                {status.unlocked ? `${completedCount}/${course.lessonsCount} lessons` : status.reason}
                                            </span>
                                            {status.unlocked && <span className="font-semibold">{percentage.toFixed(0)}%</span>}
                                        </div>
                                        {status.unlocked && (
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${course.color}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Course Requirements */}
                                    {!status.unlocked && course.prerequisites && (
                                        <div className="mt-2 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
                                            ⚠️ Complete {courses.find(c => c.id === course.prerequisites[0])?.title} to unlock this course
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity - NO POINTS */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>

                    {progress.recentSubmissions && progress.recentSubmissions.length > 0 ? (
                        <div className="space-y-3">
                            {progress.recentSubmissions.slice(0, 5).map((submission, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                    <div>
                                        <p className="font-medium">{submission.lessonTitle}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(submission.timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-sm font-semibold ${submission.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {submission.passed ? '✅ Passed' : '❌ Failed'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent activity. Start learning to see your progress here!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
