//IIFE & Namespaces

// 
// What is an IIFE?


//An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it’s defined. It creates a private scope to protect variables from polluting the global namespace. This pattern was essential before ES6 modules existed.

// An IIFE — runs immediately, no calling needed
// (function() {
//   const private = "I'm hidden from the outside world";
//   console.log(private);
// })();  // Runs right away!

// The variable "private" doesn't exist out here
// console.log(private);  // ReferenceError: private is not defined


//The Messy Desk Problem: A Real-World Analogy

// ┌─────────────────────────────────────────────────────────────────────┐
// │ THE MESSY DESK (No Organization)                                    │
// │                                                                     │
// │   password = "123"    userName = "Bob"    calculate()               │
// │       config = {}    helpers = {}    API_KEY = "secret"             │
// │   utils = {}    data = []    currentUser = null    init()           │
// │                                                                     │
// │   Everything is everywhere. Anyone can access anything.             │
// │   Name conflicts are common. It's hard to find what you need.       │
// └─────────────────────────────────────────────────────────────────────┘

// ┌─────────────────────────────────────────────────────────────────────┐
// │ THE ORGANIZED DESK (With Modules)                                   │
// │                                                                     │
// │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │
// │   │   auth.js   │  │   api.js    │  │  utils.js   │                │
// │   │             │  │             │  │             │                │
// │   │ • login()   │  │ • fetch()   │  │ • format()  │                │
// │   │ • logout()  │  │ • post()    │  │ • validate()│                │
// │   │ • user      │  │ • API_KEY   │  │ • helpers   │                │
// │   └─────────────┘  └─────────────┘  └─────────────┘                │
// │                                                                     │
// │   Each drawer has its own space. Take only what you need.           │
// │   Private things stay private. Everything is easy to find.          │
// └─────────────────────────────────────────────────────────────────────┘



// This is the story of how JavaScript developers learned to organize their code:
// First, we had the messy desk — everything in the global scope
// Then, we invented IIFEs — a clever trick to create private spaces
// Next, we created Namespaces — grouping related things under one name
// Finally, we got Modules — the modern, built-in solution
// Let’s learn each approach and understand when to use them.

// ┌─────────────────────────────────────────────────────────────────────┐
// │ EXPRESSION vs STATEMENT                                             │
// │                                                                     │
// │ EXPRESSION = produces a value                                       │
// │ ─────────────────────────────                                       │
// │   5 + 3              → 8                                            │
// │   "hello"            → "hello"                                      │
// │   myFunction()       → whatever the function returns                │
// │   x > 10             → true or false                                │
// │   function() {}      → a function value (when in expression position)│
// │                                                                     │
// │ STATEMENT = performs an action (no value produced)                  │
// │ ──────────────────────────────────────────────────                  │
// │   if (x > 10) { }    → controls flow, no value                      │
// │   for (let i...) { } → loops, no value                              │
// │   function foo() { } → declares a function, no value                │
// │   let x = 5;         → declares a variable, no value                │
// └─────────────────────────────────────────────────────────────────────┘

// FUNCTION DECLARATION (statement)
// Starts with the word "function" at the beginning of a line
function greet() {
  return "Hello!";
}

// FUNCTION EXPRESSION (expression)
// The function is assigned to a variable or wrapped in parentheses
const greet = function() {
  return "Hello!";
};

// Function Declaration vs Function Expression:
// Feature	Declaration	Expression
// Syntax	function name() {}	const name = function() {}
// Hoisting	Yes (can call before definition)	No (must define first)
// Name	Required	Optional
// Use in IIFE	No	Yes (must use parentheses)


// (function() {
//   // your code here
// })();

// // Let's label each part:

// ( function() { ... } )  ();
// │                    │   │
// │                    │   └─── 3. Invoke (call) it immediately
// │                    │
// │                    └─────── 2. Wrap in parentheses (makes it an expression)
// │
// └──────────────────────────── 1. Define a function


// Classic style
(function() {
  console.log("Classic IIFE");
})();

// Alternative parentheses placement
(function() {
  console.log("Alternative style");
}());

// Arrow function IIFE (modern)
(() => {
  console.log("Arrow IIFE");
})();

// With parameters
((name) => {
  console.log(`Hello, ${name}!`);
})("Alice");

// Named IIFE (useful for debugging)
(function myIIFE() {
  console.log("Named IIFE");
})();

// Why Were IIFEs Invented?

// Before ES6 modules, JavaScript had a big problem: everything was global. When scripts were loaded with regular <script> tags, variables declared with var outside of functions became global and were shared across all scripts on the page, leading to conflicts:


// file1.js
var userName = "Alice";  // var creates global variables
var count = 0;

// file2.js (loaded after file1.js)
var userName = "Bob";    // Oops! Overwrites the first userName
var count = 100;         // Oops! Overwrites the first count

// Now file1.js's code is broken because its variables were replaced

// Before Namespaces:                    After Namespaces:

// Global Scope:                         Global Scope:
// ├── userName                          └── MyApp
// ├── userAge                               ├── User
// ├── userEmail                             │   ├── name
// ├── userLogin()                           │   ├── login()
// ├── userLogout()                          │   └── logout()
// ├── productName                           ├── Product
// ├── productPrice                          │   ├── name
// ├── productAdd()                          │   ├── price
// ├── cartItems                             │   └── add()
// ├── cartAdd()                             └── Cart
// └── cartRemove()                              ├── items
//                                               ├── add()
// 11 global variables!                          └── remove()

