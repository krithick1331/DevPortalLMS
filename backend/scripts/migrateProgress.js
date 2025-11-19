// backend/scripts/migrateProgress.js
// Run this once to update existing user progress

const mongoose = require('mongoose');
const Progress = require('../models/Progress');
require('dotenv').config();

async function migrateProgress() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update all progress documents
        const result = await Progress.updateMany(
            {},
            {
                $set: {
                    'courseProgress.ites.unlocked': true,
                    'courseProgress.wp.unlocked': false,
                    'courseProgress.ws.unlocked': false
                }
            }
        );

        console.log(`✅ Updated ${result.modifiedCount} progress documents`);
        console.log('Migration complete!');

        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrateProgress();
