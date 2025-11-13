// Complete course data for ITES, WP, WS
export const courses = [
    {
        id: 'ites',
        title: 'ITES - IT Enabled Services',
        description: 'Master Git, Testing, Deployment, Documentation, and DevOps',
        category: 'Training',
        backgroundColor: '#10b981',
        progress: 0,
        lessons: [
            {
                id: 'ites-git',
                orderIndex: 1,
                title: 'Git & Version Control',
                description: 'Learn Git fundamentals, branching, merging, and collaboration',
                difficulty: 'Medium',
                points: 50,
                completed: false
            },
            {
                id: 'ites-testing',
                orderIndex: 2,
                title: 'Software Testing Fundamentals',
                description: 'Unit testing, integration testing, and TDD practices',
                difficulty: 'Medium',
                points: 50,
                completed: false
            },
            {
                id: 'ites-deployment',
                orderIndex: 3,
                title: 'Web Application Deployment',
                description: 'Deploy applications to cloud platforms and configure CI/CD',
                difficulty: 'Hard',
                points: 60,
                completed: false
            },
            {
                id: 'ites-api-docs',
                orderIndex: 4,
                title: 'API Documentation & Testing',
                description: 'Document and test REST APIs using Swagger and Postman',
                difficulty: 'Medium',
                points: 50,
                completed: false
            },
            {
                id: 'ites-devops',
                orderIndex: 5,
                title: 'DevOps & Automation',
                description: 'CI/CD pipelines, GitHub Actions, and monitoring',
                difficulty: 'Hard',
                points: 70,
                completed: false
            }
        ]
    },
    {
        id: 'wp',
        title: 'WP - Web Programming',
        description: 'Master PHP, MySQL, Forms, Sessions, and Server-side Development',
        category: 'Web Development',
        backgroundColor: '#8b5cf6',
        progress: 0,
        lessons: [
            {
                id: 'wp-php-basics',
                orderIndex: 1,
                title: 'PHP Basics & Syntax',
                description: 'Variables, data types, operators, and control structures',
                difficulty: 'Easy',
                points: 40,
                completed: false
            },
            {
                id: 'wp-forms',
                orderIndex: 2,
                title: 'PHP Forms & Validation',
                description: 'Handle form submissions, validation, and sanitization',
                difficulty: 'Medium',
                points: 50,
                completed: false
            },
            {
                id: 'wp-mysql',
                orderIndex: 3,
                title: 'MySQL Database & PHP',
                description: 'Connect to databases, CRUD operations, and prepared statements',
                difficulty: 'Medium',
                points: 60,
                completed: false
            },
            {
                id: 'wp-sessions',
                orderIndex: 4,
                title: 'Sessions & Authentication',
                description: 'Build login systems with sessions, cookies, and password hashing',
                difficulty: 'Hard',
                points: 70,
                completed: false
            },
            {
                id: 'wp-files',
                orderIndex: 5,
                title: 'File Upload & Advanced PHP',
                description: 'Handle file uploads, image processing, and file operations',
                difficulty: 'Hard',
                points: 60,
                completed: false
            }
        ]
    },
    {
        id: 'ws',
        title: 'WS - Web Scripting',
        description: 'Master JavaScript, DOM, AJAX, JSON, and Modern Web APIs',
        category: 'Web Development',
        backgroundColor: '#f59e0b',
        progress: 0,
        lessons: [
            {
                id: 'ws-dom',
                orderIndex: 1,
                title: 'DOM Manipulation',
                description: 'Select, create, modify, and traverse HTML elements with JavaScript',
                difficulty: 'Easy',
                points: 40,
                completed: false
            },
            {
                id: 'ws-events',
                orderIndex: 2,
                title: 'Event Handling',
                description: 'Handle user interactions, event propagation, and delegation',
                difficulty: 'Medium',
                points: 50,
                completed: false
            },
            {
                id: 'ws-ajax',
                orderIndex: 3,
                title: 'AJAX & Fetch API',
                description: 'Make HTTP requests, handle promises, and work with async/await',
                difficulty: 'Medium',
                points: 60,
                completed: false
            },
            {
                id: 'ws-json',
                orderIndex: 4,
                title: 'JSON & Local Storage',
                description: 'Parse JSON, store data locally, and build persistent applications',
                difficulty: 'Medium',
                points: 50,
                completed: false
            },
            {
                id: 'ws-advanced',
                orderIndex: 5,
                title: 'Advanced JavaScript',
                description: 'ES6+, modules, closures, destructuring, and modern patterns',
                difficulty: 'Hard',
                points: 70,
                completed: false
            }
        ]
    }
];

// Mock lesson content (will be replaced with real data from backend)
export const lessonContent = {
    'ites-git': {
        title: 'Git & Version Control',
        description: 'Master version control with Git',
        content: `
      <h2>Introduction to Git</h2>
      <p>Git is a distributed version control system used to track changes in source code during software development.</p>
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Repository:</strong> A folder tracked by Git</li>
        <li><strong>Commit:</strong> A snapshot of your code at a point in time</li>
        <li><strong>Branch:</strong> A parallel version of your code</li>
        <li><strong>Merge:</strong> Combining changes from different branches</li>
      </ul>
    `,
        starterCode: '# Initialize repository\ngit init\n\n# Add files\ngit add .\n\n# Commit changes\ngit commit -m "Initial commit"',
        testCases: [
            { input: 'git init', expected: 'Repository initialized' },
            { input: 'git status', expected: 'Nothing to commit' }
        ],
        hints: [
            'Use git init to start a new repository',
            'git add stages files for commit',
            'git commit saves your changes'
        ],
        solution: 'git init\ngit add .\ngit commit -m "Initial commit"\ngit branch -M main\ngit remote add origin <url>\ngit push -u origin main'
    }
    // Add more lesson content as needed
};

// Mock events for dashboard
export const mockEvents = [
    {
        id: 1,
        title: 'ITES Module Assessment',
        date: '2025-11-15T14:00:00'
    },
    {
        id: 2,
        title: 'WP Project Submission',
        date: '2025-11-18T23:59:00'
    },
    {
        id: 3,
        title: 'WS Live Coding Session',
        date: '2025-11-20T10:00:00'
    }
];
