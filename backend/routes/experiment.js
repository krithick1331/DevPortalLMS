const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { verifyHilt } = require('./hilt');

// Submit experiment code for validation
router.post('/submit', verifyHilt, async (req, res) => {
    try {
        const { lessonId, courseId, experimentId, code, testResults, totalExperiments } = req.body;
        const userId = req.user._id;

        if (!lessonId || !experimentId || !code) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find progress
        let progress = await Progress.findOne({ userId, lessonId });
        if (!progress) {
            return res.status(400).json({ error: 'Complete quiz first' });
        }

        // Check if quiz passed
        if (!progress.quizPassed) {
            return res.status(403).json({ error: 'Quiz must be passed with 100% before experiments' });
        }

        // Initialize experimentResults if needed
        if (!progress.experimentResults) {
            progress.experimentResults = new Map();
        }

        // Get current experiment result or create new
        const currentResult = progress.experimentResults.get(experimentId) || {
            passed: false,
            attempts: 0,
            lastCode: '',
            testResults: [],
            timestamp: new Date()
        };

        // Update attempt count
        currentResult.attempts += 1;
        currentResult.lastCode = code;
        currentResult.testResults = testResults;
        currentResult.timestamp = new Date();

        // Check if all tests passed
        const allTestsPassed = testResults.every(t => t.passed);
        currentResult.passed = allTestsPassed;

        // Save to progress
        progress.experimentResults.set(experimentId, currentResult);

        // Check if all experiments completed
        progress.checkAllExperimentsPassed(totalExperiments);
        progress.checkCompleted(totalExperiments);

        await progress.save();

        res.json({
            success: true,
            passed: currentResult.passed,
            testResults,
            attemptNumber: currentResult.attempts,
            allExperimentsCompleted: progress.allExperimentsPassed,
            nextLessonUnlocked: progress.nextLessonUnlocked,
            message: currentResult.passed
                ? '✅ Experiment passed!'
                : '❌ Some tests failed. Review and try again.'
        });

    } catch (error) {
        console.error('Experiment submit error:', error);
        res.status(500).json({ error: 'Failed to submit experiment' });
    }
});

// Get experiment progress for a lesson
router.get('/progress/:lessonId', verifyHilt, async (req, res) => {
    try {
        const { lessonId } = req.params;
        const userId = req.user._id;

        const progress = await Progress.findOne({ userId, lessonId });
        if (!progress) {
            return res.json({
                quizPassed: false,
                experiments: {},
                allExperimentsPassed: false
            });
        }

        // Convert Map to object for JSON response
        const experimentsObj = {};
        if (progress.experimentResults) {
            progress.experimentResults.forEach((value, key) => {
                experimentsObj[key] = value;
            });
        }

        res.json({
            quizPassed: progress.quizPassed,
            experiments: experimentsObj,
            allExperimentsPassed: progress.allExperimentsPassed,
            nextLessonUnlocked: progress.nextLessonUnlocked,
            completed: progress.completed
        });

    } catch (error) {
        console.error('Experiment progress error:', error);
        res.status(500).json({ error: 'Failed to fetch experiment progress' });
    }
});

module.exports = router;