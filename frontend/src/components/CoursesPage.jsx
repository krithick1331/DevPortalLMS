import { useState } from 'react';
import Layout from './Layout';
import { courses } from '../data/courses'; // CHANGED from mockData
import { Search, Filter } from 'lucide-react';

export default function CoursesPage({ onSelectCourse, onNavigate }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Training', 'Web Development'];

    const filteredCourses = courses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <Layout currentPage="courses" onNavigate={onNavigate}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">My Courses</h1>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Filter className="text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                        <button
                            key={course.id}
                            onClick={() => onSelectCourse(course.id)}
                            className="block group text-left"
                        >
                            <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                <div
                                    className="h-48 flex items-center justify-center relative"
                                    style={{ backgroundColor: course.backgroundColor }}
                                >
                                    <div className="text-center text-white opacity-20 text-8xl">
                                        {course.backgroundColor === '#8b5cf6' ? '💻' : course.backgroundColor === '#10b981' ? '🚀' : '⚡'}
                                    </div>

                                    {course.progress > 0 && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
                                            <div className="flex items-center justify-between text-white text-sm mb-1">
                                                <span>Progress</span>
                                                <span>{course.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="mb-2">
                                        <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                                            {course.category}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-green-700 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
