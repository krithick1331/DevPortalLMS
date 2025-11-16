const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PracticeLesson = require('../models/PracticeLesson');

router.get('/', (req, res) => {
    res.json({ message: 'Practice lesson routes' });
});

module.exports = router;