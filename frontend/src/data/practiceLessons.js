// Copilot: Replace the entire lessons array in frontend/src/data/practiceLessons.js with this complete version

export const lessons = [
  // ==================== ITES HTML & CSS ====================
  {
    id: "ites-html-list",
    courseId: "ites",
    title: "List in HTML",
    instructions: "Create both an unordered list (<ul>) with 3 items and an ordered list (<ol>) with 3 items.",
    starterCode: {
      html: `<!-- Create your lists here -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains <ul> tag",
        validate: (code) => code.includes('<ul>')
      },
      {
        input: "HTML code",
        expected: "Contains <ol> tag",
        validate: (code) => code.includes('<ol>')
      },
      {
        input: "HTML code",
        expected: "Contains at least 3 <li> items",
        validate: (code) => (code.match(/<li>/g) || []).length >= 3
      }
    ],
    hints: [
      "Use <ul> for unordered lists",
      "Use <ol> for ordered lists",
      "Each item should be in <li> tags"
    ],
    solution: `<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Orange</li>\n</ul>\n<ol>\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>`
  },

  {
    id: "ites-html-table",
    courseId: "ites",
    title: "Table in HTML",
    instructions: "Create a table with headers Name, Age, City and at least 2 data rows.",
    starterCode: {
      html: `<!-- Create your table here -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains <table> tag",
        validate: (code) => code.includes('<table')
      },
      {
        input: "HTML code",
        expected: "Contains <th> headers",
        validate: (code) => (code.match(/<th>/g) || []).length >= 3
      },
      {
        input: "HTML code",
        expected: "Contains at least 2 data rows",
        validate: (code) => (code.match(/<tr>/g) || []).length >= 3
      }
    ],
    hints: [
      "Use <table> to create the table",
      "Use <th> for headers",
      "Use <tr> for rows and <td> for data cells"
    ],
    solution: `<table border="1">\n  <tr>\n    <th>Name</th>\n    <th>Age</th>\n    <th>City</th>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>25</td>\n    <td>Delhi</td>\n  </tr>\n  <tr>\n    <td>Jane</td>\n    <td>30</td>\n    <td>Mumbai</td>\n  </tr>\n</table>`
  },

  {
    id: "ites-html-form",
    courseId: "ites",
    title: "Form in HTML",
    instructions: "Create a contact form with Name (text), Email (email), and Message (textarea) fields, plus a Submit button.",
    starterCode: {
      html: `<!-- Create your form here -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains <form> tag",
        validate: (code) => code.includes('<form')
      },
      {
        input: "HTML code",
        expected: "Contains text and email input fields",
        validate: (code) => code.includes('type="text"') && code.includes('type="email"')
      },
      {
        input: "HTML code",
        expected: "Contains <textarea> and submit button",
        validate: (code) => code.includes('<textarea') && (code.includes('type="submit"') || code.includes('<button'))
      }
    ],
    hints: [
      "Use <form> tag to wrap all form elements",
      "Use <input type='text'> for name",
      "Use <input type='email'> for email",
      "Use <textarea> for message"
    ],
    solution: `<form>\n  <label>Name:</label>\n  <input type="text" name="name" required>\n  <label>Email:</label>\n  <input type="email" name="email" required>\n  <label>Message:</label>\n  <textarea name="message" required></textarea>\n  <button type="submit">Send</button>\n</form>`
  },

  {
    id: "ites-html-nested-list",
    courseId: "ites",
    title: "Multi-level Nested List",
    instructions: "Create a nested list with main categories (Electronics, Clothing) each having 2 subcategories.",
    starterCode: {
      html: `<!-- Create nested list here -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains outer <ul>",
        validate: (code) => code.includes('<ul>')
      },
      {
        input: "HTML code",
        expected: "Contains nested <ul> inside <li>",
        validate: (code) => {
          const hasLi = code.includes('<li>');
          const ulCount = (code.match(/<ul>/g) || []).length;
          return hasLi && ulCount >= 2;
        }
      },
      {
        input: "HTML code",
        expected: "Has at least 4 list items total",
        validate: (code) => (code.match(/<li>/g) || []).length >= 4
      }
    ],
    hints: [
      "Create a <ul> with <li> elements",
      "Inside each <li>, add another <ul> for subcategories",
      "Proper indentation helps readability"
    ],
    solution: `<ul>\n  <li>Electronics\n    <ul>\n      <li>Phones</li>\n      <li>Laptops</li>\n    </ul>\n  </li>\n  <li>Clothing\n    <ul>\n      <li>Men</li>\n      <li>Women</li>\n    </ul>\n  </li>\n</ul>`
  },

  {
    id: "ites-html-style",
    courseId: "ites",
    title: "Simple Style Page",
    instructions: "Create an h1 heading and a paragraph. Style the h1 with color and font-family in CSS.",
    starterCode: {
      html: `<h1>My Heading</h1>\n<p>This is a paragraph.</p>`,
      css: `/* Add your CSS here */\n`,
      js: ""
    },
    testCases: [
      {
        input: "CSS code",
        expected: "Contains h1 selector",
        validate: (code) => code.includes('h1')
      },
      {
        input: "CSS code",
        expected: "Sets color property",
        validate: (code) => code.includes('color')
      },
      {
        input: "CSS code",
        expected: "Sets font-family",
        validate: (code) => code.includes('font-family')
      }
    ],
    hints: [
      "Use h1 { } to select the heading",
      "Add color: your-color;",
      "Add font-family: your-font;"
    ],
    solution: `h1 {\n  color: green;\n  font-family: Arial, sans-serif;\n}\np {\n  color: gray;\n  font-size: 16px;\n}`
  },

  {
    id: "ites-html-image-table",
    courseId: "ites",
    title: "Images in Table",
    instructions: "Create a table with 2 columns and 2 rows. Place <img> tags in the table cells.",
    starterCode: {
      html: `<!-- Create table with images -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains <table> tag",
        validate: (code) => code.includes('<table')
      },
      {
        input: "HTML code",
        expected: "Contains <img> tags",
        validate: (code) => (code.match(/<img/g) || []).length >= 2
      },
      {
        input: "HTML code",
        expected: "Images are inside <td> cells",
        validate: (code) => code.includes('<td>') && code.includes('<img')
      }
    ],
    hints: [
      "Create a table structure first",
      "Use <img src='url' alt='description'> inside <td>",
      "You can use placeholder images"
    ],
    solution: `<table border="1">\n  <tr>\n    <td><img src="image1.jpg" width="100" alt="Image 1"></td>\n    <td><img src="image2.jpg" width="100" alt="Image 2"></td>\n  </tr>\n</table>`
  },

  {
    id: "ites-html-weather-table",
    courseId: "ites",
    title: "Weather Station Table",
    instructions: "Create a weather table with columns: City, Temperature, Condition. Add 3 city rows.",
    starterCode: {
      html: `<!-- Create weather table -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains table headers (City, Temperature, Condition)",
        validate: (code) => code.includes('<th>') && (code.match(/<th>/g) || []).length >= 3
      },
      {
        input: "HTML code",
        expected: "Contains at least 3 data rows",
        validate: (code) => (code.match(/<tr>/g) || []).length >= 4
      },
      {
        input: "HTML code",
        expected: "Has proper table structure",
        validate: (code) => code.includes('<table') && code.includes('<td>')
      }
    ],
    hints: [
      "First row should have <th> for headers",
      "Each city needs Temperature and Condition data",
      "Use <tr> for each row"
    ],
    solution: `<table border="1">\n  <tr>\n    <th>City</th>\n    <th>Temperature</th>\n    <th>Condition</th>\n  </tr>\n  <tr>\n    <td>Delhi</td>\n    <td>32°C</td>\n    <td>Sunny</td>\n  </tr>\n  <tr>\n    <td>Mumbai</td>\n    <td>28°C</td>\n    <td>Cloudy</td>\n  </tr>\n  <tr>\n    <td>Bangalore</td>\n    <td>25°C</td>\n    <td>Rainy</td>\n  </tr>\n</table>`
  },

  {
    id: "ites-html-seminar-schedule",
    courseId: "ites",
    title: "Seminar Schedule",
    instructions: "Create a seminar schedule table with Time and Topic columns. Add 3 time slots.",
    starterCode: {
      html: `<!-- Create schedule table -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains Time and Topic headers",
        validate: (code) => (code.match(/<th>/g) || []).length >= 2
      },
      {
        input: "HTML code",
        expected: "Has at least 3 schedule entries",
        validate: (code) => (code.match(/<tr>/g) || []).length >= 4
      },
      {
        input: "HTML code",
        expected: "Proper table structure",
        validate: (code) => code.includes('<table') && code.includes('<td>')
      }
    ],
    solution: `<table border="1">\n  <tr>\n    <th>Time</th>\n    <th>Topic</th>\n  </tr>\n  <tr>\n    <td>9:00 AM</td>\n    <td>Opening Speech</td>\n  </tr>\n  <tr>\n    <td>10:00 AM</td>\n    <td>Web Development</td>\n  </tr>\n  <tr>\n    <td>11:30 AM</td>\n    <td>AI & ML</td>\n  </tr>\n</table>`
  },

  {
    id: "ites-css-navbar",
    courseId: "ites",
    title: "CSS Navigation Bar",
    instructions: "Create a navigation bar with 4 links (Home, About, Services, Contact). Style with CSS: dark background, white text, horizontal layout.",
    starterCode: {
      html: `<nav>\n  <a href="#">Home</a>\n  <a href="#">About</a>\n  <a href="#">Services</a>\n  <a href="#">Contact</a>\n</nav>`,
      css: `/* Style your navbar here */\n`,
      js: ""
    },
    testCases: [
      {
        input: "CSS code",
        expected: "Styles nav or nav a elements",
        validate: (code) => code.includes('nav')
      },
      {
        input: "CSS code",
        expected: "Sets background color",
        validate: (code) => code.includes('background')
      },
      {
        input: "CSS code",
        expected: "Sets text color and removes decoration",
        validate: (code) => code.includes('color') || code.includes('text-decoration')
      }
    ],
    hints: [
      "Use nav { background: #333; }",
      "Style links with nav a { color: white; }",
      "Use display: inline-block or flexbox for horizontal layout"
    ],
    solution: `nav {\n  background: #333;\n  padding: 10px;\n}\nnav a {\n  color: white;\n  padding: 10px 15px;\n  text-decoration: none;\n  display: inline-block;\n}\nnav a:hover {\n  background: #555;\n}`
  },
  // ==================== CONTINUING FROM CSS LESSONS ====================

  {
    id: "ites-css-login",
    courseId: "ites",
    title: "Login Page",
    instructions: "Style the login form with CSS: center it, add padding, background color, and style inputs.",
    starterCode: {
      html: `<form id="loginForm">\n  <input type="text" placeholder="Username">\n  <input type="password" placeholder="Password">\n  <button>Login</button>\n</form>`,
      css: `/* Style your form here */\n`,
      js: ""
    },
    testCases: [
      {
        input: "CSS code",
        expected: "Styles form element",
        validate: (code) => code.includes('form') || code.includes('#loginForm')
      },
      {
        input: "CSS code",
        expected: "Adds padding or margin",
        validate: (code) => code.includes('padding') || code.includes('margin')
      },
      {
        input: "CSS code",
        expected: "Sets background color",
        validate: (code) => code.includes('background')
      }
    ],
    solution: `form {\n  max-width: 300px;\n  margin: 50px auto;\n  padding: 20px;\n  background: #f5f5f5;\n  border-radius: 5px;\n}\ninput {\n  width: 100%;\n  padding: 10px;\n  margin: 10px 0;\n  border: 1px solid #ccc;\n}\nbutton {\n  width: 100%;\n  padding: 10px;\n  background: #007bff;\n  color: white;\n  border: none;\n  cursor: pointer;\n}`
  },

  {
    id: "ites-css-signup",
    courseId: "ites",
    title: "Signup Page",
    instructions: "Create and style a signup form with Name, Email, Password fields and a Sign Up button.",
    starterCode: {
      html: `<form id="signupForm">\n  <input type="text" placeholder="Name">\n  <input type="email" placeholder="Email">\n  <input type="password" placeholder="Password">\n  <button>Sign Up</button>\n</form>`,
      css: `/* Style your signup form */\n`,
      js: ""
    },
    testCases: [
      {
        input: "CSS code",
        expected: "Styles form",
        validate: (code) => code.includes('form') || code.includes('#signupForm')
      },
      {
        input: "CSS code",
        expected: "Styles inputs",
        validate: (code) => code.includes('input')
      },
      {
        input: "CSS code",
        expected: "Styles button",
        validate: (code) => code.includes('button')
      }
    ],
    solution: `form {\n  max-width: 350px;\n  margin: 40px auto;\n  padding: 25px;\n  background: #fafafa;\n  border: 1px solid #ddd;\n}\ninput {\n  display: block;\n  width: 100%;\n  padding: 12px;\n  margin: 10px 0;\n  border: 1px solid #ccc;\n}\nbutton {\n  width: 100%;\n  padding: 12px;\n  background: #28a745;\n  color: white;\n  border: none;\n}`
  },

  {
    id: "ites-html-css-simple-webpage",
    courseId: "ites",
    title: "Simple Webpage with HTML and CSS",
    instructions: "Create a complete webpage with heading, paragraph, and styled with colors and fonts.",
    starterCode: {
      html: `<h1>Welcome</h1>\n<p>This is my webpage.</p>`,
      css: `/* Add styles */\n`,
      js: ""
    },
    testCases: [
      {
        input: "HTML+CSS",
        expected: "Has h1 and p elements",
        validate: (code) => code.includes('<h1>') && code.includes('<p>')
      },
      {
        input: "CSS",
        expected: "Has color styling",
        validate: (code) => code.includes('color')
      },
      {
        input: "CSS",
        expected: "Has font styling",
        validate: (code) => code.includes('font')
      }
    ],
    solution: `body {\n  background: #f7f7f7;\n  font-family: Arial, sans-serif;\n}\nh1 {\n  color: #2c3e50;\n  text-align: center;\n}\np {\n  color: #555;\n  font-size: 18px;\n  line-height: 1.6;\n}`
  },

  // ==================== ITES JAVASCRIPT SET 1 ====================

  {
    id: "ites-js-positive",
    courseId: "ites",
    title: "Check if Number is Positive",
    instructions: "Write a function checkPositive(num) that returns true if num > 0, false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function checkPositive(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "5", expected: "true" },
      { input: "-3", expected: "false" },
      { input: "0", expected: "false" },
      { input: "100", expected: "true" }
    ],
    hints: [
      "Use the > comparison operator",
      "Zero is not positive",
      "Return true or false"
    ],
    solution: "function checkPositive(num) {\n  return num > 0;\n}"
  },

  {
    id: "ites-js-odd-even",
    courseId: "ites",
    title: "Odd or Even Number",
    instructions: "Write a function isEven(num) that returns true if the number is even, false if odd.",
    starterCode: {
      html: "",
      css: "",
      js: "function isEven(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "4", expected: "true" },
      { input: "7", expected: "false" },
      { input: "0", expected: "true" },
      { input: "10", expected: "true" },
      { input: "15", expected: "false" }
    ],
    hints: [
      "Use the modulo operator %",
      "Even numbers divide evenly by 2",
      "num % 2 === 0 means even"
    ],
    solution: "function isEven(num) {\n  return num % 2 === 0;\n}"
  },

  {
    id: "ites-js-string-check",
    courseId: "ites",
    title: "String Contains 'a'",
    instructions: "Write a function containsA(str) that returns true if the string contains letter 'a', false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function containsA(str) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'apple'", expected: "true" },
      { input: "'banana'", expected: "true" },
      { input: "'test'", expected: "false" },
      { input: "'APPLE'", expected: "false" },
      { input: "'car'", expected: "true" }
    ],
    hints: [
      "Use the includes() method",
      "str.includes('a') checks if 'a' is in str",
      "Case sensitive - 'a' not equal to 'A'"
    ],
    solution: "function containsA(str) {\n  return str.includes('a');\n}"
  },

  {
    id: "ites-js-leap-year",
    courseId: "ites",
    title: "Leap Year Check",
    instructions: "Write a function isLeapYear(year) that returns true if the year is a leap year. Rules: divisible by 4 AND (not divisible by 100 OR divisible by 400).",
    starterCode: {
      html: "",
      css: "",
      js: "function isLeapYear(year) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "2024", expected: "true" },
      { input: "2023", expected: "false" },
      { input: "2000", expected: "true" },
      { input: "1900", expected: "false" },
      { input: "2020", expected: "true" }
    ],
    hints: [
      "Leap year if divisible by 4",
      "Exception: NOT leap if divisible by 100",
      "Exception to exception: IS leap if divisible by 400",
      "Use % operator and logical operators"
    ],
    solution: "function isLeapYear(year) {\n  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);\n}"
  },

  {
    id: "ites-js-greater-100",
    courseId: "ites",
    title: "Number Greater Than 100",
    instructions: "Write a function isGreaterThan100(num) that returns true if num > 100, false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function isGreaterThan100(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "150", expected: "true" },
      { input: "50", expected: "false" },
      { input: "100", expected: "false" },
      { input: "101", expected: "true" },
      { input: "99", expected: "false" }
    ],
    hints: [
      "Use > operator",
      "100 is NOT greater than 100",
      "Return boolean"
    ],
    solution: "function isGreaterThan100(num) {\n  return num > 100;\n}"
  },

  // ==================== ITES JAVASCRIPT SET 2 ====================

  {
    id: "ites-js-greatest",
    courseId: "ites",
    title: "Compare Two Numbers",
    instructions: "Write a function findGreatest(a, b) that returns the greater of two numbers.",
    starterCode: {
      html: "",
      css: "",
      js: "function findGreatest(a, b) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "10, 5", expected: "10" },
      { input: "3, 8", expected: "8" },
      { input: "7, 7", expected: "7" },
      { input: "-5, -10", expected: "-5" }
    ],
    hints: [
      "Use if-else or ternary operator",
      "Compare with > operator",
      "If equal, return either one"
    ],
    solution: "function findGreatest(a, b) {\n  return a > b ? a : b;\n}"
  },

  {
    id: "ites-js-driving-eligibility",
    courseId: "ites",
    title: "Driving Eligibility",
    instructions: "Write a function canDrive(age) that returns 'Eligible' if age >= 18, otherwise 'Not Eligible'.",
    starterCode: {
      html: "",
      css: "",
      js: "function canDrive(age) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "18", expected: "'Eligible'" },
      { input: "17", expected: "'Not Eligible'" },
      { input: "25", expected: "'Eligible'" },
      { input: "16", expected: "'Not Eligible'" }
    ],
    hints: [
      "Check if age >= 18",
      "Return string 'Eligible' or 'Not Eligible'",
      "Use if-else or ternary"
    ],
    solution: "function canDrive(age) {\n  return age >= 18 ? 'Eligible' : 'Not Eligible';\n}"
  },

  {
    id: "ites-js-pos-neg-zero",
    courseId: "ites",
    title: "Positive, Negative, or Zero",
    instructions: "Write a function checkNumber(num) that returns 'Positive', 'Negative', or 'Zero'.",
    starterCode: {
      html: "",
      css: "",
      js: "function checkNumber(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "5", expected: "'Positive'" },
      { input: "-3", expected: "'Negative'" },
      { input: "0", expected: "'Zero'" },
      { input: "100", expected: "'Positive'" },
      { input: "-50", expected: "'Negative'" }
    ],
    hints: [
      "Use if-else-if chain",
      "Check if num > 0, num < 0, or num === 0",
      "Return appropriate string"
    ],
    solution: "function checkNumber(num) {\n  if (num > 0) return 'Positive';\n  if (num < 0) return 'Negative';\n  return 'Zero';\n}"
  },

  {
    id: "ites-js-leap-year-input",
    courseId: "ites",
    title: "Determine Given Year Leap or Not",
    instructions: "Same as earlier leap year function - returns true for leap years, false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function isLeapYear(year) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "2024", expected: "true" },
      { input: "1900", expected: "false" },
      { input: "2000", expected: "true" },
      { input: "2100", expected: "false" }
    ],
    solution: "function isLeapYear(year) {\n  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);\n}"
  },

  {
    id: "ites-js-password-match",
    courseId: "ites",
    title: "Password Match",
    instructions: "Write a function passwordsMatch(pass1, pass2) that returns true if both passwords are identical, false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function passwordsMatch(pass1, pass2) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'pass123', 'pass123'", expected: "true" },
      { input: "'pass123', 'pass456'", expected: "false" },
      { input: "'test', 'test'", expected: "true" },
      { input: "'ABC', 'abc'", expected: "false" }
    ],
    hints: [
      "Use === operator to compare",
      "Passwords are case-sensitive",
      "Return boolean"
    ],
    solution: "function passwordsMatch(pass1, pass2) {\n  return pass1 === pass2;\n}"
  },

  // ==================== ITES JAVASCRIPT SET 3 ====================

  {
    id: "ites-js-weekdays",
    courseId: "ites",
    title: "Days of Week Based on Number",
    instructions: "Write a function getDayName(num) that returns day name for numbers 1-7 (1=Sunday, 7=Saturday).",
    starterCode: {
      html: "",
      css: "",
      js: "function getDayName(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "1", expected: "'Sunday'" },
      { input: "4", expected: "'Wednesday'" },
      { input: "7", expected: "'Saturday'" },
      { input: "5", expected: "'Thursday'" }
    ],
    hints: [
      "Use switch statement or array",
      "1 = Sunday, 2 = Monday, etc.",
      "Return 'Invalid' for numbers outside 1-7"
    ],
    solution: "function getDayName(num) {\n  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n  return days[num - 1] || 'Invalid';\n}"
  },

  {
    id: "ites-js-grades",
    courseId: "ites",
    title: "Grade Description",
    instructions: "Write a function getGradeDescription(grade) that returns description: A='Excellent', B='Good', C='Average', D='Below Average', F='Fail'.",
    starterCode: {
      html: "",
      css: "",
      js: "function getGradeDescription(grade) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'A'", expected: "'Excellent'" },
      { input: "'C'", expected: "'Average'" },
      { input: "'F'", expected: "'Fail'" },
      { input: "'B'", expected: "'Good'" }
    ],
    hints: [
      "Use switch statement",
      "Match each grade letter to description",
      "Handle uppercase letters"
    ],
    solution: "function getGradeDescription(grade) {\n  switch(grade) {\n    case 'A': return 'Excellent';\n    case 'B': return 'Good';\n    case 'C': return 'Average';\n    case 'D': return 'Below Average';\n    case 'F': return 'Fail';\n    default: return 'Invalid Grade';\n  }\n}"
  },

  {
    id: "ites-js-animal-type",
    courseId: "ites",
    title: "Animal Type",
    instructions: "Write a function getAnimalType(animal) that returns 'Mammal', 'Bird', 'Reptile', or 'Other'. Examples: dog/cat/elephant=Mammal, eagle/sparrow=Bird, snake/lizard=Reptile.",
    starterCode: {
      html: "",
      css: "",
      js: "function getAnimalType(animal) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'dog'", expected: "'Mammal'" },
      { input: "'eagle'", expected: "'Bird'" },
      { input: "'snake'", expected: "'Reptile'" },
      { input: "'cat'", expected: "'Mammal'" }
    ],
    hints: [
      "Use if-else or switch",
      "Create arrays for each type",
      "Check if animal is in array"
    ],
    solution: "function getAnimalType(animal) {\n  const mammals = ['dog', 'cat', 'elephant'];\n  const birds = ['eagle', 'sparrow', 'duck'];\n  const reptiles = ['snake', 'lizard'];\n  if (mammals.includes(animal)) return 'Mammal';\n  if (birds.includes(animal)) return 'Bird';\n  if (reptiles.includes(animal)) return 'Reptile';\n  return 'Other';\n}"
  },

  {
    id: "ites-js-simple-calculator",
    courseId: "ites",
    title: "Simple Calculator",
    instructions: "Write a function calculate(a, b, operator) that performs +, -, *, / operations. Return the result.",
    starterCode: {
      html: "",
      css: "",
      js: "function calculate(a, b, operator) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "5, 3, '+'", expected: "8" },
      { input: "10, 4, '-'", expected: "6" },
      { input: "6, 7, '*'", expected: "42" },
      { input: "20, 4, '/'", expected: "5" }
    ],
    hints: [
      "Use switch statement",
      "Handle each operator case",
      "Return the calculated result"
    ],
    solution: "function calculate(a, b, operator) {\n  switch(operator) {\n    case '+': return a + b;\n    case '-': return a - b;\n    case '*': return a * b;\n    case '/': return a / b;\n    default: return 'Invalid operator';\n  }\n}"
  },

  {
    id: "ites-js-month-name",
    courseId: "ites",
    title: "Month Name Based on Number",
    instructions: "Write a function getMonthName(num) that returns month name for numbers 1-12 (1=January, 12=December).",
    starterCode: {
      html: "",
      css: "",
      js: "function getMonthName(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "1", expected: "'January'" },
      { input: "6", expected: "'June'" },
      { input: "12", expected: "'December'" },
      { input: "3", expected: "'March'" }
    ],
    hints: [
      "Use array or switch",
      "Index 0 = January or 1 = January",
      "Return 'Invalid' for out of range"
    ],
    solution: "function getMonthName(num) {\n  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\n  return months[num - 1] || 'Invalid';\n}"
  },

  // ==================== ITES JAVASCRIPT SET 4 ====================

  {
    id: "ites-js-count-1-10",
    courseId: "ites",
    title: "Print Numbers 1 to 10",
    instructions: "Write a function printNumbers() that returns a string of numbers from 1 to 10 separated by spaces.",
    starterCode: {
      html: "",
      css: "",
      js: "function printNumbers() {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "", expected: "'1 2 3 4 5 6 7 8 9 10'" }
    ],
    hints: [
      "Use for loop from 1 to 10",
      "Build a string with numbers",
      "Separate with spaces"
    ],
    solution: "function printNumbers() {\n  let result = '';\n  for(let i = 1; i <= 10; i++) {\n    result += i + (i < 10 ? ' ' : '');\n  }\n  return result;\n}"
  },

  {
    id: "ites-js-sum-50-naturals",
    courseId: "ites",
    title: "Sum of First 50 Naturals",
    instructions: "Write a function sumFifty() that calculates and returns the sum of numbers 1 to 50.",
    starterCode: {
      html: "",
      css: "",
      js: "function sumFifty() {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "", expected: "1275" }
    ],
    hints: [
      "Use for loop from 1 to 50",
      "Add each number to sum",
      "Formula: n*(n+1)/2 where n=50"
    ],
    solution: "function sumFifty() {\n  let sum = 0;\n  for(let i = 1; i <= 50; i++) {\n    sum += i;\n  }\n  return sum;\n}"
  },

  {
    id: "ites-js-multiplication-table",
    courseId: "ites",
    title: "Multiplication Table",
    instructions: "Write a function multiplicationTable(num) that returns the multiplication table of num from 1 to 10 as a string (e.g., '5 10 15 20...').",
    starterCode: {
      html: "",
      css: "",
      js: "function multiplicationTable(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "5", expected: "'5 10 15 20 25 30 35 40 45 50'" },
      { input: "3", expected: "'3 6 9 12 15 18 21 24 27 30'" },
      { input: "2", expected: "'2 4 6 8 10 12 14 16 18 20'" }
    ],
    hints: [
      "Use for loop from 1 to 10",
      "Multiply num by i in each iteration",
      "Build string with results"
    ],
    solution: "function multiplicationTable(num) {\n  let result = '';\n  for(let i = 1; i <= 10; i++) {\n    result += (num * i) + (i < 10 ? ' ' : '');\n  }\n  return result;\n}"
  },

  {
    id: "ites-js-even-1-100",
    courseId: "ites",
    title: "Even Numbers 1 to 100",
    instructions: "Write a function printEvens() that returns all even numbers between 1 and 100 as a string separated by spaces.",
    starterCode: {
      html: "",
      css: "",
      js: "function printEvens() {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "", expected: "'2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40 42 44 46 48 50 52 54 56 58 60 62 64 66 68 70 72 74 76 78 80 82 84 86 88 90 92 94 96 98 100'" }
    ],
    hints: [
      "Use for loop from 2 to 100, increment by 2",
      "Or use i % 2 === 0 to check even",
      "Build string with all even numbers"
    ],
    solution: "function printEvens() {\n  let result = '';\n  for(let i = 2; i <= 100; i += 2) {\n    result += i + (i < 100 ? ' ' : '');\n  }\n  return result;\n}"
  },

  {
    id: "ites-js-reverse-string",
    courseId: "ites",
    title: "Reverse String",
    instructions: "Write a function reverseString(str) that reverses the input string using a for loop.",
    starterCode: {
      html: "",
      css: "",
      js: "function reverseString(str) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'hello'", expected: "'olleh'" },
      { input: "'world'", expected: "'dlrow'" },
      { input: "'test'", expected: "'tset'" },
      { input: "'javascript'", expected: "'tpircsavaj'" }
    ],
    hints: [
      "Loop from last index to 0",
      "Build new string by adding characters backwards",
      "Or use split, reverse, join methods"
    ],
    solution: "function reverseString(str) {\n  let reversed = '';\n  for(let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}"
  },

  // ==================== WP (Web Programming) ====================

  {
    id: "wp-form-validation",
    courseId: "wp",
    title: "Form Validation",
    instructions: "Write a function validateForm(name, email) that returns true if name is not empty and email contains '@', false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function validateForm(name, email) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'John', 'john@example.com'", expected: "true" },
      { input: "'', 'test@mail.com'", expected: "false" },
      { input: "'Jane', 'invalid-email'", expected: "false" },
      { input: "'Bob', 'bob@test.com'", expected: "true" }
    ],
    hints: [
      "Check if name.length > 0",
      "Check if email.includes('@')",
      "Both conditions must be true"
    ],
    solution: "function validateForm(name, email) {\n  return name.length > 0 && email.includes('@');\n}"
  },

  {
    id: "wp-internal-js",
    courseId: "wp",
    title: "Internal JavaScript",
    instructions: "Create HTML with internal JavaScript that displays an alert 'Hello World' when page loads.",
    starterCode: {
      html: `<!DOCTYPE html>\n<html>\n<head>\n  <script>\n    // Your code here\n  </script>\n</head>\n<body>\n  <h1>Internal JS</h1>\n</body>\n</html>`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains <script> tag inside <head>",
        validate: (code) => code.includes('<script>') && code.includes('</script>')
      },
      {
        input: "HTML code",
        expected: "Has alert or console.log",
        validate: (code) => code.includes('alert') || code.includes('console.log')
      }
    ],
    solution: `<!DOCTYPE html>\n<html>\n<head>\n  <script>\n    window.onload = function() {\n      alert('Hello World');\n    }\n  </script>\n</head>\n<body>\n  <h1>Internal JS</h1>\n</body>\n</html>`
  },

  {
    id: "wp-external-js",
    courseId: "wp",
    title: "External JavaScript",
    instructions: "Create HTML that links to an external JavaScript file using <script src='script.js'>.",
    starterCode: {
      html: `<!DOCTYPE html>\n<html>\n<head>\n  <!-- Link external JS here -->\n</head>\n<body>\n  <h1>External JS Example</h1>\n</body>\n</html>`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains <script src=",
        validate: (code) => code.includes('<script src=') || code.includes('<script src ')
      },
      {
        input: "HTML code",
        expected: "References external file",
        validate: (code) => code.includes('.js')
      }
    ],
    solution: `<!DOCTYPE html>\n<html>\n<head>\n  <script src="script.js"></script>\n</head>\n<body>\n  <h1>External JS Example</h1>\n</body>\n</html>`
  },

  {
    id: "wp-positivity-js",
    courseId: "wp",
    title: "Positive Number Using JS",
    instructions: "Write a function isPositive(num) that returns true if num > 0, false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function isPositive(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "5", expected: "true" },
      { input: "-3", expected: "false" },
      { input: "0", expected: "false" }
    ],
    solution: "function isPositive(num) {\n  return num > 0;\n}"
  },

  {
    id: "wp-leap-year-js",
    courseId: "wp",
    title: "Leap Year Using JS",
    instructions: "Write a function isLeapYear(year) to check if year is a leap year.",
    starterCode: {
      html: "",
      css: "",
      js: "function isLeapYear(year) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "2024", expected: "true" },
      { input: "2023", expected: "false" },
      { input: "2000", expected: "true" },
      { input: "1900", expected: "false" }
    ],
    solution: "function isLeapYear(year) {\n  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);\n}"
  },

  {
    id: "wp-calculator-switch",
    courseId: "wp",
    title: "Simple Calculator (Switch Case in JS)",
    instructions: "Write a function calculator(a, b, op) using switch case for +, -, *, / operations.",
    starterCode: {
      html: "",
      css: "",
      js: "function calculator(a, b, op) {\n  // Your code here using switch\n  \n}"
    },
    testCases: [
      { input: "10, 5, '+'", expected: "15" },
      { input: "10, 5, '-'", expected: "5" },
      { input: "10, 5, '*'", expected: "50" },
      { input: "10, 5, '/'", expected: "2" }
    ],
    hints: [
      "Use switch(op) statement",
      "Each case handles one operation",
      "Return the result"
    ],
    solution: "function calculator(a, b, op) {\n  switch(op) {\n    case '+': return a + b;\n    case '-': return a - b;\n    case '*': return a * b;\n    case '/': return a / b;\n    default: return 'Invalid';\n  }\n}"
  },

  {
    id: "wp-js-events",
    courseId: "wp",
    title: "JavaScript Events",
    instructions: "Create HTML with a button that shows an alert when clicked using onclick event.",
    starterCode: {
      html: `<button>Click Me</button>\n<script>\n// Add event handler here\n</script>`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains onclick or addEventListener",
        validate: (code) => code.includes('onclick') || code.includes('addEventListener')
      },
      {
        input: "HTML code",
        expected: "Has alert or function call",
        validate: (code) => code.includes('alert') || code.includes('function')
      }
    ],
    solution: `<button onclick="alert('Button clicked!')">Click Me</button>`
  },

  {
    id: "wp-bootstrap-grid",
    courseId: "wp",
    title: "Bootstrap Grid",
    instructions: "Create a Bootstrap 3-column layout using container, row, and col classes.",
    starterCode: {
      html: `<!-- Create Bootstrap grid here -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains container or container-fluid",
        validate: (code) => code.includes('container')
      },
      {
        input: "HTML code",
        expected: "Contains row class",
        validate: (code) => code.includes('row')
      },
      {
        input: "HTML code",
        expected: "Contains col classes",
        validate: (code) => code.includes('col')
      }
    ],
    solution: `<div class="container">\n  <div class="row">\n    <div class="col">Column 1</div>\n    <div class="col">Column 2</div>\n    <div class="col">Column 3</div>\n  </div>\n</div>`
  },

  {
    id: "wp-bootstrap-offset",
    courseId: "wp",
    title: "Bootstrap Offset",
    instructions: "Create a 2-column layout where the second column has an offset of 2 units.",
    starterCode: {
      html: `<!-- Create Bootstrap offset layout -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains container and row",
        validate: (code) => code.includes('container') && code.includes('row')
      },
      {
        input: "HTML code",
        expected: "Contains offset class",
        validate: (code) => code.includes('offset')
      }
    ],
    solution: `<div class="container">\n  <div class="row">\n    <div class="col-4">Column 1</div>\n    <div class="col-4 offset-2">Column 2 (offset)</div>\n  </div>\n</div>`
  },

  {
    id: "wp-bootstrap-table",
    courseId: "wp",
    title: "Bootstrap Tables",
    instructions: "Create a table with Bootstrap table classes for styling.",
    starterCode: {
      html: `<!-- Create Bootstrap table -->\n`,
      css: "",
      js: ""
    },
    testCases: [
      {
        input: "HTML code",
        expected: "Contains <table> tag",
        validate: (code) => code.includes('<table')
      },
      {
        input: "HTML code",
        expected: "Has Bootstrap table class",
        validate: (code) => code.includes('class="table') || code.includes("class='table")
      },
      {
        input: "HTML code",
        expected: "Has table headers and rows",
        validate: (code) => code.includes('<th>') && code.includes('<tr>')
      }
    ],
    solution: `<table class="table table-striped">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Score</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>John</td>\n      <td>85</td>\n    </tr>\n    <tr>\n      <td>Jane</td>\n      <td>92</td>\n    </tr>\n  </tbody>\n</table>`
  },

  {
    id: "wp-factorial-php",
    courseId: "wp",
    title: "Factorial of a Number using PHP",
    instructions: "Write PHP code to calculate factorial of a number. For testing, create a function factorial(n).",
    starterCode: {
      html: "",
      css: "",
      js: "// Simulate as JS for testing\nfunction factorial(n) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "5", expected: "120" },
      { input: "4", expected: "24" },
      { input: "3", expected: "6" },
      { input: "0", expected: "1" }
    ],
    hints: [
      "Use for loop from 1 to n",
      "Multiply result by each number",
      "0! = 1"
    ],
    solution: "function factorial(n) {\n  if (n === 0) return 1;\n  let result = 1;\n  for(let i = 1; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}"
  },

  {
    id: "wp-weekdays-switch-php",
    courseId: "wp",
    title: "Weekdays Using Switch Case Using PHP",
    instructions: "Write a function getDayName(num) using switch case (1=Sunday...7=Saturday).",
    starterCode: {
      html: "",
      css: "",
      js: "function getDayName(num) {\n  // Use switch case\n  \n}"
    },
    testCases: [
      { input: "1", expected: "'Sunday'" },
      { input: "3", expected: "'Tuesday'" },
      { input: "7", expected: "'Saturday'" }
    ],
    solution: "function getDayName(num) {\n  switch(num) {\n    case 1: return 'Sunday';\n    case 2: return 'Monday';\n    case 3: return 'Tuesday';\n    case 4: return 'Wednesday';\n    case 5: return 'Thursday';\n    case 6: return 'Friday';\n    case 7: return 'Saturday';\n    default: return 'Invalid';\n  }\n}"
  },

  {
    id: "wp-multiplication-table-php",
    courseId: "wp",
    title: "Multiplication Table Using PHP",
    instructions: "Write a function printTable(num) that returns multiplication table of num from 1 to 10.",
    starterCode: {
      html: "",
      css: "",
      js: "function printTable(num) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "7", expected: "'7 14 21 28 35 42 49 56 63 70'" },
      { input: "4", expected: "'4 8 12 16 20 24 28 32 36 40'" }
    ],
    solution: "function printTable(num) {\n  let result = '';\n  for(let i = 1; i <= 10; i++) {\n    result += (num * i) + (i < 10 ? ' ' : '');\n  }\n  return result;\n}"
  },

  // ==================== WS (Web Scripting) ====================

  {
    id: "ws-form-validation",
    courseId: "ws",
    title: "Form Validation using JavaScript",
    instructions: "Write a function validateForm(name, email, password) that returns true if: name not empty, email contains '@', password length >= 6.",
    starterCode: {
      html: "",
      css: "",
      js: "function validateForm(name, email, password) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'John', 'john@test.com', 'pass123'", expected: "true" },
      { input: "'', 'test@mail.com', 'password'", expected: "false" },
      { input: "'Jane', 'invalid-email', 'pass123'", expected: "false" },
      { input: "'Bob', 'bob@test.com', '123'", expected: "false" }
    ],
    hints: [
      "Check name.length > 0",
      "Check email.includes('@')",
      "Check password.length >= 6",
      "All must be true"
    ],
    solution: "function validateForm(name, email, password) {\n  return name.length > 0 && email.includes('@') && password.length >= 6;\n}"
  },

  {
    id: "ws-login-auth",
    courseId: "ws",
    title: "JavaScript Login Authentication",
    instructions: "Write a function authenticate(username, password) that returns true if username='admin' AND password='admin123', false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function authenticate(username, password) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'admin', 'admin123'", expected: "true" },
      { input: "'admin', 'wrongpass'", expected: "false" },
      { input: "'user', 'admin123'", expected: "false" },
      { input: "'Admin', 'admin123'", expected: "false" }
    ],
    hints: [
      "Compare username with 'admin'",
      "Compare password with 'admin123'",
      "Both must match exactly (case-sensitive)"
    ],
    solution: "function authenticate(username, password) {\n  return username === 'admin' && password === 'admin123';\n}"
  },

  {
    id: "ws-todo-list",
    courseId: "ws",
    title: "JavaScript To-Do List",
    instructions: "Write a function addTask(tasks, newTask) that adds newTask to tasks array and returns the updated array.",
    starterCode: {
      html: "",
      css: "",
      js: "function addTask(tasks, newTask) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "[], 'Buy milk'", expected: "['Buy milk']" },
      { input: "['Task 1'], 'Task 2'", expected: "['Task 1', 'Task 2']" },
      { input: "['A', 'B'], 'C'", expected: "['A', 'B', 'C']" }
    ],
    hints: [
      "Use push() method",
      "Or use spread operator [...tasks, newTask]",
      "Return the array"
    ],
    solution: "function addTask(tasks, newTask) {\n  tasks.push(newTask);\n  return tasks;\n}"
  },

  {
    id: "ws-quiz",
    courseId: "ws",
    title: "JavaScript Quiz",
    instructions: "Write a function checkAnswer(userAnswer, correctAnswer) that returns true if answers match (case-insensitive).",
    starterCode: {
      html: "",
      css: "",
      js: "function checkAnswer(userAnswer, correctAnswer) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'Paris', 'Paris'", expected: "true" },
      { input: "'paris', 'Paris'", expected: "true" },
      { input: "'London', 'Paris'", expected: "false" },
      { input: "'PARIS', 'Paris'", expected: "true" }
    ],
    hints: [
      "Convert both to lowercase",
      "Use toLowerCase() method",
      "Compare the results"
    ],
    solution: "function checkAnswer(userAnswer, correctAnswer) {\n  return userAnswer.toLowerCase() === correctAnswer.toLowerCase();\n}"
  },

  {
    id: "ws-isbn-check",
    courseId: "ws",
    title: "ISBN-10 Validator",
    instructions: "Write a function isValidISBN10(isbn) that validates ISBN-10. ISBN-10 has 10 digits where each digit multiplied by its position (10 to 1) should sum to a multiple of 11.",
    starterCode: {
      html: "",
      css: "",
      js: "function isValidISBN10(isbn) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'0306406152'", expected: "true" },
      { input: "'1234567890'", expected: "false" },
      { input: "'0471958697'", expected: "true" }
    ],
    hints: [
      "ISBN must be exactly 10 characters",
      "Sum = digit1*10 + digit2*9 + ... + digit10*1",
      "Sum % 11 should be 0"
    ],
    solution: "function isValidISBN10(isbn) {\n  if (isbn.length !== 10) return false;\n  let sum = 0;\n  for(let i = 0; i < 10; i++) {\n    sum += parseInt(isbn[i]) * (10 - i);\n  }\n  return sum % 11 === 0;\n}"
  },

  {
    id: "ws-matching-card-game",
    courseId: "ws",
    title: "Matching Card Game",
    instructions: "Write a function cardsMatch(card1, card2) that returns true if both cards are equal, false otherwise.",
    starterCode: {
      html: "",
      css: "",
      js: "function cardsMatch(card1, card2) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'A', 'A'", expected: "true" },
      { input: "'K', 'Q'", expected: "false" },
      { input: "'5', '5'", expected: "true" },
      { input: "'heart', 'diamond'", expected: "false" }
    ],
    hints: [
      "Simple equality check",
      "Use === operator",
      "Return boolean"
    ],
    solution: "function cardsMatch(card1, card2) {\n  return card1 === card2;\n}"
  },

  {
    id: "ws-image-upload",
    courseId: "ws",
    title: "Image and File Upload",
    instructions: "Write a function getFileExtension(filename) that returns the file extension (e.g., 'image.jpg' returns 'jpg').",
    starterCode: {
      html: "",
      css: "",
      js: "function getFileExtension(filename) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'photo.jpg'", expected: "'jpg'" },
      { input: "'document.pdf'", expected: "'pdf'" },
      { input: "'image.png'", expected: "'png'" },
      { input: "'file.txt'", expected: "'txt'" }
    ],
    hints: [
      "Find the last dot in filename",
      "Get substring after the dot",
      "Use lastIndexOf('.') and substring()"
    ],
    solution: "function getFileExtension(filename) {\n  return filename.substring(filename.lastIndexOf('.') + 1);\n}"
  },

  {
    id: "ws-secret-message",
    courseId: "ws",
    title: "Secret Message Passing",
    instructions: "Write a function encodeMessage(msg) that reverses the message string as a simple encoding.",
    starterCode: {
      html: "",
      css: "",
      js: "function encodeMessage(msg) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "'hello'", expected: "'olleh'" },
      { input: "'secret'", expected: "'terces'" },
      { input: "'world'", expected: "'dlrow'" }
    ],
    hints: [
      "Reverse the string",
      "Use split, reverse, join",
      "Or loop backwards"
    ],
    solution: "function encodeMessage(msg) {\n  return msg.split('').reverse().join('');\n}"
  },

  {
    id: "ws-budget-app",
    courseId: "ws",
    title: "Budget Application Project",
    instructions: "Write a function calculateBalance(income, expenses) that returns the balance (income - expenses).",
    starterCode: {
      html: "",
      css: "",
      js: "function calculateBalance(income, expenses) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "1000, 600", expected: "400" },
      { input: "5000, 3500", expected: "1500" },
      { input: "800, 800", expected: "0" },
      { input: "2000, 2500", expected: "-500" }
    ],
    hints: [
      "Subtract expenses from income",
      "Return the result",
      "Can be negative if expenses > income"
    ],
    solution: "function calculateBalance(income, expenses) {\n  return income - expenses;\n}"
  },

  {
    id: "ws-calculator",
    courseId: "ws",
    title: "Calculator Project",
    instructions: "Write a function calculate(num1, num2, operator) that performs basic operations (+, -, *, /).",
    starterCode: {
      html: "",
      css: "",
      js: "function calculate(num1, num2, operator) {\n  // Your code here\n  \n}"
    },
    testCases: [
      { input: "10, 5, '+'", expected: "15" },
      { input: "10, 5, '-'", expected: "5" },
      { input: "10, 5, '*'", expected: "50" },
      { input: "10, 5, '/'", expected: "2" }
    ],
    hints: [
      "Use switch or if-else",
      "Handle each operator",
      "Return calculated result"
    ],
    solution: "function calculate(num1, num2, operator) {\n  switch(operator) {\n    case '+': return num1 + num2;\n    case '-': return num1 - num2;\n    case '*': return num1 * num2;\n    case '/': return num1 / num2;\n    default: return 'Invalid operator';\n  }\n}"
  }
];

export default lessons;

