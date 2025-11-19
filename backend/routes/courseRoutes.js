// backend/routes/courses.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Progress = require('../models/Progress');

/**
 * GET /api/courses/:courseId/access
 * Check if user can access a course
 */
router.get('/:courseId/access', protect, async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        const progress = await Progress.findOne({ userId });

        if (!progress) {
            return res.json({
                success: true,
                canAccess: courseId === 'ites', // Only ITES accessible by default
                reason: courseId === 'ites' ? 'Foundation course' : 'Complete prerequisites first'
            });
        }

        const courseDefinitions = {
            ites: { lessons: 12, prereq: null },
            wp: { lessons: 13, prereq: 'ites' },
            ws: { lessons: 10, prereq: 'wp' }
        };

        const course = courseDefinitions[courseId];
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        // ITES always accessible
        if (courseId === 'ites') {
            return res.json({ success: true, canAccess: true, reason: 'Foundation course' });
        }

        // Check prerequisite completion
        const prereqComplete = checkPrerequisiteComplete(course.prereq, progress.completedLessons);

        res.json({
            success: true,
            canAccess: prereqComplete,
            reason: prereqComplete ? 'Unlocked' : `Complete ${course.prereq.toUpperCase()} course first`
        });

    } catch (error) {
        console.error('Course access check error:', error);
        res.status(500).json({ success: false, message: 'Failed to check course access' });
    }
});

/**
 * Helper function to check if prerequisite course is complete
 */
function checkPrerequisiteComplete(prereqId, completedLessons) {
    const courseLessons = {
        ites: [
            'ites-html-list', 'ites-html-table', 'ites-html-form', 'ites-html-nested-list',
            'ites-html-style', 'ites-html-image-table', 'ites-html-weather-table',
            'ites-html-seminar-schedule', 'ites-css-navbar', 'ites-css-login',
            'ites-css-signup', 'ites-html-css-simple-webpage'
        ],
        wp: [
            'wp-form-validation', 'wp-internal-js', 'wp-external-js', 'wp-positivity-js',
            'wp-leap-year-js', 'wp-calculator-switch', 'wp-js-events', 'wp-bootstrap-grid',
            'wp-bootstrap-offset', 'wp-bootstrap-table', 'wp-factorial-php',
            'wp-weekdays-switch-php', 'wp-multiplication-table-php'
        ]
    };

    const requiredLessons = courseLessons[prereqId] || [];
    return requiredLessons.every(lessonId => completedLessons.includes(lessonId));
}

module.exports = router;
