// backend/index.js - ADD THESE LINES

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devportal')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin');
const courseRoutes = require('./routes/courseRoutes');
const experimentRoutes = require('./routes/experiment');
const practiceLessonRoutes = require('./routes/practiceLessonRoutes');
const progressRoutes = require('./routes/practiceLesson');
const leaderboardRoutes = require('./routes/leaderboard');
const hiltRoutes = require('./routes/hilt');

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);  // THIS IS THE KEY LINE!
app.use('/api/courses', courseRoutes);
app.use('/api/experiments', experimentRoutes);
app.use('/api/practice', practiceLessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/hilt', hiltRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
