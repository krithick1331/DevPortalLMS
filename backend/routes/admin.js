const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const Submission = require('../models/Submission');
const { authenticateToken } = require('./auth');

// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

// Get all students
router.get('/students', authenticateToken, isAdmin, async (req, res) => {
    try {
        const students = await User.find({ role: 'student' })
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({ students });
    } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

// Get student details with progress
router.get('/students/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const student = await User.findById(req.params.id).select('-password');
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const progress = await Progress.find({ userId: req.params.id });
        const submissions = await Submission.find({ userId: req.params.id })
            .sort({ submittedAt: -1 })
            .limit(20);

        res.json({ student, progress, submissions });
    } catch (error) {
        console.error('Get student details error:', error);
        res.status(500).json({ error: 'Failed to fetch student details' });
    }
});

// Toggle student active status
router.put('/students/:id/toggle', authenticateToken, isAdmin, async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        student.active = !student.active;
        await student.save();

        res.json({
            success: true,
            message: `Student ${student.active ? 'activated' : 'deactivated'}`,
            active: student.active
        });
    } catch (error) {
        console.error('Toggle student error:', error);
        res.status(500).json({ error: 'Failed to toggle student status' });
    }
});

// Reset student password
router.put('/students/:id/reset-password', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { newPassword } = req.body;
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        student.password = newPassword;
        await student.save();

        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

// Delete student
router.delete('/students/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Delete all related data
        await Progress.deleteMany({ userId: req.params.id });
        await Submission.deleteMany({ userId: req.params.id });
        await student.deleteOne();

        res.json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Delete student error:', error);
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

// Manually unlock next lesson for a student
router.post('/students/:id/unlock-lesson', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { lessonId } = req.body;

        const progress = await Progress.findOne({
            userId: req.params.id,
            lessonId
        });

        if (!progress) {
            return res.status(404).json({ error: 'Progress not found' });
        }

        progress.nextLessonUnlocked = true;
        progress.completed = true;
        await progress.save();

        res.json({ success: true, message: 'Next lesson unlocked' });
    } catch (error) {
        console.error('Unlock lesson error:', error);
        res.status(500).json({ error: 'Failed to unlock lesson' });
    }
});

// Get analytics
router.get('/analytics', authenticateToken, isAdmin, async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const activeStudents = await User.countDocuments({ role: 'student', active: true });
        const totalSubmissions = await Submission.countDocuments();
        const todaySubmissions = await Submission.countDocuments({
            submittedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        });

        res.json({
            totalStudents,
            activeStudents,
            totalSubmissions,
            todaySubmissions
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

module.exports = router;