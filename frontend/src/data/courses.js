// Complete course data for ITES, WP, WS
export const courses = [
    {
        id: "ites",
        title: "ITES - Information Technology Essentials",
        description: "HTML, CSS, and JavaScript foundational experiments",
        category: "Training",
        backgroundColor: "10b981",
        progress: 0,
        lessons: [
            // HTML & CSS Section
            { id: "ites-html-list", orderIndex: 1, title: "List in HTML", description: "Create an unordered and ordered list using HTML.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-html-table", orderIndex: 2, title: "Table in HTML", description: "Design a table in HTML with header and rows.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-html-form", orderIndex: 3, title: "Form in HTML", description: "Create a contact form using HTML.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-html-nested-list", orderIndex: 4, title: "Multi-level Nested List", description: "Create a multi-level list using HTML.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-html-style", orderIndex: 5, title: "Simple Style Page", description: "Apply basic styles to a web page using CSS.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-html-image-table", orderIndex: 6, title: "Images in Table", description: "Insert images inside a HTML table.", difficulty: "Medium", points: 12, completed: false },
            { id: "ites-html-weather-table", orderIndex: 7, title: "Weather Station Table", description: "Build a weather data table in HTML.", difficulty: "Medium", points: 12, completed: false },
            { id: "ites-html-seminar-schedule", orderIndex: 8, title: "Seminar Schedule", description: "Create a seminar schedule using HTML tables.", difficulty: "Medium", points: 12, completed: false },
            { id: "ites-css-navbar", orderIndex: 9, title: "CSS Navigation Bar", description: "Make a website navigation bar with CSS.", difficulty: "Medium", points: 12, completed: false },
            { id: "ites-css-login", orderIndex: 10, title: "Login Page", description: "Design a login page using HTML and CSS.", difficulty: "Medium", points: 12, completed: false },
            { id: "ites-css-signup", orderIndex: 11, title: "Signup Page", description: "Design a signup page using HTML and CSS.", difficulty: "Medium", points: 12, completed: false },
            { id: "ites-html-css-simple-webpage", orderIndex: 12, title: "Simple Webpage with HTML and CSS", description: "Create a basic webpage using HTML and CSS.", difficulty: "Easy", points: 10, completed: false },

            // JS Sets
            // Set 1
            { id: "ites-js-positive", orderIndex: 13, title: "Check if Number is Positive", description: "Determine if a number is positive using JS.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-odd-even", orderIndex: 14, title: "Odd or Even Number", description: "Check if a number is odd or even with JS.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-string-check", orderIndex: 15, title: "String Contains 'a'", description: "Check if a string contains the letter 'a'.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-leap-year", orderIndex: 16, title: "Leap Year Check", description: "Check if the current year is a leap year.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-greater-100", orderIndex: 17, title: "Number Greater Than 100", description: "Verify if number is greater than 100.", difficulty: "Easy", points: 10, completed: false },

            // Set 2
            { id: "ites-js-greatest", orderIndex: 18, title: "Compare Two Numbers", description: "Compare two numbers and find the greatest.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-driving-eligibility", orderIndex: 19, title: "Driving Eligibility", description: "Check driving eligibility based on age.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-pos-neg-zero", orderIndex: 20, title: "Positive, Negative, or Zero", description: "Check if a number is positive, negative, or zero.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-leap-year-input", orderIndex: 21, title: "Determine Given Year Leap or Not", description: "Input a year and check if it's a leap year.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-password-match", orderIndex: 22, title: "Password Match", description: "Validate if two password entries match.", difficulty: "Easy", points: 10, completed: false },

            // Set 3
            { id: "ites-js-weekdays", orderIndex: 23, title: "Days of Week Based on Number", description: "Print day of week for a given number.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-grades", orderIndex: 24, title: "Grade Description", description: "Show description for entered grades.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-animal-type", orderIndex: 25, title: "Animal Type", description: "Display the type of animal (Mammal/Reptile/etc).", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-simple-calculator", orderIndex: 26, title: "Simple Calculator", description: "Make a simple calculator with JS.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-month-name", orderIndex: 27, title: "Month Name Based on Number", description: "Print the month for a given number 1-12.", difficulty: "Easy", points: 10, completed: false },

            // Set 4
            { id: "ites-js-count-1-10", orderIndex: 28, title: "Print Numbers 1 to 10", description: "Use for loop to print 1-10.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-sum-50-naturals", orderIndex: 29, title: "Sum of First 50 Naturals", description: "Calculate and print sum of first 50 natural numbers.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-multiplication-table", orderIndex: 30, title: "Multiplication Table", description: "Display multiplication table for input number.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-even-1-100", orderIndex: 31, title: "Even Numbers 1 to 100", description: "Print all even numbers between 1 and 100.", difficulty: "Easy", points: 10, completed: false },
            { id: "ites-js-reverse-string", orderIndex: 32, title: "Reverse String", description: "Reverse a string using for loop.", difficulty: "Easy", points: 10, completed: false }
        ]
    },

    {
        id: "wp",
        title: "WP - Web Programming",
        description: "Web Programming and PHP experiments",
        category: "Web Development",
        backgroundColor: "8b5cf6",
        progress: 0,
        lessons: [
            { id: "wp-form-validation", orderIndex: 1, title: "Form Validation", description: "Validate a web form using JavaScript or PHP.", difficulty: "Medium", points: 15, completed: false },
            { id: "wp-internal-js", orderIndex: 2, title: "Internal JavaScript", description: "Use JavaScript code within an HTML file.", difficulty: "Easy", points: 10, completed: false },
            { id: "wp-external-js", orderIndex: 3, title: "External JavaScript", description: "Link an external JS file in HTML.", difficulty: "Easy", points: 10, completed: false },
            { id: "wp-positivity-js", orderIndex: 4, title: "Positive Number Using JS", description: "Check if a number is positive.", difficulty: "Easy", points: 10, completed: false },
            { id: "wp-leap-year-js", orderIndex: 5, title: "Leap Year Using JS", description: "Check if selected year is leap year or not.", difficulty: "Easy", points: 10, completed: false },
            { id: "wp-calculator-switch", orderIndex: 6, title: "Simple Calculator Using Switch Case (JS)", description: "Create calculator with switch case in JS.", difficulty: "Medium", points: 12, completed: false },
            { id: "wp-js-events", orderIndex: 7, title: "JavaScript Events", description: "Demonstrate events in JS (onclick, etc).", difficulty: "Easy", points: 10, completed: false },
            { id: "wp-bootstrap-grid", orderIndex: 8, title: "Bootstrap Grid", description: "Implement responsive grid using Bootstrap.", difficulty: "Medium", points: 12, completed: false },
            { id: "wp-bootstrap-offset", orderIndex: 9, title: "Bootstrap Offset", description: "Use offset for layout in Bootstrap.", difficulty: "Medium", points: 12, completed: false },
            { id: "wp-bootstrap-table", orderIndex: 10, title: "Bootstrap Tables", description: "Design tables with Bootstrap styling.", difficulty: "Medium", points: 12, completed: false },
            { id: "wp-factorial-php", orderIndex: 11, title: "Factorial Using PHP", description: "Calculate factorial in PHP.", difficulty: "Medium", points: 12, completed: false },
            { id: "wp-weekdays-switch-php", orderIndex: 12, title: "Weekdays Using Switch Case (PHP)", description: "Display weekdays based on input using PHP switch case.", difficulty: "Medium", points: 12, completed: false },
            { id: "wp-multiplication-table-php", orderIndex: 13, title: "Multiplication Table Using PHP", description: "Create a multiplication table in PHP.", difficulty: "Medium", points: 12, completed: false }
        ]
    },

    {
        id: "ws",
        title: "WS - Web Scripting",
        description: "Advanced JavaScript and Web App experiments",
        category: "Web Development",
        backgroundColor: "f59e0b",
        progress: 0,
        lessons: [
            { id: "ws-form-validation", orderIndex: 1, title: "Form Validation using JS", description: "Validate form input using JavaScript.", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-login-auth", orderIndex: 2, title: "JavaScript Login Authentication", description: "Authenticate users in JS.", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-todo-list", orderIndex: 3, title: "JavaScript To-Do List", description: "Create a to-do list app (use local storage if possible).", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-quiz", orderIndex: 4, title: "JavaScript Quiz", description: "Build a simple quiz app in JS.", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-isbn-check", orderIndex: 5, title: "ISBN-10 Validator", description: "Check if a string is valid ISBN-10.", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-matching-card-game", orderIndex: 6, title: "Matching Card Game", description: "Build a simple matching game in JS.", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-image-upload", orderIndex: 7, title: "Image and File Upload", description: "Implement file/image upload functionality.", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-secret-message", orderIndex: 8, title: "Secret Message Passing", description: "Pass messages securely in JS.", difficulty: "Medium", points: 20, completed: false },
            { id: "ws-budget-app", orderIndex: 9, title: "Budget App Project", description: "Create a budget management app in JS.", difficulty: "Hard", points: 25, completed: false },
            { id: "ws-calculator", orderIndex: 10, title: "Calculator Project", description: "Build an advanced calculator project in JS.", difficulty: "Hard", points: 25, completed: false }
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

