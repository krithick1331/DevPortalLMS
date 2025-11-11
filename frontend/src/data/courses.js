// Course data for DevPortal LMS
// This file contains all courses with their lessons, difficulty levels, and points
// Each course has: id, title, description, and an array of lessons
// Each lesson has: id, title, difficulty (Easy/Medium/Hard), points, and test cases

export const courses = [
    // FET - Front End Technologies course with HTML, CSS, JavaScript lessons
    {
        id: 'fet',
        title: 'FET - Front End Technologies',
        description: 'Master HTML, CSS, JavaScript & Bootstrap fundamentals',
        lessons: [
            // Lesson 1: Build a Navigation Bar - Medium difficulty, 20 points
            {
                id: 'html-navbar',
                title: 'Build a Navigation Bar',
                difficulty: 'Medium',
                points: 20,
                description: 'Create a responsive navigation bar using HTML and CSS',
                starterCode: {
                    html: '<!-- Write your HTML here -->\n<nav>\n  \n</nav>',
                    css: '/* Write your CSS here */\nnav {\n  \n}',
                    js: '// Write your JavaScript here'
                },
                tests: [
                    { description: 'Navigation element exists', points: 5 },
                    { description: 'At least 3 navigation links present', points: 5 },
                    { description: 'CSS flex or grid layout applied', points: 5 },
                    { description: 'Hover effects on links', points: 5 }
                ]
            },
            // CSS Flexbox Layout
            {
                id: 'css-flexbox',
                title: 'CSS Flexbox Layout',
                difficulty: 'Medium',
                points: 25,
                description: 'Build a responsive layout using CSS Flexbox',
                starterCode: {
                    html: '<!-- Create a flex container with items -->',
                    css: '/* Style your flex container and items */',
                    js: ''
                },
                tests: [
                    { description: 'Flex container properly configured', points: 5 },
                    { description: 'Items align and justify correctly', points: 10 },
                    { description: 'Responsive layout works', points: 10 }
                ]
            },
            // JavaScript Events
            {
                id: 'js-events',
                title: 'JavaScript Events',
                difficulty: 'Hard',
                points: 30,
                description: 'Handle user interactions with JavaScript events',
                starterCode: {
                    html: '<!-- Create interactive elements -->',
                    css: '/* Add styles for interactive states */',
                    js: '// Implement event handlers'
                },
                tests: [
                    { description: 'Click events handled', points: 10 },
                    { description: 'Form validation works', points: 10 },
                    { description: 'Event delegation implemented', points: 10 }
                ]
            },
            // Bootstrap Components
            {
                id: 'bootstrap-comp',
                title: 'Bootstrap Components',
                difficulty: 'Easy',
                points: 15,
                description: 'Build a page using Bootstrap components',
                starterCode: {
                    html: '<!-- Use Bootstrap components -->',
                    css: '/* Customize Bootstrap styles */',
                    js: '// Initialize Bootstrap components'
                },
                tests: [
                    { description: 'Grid system used correctly', points: 5 },
                    { description: 'Components styled properly', points: 5 },
                    { description: 'Responsive behavior works', points: 5 }
                ]
            }
        ]
    },
    // WP - Web Programming course
    {
        id: 'wp',
        title: 'WP - Web Programming',
        description: 'Learn PHP, MySQL, and Server-side programming',
        lessons: [
            {
                id: 'php-basics',
                title: 'PHP Basics',
                difficulty: 'Medium',
                points: 20,
                description: 'Learn PHP syntax and basic operations',
                starterCode: {
                    php: '<?php\n// Write your PHP code here\n?>'
                },
                tests: [
                    { description: 'Variables and types', points: 5 },
                    { description: 'Control structures', points: 5 },
                    { description: 'Functions', points: 10 }
                ]
            }
            // More lessons to be added
        ]
    }
    // More courses to be added
];