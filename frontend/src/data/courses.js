// frontend/src/data/courses.js

export const courses = [
    {
        id: 'ites',
        title: 'Course 1: ITES (IT Essentials)',
        description: 'Foundation course covering HTML, CSS, and JavaScript fundamentals. This course is always accessible and must be completed to unlock subsequent courses.',
        category: 'Web Development Fundamentals',
        lessonsCount: 12,
        duration: '4-6 weeks',
        difficulty: 'Beginner',
        prerequisites: [], // No prerequisites - always unlocked
        unlocks: ['wp'], // Unlocks Web Programming course
        order: 1,
        status: 'unlocked', // Always unlocked
        color: 'bg-blue-600',
        icon: '📘',
        lessons: [
            { id: 'ites-html-list', title: 'Lists in HTML', difficulty: 'Easy', order: 1 },
            { id: 'ites-html-table', title: 'Table in HTML', difficulty: 'Easy', order: 2 },
            { id: 'ites-html-form', title: 'Form in HTML', difficulty: 'Easy', order: 3 },
            { id: 'ites-html-nested-list', title: 'Multi-level Nested List', difficulty: 'Medium', order: 4 },
            { id: 'ites-html-style', title: 'Simple Style Page', difficulty: 'Easy', order: 5 },
            { id: 'ites-html-image-table', title: 'Images in Table', difficulty: 'Medium', order: 6 },
            { id: 'ites-html-weather-table', title: 'Weather Station Table', difficulty: 'Medium', order: 7 },
            { id: 'ites-html-seminar-schedule', title: 'Seminar Schedule', difficulty: 'Medium', order: 8 },
            { id: 'ites-css-navbar', title: 'CSS Navigation Bar', difficulty: 'Medium', order: 9 },
            { id: 'ites-css-login', title: 'Login Page', difficulty: 'Medium', order: 10 },
            { id: 'ites-css-signup', title: 'Signup Page', difficulty: 'Medium', order: 11 },
            { id: 'ites-html-css-simple-webpage', title: 'Simple Webpage with HTML and CSS', difficulty: 'Easy', order: 12 }
        ]
    },
    {
        id: 'wp',
        title: 'Course 2: WP (Web Programming)',
        description: 'Intermediate course covering Bootstrap, PHP, and advanced form handling. Unlocks after completing Course 1 (ITES).',
        category: 'Advanced Web Technologies',
        lessonsCount: 13,
        duration: '5-7 weeks',
        difficulty: 'Intermediate',
        prerequisites: ['ites'], // Requires ITES completion
        unlocks: ['ws'], // Unlocks Web Scripting course
        order: 2,
        status: 'locked', // Locked by default
        color: 'bg-green-600',
        icon: '📗',
        lessons: [
            { id: 'wp-form-validation', title: 'Form Validation', difficulty: 'Medium', order: 1 },
            { id: 'wp-internal-js', title: 'Internal JavaScript', difficulty: 'Easy', order: 2 },
            { id: 'wp-external-js', title: 'External JavaScript', difficulty: 'Easy', order: 3 },
            { id: 'wp-positivity-js', title: 'Positive Number Using JS', difficulty: 'Easy', order: 4 },
            { id: 'wp-leap-year-js', title: 'Leap Year Using JS', difficulty: 'Medium', order: 5 },
            { id: 'wp-calculator-switch', title: 'Simple Calculator (Switch Case in JS)', difficulty: 'Medium', order: 6 },
            { id: 'wp-js-events', title: 'JavaScript Events', difficulty: 'Medium', order: 7 },
            { id: 'wp-bootstrap-grid', title: 'Bootstrap Grid', difficulty: 'Medium', order: 8 },
            { id: 'wp-bootstrap-offset', title: 'Bootstrap Offset', difficulty: 'Medium', order: 9 },
            { id: 'wp-bootstrap-table', title: 'Bootstrap Tables', difficulty: 'Easy', order: 10 },
            { id: 'wp-factorial-php', title: 'Factorial of a Number using PHP', difficulty: 'Medium', order: 11 },
            { id: 'wp-weekdays-switch-php', title: 'Weekdays Using Switch Case Using PHP', difficulty: 'Medium', order: 12 },
            { id: 'wp-multiplication-table-php', title: 'Multiplication Table Using PHP', difficulty: 'Easy', order: 13 }
        ]
    },
    {
        id: 'ws',
        title: 'Course 3: WS (Web Scripting)',
        description: 'Advanced course focusing on complex JavaScript applications and projects. Unlocks after completing Course 2 (WP).',
        category: 'Advanced JavaScript & Applications',
        lessonsCount: 10,
        duration: '4-6 weeks',
        difficulty: 'Advanced',
        prerequisites: ['wp'], // Requires WP completion
        unlocks: [], // Final course
        order: 3,
        status: 'locked', // Locked by default
        color: 'bg-purple-600',
        icon: '📕',
        lessons: [
            { id: 'ws-form-validation', title: 'Form Validation using JavaScript', difficulty: 'Medium', order: 1 },
            { id: 'ws-login-auth', title: 'JavaScript Login Authentication', difficulty: 'Medium', order: 2 },
            { id: 'ws-todo-list', title: 'JavaScript To-Do List', difficulty: 'Hard', order: 3 },
            { id: 'ws-quiz', title: 'JavaScript Quiz', difficulty: 'Medium', order: 4 },
            { id: 'ws-isbn-check', title: 'ISBN-10 Validator', difficulty: 'Hard', order: 5 },
            { id: 'ws-matching-card-game', title: 'Matching Card Game', difficulty: 'Hard', order: 6 },
            { id: 'ws-image-upload', title: 'Image and File Upload', difficulty: 'Medium', order: 7 },
            { id: 'ws-secret-message', title: 'Secret Message Passing', difficulty: 'Medium', order: 8 },
            { id: 'ws-budget-app', title: 'Budget Application Project', difficulty: 'Hard', order: 9 },
            { id: 'ws-calculator', title: 'Calculator Project', difficulty: 'Hard', order: 10 }
        ]
    }
];

export default courses;
