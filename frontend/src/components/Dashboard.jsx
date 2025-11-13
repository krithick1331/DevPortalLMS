import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Layout from './Layout';
import { courses, mockEvents } from '../data/courses'; // CHANGED from mockData

export default function Dashboard({ onNavigate }) {
    const { user } = useAuth();
    const [courseStartIndex, setCourseStartIndex] = useState(0);

    const nextCourses = () => {
        if (courseStartIndex + 3 < courses.length) {
            setCourseStartIndex(courseStartIndex + 1);
        }
    };

    const prevCourses = () => {
        if (courseStartIndex > 0) {
            setCourseStartIndex(courseStartIndex - 1);
        }
    };

    const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const timeStr = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        if (date.toDateString() === today.toDateString()) {
            return `Today, ${timeStr}`;
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${timeStr}`;
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }
    };

    return (
        <Layout currentPage="dashboard" onNavigate={onNavigate}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Hi, {user?.firstName}!
                    </h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Recently accessed courses</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={prevCourses}
                                disabled={courseStartIndex === 0}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={nextCourses}
                                disabled={courseStartIndex + 3 >= courses.length}
                                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {courses.slice(courseStartIndex, courseStartIndex + 3).map(course => (
                            <button
                                key={course.id}
                                onClick={() => onNavigate('courses')}
                                className="block group text-left"
                            >
                                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                    <div
                                        className="h-40 flex items-center justify-center"
                                        style={{ backgroundColor: course.backgroundColor }}
                                    >
                                        <div className="text-center text-white opacity-20 text-6xl">
                                            {course.backgroundColor === '#8b5cf6' ? '💻' : course.backgroundColor === '#10b981' ? '🚀' : '⚡'}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-700 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{course.category}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming events</h2>
                    <div className="space-y-4">
                        {mockEvents.map(event => (
                            <div
                                key={event.id}
                                className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                                    <p className="text-sm text-gray-600">{formatEventDate(event.date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
