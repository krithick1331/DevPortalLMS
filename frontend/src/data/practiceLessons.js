export const lessons = [
  // --- ITES HTML & CSS ---
  {
    id: "ites-html-list",
    courseId: "ites",
    title: "List in HTML",
    instructions: "Create both an unordered and ordered list for items of your choice.",
    starterCode: {
      html: `<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n</ul>\n<ol>\n  <li>Red</li>\n  <li>Blue</li>\n</ol>`,
      css: "",
    }
  },
  {
    id: "ites-html-table",
    courseId: "ites",
    title: "Table in HTML",
    instructions: "Make a table with Name, Age, City as headings and add two data rows.",
    starterCode: {
      html: `<table border="1">\n<tr><th>Name</th><th>Age</th><th>City</th></tr>\n<tr><td>Amit</td><td>21</td><td>Delhi</td></tr>\n<tr><td>Priya</td><td>22</td><td>Mumbai</td></tr>\n</table>`,
      css: "",
    }
  },
  {
    id: "ites-html-form",
    courseId: "ites",
    title: "Form in HTML",
    instructions: "Make a contact form with fields for name, email, and message.",
    starterCode: {
      html: `<form>\n  <label>Name:</label>\n  <input type="text" name="name">\n  <label>Email:</label>\n  <input type="email" name="email">\n  <label>Message:</label>\n  <textarea name="message"></textarea>\n  <button type="submit">Send</button>\n</form>`,
      css: "",
    }
  },
  {
    id: "ites-html-nested-list",
    courseId: "ites",
    title: "Multi-level Nested List",
    instructions: "Create a nested list showing categories and subcategories.",
    starterCode: {
      html: `<ul>\n  <li>Electronics\n    <ul>\n      <li>Phones</li>\n      <li>Laptops</li>\n    </ul>\n  </li>\n  <li>Clothing\n    <ul>\n      <li>Men</li>\n      <li>Women</li>\n    </ul>\n  </li>\n</ul>`,
      css: "",
    }
  },
  {
    id: "ites-html-style",
    courseId: "ites",
    title: "Simple Style Page",
    instructions: "Style headings and paragraphs with color and font.",
    starterCode: {
      html: `<h1>Styled Webpage</h1>\n<p>This is a styled paragraph.</p>`,
      css: `h1 { color: green; font-family: Arial; }\np { color: gray; font-size: 18px; }`,
    }
  },
  {
    id: "ites-html-image-table",
    courseId: "ites",
    title: "Images in Table",
    instructions: "Place images inside your HTML table cells.",
    starterCode: {
      html: `<table border="1">\n<tr>\n<td><img src="img1.jpg" width="100"></td>\n<td><img src="img2.jpg" width="100"></td>\n</tr>\n</table>`,
      css: "",
    }
  },
  {
    id: "ites-html-weather-table",
    courseId: "ites",
    title: "Weather Station Table",
    instructions: "Create a table showing weather data for different cities.",
    starterCode: {
      html: `<table border="1">\n<tr><th>City</th><th>Temperature</th><th>Condition</th></tr>\n<tr><td>Chennai</td><td>32°C</td><td>Sunny</td></tr>\n<tr><td>Delhi</td><td>28°C</td><td>Cloudy</td></tr>\n</table>`,
      css: "",
    }
  },
  {
    id: "ites-html-seminar-schedule",
    courseId: "ites",
    title: "Seminar Schedule",
    instructions: "Build a seminar schedule using HTML tables.",
    starterCode: {
      html: `<table border="1">\n<tr><th>Time</th><th>Topic</th></tr>\n<tr><td>10am</td><td>Intro</td></tr>\n<tr><td>11am</td><td>Web Dev</td></tr>\n</table>`,
      css: "",
    }
  },
  {
    id: "ites-css-navbar",
    courseId: "ites",
    title: "CSS Navigation Bar",
    instructions: "Create and style a navigation bar with four links.",
    starterCode: {
      html: `<nav>\n  <a href="#">Home</a>\n  <a href="#">About</a>\n  <a href="#">Contact</a>\n  <a href="#">Help</a>\n</nav>`,
      css: `nav { background: #333; padding: 10px; }\nnav a { color: #fff; padding: 8px; text-decoration: none; }`,
    }
  },
  {
    id: "ites-css-login",
    courseId: "ites",
    title: "Login Page",
    instructions: "Build a login form styled with CSS.",
    starterCode: {
      html: `<form>\n  <input type="text" placeholder="Username">\n  <input type="password" placeholder="Password">\n  <button>Login</button>\n</form>`,
      css: `form { background: #eee; padding: 18px; max-width: 300px; }\ninput { display: block; margin: 8px 0; }`,
    }
  },
  {
    id: "ites-css-signup",
    courseId: "ites",
    title: "Signup Page",
    instructions: "Build a signup form and style it.",
    starterCode: {
      html: `<form>\n  <input type="text" placeholder="Name">\n  <input type="email" placeholder="Email">\n  <input type="password" placeholder="Password">\n  <button>Sign Up</button>\n</form>`,
      css: `form { background: #fafafa; padding: 18px; max-width: 350px; }\ninput { display: block; margin: 10px 0; }`,
    }
  },
  {
    id: "ites-html-css-simple-webpage",
    courseId: "ites",
    title: "Simple Webpage with HTML and CSS",
    instructions: "Create a basic HTML page, add some CSS for color and font.",
    starterCode: {
      html: `<h1>Welcome</h1>\n<p>This is a simple webpage styled with CSS.</p>`,
      css: `body { background: #f7f7f7; }\nh1 { color: #3498db; }\np { font-size: 18px; }`,
    }
  },

  // --- ITES JavaScript Set 1 ---
  {
    id: "ites-js-positive",
    courseId: "ites",
    title: "Check if Number is Positive",
    instructions: "Create an input and button. Show 'Positive' or 'Not Positive' when checked.",
    starterCode: {
      html: `<input type="number" id="num"><button onclick="checkPositive()">Check</button><p id="result"></p>`,
      js: `function checkPositive() {\n  let n = document.getElementById("num").value;\n  document.getElementById("result").innerText = (n > 0) ? "Positive" : "Not Positive";\n}`
    },
    testCases: [
      { input: "5", expected: "Positive", description: "Positive number should show 'Positive'" },
      { input: "-3", expected: "Not Positive", description: "Negative number should show 'Not Positive'" },
      { input: "0", expected: "Not Positive", description: "Zero should show 'Not Positive'" }
    ]
  },
  {
    id: "ites-js-odd-even",
    courseId: "ites",
    title: "Odd or Even Number",
    instructions: "Test a number to check odd/even.",
    starterCode: {
      html: `<input id="oe"><button onclick="checkOE()">Odd/Even</button><p id="res"></p>`,
      js: `function checkOE() {\n  let n = Number(document.getElementById('oe').value);\n  document.getElementById('res').innerText = (n % 2 === 0) ? "Even" : "Odd";\n}`
    },
    testCases: [
      { input: "4", expected: "Even", description: "Even number should show 'Even'" },
      { input: "7", expected: "Odd", description: "Odd number should show 'Odd'" },
      { input: "0", expected: "Even", description: "Zero should show 'Even'" }
    ]
  },
  {
    id: "ites-js-string-check",
    courseId: "ites",
    title: "String Contains 'a'",
    instructions: "Enter a string, check if it contains 'a'.",
    starterCode: {
      html: `<input id="str"><button onclick="hasA()">Check for 'a'</button><p id="msgA"></p>`,
      js: `function hasA() {\n  let s = document.getElementById('str').value;\n  document.getElementById('msgA').innerText = (s.includes('a')) ? "Contains 'a'" : "Does not contain 'a'";\n}`
    },
    testCases: [
      { input: "apple", expected: "Contains 'a'", description: "'apple' contains 'a'" },
      { input: "banana", expected: "Contains 'a'", description: "'banana' contains 'a'" },
      { input: "xyz", expected: "Does not contain 'a'", description: "'xyz' does not contain 'a'" }
    ]
  },
  {
    id: "ites-js-leap-year",
    courseId: "ites",
    title: "Leap Year Check",
    instructions: "Check if input year is a leap year.",
    starterCode: {
      html: `<input id="year"><button onclick="isLeap()">Leap?</button><p id="msg"></p>`,
      js: `function isLeap() {\n  let y = Number(document.getElementById('year').value);\n  document.getElementById('msg').innerText = ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) ? "Leap year" : "Not a leap year";\n}`
    },
    testCases: [
      { input: "2000", expected: "Leap year", description: "2000 is a leap year" },
      { input: "2020", expected: "Leap year", description: "2020 is a leap year" },
      { input: "2001", expected: "Not a leap year", description: "2001 is not a leap year" },
      { input: "1900", expected: "Not a leap year", description: "1900 is not a leap year" }
    ]
  },
  {
    id: "ites-js-greater-100",
    courseId: "ites",
    title: "Number Greater Than 100",
    instructions: "Show if number is greater than 100.",
    starterCode: {
      html: `<input id="num100"><button onclick="check100()">Check</button><p id="msg100"></p>`,
      js: `function check100() {\n  let n = Number(document.getElementById('num100').value);\n  document.getElementById('msg100').innerText = (n > 100) ? "Greater than 100" : "Not greater than 100";\n}`
    },
    testCases: [
      { input: "150", expected: "Greater than 100", description: "150 is greater than 100" },
      { input: "50", expected: "Not greater than 100", description: "50 is not greater than 100" },
      { input: "100", expected: "Not greater than 100", description: "100 is not greater than 100" }
    ]
  },


  // --- ITES JavaScript Set 2 ---
  {
    id: "ites-js-greatest",
    courseId: "ites",
    title: "Compare Two Numbers",
    instructions: "Create two input fields and a button. Display which number is greatest.",
    starterCode: {
      html: `<input id="num1" type="number"> <input id="num2" type="number"> <button onclick="findGreatest()">Find Greatest</button> <p id="greatest"></p>`,
      js: `function findGreatest() {\n  let a = Number(document.getElementById('num1').value);\n  let b = Number(document.getElementById('num2').value);\n  document.getElementById('greatest').innerText = (a > b) ? a + " is greatest" : b + " is greatest";\n}`
    },
    testCases: [
      { input: "10,20", expected: "20 is greatest", description: "20 is greater than 10" },
      { input: "50,25", expected: "50 is greatest", description: "50 is greater than 25" },
      { input: "10,10", expected: "10 is greatest", description: "Equal numbers" }
    ]
  },
  {
    id: "ites-js-driving-eligibility",
    courseId: "ites",
    title: "Driving Eligibility",
    instructions: "Input your age and display if you are eligible to drive (age ≥ 18).",
    starterCode: {
      html: `<input id="age" type="number"> <button onclick="checkDrive()">Check Eligibility</button> <p id="driveRes"></p>`,
      js: `function checkDrive() {\n  let age = Number(document.getElementById('age').value);\n  document.getElementById('driveRes').innerText = (age >= 18) ? "Eligible to drive" : "Not eligible to drive";\n}`
    },
    testCases: [
      { input: "18", expected: "Eligible to drive", description: "Age 18 is eligible" },
      { input: "25", expected: "Eligible to drive", description: "Age 25 is eligible" },
      { input: "16", expected: "Not eligible to drive", description: "Age 16 is not eligible" }
    ]
  },
  {
    id: "ites-js-pos-neg-zero",
    courseId: "ites",
    title: "Positive, Negative, or Zero",
    instructions: "Input a number and display whether it is positive, negative, or zero.",
    starterCode: {
      html: `<input id="pnz" type="number"> <button onclick="checkPNZ()">Check</button> <p id="pnzRes"></p>`,
      js: `function checkPNZ() {\n  let n = Number(document.getElementById('pnz').value);\n  let res = (n > 0) ? "Positive" : (n < 0) ? "Negative" : "Zero";\n  document.getElementById('pnzRes').innerText = res;\n}`
    },
    testCases: [
      { input: "10", expected: "Positive", description: "Positive number" },
      { input: "-5", expected: "Negative", description: "Negative number" },
      { input: "0", expected: "Zero", description: "Zero" }
    ]
  },
  {
    id: "ites-js-leap-year-input",
    courseId: "ites",
    title: "Determine Given Year Leap or Not",
    instructions: "Input a year and display if it is a leap year.",
    starterCode: {
      html: `<input id="leapYearInput" type="number"> <button onclick="checkLeapYear()">Leap?</button> <p id="leapYearResult"></p>`,
      js: `function checkLeapYear() {\n  let y = Number(document.getElementById('leapYearInput').value);\n  let isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);\n  document.getElementById('leapYearResult').innerText = isLeap ? "Leap year" : "Not a leap year";\n}`
    },
    testCases: [
      { input: "2020", expected: "Leap year", description: "2020 is a leap year" },
      { input: "2024", expected: "Leap year", description: "2024 is a leap year" },
      { input: "2021", expected: "Not a leap year", description: "2021 is not a leap year" }
    ]
  },
  {
    id: "ites-js-password-match",
    courseId: "ites",
    title: "Password Match",
    instructions: "Check if two entered passwords match and display a confirmation message.",
    starterCode: {
      html: `<input id="pass1" type="password" placeholder="Enter password"> <input id="pass2" type="password" placeholder="Repeat password"> <button onclick="checkPass()">Check</button> <p id="passMsg"></p>`,
      js: `function checkPass() {\n  let p1 = document.getElementById('pass1').value;\n  let p2 = document.getElementById('pass2').value;\n  document.getElementById('passMsg').innerText = (p1 === p2) ? "Passwords match!" : "Passwords do not match.";\n}`
    },
    testCases: [
      { input: "secret123,secret123", expected: "Passwords match!", description: "Matching passwords" },
      { input: "secret123,secret456", expected: "Passwords do not match.", description: "Non-matching passwords" }
    ]
  },
  {
    id: "ites-js-weekdays",
    courseId: "ites",
    title: "Days of Week Based on Number",
    instructions: "Input a number (1-7). Display the corresponding weekday name.",
    starterCode: {
      html: `<input id="wday" type="number" min="1" max="7"> <button onclick="showDay()">Show Day</button> <p id="dayResult"></p>`,
      js: `function showDay() {\n  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];\n  let n = Number(document.getElementById('wday').value);\n  let result = (n >= 1 && n <= 7) ? days[n - 1] : "Invalid input";\n  document.getElementById('dayResult').innerText = result;\n}`
    },
    testCases: [
      { input: "1", expected: "Sunday", description: "Day 1 is Sunday" },
      { input: "5", expected: "Thursday", description: "Day 5 is Thursday" },
      { input: "8", expected: "Invalid input", description: "Day 8 is invalid" }
    ]
  },
  {
    id: "ites-js-grades",
    courseId: "ites",
    title: "Grade Description",
    instructions: "Input a grade (A/B/C/D/F). Display a brief description for the grade.",
    starterCode: {
      html: `<input id="grade" maxlength="1" placeholder="A/B/C/D/F"> <button onclick="descGrade()">Check Grade</button> <p id="gradeMsg"></p>`,
      js: `function descGrade() {\n  let grade = document.getElementById('grade').value.toUpperCase();\n  let msg;\n  switch (grade) {\n    case 'A': msg = 'Excellent'; break;\n    case 'B': msg = 'Good'; break;\n    case 'C': msg = 'Average'; break;\n    case 'D': msg = 'Below Average'; break;\n    case 'F': msg = 'Fail'; break;\n    default: msg = 'Unknown grade';\n  }\n  document.getElementById('gradeMsg').innerText = msg;\n}`
    },
    testCases: [
      { input: "A", expected: "Excellent", description: "Grade A means Excellent" },
      { input: "F", expected: "Fail", description: "Grade F means Fail" },
      { input: "B", expected: "Good", description: "Grade B means Good" }
    ]
  },
  {
    id: "ites-js-animal-type",
    courseId: "ites",
    title: "Animal Type",
    instructions: "Input an animal name. Display its type (Mammal, Bird, Reptile, etc).",
    starterCode: {
      html: `<input id="animal" placeholder="Type animal name"> <button onclick="showType()">Show Type</button> <p id="animalType"></p>`,
      js: `function showType() {\n  let a = document.getElementById('animal').value.toLowerCase();\n  let type;\n  if (['dog','cat','elephant'].includes(a)) type = 'Mammal';\n  else if (['eagle','sparrow','duck'].includes(a)) type = 'Bird';\n  else if (['snake','lizard'].includes(a)) type = 'Reptile';\n  else type = 'Other';\n  document.getElementById('animalType').innerText = type;\n}`
    },
    testCases: [
      { input: "dog", expected: "Mammal", description: "Dog is a Mammal" },
      { input: "eagle", expected: "Bird", description: "Eagle is a Bird" },
      { input: "snake", expected: "Reptile", description: "Snake is a Reptile" },
      { input: "fish", expected: "Other", description: "Fish is Other" }
    ]
  },
  {
    id: "ites-js-simple-calculator",
    courseId: "ites",
    title: "Simple Calculator",
    instructions: "Create a calculator for +, -, *, /. Input two numbers and choose an operation.",
    starterCode: {
      html: `<input id="calc1" type="number"> <input id="calc2" type="number">\n<select id="operation"><option value="+">+</option><option value="-">-</option><option value="*">*</option><option value="/">/</option></select>\n<button onclick="calculate()">Calculate</button> <p id="calcRes"></p>`,
      js: `function calculate() {\n  let a = Number(document.getElementById('calc1').value);\n  let b = Number(document.getElementById('calc2').value);\n  let op = document.getElementById('operation').value;\n  let res;\n  switch (op) {\n    case '+': res = a + b; break;\n    case '-': res = a - b; break;\n    case '*': res = a * b; break;\n    case '/': res = b !== 0 ? a / b : 'Cannot divide by zero'; break;\n  }\n  document.getElementById('calcRes').innerText = res;\n}`
    },
    testCases: [
      { input: "10,5,+", expected: "15", description: "10 + 5 = 15" },
      { input: "10,5,-", expected: "5", description: "10 - 5 = 5" },
      { input: "10,5,*", expected: "50", description: "10 * 5 = 50" },
      { input: "10,5,/", expected: "2", description: "10 / 5 = 2" }
    ]
  },
  {
    id: "ites-js-month-name",
    courseId: "ites",
    title: "Month Name Based on Number",
    instructions: "Input a number (1-12). Display the corresponding month name.",
    starterCode: {
      html: `<input id="month" type="number" min="1" max="12"> <button onclick="showMonth()">Show Month</button> <p id="monthName"></p>`,
      js: `function showMonth() {\n  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];\n  let n = Number(document.getElementById('month').value);\n  let result = (n >= 1 && n <= 12) ? months[n - 1] : "Invalid input";\n  document.getElementById('monthName').innerText = result;\n}`
    },
    testCases: [
      { input: "1", expected: "January", description: "Month 1 is January" },
      { input: "12", expected: "December", description: "Month 12 is December" },
      { input: "6", expected: "June", description: "Month 6 is June" }
    ]
  },
  {
    id: "ites-js-weekdays",
    courseId: "ites",
    title: "Days of Week Based on Number",
    instructions: "Input a number (1-7). Display the corresponding weekday name.",
    starterCode: {
      html: `<input id="wday" type="number" min="1" max="7"> <button onclick="showDay()">Show Day</button> <p id="dayResult"></p>`,
      js: `function showDay() {\n  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];\n  let n = Number(document.getElementById('wday').value);\n  let result = (n >= 1 && n <= 7) ? days[n - 1] : "Invalid input";\n  document.getElementById('dayResult').innerText = result;\n}`
    }
  },
  {
    id: "ites-js-grades",
    courseId: "ites",
    title: "Grade Description",
    instructions: "Input a grade (A/B/C/D/F). Display a brief description for the grade.",
    starterCode: {
      html: `<input id="grade" maxlength="1" placeholder="A/B/C/D/F"> <button onclick="descGrade()">Check Grade</button> <p id="gradeMsg"></p>`,
      js: `function descGrade() {\n  let grade = document.getElementById('grade').value.toUpperCase();\n  let msg;\n  switch (grade) {\n    case 'A': msg = 'Excellent'; break;\n    case 'B': msg = 'Good'; break;\n    case 'C': msg = 'Average'; break;\n    case 'D': msg = 'Below Average'; break;\n    case 'F': msg = 'Fail'; break;\n    default: msg = 'Unknown grade';\n  }\n  document.getElementById('gradeMsg').innerText = msg;\n}`
    }
  },
  {
    id: "ites-js-animal-type",
    courseId: "ites",
    title: "Animal Type",
    instructions: "Input an animal name. Display its type (Mammal, Bird, Reptile, etc).",
    starterCode: {
      html: `<input id="animal" placeholder="Type animal name"> <button onclick="showType()">Show Type</button> <p id="animalType"></p>`,
      js: `function showType() {\n  let a = document.getElementById('animal').value.toLowerCase();\n  let type;\n  if (['dog','cat','elephant'].includes(a)) type = 'Mammal';\n  else if (['eagle','sparrow','duck'].includes(a)) type = 'Bird';\n  else if (['snake','lizard'].includes(a)) type = 'Reptile';\n  else type = 'Other';\n  document.getElementById('animalType').innerText = type;\n}`
    }
  },
  {
    id: "ites-js-simple-calculator",
    courseId: "ites",
    title: "Simple Calculator",
    instructions: "Create a calculator for +, -, *, /. Input two numbers and choose an operation.",
    starterCode: {
      html: `<input id="calc1" type="number"> <input id="calc2" type="number">\n<select id="operation"><option value="+">+</option><option value="-">-</option><option value="*">*</option><option value="/">/</option></select>\n<button onclick="calculate()">Calculate</button> <p id="calcRes"></p>`,
      js: `function calculate() {\n  let a = Number(document.getElementById('calc1').value);\n  let b = Number(document.getElementById('calc2').value);\n  let op = document.getElementById('operation').value;\n  let res;\n  switch (op) {\n    case '+': res = a + b; break;\n    case '-': res = a - b; break;\n    case '*': res = a * b; break;\n    case '/': res = b !== 0 ? a / b : 'Cannot divide by zero'; break;\n  }\n  document.getElementById('calcRes').innerText = res;\n}`
    }
  },
  {
    id: "ites-js-month-name",
    courseId: "ites",
    title: "Month Name Based on Number",
    instructions: "Input a number (1-12). Display the corresponding month name.",
    starterCode: {
      html: `<input id="month" type="number" min="1" max="12"> <button onclick="showMonth()">Show Month</button> <p id="monthName"></p>`,
      js: `function showMonth() {\n  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];\n  let n = Number(document.getElementById('month').value);\n  let result = (n >= 1 && n <= 12) ? months[n - 1] : "Invalid input";\n  document.getElementById('monthName').innerText = result;\n}`
    }
  },
  {
    id: "ites-js-count-1-10",
    courseId: "ites",
    title: "Print Numbers 1 to 10",
    instructions: "Print all numbers from 1 to 10 using a for loop.",
    starterCode: {
      html: `<button onclick="printNumbers()">Show Numbers</button>\n<p id="numbersList"></p>`,
      js: `function printNumbers() {\n  let res = '';\n  for(let i=1;i<=10;i++) res += i + ' ';\n  document.getElementById('numbersList').innerText = res;\n}`
    },
    testCases: [
      { input: "", expected: "1 2 3 4 5 6 7 8 9 10", description: "Should print numbers 1 to 10" }
    ]
  },
  {
    id: "ites-js-sum-50-naturals",
    courseId: "ites",
    title: "Sum of First 50 Naturals",
    instructions: "Calculate and display the sum of the first 50 natural numbers.",
    starterCode: {
      html: `<button onclick="sumFifty()">Show Sum</button> <p id="fiftySum"></p>`,
      js: `function sumFifty() {\n  let sum = 0;\n  for(let i=1;i<=50;i++) sum += i;\n  document.getElementById('fiftySum').innerText = 'Sum: ' + sum;\n}`
    },
    testCases: [
      { input: "", expected: "Sum: 1275", description: "Sum of 1 to 50 is 1275" }
    ]
  },
  {
    id: "ites-js-multiplication-table",
    courseId: "ites",
    title: "Multiplication Table",
    instructions: "Input a number and print its multiplication table up to 10.",
    starterCode: {
      html: `<input type="number" id="tableNum"> <button onclick="showTable()">Show Table</button>\n<div id="tableOut"></div>`,
      js: `function showTable() {\n  let n = Number(document.getElementById('tableNum').value);\n  let out = '';\n  for(let i=1;i<=10;i++) out += n + ' x ' + i + ' = ' + (n*i) + '<br>';\n  document.getElementById('tableOut').innerHTML = out;\n}`
    },
    testCases: [
      { input: "5", expected: "5 x 1 = 5", description: "First line of multiplication table" },
      { input: "5", expected: "5 x 10 = 50", description: "Last line of multiplication table" }
    ]
  },
  {
    id: "ites-js-even-1-100",
    courseId: "ites",
    title: "Even Numbers 1 to 100",
    instructions: "Show all even numbers between 1 and 100.",
    starterCode: {
      html: `<button onclick="evens()">Show Even Numbers</button><p id="evenNums"></p>`,
      js: `function evens() {\n  let res = '';\n  for(let i=2;i<=100;i+=2) res += i + ' ';\n  document.getElementById('evenNums').innerText = res;\n}`
    },
    testCases: [
      { input: "", expected: "2 4 6", description: "Should start with 2 4 6" }
    ]
  },
  {
    id: "ites-js-reverse-string",
    courseId: "ites",
    title: "Reverse String",
    instructions: "Input a string and display its reverse using a for loop.",
    starterCode: {
      html: `<input id="strRev"><button onclick="reverseStr()">Reverse</button><p id="strOut"></p>`,
      js: `function reverseStr() {\n  let s=document.getElementById('strRev').value;\n  let r='';\n  for(let i=s.length-1;i>=0;i--) r += s[i];\n  document.getElementById('strOut').innerText = r;\n}`
    },
    testCases: [
      { input: "hello", expected: "olleh", description: "Reverse of 'hello' is 'olleh'" },
      { input: "abc", expected: "cba", description: "Reverse of 'abc' is 'cba'" }
    ]
  },
  {
    id: "wp-form-validation",
    courseId: "wp",
    title: "Form Validation",
    instructions: "Create a form with name and email fields. Validate them using JavaScript. Show an alert if name is empty or email is invalid.",
    starterCode: {
      html: `<form id="wpForm">\n  <input type="text" id="wpName" placeholder="Name"><br>\n  <input type="email" id="wpEmail" placeholder="Email"><br>\n  <button type="button" onclick="validateWPForm()">Submit</button>\n</form>`,
      js: `function validateWPForm() {\n  const name = document.getElementById('wpName').value;\n  const email = document.getElementById('wpEmail').value;\n  if (!name) alert('Name required!');\n  else if (!email.includes('@')) alert('Invalid email!');\n  else alert('Form Submitted Successfully!');\n}`
    },
    testCases: [
      { input: ",test@example.com", expected: "Name required!", description: "Empty name validation" },
      { input: "John,invalidemail", expected: "Invalid email!", description: "Invalid email validation" }
    ]
  },
  {
    id: "wp-positivity-js",
    courseId: "wp",
    title: "Positive Number Using JS",
    instructions: "Check if input value is a positive number and show result.",
    starterCode: {
      html: `<input id="posInp"><button onclick="posCheck()">Check</button><p id="posWP"></p>`,
      js: `function posCheck() {\n  let n = Number(document.getElementById('posInp').value);\n  document.getElementById('posWP').innerText = (n > 0) ? "Positive" : "Not Positive";\n}`
    },
    testCases: [
      { input: "10", expected: "Positive", description: "10 is positive" },
      { input: "-5", expected: "Not Positive", description: "-5 is not positive" }
    ]
  },
  {
    id: "wp-leap-year-js",
    courseId: "wp",
    title: "Leap Year Using JS",
    instructions: "Input a year and check if it is leap using JavaScript.",
    starterCode: {
      html: `<input id="lywp" type="number"> <button onclick="wpLeap()">Check Leap</button><p id="lywpMsg"></p>`,
      js: `function wpLeap() {\n  let y=Number(document.getElementById('lywp').value);\n  document.getElementById('lywpMsg').innerText = ((y%4===0&&y%100!==0)||(y%400===0)) ? "Leap year" : "Not a leap year";\n}`
    },
    testCases: [
      { input: "2020", expected: "Leap year", description: "2020 is a leap year" },
      { input: "2019", expected: "Not a leap year", description: "2019 is not a leap year" }
    ]
  },
  {
    id: "wp-calculator-switch",
    courseId: "wp",
    title: "Simple Calculator (Switch Case in JS)",
    instructions: "Create a calculator using switch statement for +, -, *, / with two inputs.",
    starterCode: {
      html: `<input id="wpc1"><input id="wpc2">\n<select id="wpOp"><option value="+">+</option><option value="-">-</option><option value="*">*</option><option value="/">/</option></select>\n<button onclick="wpCalc()">Calc</button>\n<p id="wpCalcRes"></p>`,
      js: `function wpCalc() {\n  let a = Number(document.getElementById('wpc1').value);\n  let b = Number(document.getElementById('wpc2').value);\n  let op=document.getElementById('wpOp').value;\n  let res;\n  switch(op) {\n    case '+':res=a+b;break;\n    case '-':res=a-b;break;\n    case '*':res=a*b;break;\n    case '/':res=b!==0?a/b:'Cannot divide by zero';break;\n  }\n  document.getElementById('wpCalcRes').innerText=res;\n}`
    },
    testCases: [
      { input: "10,5,+", expected: "15", description: "10 + 5 = 15" },
      { input: "10,5,/", expected: "Cannot divide by zero", description: "Cannot divide by zero" }
    ]
  },
  {
    id: "wp-js-events",
    courseId: "wp",
    title: "JavaScript Events",
    instructions: "Demonstrate the onclick event to change the text color of a paragraph.",
    starterCode: {
      html: `<p id="wpPara" onclick="changeColor()">Click me to change color!</p>`,
      js: `function changeColor() {\n  document.getElementById('wpPara').style.color = 'green';\n}`
    }
  },
  {
    id: "wp-bootstrap-grid",
    courseId: "wp",
    title: "Bootstrap Grid",
    instructions: "Use Bootstrap to create a 3-column responsive grid layout.",
    starterCode: {
      html: `<div class="container">\n  <div class="row">\n    <div class="col">Column 1</div>\n    <div class="col">Column 2</div>\n    <div class="col">Column 3</div>\n  </div>\n</div>`,
      css: "",
    }
  },
  {
    id: "wp-bootstrap-offset",
    courseId: "wp",
    title: "Bootstrap Offset",
    instructions: "Create a 2-column layout and offset the second column by two units.",
    starterCode: {
      html: `<div class="container">\n  <div class="row">\n    <div class="col-4">Column 1</div>\n    <div class="col-4 offset-2">Column 2 (offset)</div>\n  </div>\n</div>`,
      css: "",
    }
  },
  {
    id: "wp-bootstrap-table",
    courseId: "wp",
    title: "Bootstrap Tables",
    instructions: "Make a styled table using Bootstrap classes.",
    starterCode: {
      html: `<table class="table table-striped">\n  <thead>\n    <tr><th>Name</th><th>Score</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Amit</td><td>80</td></tr>\n    <tr><td>Priya</td><td>90</td></tr>\n  </tbody>\n</table>`,
      css: "",
    }
  },
  {
    id: "wp-factorial-php",
    courseId: "wp",
    title: "Factorial of a Number using PHP",
    instructions: "Write PHP code to calculate and display the factorial of a number.",
    starterCode: {
      php: `<?php\n$num = 5;\n$fact = 1;\nfor($i=1;$i<=$num;$i++) {\n  $fact *= $i;\n}\necho \"Factorial of $num is $fact\";\n?>`
    }
  },
  {
    id: "wp-weekdays-switch-php",
    courseId: "wp",
    title: "Weekdays Using Switch Case Using PHP",
    instructions: "Input a number and show the day using PHP switch statement.",
    starterCode: {
      php: `<?php\n$dayNum = 3;\nswitch($dayNum) {\n  case 1: echo \"Sunday\"; break;\n  case 2: echo \"Monday\"; break;\n  case 3: echo \"Tuesday\"; break;\n  case 4: echo \"Wednesday\"; break;\n  case 5: echo \"Thursday\"; break;\n  case 6: echo \"Friday\"; break;\n  case 7: echo \"Saturday\"; break;\n  default: echo \"Invalid\";\n}\n?>`
    }
  },
  {
    id: "wp-multiplication-table-php",
    courseId: "wp",
    title: "Multiplication Table Using PHP",
    instructions: "Take a number and print its multiplication table in PHP.",
    starterCode: {
      php: `<?php\n$num = 7;\nfor($i=1;$i<=10;$i++) {\n  echo \"$num x $i = \" . ($num*$i) . \"<br>\";\n}\n?>`
    }
  },
  {
    id: "ws-form-validation",
    courseId: "ws",
    title: "Form Validation using JavaScript",
    instructions: "Create a form with name and email fields. Validate using JavaScript.",
    starterCode: {
      html: `<form id="wsform">\n  <input type="text" id="wsname" placeholder="Name"><br>\n  <input type="email" id="wsemail" placeholder="Email"><br>\n  <button type="button" onclick="wsValidate()">Submit</button>\n</form>`,
      js: `function wsValidate() {\n  const name = document.getElementById('wsname').value;\n  const email = document.getElementById('wsemail').value;\n  if (!name) alert('Name required!');\n  else if (!email.includes('@')) alert('Invalid email!');\n  else alert('Submitted!');\n}`
    },
    testCases: [
      { input: ",email@test.com", expected: "Name required!", description: "Empty name validation" },
      { input: "John,invalidemail", expected: "Invalid email!", description: "Invalid email validation" }
    ]
  },
  {
    id: "ws-login-auth",
    courseId: "ws",
    title: "JavaScript Login Authentication",
    instructions: "Take a username and password, log in if they match 'admin' and '1234'.",
    starterCode: {
      html: `<input id="wsuser" placeholder="Username"><input id="wspass" type="password" placeholder="Password">\n<button onclick="authLogin()">Login</button><p id="wsMsg"></p>`,
      js: `function authLogin() {\n  const u = document.getElementById('wsuser').value,\n        p = document.getElementById('wspass').value;\n  if (u==='admin' && p==='1234') document.getElementById('wsMsg').innerText = 'Login successful!';\n  else document.getElementById('wsMsg').innerText = 'Invalid credentials.';\n}`
    },
    testCases: [
      { input: "admin,1234", expected: "Login successful!", description: "Correct credentials" },
      { input: "admin,wrong", expected: "Invalid credentials.", description: "Wrong password" },
      { input: "user,1234", expected: "Invalid credentials.", description: "Wrong username" }
    ]
  },
  {
    id: "ws-quiz",
    courseId: "ws",
    title: "JavaScript Quiz",
    instructions: "Create a simple quiz that checks the answer to one question.",
    starterCode: {
      html: `<p>What is 2+2?</p><input id="quizAns"><button onclick="checkQuiz()">Submit</button><p id="quizMsg"></p>`,
      js: `function checkQuiz() {\n  let a=document.getElementById('quizAns').value;\n  document.getElementById('quizMsg').innerText = (a == '4') ? 'Correct!' : 'Try again.';\n}`
    },
    testCases: [
      { input: "4", expected: "Correct!", description: "Correct answer 4" },
      { input: "5", expected: "Try again.", description: "Wrong answer" }
    ]
  },
  {
    id: "ws-isbn-check",
    courseId: "ws",
    title: "ISBN-10 Validator",
    instructions: "Check if an entered string is a valid ISBN-10.",
    starterCode: {
      html: `<input id="isbn10"><button onclick="isbnCheck()">Check ISBN</button><p id="isbnMsg"></p>`,
      js: `function isbnCheck() {\n  let s=document.getElementById('isbn10').value;\n  if(s.length!==10){document.getElementById('isbnMsg').innerText='Invalid ISBN-10 length';return;}\n  let sum=0;\n  for(let i=0;i<10;i++){\n    sum+=Number(s[i])*(10-i);\n  }\n  document.getElementById('isbnMsg').innerText=(sum%11===0)?'Valid ISBN-10':'Invalid ISBN-10';\n}`
    },
    testCases: [
      { input: "1234567890", expected: "Invalid ISBN-10", description: "Invalid ISBN checksum" },
      { input: "123456789", expected: "Invalid ISBN-10 length", description: "Too short" }
    ]
  },
  {
    id: "ws-matching-card-game",
    courseId: "ws",
    title: "Matching Card Game",
    instructions: "Make a basic game UI with two cards and check if they match.",
    starterCode: {
      html: `<input id="card1" placeholder="Card 1"><input id="card2" placeholder="Card 2">\n<button onclick="matchCard()">Check Match</button>\n<p id="matchMsg"></p>`,
      js: `function matchCard() {\n  let a=document.getElementById('card1').value,\n      b=document.getElementById('card2').value;\n  document.getElementById('matchMsg').innerText=(a===b)?'Cards match!':'No match.';\n}`
    },
    testCases: [
      { input: "A,A", expected: "Cards match!", description: "Matching cards" },
      { input: "A,B", expected: "No match.", description: "Non-matching cards" }
    ]
  },
  {
    id: "ws-image-upload",
    courseId: "ws",
    title: "Image and File Upload",
    instructions: "Build a page with a file input. Show file name when a file is selected.",
    starterCode: {
      html: `<input type="file" id="imgUpload" onchange="showFile()">\n<p id="fileMsg"></p>`,
      js: `function showFile() {\n  let f=document.getElementById('imgUpload').files[0];\n  document.getElementById('fileMsg').innerText = f ? f.name : '';\n}`
    }
  },
  {
    id: "ws-secret-message",
    courseId: "ws",
    title: "Secret Message Passing",
    instructions: "Input a message and display it reversed as a 'secret' version.",
    starterCode: {
      html: `<input id="secretMsg"><button onclick="sendSecret()">Send Secret</button><p id="secretOut"></p>`,
      js: `function sendSecret() {\n  let s=document.getElementById('secretMsg').value;\n  document.getElementById('secretOut').innerText = s.split('').reverse().join('');\n}`
    },
    testCases: [
      { input: "hello", expected: "olleh", description: "Reverse of 'hello'" },
      { input: "abc", expected: "cba", description: "Reverse of 'abc'" }
    ]
  },
  {
    id: "ws-budget-app",
    courseId: "ws",
    title: "Budget Application Project",
    instructions: "Build a mini app to add income and expense. Show total balance.",
    starterCode: {
      html: `<input id="valAdd" type="number" placeholder="Amount">\n<select id="typeAdd"><option>Income</option><option>Expense</option></select>\n<button onclick="addBudget()">Add</button>\n<p id="budgetBal"></p>`,
      js: `let bal=0;\nfunction addBudget(){\n  let v=Number(document.getElementById('valAdd').value);\n  let t=document.getElementById('typeAdd').value;\n  if(t==='Income') bal+=v; else bal-=v;\n  document.getElementById('budgetBal').innerText='Balance: '+bal;\n}`
    },
    testCases: [
      { input: "100,Income", expected: "Balance: 100", description: "Add income" },
      { input: "50,Expense", expected: "Balance: 50", description: "Subtract expense" }
    ]
  },
  {
    id: "ws-calculator",
    courseId: "ws",
    title: "Calculator Project",
    instructions: "Make a calculator with numeric and operation buttons.",
    starterCode: {
      html: `<input id="calcNum1"><input id="calcNum2">\n<select id="calcOper"><option value="+">+</option><option value="-">-</option><option value="*">*</option><option value="/">/</option></select>\n<button onclick="wsCalc()">Calculate</button>\n<p id="wsCalcOut"></p>`,
      js: `function wsCalc() {\n  let a = Number(document.getElementById('calcNum1').value);\n  let b = Number(document.getElementById('calcNum2').value);\n  let op = document.getElementById('calcOper').value;\n  let res;\n  switch(op){case '+':res=a+b;break;case '-':res=a-b;break;case '*':res=a*b;break;case '/':res=b!==0?a/b:'Error';break;}\n  document.getElementById('wsCalcOut').innerText=res;\n}`
    },
    testCases: [
      { input: "10,5,+", expected: "15", description: "10 + 5 = 15" },
      { input: "10,5,-", expected: "5", description: "10 - 5 = 5" }
    ]
  }
  // Continue this pattern for all JS, WP, and WS experiments! (Ask for the next block when ready)
];
