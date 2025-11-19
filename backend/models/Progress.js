// backend/models/Progress.js

const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    completedLessons: [{
        type: String // Lesson IDs
    }],
    courseProgress: {
        ites: {
            unlocked: { type: Boolean, default: true },
            completedLessons: [String],
            completedAt: Date
        },
        wp: {
            unlocked: { type: Boolean, default: false },
            completedLessons: [String],
            completedAt: Date
        },
        ws: {
            unlocked: { type: Boolean, default: false },
            completedLessons: [String],
            completedAt: Date
        }
    },
    recentSubmissions: [{
        lessonId: String,
        courseId: String,
        passed: Boolean,
        timestamp: Date,
        attempts: Number
    }],
    lastActivity: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update lastActivity on save
progressSchema.pre('save', function (next) {
    this.lastActivity = Date.now();
    next();
});

module.exports = mongoose.model('Progress', progressSchema);
