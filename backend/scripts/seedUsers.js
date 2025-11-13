require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const testUsers = [
    {
        firstName: 'John',
        lastName: 'Student',
        email: 'student@example.com',
        password: 'password123',
        role: 'student'
    },
    {
        firstName: 'Jane',
        lastName: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        firstName: 'Bob',
        lastName: 'Learner',
        email: 'bob.learner@example.com',
        password: 'testpass456',
        role: 'student'
    },
    {
        firstName: 'Alice',
        lastName: 'Developer',
        email: 'alice.dev@example.com',
        password: 'devpass789',
        role: 'student'
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing users
        const deletedCount = await User.deleteMany({});
        console.log(`🗑️  Deleted ${deletedCount.deletedCount} existing users`);

        // Create new users
        const createdUsers = await User.create(testUsers);
        console.log(`✅ Created ${createdUsers.length} test users:\n`);

        createdUsers.forEach((user, index) => {
            console.log(`${index + 1}. Email: ${user.email}`);
            console.log(`   Name: ${user.firstName} ${user.lastName}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   Password: ${testUsers[index].password}\n`);
        });

        console.log('📝 Test Credentials Ready:');
        console.log('────────────────────────────────────────');
        console.log('Student Login:');
        console.log('  Email: student@example.com');
        console.log('  Password: password123');
        console.log('────────────────────────────────────────');
        console.log('Admin Login:');
        console.log('  Email: admin@example.com');
        console.log('  Password: admin123');
        console.log('────────────────────────────────────────');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();