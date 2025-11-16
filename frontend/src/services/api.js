const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const lessonsAPI = {
    // Get all lessons
    getAll: async () => {
        const res = await fetch(`${API_URL}/lessons`);
        if (!res.ok) throw new Error('Failed to fetch lessons');
        return res.json();
    },

    // Create lesson (admin)
    create: async (lesson, token) => {
        const res = await fetch(`${API_URL}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(lesson)
        });
        if (!res.ok) throw new Error('Failed to create lesson');
        return res.json();
    },

    // Update lesson (admin)
    update: async (id, lesson, token) => {
        const res = await fetch(`${API_URL}/lessons/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(lesson)
        });
        if (!res.ok) throw new Error('Failed to update lesson');
        return res.json();
    },

    // Delete lesson (admin)
    delete: async (id, token) => {
        const res = await fetch(`${API_URL}/lessons/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Failed to delete lesson');
        return res.json();
    }
};
