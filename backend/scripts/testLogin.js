require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Test Login Credentials Against MongoDB
 * This script verifies that test users can authenticate
 */

const testCases = [
    {
        email: 'student@example.com',
        password: 'password123',
        expectedRole: 'student',
        name: 'Student Login'
    },
    {
        email: 'admin@example.com',
        password: 'admin123',
        expectedRole: 'admin',
        name: 'Admin Login'
    },
    {
        email: 'bob.learner@example.com',
        password: 'testpass456',
        expectedRole: 'student',
        name: 'Bob Learner Login'
    },
    {
        email: 'invalid@example.com',
        password: 'wrongpassword',
        expectedRole: null,
        name: 'Invalid Credentials (should fail)'
    }
];

async function testLogin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        console.log('════════════════════════════════════════════════════════');
        console.log('                   LOGIN TEST SUITE');
        console.log('════════════════════════════════════════════════════════\n');

        let passedTests = 0;
        let failedTests = 0;

        for (const testCase of testCases) {
            console.log(`\n📝 Test: ${testCase.name}`);
            console.log(`   Email: ${testCase.email}`);
            console.log(`   Password: ${testCase.password}`);

            try {
                const user = await User.findOne({ email: testCase.email.toLowerCase() }).select('+password');

                if (!user) {
                    if (testCase.expectedRole === null) {
                        console.log(`   ✅ PASS - User not found (as expected for invalid credentials)`);
                        passedTests++;
                    } else {
                        console.log(`   ❌ FAIL - User not found in database`);
                        failedTests++;
                    }
                    continue;
                }

                const isMatch = await user.comparePassword(testCase.password);

                if (isMatch) {
                    if (user.role === testCase.expectedRole) {
                        console.log(`   ✅ PASS - Password matches, role is ${user.role}`);
                        console.log(`   User: ${user.firstName} ${user.lastName}`);
                        passedTests++;
                    } else {
                        console.log(`   ❌ FAIL - Role mismatch. Expected: ${testCase.expectedRole}, Got: ${user.role}`);
                        failedTests++;
                    }
                } else {
                    if (testCase.expectedRole === null) {
                        console.log(`   ✅ PASS - Password incorrect (as expected for invalid credentials)`);
                        passedTests++;
                    } else {
                        console.log(`   ❌ FAIL - Password does not match`);
                        failedTests++;
                    }
                }
            } catch (error) {
                console.log(`   ❌ ERROR - ${error.message}`);
                failedTests++;
            }
        }

        console.log('\n════════════════════════════════════════════════════════');
        console.log(`\n📊 TEST RESULTS`);
        console.log(`   ✅ Passed: ${passedTests}`);
        console.log(`   ❌ Failed: ${failedTests}`);
        console.log(`   Total: ${testCases.length}\n`);

        if (failedTests === 0) {
            console.log('🎉 All tests passed! Login system is working correctly.');
        } else {
            console.log('⚠️  Some tests failed. Please review the errors above.');
        }

        console.log('\n════════════════════════════════════════════════════════');
        console.log('\n📍 NEXT STEPS:');
        console.log('   1. Start backend: npm run dev');
        console.log('   2. Open frontend: npm run dev (in frontend directory)');
        console.log('   3. Go to http://localhost:5173/login');
        console.log('   4. Try logging in with:');
        console.log('      - Email: student@example.com');
        console.log('      - Password: password123');
        console.log('\n════════════════════════════════════════════════════════\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Connection error:', error);
        process.exit(1);
    }
}

testLogin();