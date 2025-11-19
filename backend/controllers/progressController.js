// backend/controllers/progressController.js

const Progress = require('../models/Progress');
const Course = require('../models/Course'); // If you have course model
const Lesson = require('../models/Lesson'); // If you have lesson model

/**
 * Get user progress with course unlock status
 */
exports.getUserProgress = async (req, res) => {
    try {
        const userId = req.user.id;

        let progress = await Progress.findOne({ userId });

        if (!progress) {
            // Create new progress record if doesn't exist
            progress = await Progress.create({
                userId,
                completedLessons: [],
                courseProgress: {
                    ites: { unlocked: true, completedLessons: [] },
                    wp: { unlocked: false, completedLessons: [] },
                    ws: { unlocked: false, completedLessons: [] }
                }
            });
        }

        // Calculate course unlock status
        const courseStatus = calculateCourseUnlocks(progress.completedLessons);

        res.json({
            success: true,
            completedLessons: progress.completedLessons || [],
            courseStatus,
            recentSubmissions: progress.recentSubmissions || [],
            lastActivity: progress.updatedAt
        });
    } catch (error) {
        console.error('Get progress error:', error);
        res.status(500).json({ success: false, message: 'Failed to load progress' });
    }
};

/**
 * Update progress after lesson completion
 */
exports.updateProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { lessonId, courseId, passed } = req.body;

        let progress = await Progress.findOne({ userId });

        if (!progress) {
            progress = new Progress({
                userId,
                completedLessons: [],
                recentSubmissions: []
            });
        }

        // Add to completed lessons if passed and not already completed
        if (passed && !progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
        }

        // Add to recent submissions
        progress.recentSubmissions.unshift({
            lessonId,
            courseId,
            passed,
            timestamp: new Date()
        });

        // Keep only last 20 submissions
        progress.recentSubmissions = progress.recentSubmissions.slice(0, 20);

        // Check if any courses should be unlocked
        const courseStatus = calculateCourseUnlocks(progress.completedLessons);

        await progress.save();

        res.json({
            success: true,
            completedLessons: progress.completedLessons,
            courseStatus,
            message: passed ? 'Progress updated successfully' : 'Keep trying!'
        });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ success: false, message: 'Failed to update progress' });
    }
};

/**
 * Helper: Calculate which courses should be unlocked
 */
function calculateCourseUnlocks(completedLessons) {
    const courseDefinitions = {
        ites: {
            lessons: [
                'ites-html-list', 'ites-html-table', 'ites-html-form', 'ites-html-nested-list',
                'ites-html-style', 'ites-html-image-table', 'ites-html-weather-table',
                'ites-html-seminar-schedule', 'ites-css-navbar', 'ites-css-login',
                'ites-css-signup', 'ites-html-css-simple-webpage'
            ],
            unlocked: true // Always unlocked
        },
        wp: {
            lessons: [
                'wp-form-validation', 'wp-internal-js', 'wp-external-js', 'wp-positivity-js',
                'wp-leap-year-js', 'wp-calculator-switch', 'wp-js-events', 'wp-bootstrap-grid',
                'wp-bootstrap-offset', 'wp-bootstrap-table', 'wp-factorial-php',
                'wp-weekdays-switch-php', 'wp-multiplication-table-php'
            ],
            prerequisite: 'ites'
        },
        ws: {
            lessons: [
                'ws-form-validation', 'ws-login-auth', 'ws-todo-list', 'ws-quiz',
                'ws-isbn-check', 'ws-matching-card-game', 'ws-image-upload',
                'ws-secret-message', 'ws-budget-app', 'ws-calculator'
            ],
            prerequisite: 'wp'
        }
    };

    const status = {};

    // ITES always unlocked
    status.ites = { unlocked: true };

    // Check WP unlock (requires all ITES lessons)
    const itesComplete = courseDefinitions.ites.lessons.every(id =>
        completedLessons.includes(id)
    );
    status.wp = { unlocked: itesComplete };

    // Check WS unlock (requires all WP lessons)
    const wpComplete = courseDefinitions.wp.lessons.every(id =>
        completedLessons.includes(id)
    );
    status.ws = { unlocked: itesComplete && wpComplete };

    return status;
}

module.exports = exports;
