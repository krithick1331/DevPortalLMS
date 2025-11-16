const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

router.get('/', (req, res) => {
    res.json({ message: 'Course routes' });
});

module.exports = router;