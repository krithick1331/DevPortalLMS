const bcrypt = require('bcryptjs');

const admin_pw = 'admin123';
const student_pw = 'student123';

bcrypt.hash(admin_pw, 10, (err, adminHash) => {
    if (err) throw err;
    console.log('admin123 bcrypt hash:', adminHash);

    bcrypt.hash(student_pw, 10, (err, studentHash) => {
        if (err) throw err;
        console.log('student123 bcrypt hash:', studentHash);
    });
});

