import { useState } from 'react';

export default function LessonEditor({ lesson, onSave, onClose }) {
    const [formData, setFormData] = useState(lesson || {});

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{formData.id ? 'Edit Lesson' : 'Create New Lesson'}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-2">Lesson ID</label>
                        <input type="text" value={formData.id || ''} onChange={(e) => setFormData({ ...formData, id: e.target.value })} className="w-full border rounded px-3 py-2" required />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Course</label>
                        <select value={formData.courseId || ''} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })} className="w-full border rounded px-3 py-2">
                            <option value="ites">ITES</option>
                            <option value="wp">Web Programming</option>
                            <option value="ws">Web Scripting</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Title</label>
                        <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border rounded px-3 py-2" required />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Instructions</label>
                        <textarea value={formData.instructions || ''} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} className="w-full border rounded px-3 py-2 h-32" required />
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-bold mb-3">Starter Code</h3>

                        <div className="space-y-3">
                            <div>
                                <label className="block font-semibold mb-2">HTML</label>
                                <textarea value={formData.starterCode?.html || ''} onChange={(e) => setFormData({ ...formData, starterCode: { ...formData.starterCode, html: e.target.value } })} className="w-full border rounded px-3 py-2 font-mono text-sm h-24" />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">CSS</label>
                                <textarea value={formData.starterCode?.css || ''} onChange={(e) => setFormData({ ...formData, starterCode: { ...formData.starterCode, css: e.target.value } })} className="w-full border rounded px-3 py-2 font-mono text-sm h-24" />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">JavaScript</label>
                                <textarea value={formData.starterCode?.js || ''} onChange={(e) => setFormData({ ...formData, starterCode: { ...formData.starterCode, js: e.target.value } })} className="w-full border rounded px-3 py-2 font-mono text-sm h-24" />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">PHP</label>
                                <textarea value={formData.starterCode?.php || ''} onChange={(e) => setFormData({ ...formData, starterCode: { ...formData.starterCode, php: e.target.value } })} className="w-full border rounded px-3 py-2 font-mono text-sm h-24" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Hints (comma-separated)</label>
                        <textarea value={(formData.hints || []).join(', ')} onChange={(e) => setFormData({ ...formData, hints: e.target.value.split(',').map(h => h.trim()) })} className="w-full border rounded px-3 py-2 h-20" />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Solution Code (JSON format)</label>
                        <textarea value={JSON.stringify(formData.solution || {}, null, 2)} onChange={(e) => { try { setFormData({ ...formData, solution: JSON.parse(e.target.value) }); } catch (err) { } }} className="w-full border rounded px-3 py-2 font-mono text-sm h-32" />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save Lesson</button>
                        <button type="button" onClick={onClose} className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
