import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { lessonsAPI } from '../services/api';
import LessonEditor from '../components/admin/LessonEditor';
import LessonCard from '../components/admin/LessonCard';

export default function AdminDashboardPage() {
    const { user, token } = useAuth();
    const [lessons, setLessons] = useState([]);
    const [editingLesson, setEditingLesson] = useState(null);
    const [adminToken, setAdminToken] = useState(import.meta.env.VITE_ADMIN_TOKEN || 'your-secret-token');

    useEffect(() => {
        loadLessons();
    }, []);

    const loadLessons = async () => {
        try {
            const data = await lessonsAPI.getAll();
            setLessons(data);
        } catch (err) {
            console.error('Failed to load lessons', err);
            setLessons([]);
        }
    };

    const handleSaveLesson = async (lesson) => {
        try {
            if (lesson.id && lessons.some(l => l.id === lesson.id)) {
                await lessonsAPI.update(lesson.id, lesson, adminToken);
            } else {
                await lessonsAPI.create(lesson, adminToken);
            }
            setEditingLesson(null);
            await loadLessons();
        } catch (err) {
            console.error('Save failed', err);
            alert('Failed to save lesson');
        }
    };

    const handleDeleteLesson = async (id) => {
        if (!confirm('Delete this lesson?')) return;
        try {
            await lessonsAPI.delete(id, adminToken);
            await loadLessons();
        } catch (err) {
            console.error('Delete failed', err);
            alert('Failed to delete lesson');
        }
    };

    if (!user) return <div className="p-6">Not authenticated</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Content Management</h1>

            <div className="mb-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setEditingLesson({ id: '', courseId: '', title: '', instructions: '', starterCode: {} })}>+ Add New Lesson</button>
            </div>

            <div className="grid gap-4">
                {lessons.map(lesson => (
                    <LessonCard key={lesson.id} lesson={lesson} onEdit={() => setEditingLesson(lesson)} onDelete={() => handleDeleteLesson(lesson.id)} />
                ))}
            </div>

            {editingLesson && (
                <LessonEditor lesson={editingLesson} onSave={handleSaveLesson} onClose={() => setEditingLesson(null)} />
            )}
        </div>
    );
}
