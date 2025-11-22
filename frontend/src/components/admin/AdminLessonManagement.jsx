import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { courses as staticCourses } from '../../data/courses';
import { BookOpen, Plus, Edit, Trash2, Save, X, FileText } from 'lucide-react';

export default function AdminLessonManagement() {
    const { token } = useAuth();
    const [lessons, setLessons] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingLesson, setEditingLesson] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        courseId: '',
        content: '',
        order: 0,
        type: 'theory'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            let fetchedCourses = [];
            try {
                const coursesRes = await fetch('http://localhost:3000/api/courses');
                if (!coursesRes.ok) {
                    throw new Error(`Courses request failed with ${coursesRes.status}`);
                }
                const coursesData = await coursesRes.json();
                const normalized = Array.isArray(coursesData)
                    ? coursesData
                    : Array.isArray(coursesData?.courses)
                        ? coursesData.courses
                        : [];
                fetchedCourses = normalized.map(course => ({
                    _id: course._id || course.id,
                    title: course.title,
                    description: course.description || ''
                }));
            } catch (courseError) {
                console.warn('Falling back to static course list:', courseError.message);
                fetchedCourses = staticCourses.map(course => ({
                    _id: course.id,
                    title: course.title,
                    description: course.description
                }));
            }
            setCourses(fetchedCourses);

            const lessonsRes = await fetch('http://localhost:3000/api/lessons', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!lessonsRes.ok) {
                throw new Error(`Lessons request failed with ${lessonsRes.status}`);
            }
            const lessonsData = await lessonsRes.json();
            setLessons(Array.isArray(lessonsData) ? lessonsData : lessonsData?.lessons || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            alert('Failed to load lessons');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingLesson(null);
        setFormData({
            title: '',
            description: '',
            courseId: courses[0]?._id || '',
            content: '',
            order: lessons.length + 1,
            type: 'theory'
        });
    };

    const handleEdit = (lesson) => {
        setIsCreating(false);
        setEditingLesson(lesson._id);
        setFormData({
            title: lesson.title,
            description: lesson.description,
            courseId: lesson.courseId,
            content: lesson.content || '',
            order: lesson.order,
            type: lesson.type || 'theory'
        });
    };

    const handleSave = async () => {
        if (!formData.title || !formData.courseId) {
            alert('Title and Course are required');
            return;
        }

        try {
            const url = editingLesson
                ? `http://localhost:3000/api/admin/lessons/${editingLesson}`
                : 'http://localhost:3000/api/admin/lessons';

            const method = editingLesson ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert(`Lesson ${editingLesson ? 'updated' : 'created'} successfully`);
                setEditingLesson(null);
                setIsCreating(false);
                fetchData();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to save lesson');
            }
        } catch (error) {
            console.error('Failed to save lesson:', error);
            alert('Failed to save lesson');
        }
    };

    const handleDelete = async (lessonId) => {
        if (!confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) return;

        try {
            const res = await fetch(`http://localhost:3000/api/admin/lessons/${lessonId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                alert('Lesson deleted successfully');
                fetchData();
            } else {
                alert('Failed to delete lesson');
            }
        } catch (error) {
            console.error('Failed to delete lesson:', error);
            alert('Failed to delete lesson');
        }
    };

    const handleCancel = () => {
        setEditingLesson(null);
        setIsCreating(false);
    };

    const getCourseName = (courseId) => {
        const course = courses.find(c => c._id === courseId);
        return course?.title || 'Unknown Course';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading lessons...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Lesson Management</h1>
                    <p className="text-gray-600 mt-1">Create, edit, and manage course lessons</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus className="w-5 h-5" />
                    Create Lesson
                </button>
            </div>

            {/* Create/Edit Form */}
            {(isCreating || editingLesson) && (
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        {isCreating ? 'Create New Lesson' : 'Edit Lesson'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="e.g., Introduction to HTML"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                rows="3"
                                placeholder="Brief description of the lesson"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                                <select
                                    value={formData.courseId}
                                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                >
                                    {courses.map(course => (
                                        <option key={course._id} value={course._id}>{course.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    min="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                >
                                    <option value="theory">Theory</option>
                                    <option value="practice">Practice</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown/HTML)</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                                rows="10"
                                placeholder="Lesson content in markdown or HTML format..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                <Save className="w-4 h-4" />
                                Save Lesson
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lessons List */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                    <h3 className="font-semibold text-gray-900">All Lessons ({lessons.length})</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Course
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {lessons.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-500">No lessons found. Create your first lesson!</p>
                                    </td>
                                </tr>
                            ) : (
                                lessons.map(lesson => (
                                    <tr key={lesson._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                                                <div>
                                                    <p className="font-medium text-gray-900">{lesson.title}</p>
                                                    <p className="text-sm text-gray-500 line-clamp-1">{lesson.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {getCourseName(lesson.courseId)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${lesson.type === 'practice'
                                                ? 'bg-green-100 text-green-800'
                                                : lesson.type === 'video'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {lesson.type || 'theory'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{lesson.order}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(lesson)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Edit Lesson"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(lesson._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="Delete Lesson"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

