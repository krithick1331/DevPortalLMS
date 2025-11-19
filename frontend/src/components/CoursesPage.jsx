// frontend/src/components/CoursesPage.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import courses from '../data/courses';
import { isCourseUnlocked, getCourseStatus } from '../utils/courseLock';

export default function CoursesPage() {
    const [userProgress, setUserProgress] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProgress();
    }, []);

    const fetchUserProgress = async () => {
        try {
            const res = await fetch('/api/progress', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            setUserProgress(data);
        } catch (error) {
            console.error('Failed to load progress:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading courses...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">Available Courses</h1>
                <p className="text-gray-600 mb-8">Complete courses sequentially to unlock advanced content</p>

                <div className="grid gap-6 md:grid-cols-1">
                    {courses.map((course) => {
                        const status = getCourseStatus(course.id, userProgress);
                        const completedCount = (userProgress.completedLessons || []).filter(id =>
                            course.lessons.some(lesson => lesson.id === id)
                        ).length;
                        const completionPercentage = (completedCount / course.lessonsCount) * 100;

                        return (
                            <div
                                key={course.id}
                                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${course.color} ${!status.unlocked ? 'opacity-60' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-4xl">{course.icon}</span>
                                            <div>
                                                <h2 className="text-2xl font-bold">{course.title}</h2>
                                                <p className="text-sm text-gray-500">{course.category}</p>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 mb-4">{course.description}</p>

                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Lessons</p>
                                                <p className="font-semibold">{course.lessonsCount}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Duration</p>
                                                <p className="font-semibold">{course.duration}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Difficulty</p>
                                                <p className="font-semibold">{course.difficulty}</p>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progress</span>
                                                <span>{completedCount}/{course.lessonsCount} lessons</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${course.color.replace('bg-', 'bg-opacity-100 bg-')}`}
                                                    style={{ width: `${completionPercentage}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Status Display */}
                                        <div className="flex items-center gap-3">
                                            {status.unlocked ? (
                                                <>
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                                        ✅ Unlocked
                                                    </span>
                                                    <Link
                                                        to={`/course/${course.id}`}
                                                        className={`px-6 py-2 ${course.color} text-white rounded-lg font-semibold hover:opacity-90 transition`}
                                                    >
                                                        {completionPercentage > 0 ? 'Continue Course' : 'Start Course'}
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2">
                                                        🔒 Locked
                                                    </span>
                                                    <p className="text-sm text-gray-600 italic">{status.reason}</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Prerequisites Display */}
                                {course.prerequisites && course.prerequisites.length > 0 && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-gray-600">
                                            <strong>Prerequisites:</strong>{' '}
                                            {course.prerequisites.map(prereqId => {
                                                const prereqCourse = courses.find(c => c.id === prereqId);
                                                return prereqCourse?.title || prereqId;
                                            }).join(', ')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

