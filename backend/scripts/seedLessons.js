// Seed lessons from frontend data into backend JSON
// Run: node scripts/seedLessons.js

const fs = require('fs').promises;
const path = require('path');

// Import lessons (simplified extraction)
const lessonsData = [
    {
        id: "ites-html-list",
        courseId: "ites",
        title: "List in HTML",
        instructions: "Create both an unordered list (<ul>) with 3 items and an ordered list (<ol>) with 3 items.",
        starterCode: { html: "<!-- Create your lists here -->\n", css: "", js: "" },
        hints: ["Use <ul> for unordered lists", "Use <ol> for ordered lists", "Each item should be in <li> tags"],
        solution: "<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Orange</li>\n</ul>\n<ol>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>"
    },
    {
        id: "ites-html-table",
        courseId: "ites",
        title: "Table in HTML",
        instructions: "Create a table with headers Name, Age, City and at least 2 data rows.",
        starterCode: { html: "<!-- Create your table here -->\n", css: "", js: "" },
        hints: ["Use <table> to create the table", "Use <th> for headers", "Use <tr> for rows and <td> for data cells"],
        solution: "<table border=\"1\">\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n    <th>City</th>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>25</td>\n    <td>Delhi</td>\n  </tr>\n  <tr>\n    <td>Jane</td>\n    <td>30</td>\n    <td>Mumbai</td>\n  </tr>\n</table>"
    },
    {
        id: "ites-html-form",
        courseId: "ites",
        title: "Form in HTML",
        instructions: "Create a contact form with Name (text), Email (email), and Message (textarea) fields, plus a Submit button.",
        starterCode: { html: "<!-- Create your form here -->\n", css: "", js: "" },
        hints: ["Use <form> tag to wrap all form elements", "Use <input type='text'> for name", "Use <input type='email'> for email", "Use <textarea> for message"],
        solution: "<form>\n  <label>Name:</label>\n  <input type=\"text\" name=\"name\" required>\n  <label>Email:</label>\n  <input type=\"email\" name=\"email\" required>\n  <label>Message:</label>\n  <textarea name=\"message\" required></textarea>\n  <button type=\"submit\">Send</button>\n</form>"
    },
    {
        id: "ites-js-positive",
        courseId: "ites",
        title: "Check if Number is Positive",
        instructions: "Write a function checkPositive(num) that returns true if num > 0, false otherwise.",
        starterCode: { html: "", css: "", js: "function checkPositive(num) {\n  // Your code here\n  \n}" },
        hints: ["Use the > comparison operator", "Zero is not positive", "Return true or false"],
        solution: "function checkPositive(num) {\n  return num > 0;\n}"
    },
    {
        id: "ites-js-odd-even",
        courseId: "ites",
        title: "Odd or Even Number",
        instructions: "Write a function isEven(num) that returns true if the number is even, false if odd.",
        starterCode: { html: "", css: "", js: "function isEven(num) {\n  // Your code here\n  \n}" },
        hints: ["Use the modulo operator %", "Even numbers divide evenly by 2", "num % 2 === 0 means even"],
        solution: "function isEven(num) {\n  return num % 2 === 0;\n}"
    },
    {
        id: "ites-js-string-check",
        courseId: "ites",
        title: "String Contains 'a'",
        instructions: "Write a function containsA(str) that returns true if the string contains letter 'a', false otherwise.",
        starterCode: { html: "", css: "", js: "function containsA(str) {\n  // Your code here\n  \n}" },
        hints: ["Use the includes() method", "str.includes('a') checks if 'a' is in str", "Case sensitive - 'a' not equal to 'A'"],
        solution: "function containsA(str) {\n  return str.includes('a');\n}"
    },
    {
        id: "wp-form-validation",
        courseId: "wp",
        title: "Form Validation",
        instructions: "Write a function validateForm(name, email) that returns true if name is not empty and email contains '@', false otherwise.",
        starterCode: { html: "", css: "", js: "function validateForm(name, email) {\n  // Your code here\n  \n}" },
        hints: ["Check if name.length > 0", "Check if email.includes('@')", "Both conditions must be true"],
        solution: "function validateForm(name, email) {\n  return name.length > 0 && email.includes('@');\n}"
    },
    {
        id: "ws-form-validation",
        courseId: "ws",
        title: "Form Validation using JavaScript",
        instructions: "Write a function validateForm(name, email, password) that returns true if: name not empty, email contains '@', password length >= 6.",
        starterCode: { html: "", css: "", js: "function validateForm(name, email, password) {\n  // Your code here\n  \n}" },
        hints: ["Check name.length > 0", "Check email.includes('@')", "Check password.length >= 6", "All must be true"],
        solution: "function validateForm(name, email, password) {\n  return name.length > 0 && email.includes('@') && password.length >= 6;\n}"
    }
];

async function seedLessons() {
    try {
        const dataPath = path.join(__dirname, '../data/practiceLessons.json');
        await fs.writeFile(dataPath, JSON.stringify(lessonsData, null, 2), 'utf8');
        console.log(`✅ Seeded ${lessonsData.length} lessons to ${dataPath}`);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seedLessons();
