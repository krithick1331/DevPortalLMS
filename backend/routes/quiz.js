const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { verifyHilt } = require('./hilt');

// Submit quiz attempt
router.post('/submit', verifyHilt, async (req, res) => {
    try {
        const { lessonId, courseId, answers, totalQuestions } = req.body;
        const userId = req.user._id; // Assumes auth middleware sets req.user

        if (!lessonId || !courseId || !answers) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find or create progress record
        let progress = await Progress.findOne({ userId, lessonId });
        if (!progress) {
            progress = new Progress({ userId, lessonId, courseId, experimentResults: new Map() });
        }

        // Calculate score
        const correctAnswers = answers.filter(a => a.correct).length;
        const score = Math.round((correctAnswers / totalQuestions) * 100);

        // Add attempt
        const attemptNumber = progress.quizAttempts.length + 1;
        progress.quizAttempts.push({
            attemptNumber,
            score,
            answers,
            timestamp: new Date()
        });

        // Check if passed (100% required)
        progress.checkQuizPassed();

        await progress.save();

        res.json({
            success: true,
            score,
            passed: progress.quizPassed,
            correctAnswers,
            totalQuestions,
            attemptNumber,
            canRetry: !progress.quizPassed,
            message: progress.quizPassed
                ? '🎉 Perfect score! Experiments unlocked.'
                : '❌ You need 100% to proceed. Review and retry.'
        });

    } catch (error) {
        console.error('Quiz submit error:', error);
        res.status(500).json({ error: 'Failed to submit quiz' });
    }
});

// Get quiz attempts history
router.get('/history/:lessonId', verifyHilt, async (req, res) => {
    try {
        const { lessonId } = req.params;
        const userId = req.user._id;

        const progress = await Progress.findOne({ userId, lessonId });
        if (!progress) {
            return res.json({ attempts: [], quizPassed: false });
        }

        res.json({
            attempts: progress.quizAttempts,
            quizPassed: progress.quizPassed,
            latestScore: progress.quizAttempts.length > 0
                ? progress.quizAttempts[progress.quizAttempts.length - 1].score
                : 0
        });

    } catch (error) {
        console.error('Quiz history error:', error);
        res.status(500).json({ error: 'Failed to fetch quiz history' });
    }
});

module.exports = router;