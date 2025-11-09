const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Memory store for demo (use Redis in prod)
const tokens = new Map();

router.post('/issue', (req, res) => {
    // You can also bind to userId/session here
    const token = crypto.randomBytes(24).toString('base64url');
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    tokens.set(token, expiresAt);
    res.json({ token, expiresAt });
});

function verifyHilt(req, res, next) {
    const token = req.headers['x-hilt-token'] || req.query.hilt;
    if (!token) return res.status(401).json({ error: 'Missing HILT' });
    const exp = tokens.get(token);
    if (!exp || exp < Date.now()) return res.status(401).json({ error: 'Expired/invalid HILT' });
    return next();
}

module.exports = { router, verifyHilt };