//                                       1 global variable!


// Simple namespace
const MyApp = {};

// Add things to it
MyApp.version = "1.0.0";
MyApp.config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};
MyApp.utils = {
  formatDate(date) {
    return date.toLocaleDateString();
  },
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

// Use it
console.log(MyApp.version);
console.log(MyApp.utils.formatDate(new Date()));

const MyApp = {};

// Use IIFE to add features with private variables
MyApp.Counter = (function() {
  // Private
  let count = 0;
  
  // Public
  return {
    increment() { count++; },
    decrement() { count--; },
    getCount() { return count; }
  };
})();

MyApp.Logger = (function() {
  // Private
  const logs = [];
  
  // Public
  return {
    log(message) {
      logs.push({ message, time: new Date() });
      console.log(message);
    },
    getLogs() {
      return [...logs];  // Return a copy
    }
  };
})();

// Usage
MyApp.Counter.increment();
MyApp.Logger.log("Counter incremented");



// Import specific items
import { PI, square } from './utils.js';

// Import with a different name (alias)
import { PI as pi, square as sq } from './utils.js';

// Import everything as a namespace object
import * as Utils from './utils.js';
console.log(Utils.PI);
console.log(Utils.square(4));


// The name doesn't have to match the export name
import greet from './greeting.js';

// In a DIFFERENT file, you could use a different name:
// import sayHello from './greeting.js';  // Same function, different name
// import xyz from './greeting.js';        // Still the same function!

// Combine default and named imports
import greet, { defaultName } from './greeting.js';

// This runs the module but imports nothing
import './polyfills.js';
import './analytics.js';

// Useful for:
// - Polyfills that add global features
// - Initialization code
// - CSS (with bundlers)


// my-app/
// ├── index.html
// ├── src/
// │   ├── main.js           # Entry point
// │   ├── config.js         # App configuration
// │   ├── utils/
// │   │   ├── index.js      # Re-exports from utils
// │   │   ├── format.js
// │   │   └── validate.js
// │   ├── services/
// │   │   ├── index.js
// │   │   ├── api.js
// │   │   └── auth.js
// │   └── components/
// │       ├── index.js
// │       ├── Button.js
// │       └── Modal.js


// utils/format.js
export function formatDate(date) { /* ... */ }
export function formatCurrency(amount) { /* ... */ }

// utils/validate.js
export function isEmail(str) { /* ... */ }
export function isPhone(str) { /* ... */ }

// utils/index.js — re-exports everything
export { formatDate, formatCurrency } from './format.js';
export { isEmail, isPhone } from './validate.js';

// Now in main.js, you can import from the folder
import { formatDate, isEmail } from './utils/index.js';
// Or even shorter (works with bundlers and Node.js, not native browser modules):
import { formatDate, isEmail } from './utils';


// config.js
// export const API_URL = 'https://api.example.com';
// export const APP_NAME = 'My App';

// services/api.js
import { API_URL } from '../config.js';

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
}

// services/auth.js
import { API_URL } from '../config.js';

let currentUser = null;  // Private to this module

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  currentUser = await response.json();
  return currentUser;
}

export function getCurrentUser() {
  return currentUser;
}

export function logout() {
  currentUser = null;
}

// main.js — Entry point
import { APP_NAME } from './config.js';
import { fetchUsers } from './services/api.js';
import { login, getCurrentUser } from './services/auth.js';

console.log(`Welcome to ${APP_NAME}`);

async function init() {
  await login('user@example.com', 'password');
  console.log('Logged in as:', getCurrentUser().name);
  
  const users = await fetchUsers();
  console.log('Users:', users);
}

init();



// config.js
export const API_URL = 'https://api.example.com';
export const APP_NAME = 'My App';

// services/api.js
import { API_URL } from '../config.js';

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}

export async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
}

// services/auth.js
import { API_URL } from '../config.js';

// let currentUser = null;  // Private to this module

export async function login(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  currentUser = await response.json();
  return currentUser;
}

export function getCurrentUser() {
  return currentUser;
}

export function logout() {
  currentUser = null;
}

// main.js — Entry point
import { APP_NAME } from './config.js';
import { fetchUsers } from './services/api.js';
import { login, getCurrentUser } from './services/auth.js';

console.log(`Welcome to ${APP_NAME}`);

async function init() {
  await login('user@example.com', 'password');
  console.log('Logged in as:', getCurrentUser().name);
  
  const users = await fetchUsers();
  console.log('Users:', users);
}

init();



// 1 IIFEs create private scope by running immediately — useful for initialization and avoiding globals
//1 Namespaces group related code under one object — reduces global pollution but isn’t true encapsulation
//1 ES6 Modules are the modern solution — file-based, true privacy, and built into the language
//1 Named exports let you export multiple things — import what you need by name
//1 Default exports are for the main thing a module provides — one per file
//1 Dynamic imports load modules on demand — great for performance optimization
//1 Each module has its own scope — variables are private unless exported
//1 Use modules for new projects — IIFEs and namespaces are for legacy code or special cases
//1 Organize by feature or type — group related modules in folders with index.js barrel files
//1 Avoid circular dependencies — they cause confusing bugs and loading issues