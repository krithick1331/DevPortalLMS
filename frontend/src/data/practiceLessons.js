// FILE: frontend/src/data/practiceLessons.js
// Practice lesson data with test cases

export const practiceLessons = {
  'html-navbar': {
    id: 'html-navbar',
    courseId: 'ites',
    title: 'Build a Navigation Bar',
    difficulty: 'Medium',
    points: 20,
    duration: '30 min',
    
    instructions: [
      'Create a <nav> element with class "navbar"',
      'Add a logo <div> with id="logo" containing the text "MyBrand"',
      'Create an unordered list <ul> with class "nav-menu"',
      'Inside the list, add 4 list items: Home, About, Services, Contact',
      'Style the navbar with background color #333',
      'Make the text color white',
      'Use flexbox to arrange items horizontally'
    ],
    
    starterCode: {
      html: '<!-- Create your navbar here -->\n',
      css: '/* Add your CSS styling */\n',
      js: '// JavaScript (optional)\n'
    },
    
    testCases: [
      {
        description: 'Nav element with class "navbar" should exist',
        validation: 'return document.querySelector("nav.navbar") !== null;'
      },
      {
        description: 'Logo with id "logo" should exist',
        validation: 'return document.getElementById("logo") !== null;'
      },
      {
        description: 'Logo should contain the text "MyBrand"',
        validation: `
          const logo = document.getElementById("logo");
          return logo && logo.textContent.trim() === "MyBrand";
        `
      },
      {
        description: 'UL with class "nav-menu" should exist',
        validation: 'return document.querySelector("ul.nav-menu") !== null;'
      },
      {
        description: 'Nav menu should have 4 list items',
        validation: `
          const menu = document.querySelector("ul.nav-menu");
          return menu && menu.querySelectorAll("li").length === 4;
        `
      },
      {
        description: 'Navbar background should be #333',
        validation: `
          const navbar = document.querySelector("nav.navbar");
          if (!navbar) return false;
          const bg = window.getComputedStyle(navbar).backgroundColor;
          return bg === "rgb(51, 51, 51)";
        `
      },
      {
        description: 'Text color should be white',
        validation: `
          const navbar = document.querySelector("nav.navbar");
          if (!navbar) return false;
          const color = window.getComputedStyle(navbar).color;
          return color === "rgb(255, 255, 255)";
        `
      }
    ],
    
    hints: [
      'Start with: <nav class="navbar">',
      'Add a logo: <div id="logo">MyBrand</div>',
      'Create the menu: <ul class="nav-menu"><li>Home</li>...</ul>',
      'CSS: .navbar { background-color: #333; color: white; }',
      'Use flexbox: display: flex; justify-content: space-between;'
    ]
  },

  'html-form': {
    id: 'html-form',
    courseId: 'ites',
    title: 'Build a Contact Form',
    difficulty: 'Easy',
    points: 15,
    duration: '20 min',
    
    instructions: [
      'Create a <form> element with id="contact-form"',
      'Add a name input field with id="name" and placeholder "Your Name"',
      'Add an email input with id="email", type="email", and placeholder "Your Email"',
      'Add a textarea with id="message" and placeholder "Your Message"',
      'Add a submit button with text "Send Message"',
      'Style the form with max-width of 500px'
    ],
    
    starterCode: {
      html: '<!-- Create your form here -->\n',
      css: '/* Add your CSS */\n',
      js: ''
    },
    
    testCases: [
      {
        description: 'Form element with id "contact-form" should exist',
        validation: 'return document.getElementById("contact-form") !== null;'
      },
      {
        description: 'Name input with id "name" should exist',
        validation: 'return document.getElementById("name") !== null;'
      },
      {
        description: 'Email input should have type="email"',
        validation: `
          const email = document.getElementById("email");
          return email && email.type === "email";
        `
      },
      {
        description: 'Textarea with id "message" should exist',
        validation: 'return document.getElementById("message") !== null;'
      },
      {
        description: 'Submit button should exist',
        validation: `
          const form = document.getElementById("contact-form");
          return form && form.querySelector('button[type="submit"], input[type="submit"]') !== null;
        `
      },
      {
        description: 'Form should have max-width of 500px',
        validation: `
          const form = document.getElementById("contact-form");
          if (!form) return false;
          const maxWidth = window.getComputedStyle(form).maxWidth;
          return maxWidth === "500px";
        `
      }
    ],
    
    hints: [
      'Form structure: <form id="contact-form">...</form>',
      'Input: <input type="text" id="name" placeholder="Your Name">',
      'Email: <input type="email" id="email" placeholder="Your Email">',
      'Textarea: <textarea id="message" placeholder="Your Message"></textarea>',
      'Button: <button type="submit">Send Message</button>',
      'CSS: #contact-form { max-width: 500px; }'
    ]
  },

  'js-button-click': {
    id: 'js-button-click',
    courseId: 'ites',
    title: 'Button Click Counter',
    difficulty: 'Easy',
    points: 10,
    duration: '15 min',
    
    instructions: [
      'Create a button with id="click-button" and text "Click Me"',
      'Create a paragraph with id="counter" displaying "Clicks: 0"',
      'Add JavaScript to increment the counter each time the button is clicked',
      'Update the paragraph text to show the current count'
    ],
    
    starterCode: {
      html: '<!-- Create button and counter here -->\n',
      css: '/* Optional styling */\n',
      js: '// Add your JavaScript here\n'
    },
    
    testCases: [
      {
        description: 'Button with id "click-button" should exist',
        validation: 'return document.getElementById("click-button") !== null;'
      },
      {
        description: 'Counter paragraph with id "counter" should exist',
        validation: 'return document.getElementById("counter") !== null;'
      },
      {
        description: 'Counter should start at 0',
        validation: `
          const counter = document.getElementById("counter");
          return counter && counter.textContent.includes("0");
        `
      },
      {
        description: 'Clicking button should increment counter',
        validation: `
          const button = document.getElementById("click-button");
          const counter = document.getElementById("counter");
          if (!button || !counter) return false;
          
          const initialText = counter.textContent;
          button.click();
          const newText = counter.textContent;
          
          return initialText !== newText && newText.includes("1");
        `
      }
    ],
    
    hints: [
      'Button: <button id="click-button">Click Me</button>',
      'Counter: <p id="counter">Clicks: 0</p>',
      'Get elements: const button = document.getElementById("click-button");',
      'Add event listener: button.addEventListener("click", function() { ... });',
      'Keep track with a variable: let count = 0;',
      'Update text: counter.textContent = "Clicks: " + count;'
    ]
  },

  'css-flexbox-layout': {
    id: 'css-flexbox-layout',
    courseId: 'ites',
    title: 'Flexbox Card Layout',
    difficulty: 'Medium',
    points: 25,
    duration: '40 min',
    
    instructions: [
      'Create a container div with class "card-container"',
      'Add 3 card divs inside, each with class "card"',
      'Each card should have a heading and paragraph',
      'Use flexbox to arrange cards horizontally',
      'Cards should have equal spacing between them',
      'Each card should have padding, border, and border-radius',
      'Container should use justify-content: space-between'
    ],
    
    starterCode: {
      html: '<!-- Create your card layout here -->\n',
      css: '/* Add flexbox styling */\n',
      js: ''
    },
    
    testCases: [
      {
        description: 'Container with class "card-container" should exist',
        validation: 'return document.querySelector(".card-container") !== null;'
      },
      {
        description: 'Container should have 3 cards',
        validation: `
          const container = document.querySelector(".card-container");
          return container && container.querySelectorAll(".card").length === 3;
        `
      },
      {
        description: 'Container should use flexbox',
        validation: `
          const container = document.querySelector(".card-container");
          if (!container) return false;
          const display = window.getComputedStyle(container).display;
          return display === "flex";
        `
      },
      {
        description: 'Cards should have padding',
        validation: `
          const card = document.querySelector(".card");
          if (!card) return false;
          const padding = window.getComputedStyle(card).padding;
          return padding !== "0px";
        `
      },
      {
        description: 'Cards should have border-radius',
        validation: `
          const card = document.querySelector(".card");
          if (!card) return false;
          const borderRadius = window.getComputedStyle(card).borderRadius;
          return borderRadius !== "0px";
        `
      }
    ],
    
    hints: [
      'Container: <div class="card-container">...</div>',
      'Card: <div class="card"><h3>Title</h3><p>Content</p></div>',
      'Flexbox: .card-container { display: flex; justify-content: space-between; }',
      'Card style: .card { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }',
      'Add gap between cards: gap: 20px;'
    ]
  }
};

// Export individual lessons for easy access
export const navbarLesson = practiceLessons['html-navbar'];
export const formLesson = practiceLessons['html-form'];
export const buttonLesson = practiceLessons['js-button-click'];
export const flexboxLesson = practiceLessons['css-flexbox-layout'];

export default practiceLessons;
