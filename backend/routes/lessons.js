const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Middleware for admin authentication
const adminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token === process.env.ADMIN_TOKEN) {
        return next();
    }
    return res.status(401).json({ error: 'Unauthorized' });
};

// Helper to get data file path
const DATA_PATH = path.join(__dirname, '../data/practiceLessons.json');

// GET all lessons
router.get('/lessons', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf8');
        return res.json(JSON.parse(data));
    } catch (error) {
        // If file missing, return empty array
        if (error.code === 'ENOENT') {
            return res.json([]);
        }
        console.error('Failed to load lessons', error);
        return res.status(500).json({ error: 'Failed to load lessons' });
    }
});

// POST create new lesson (admin only)
router.post('/lessons', adminAuth, async (req, res) => {
    try {
        const newLesson = req.body;
        const data = await fs.readFile(DATA_PATH, 'utf8').catch(() => '[]');
        const lessons = JSON.parse(data);

        lessons.push(newLesson);

        await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
        await fs.writeFile(DATA_PATH, JSON.stringify(lessons, null, 2), 'utf8');

        return res.json({ success: true, lesson: newLesson });
    } catch (error) {
        console.error('Failed to create lesson', error);
        return res.status(500).json({ error: 'Failed to create lesson' });
    }
});

// PUT update lesson (admin only)
router.put('/lessons/:id', adminAuth, async (req, res) => {
    try {
        const lessonId = req.params.id;
        const updatedLesson = req.body;

        const data = await fs.readFile(DATA_PATH, 'utf8').catch(() => '[]');
        let lessons = JSON.parse(data);

        const index = lessons.findIndex(l => l.id === lessonId);
        if (index !== -1) {
            lessons[index] = updatedLesson;
            await fs.writeFile(DATA_PATH, JSON.stringify(lessons, null, 2), 'utf8');
            return res.json({ success: true, lesson: updatedLesson });
        }

        return res.status(404).json({ error: 'Lesson not found' });
    } catch (error) {
        console.error('Failed to update lesson', error);
        return res.status(500).json({ error: 'Failed to update lesson' });
    }
});

// DELETE lesson (admin only)
router.delete('/lessons/:id', adminAuth, async (req, res) => {
    try {
        const lessonId = req.params.id;
        const data = await fs.readFile(DATA_PATH, 'utf8').catch(() => '[]');
        let lessons = JSON.parse(data);

        lessons = lessons.filter(l => l.id !== lessonId);

        await fs.writeFile(DATA_PATH, JSON.stringify(lessons, null, 2), 'utf8');

        return res.json({ success: true });
    } catch (error) {
        console.error('Failed to delete lesson', error);
        return res.status(500).json({ error: 'Failed to delete lesson' });
    }
});

module.exports = router;
