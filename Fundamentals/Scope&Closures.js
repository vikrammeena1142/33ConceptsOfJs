// Scope & Closures


// What is Scope in JavaScript?
// Scope is the current context of code, which determines the accessibility of variables and functions. It can be global or local (function scope, block scope).

// Scope is the current context of execution in which values and expressions are “visible” or can be referenced. It’s the set of rules that determines where and how variables can be accessed in your code. If a variable is not in the current scope, it cannot be used. Scopes can be nested, and inner scopes have access to outer scopes, but not vice versa.


// The Office Building Analogy
// Imagine it’s after hours and you’re wandering through your office building (legally, you work there, promise). You notice something interesting about what you can and can’t see:
// Inside your private office, you can see everything on your desk, peek into the hallway through your door, and even see the lobby through the glass walls
// In the hallway, you can see the lobby clearly, but those private offices? Their blinds are shut. No peeking allowed
// In the lobby, you’re limited to just what’s there: the reception desk, some chairs, maybe a sad-looking plant
// ┌─────────────────────────────────────────────────────────────┐
// │ LOBBY (Global Scope)                                        │
// │   reception = "Welcome Desk"                                │
// │                                                             │
// │   ┌───────────────────────────────────────────────────┐     │
// │   │ HALLWAY (Function Scope)                          │     │
// │   │   hallwayPlant = "Fern"                           │     │
// │   │                                                   │     │
// │   │   ┌───────────────────────────────────────┐       │     │
// │   │   │ PRIVATE OFFICE (Block Scope)          │       │     │
// │   │   │   secretDocs = "Confidential"         │       │     │
// │   │   │                                       │       │     │
// │   │   │   Can see: secretDocs      ✓          │       │     │
// │   │   │   Can see: hallwayPlant    ✓          │       │     │
// │   │   │   Can see: reception       ✓          │       │     │
// │   │   └───────────────────────────────────────┘       │     │
// │   │                                                   │     │
// │   │   Cannot see: secretDocs       ✗                  │     │
// │   └───────────────────────────────────────────────────┘     │
// │                                                             │
// │   Cannot see: hallwayPlant, secretDocs  ✗                   │
// └─────────────────────────────────────────────────────────────┘
// This is exactly how scope works in JavaScript! Code in inner scopes can “look out” and access variables from outer scopes, but outer scopes can never “look in” to inner scopes.
// And here’s where it gets really interesting: imagine someone who worked in that private office quits and leaves the building. But they took a mental snapshot of everything in there: the passwords on sticky notes, the secret project plans, the snack drawer location. Even though they’ve left, they still remember everything. That’s essentially what a closure is: a function that “remembers” the scope where it was created, even after that scope is gone.




// Global Scope
// Variables declared outside of any function or block are in the global scope. They can be accessed from anywhere in the code.

// Variables declared outside of any function or block are in the global scope. They’re accessible from anywhere in your code.

var globalVar = "I am global";

function accessGlobal() {
  console.log(globalVar); // Can access globalVar
}
accessGlobal(); // Output: I am global
// Global scope
const appName = "MyApp";
let userCount = 0;

function greet() {
  console.log(appName);  // ✓ Can access global variable
  userCount++;           // ✓ Can modify global variable
}

if (true) {
  console.log(appName);  // ✓ Can access global variable
}

var oldSchool = "I'm on window";      // window.oldSchool (var only)
let modern = "I'm NOT on window";      // NOT on window

console.log(window.oldSchool);         // "I'm on window"
console.log(window.modern);            // undefined
console.log(globalThis);               // Works everywhere


// 
// 2. Function Scope
// Variables declared with var inside a function are function-scoped. They’re only accessible within that function.
function myFunction() {
  var functionVar = "I am inside a function";
  console.log(functionVar); // Can access functionVar
}
myFunction(); // Output: I am inside a function
// console.log(functionVar); // Error: functionVar is not defined


function calculateTotal() {
  var subtotal = 100;
  var tax = 10;
  var total = subtotal + tax;
  
  console.log(total);  // ✓ 110
}

calculateTotal();
// console.log(subtotal);  // ✗ ReferenceError: subtotal is not defined

// var Hoisting
function hoistingExample() {
  console.log(hoistedVar);
    var hoistedVar = "I am hoisted";
}

hoistingExample(); // Output: undefined (due to hoisting)


// Variables declared with var are “hoisted” to the top of their function. This means JavaScript knows about them before the code runs, but they’re initialized as undefined until the actual declaration line.

function example() {
  console.log(message);  // undefined (not an error!)
  var message = "Hello";
  console.log(message);  // "Hello"
}

// JavaScript interprets this as:
function exampleHoisted() {
  var message;           // Declaration hoisted to top
  console.log(message);  // undefined
  message = "Hello";     // Assignment stays in place
  console.log(message);  // "Hello"
}

// Your code:                    How JS sees it:
// ┌─────────────────────┐       ┌─────────────────────┐
// │ function foo() {    │       │ function foo() {    │
// │                     │       │   var x;  // hoisted│
// │   console.log(x);   │  ──►  │   console.log(x);   │
// │   var x = 5;        │       │   x = 5;            │
// │ }                   │       │ }                   │
// └─────────────────────┘       └─────────────────────┘

// 3. Block Scope -
// Variables declared with let or const inside a block (like an if statement or loop) are block-scoped. They’re only accessible within that block.

//Variables declared with let and const are block-scoped. A block is any code within curly braces {}: if statements, for loops, while loops, or just standalone blocks.


function blockScopeExample() {
  if (true) {
    let blockVar = "I am inside a block";
    const blockConst = "I am also inside a block";
    console.log(blockVar);   // Can access blockVar
    console.log(blockConst); // Can access blockConst
  }
    // console.log(blockVar);   // Error: blockVar is not defined       
    // console.log(blockConst); // Error: blockConst is not defined
}
blockScopeExample();


if (true) {
  let blockLet = "I'm block-scoped";
  const blockConst = "Me too";
  var functionVar = "I escape the block!";
}

// console.log(blockLet);    // ✗ ReferenceError
// console.log(blockConst);  // ✗ ReferenceError
console.log(functionVar);    // ✓ "I escape the block!"

//The Temporal Dead Zone (TDZ)

// The TDZ is the time between entering a block and the point where a variable declared with let or const is initialized. During this time, accessing the variable will throw a ReferenceError.

function temporalDeadZone() {
  console.log(myLet);   // ReferenceError: Cannot access 'myLet' before initialization
  console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization    
    let myLet
    const myConst = "I am a constant";
}


// var vs let vs const
// Here’s a comprehensive comparison of the three variable declaration keywords:
// Feature	var	let	const
// Scope	Function	Block	Block
// Hoisting	Yes (initialized as undefined)	Yes (but TDZ)	Yes (but TDZ)
// Redeclaration	✓ Allowed	✗ Error	✗ Error
// Reassignment	✓ Allowed	✓ Allowed	✗ Error
// Must Initialize	No	No	Yes


// Redeclaration and Reassignment
 // var allows redeclaration (can cause bugs!)
var name = "Alice";
var name = "Bob";     // No error, silently overwrites
console.log(name);    // "Bob"

// let and const prevent redeclaration
let age = 25
// let age = 30      // SyntaxError: 'age' has already been declared

const PI = 3.14
// const PI = 3.14159 // SyntaxError


// var and let allow reassignment
var count = 1;
count = 2;           // ✓ Fine

let score = 100;
score = 200;         // ✓ Fine

// const prevents reassignment
const API_KEY = "abc123"
// API_KEY = "xyz789"  // TypeError: Assignment to constant variable

// BUT: const objects/arrays CAN be mutated!
const user = { name: "Alice" }
user.name = "Bob"   // ✓ This works!
user.age = 25       // ✓ This works too!
// user = {}        // ✗ This fails (reassignment)


 function hoistingDemo() {
  // var: hoisted and initialized as undefined
  console.log(a);  // undefined
  var a = 1;
  
  // let: hoisted but NOT initialized (TDZ)
  // console.log(b);  // ReferenceError!
  let b = 2;
  
  // const: same as let
  // console.log(c);  // ReferenceError!
  const c = 3;
}


 // The Problem: var is function-scoped
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 100)
}
// Output: 3, 3, 3  (not 0, 1, 2!)

// Why? There's only ONE 'i' variable shared across all iterations.
// By the time the setTimeout callbacks run, the loop has finished and i === 3.


 // 
// Lexical Scope
// Lexical scope means that a function’s scope is determined by where it’s defined in the source code, not where it’s called. Inner functions have access to variables in their outer (enclosing) functions, even after the outer function has finished executing. This is the basis of closures.
function outer() {
  const outerVar = "I am from the outer function";
    function inner() {
    console.log(outerVar); // Can access outerVar
    }
    return inner; // Return the inner function
}

const innerFunc = outer();


// Lexical scope (also called static scope) means that the scope of a variable is determined by its position in the source code, not by how functions are called at runtime. This is why inner functions can access variables from their outer functions, even after the outer function has finished executing. The inner function “remembers” the scope where it was created, which is what we call a closure.

 const outer = "I'm outside!";

function outerFunction() {
  const middle = "I'm in the middle!";
  
  function innerFunction() {
    const inner = "I'm inside!";
    
    // innerFunction can access all three variables
    console.log(inner);   // ✓ Own scope
    console.log(middle);  // ✓ Parent scope
    console.log(outer);   // ✓ Global scope
  }
  
  innerFunction();
  // console.log(inner);  // ✗ ReferenceError
}

outerFunction();
// console.log(middle);   // ✗ ReferenceError

// Scope chain: When a variable is accessed, JavaScript looks in the current scope first. If it’s not found, it looks in the outer scope, then the next outer scope, and so on until it reaches the global scope. If the variable is not found anywhere, it throws a ReferenceError.

// Variable Lookup: Where is 'x'?

// ┌─────────────────────────────────────────────────┐
// │ Global Scope                                    │
// │   x = "global"                                  │
// │                                                 │
// │   ┌─────────────────────────────────────────┐   │
// │   │ outer() Scope                           │   │
// │   │   x = "outer"                           │   │
// │   │                                         │   │
// │   │   ┌─────────────────────────────────┐   │   │
// │   │   │ inner() Scope                   │   │   │
// │   │   │                                 │   │   │
// │   │   │   console.log(x);               │   │   │
// │   │   │         │                       │   │   │
// │   │   │         ▼                       │   │   │
// │   │   │   1. Check inner() → not found  │   │   │
// │   │   │         │                       │   │   │
// │   │   └─────────│───────────────────────┘   │   │
// │   │             ▼                           │   │
// │   │   2. Check outer() → FOUND! "outer"     │   │
// │   │                                         │   │
// │   └─────────────────────────────────────────┘   │
// │                                                 │
// └─────────────────────────────────────────────────┘

// Result: "outer"

// 
// Variable Shadowing
// Variable shadowing occurs when a variable declared in an inner scope has the same name as a variable in an outer scope. The inner variable “shadows” the outer one, meaning that within the inner scope, references to that variable name will access the inner variable instead of the outer one.

const name = "Alice";
function greet() {
  const name = "Bob";
    console.log(name); // Output: "Bob" (the inner variable shadows the outer one)
}
greet();
console.log(name); // Output: "Alice" (the outer variable is still accessible here)
    
    // When an inner scope declares a variable with the same name as an outer scope, the inner variable “shadows” the outer one:
const value = "outer value";

function shadowingExample() {
  const value = "inner value"; // This shadows the outer 'value'
  console.log(value); // Output: "inner value"
}
shadowingExample();
console.log(value); // Output: "outer value" (the outer variable is unaffected) 
const name = "Global";

function greet() {
  const name = "Function";  // Shadows global 'name'
  
  if (true) {
    const name = "Block";   // Shadows function 'name'
    console.log(name);      // "Block"
  }
  
  console.log(name);        // "Function"
}

greet();
console.log(name);          // "Global"

// Closures
// A closure is a function that “remembers” the scope in which it was created, even after that scope has finished executing. This allows the inner function to access and manipulate variables from the outer function, creating powerful patterns for data encapsulation and state management.
function outerFunction() {
  const outerVar = "I am from the outer function";
    function innerFunction() {
    console.log(outerVar); // Can access outerVar
    }
    return innerFunction; // Return the inner function
}
const myClosure = outerFunction();
myClosure(); // Output: I am from the outer function

// What is a Closure in JavaScript?
// A closure is a function that retains access to its lexical scope, even when the function is executed outside of that scope. In simpler terms, it’s a function that “remembers” the environment in which it was created, allowing it to access variables from that environment even after the outer function has finished executing. Closures are created whenever a function is defined inside another function and the inner function references variables from the outer function.

// Closures are a fundamental concept in JavaScript and are used for various purposes, such as data encapsulation, creating private variables, and implementing functions that maintain state across multiple invocations. They allow you to create functions with persistent state and can be used to implement powerful patterns like the module pattern and function factories.

//A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to variables from an outer (enclosing) scope, even after that outer function has finished executing and returned. Every function in JavaScript creates a closure at creation time.
// Remember our office building analogy? A closure is like someone who worked in the private office, left the building, but still remembers exactly where everything was, and can still use that knowledge!

function createGreeter(greeting) {
  // 'greeting' is in createGreeter's scope
  
  return function(name) {
    // This inner function is a closure!
    // It "closes over" the 'greeting' variable
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayHola = createGreeter("Hola");

// createGreeter has finished executing, but...
sayHello("Alice");  // "Hello, Alice!"
sayHola("Bob");     // "Hola, Bob!"

// The inner functions still remember their 'greeting' values!

//How Closures Work: Step by Step

// 1 Outer Function is Called

// createGreeter("Hello") is called. A new execution context is created with greeting = "Hello".
// 2
// Inner Function is Created

// The inner function is created. It captures a reference to the current lexical environment (which includes greeting).
// 3
// Outer Function Returns

// createGreeter returns the inner function and its execution context is (normally) cleaned up.
// 4
// But the Closure Survives!

// Because the inner function holds a reference to the lexical environment, the greeting variable is NOT garbage collected. It survives!
// 5
// Closure is Invoked Later

// When sayHello("Alice") is called, the function can still access greeting through its closure.


//After createGreeter("Hello") returns:

// ┌──────────────────────────────────────┐
// │ sayHello (Function)                  │
// ├──────────────────────────────────────┤
// │ [[Code]]: function(name) {...}       │
// │                                      │
// │ [[Environment]]: ────────────────────────┐
// └──────────────────────────────────────┘   │
//                                            ▼
//                           ┌────────────────────────────┐
//                           │ Lexical Environment        │
//                           │ (Kept alive by closure!)   │
//                           ├────────────────────────────┤
//                           │ greeting: "Hello"          │
//                           └────────────────────────────┘

// Closures are everywhere in JavaScript! They’re used in callbacks, event handlers, modules, and more. Understanding how they work is key to mastering JavaScript and writing efficient, powerful code.


// Closures in the Wild


// Closures aren’t just a theoretical concept. You’ll use them every day. Here are the patterns that make closures so powerful.


// 
// 1. Data Privacy & Encapsulation

// Closures allow you to create private variables that can only be accessed and modified through specific functions. This is a powerful way to encapsulate data and control access to it.
//Closures let you create truly private variables in JavaScript:

function createCounter() {
  let count = 0; // This variable is private to the closure
    return {
    increment() {
        count++;
        console.log(count);
    },
    decrement() {
        count--;
        console.log(count);
    }
    };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
// console.log(counter.count); // undefined (count is private)

// 2. Function Factories

// Closures can be used to create function factories, which are functions that generate other functions with specific behavior based on the parameters passed to the factory.

function createMultiplier(multiplier) {
    return function(value) {
        return value * multiplier; // This inner function is a closure that captures 'multiplier'
    }
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15


//This pattern works great with the Fetch API for creating reusable API clients:
function createApiClient(baseUrl) {
  return {
    get(endpoint) {
        return fetch(`${baseUrl}${endpoint}`).then(res => res.json());
    },
    post(endpoint, data) {
        return fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
    };
}
const apiClient = createApiClient("https://api.example.com");
apiClient.get("/users").then(users => console.log(users));
apiClient.post("/users", { name: "Alice" }).then(response => console.log(response));


// 3. Preserving State in Callbacks & Event Handlers 


// Closures are essential for maintaining state in asynchronous code. When you use addEventListener() to attach event handlers, those handlers can close over variables from their outer scope:

function setupClickCounter(buttonId) {
  let clicks = 0;  // This variable persists across clicks!
  
  const button = document.getElementById(buttonId);
  
  button.addEventListener('click', function() {
    clicks++;
    console.log(`Button clicked ${clicks} time${clicks === 1 ? '' : 's'}`);
  });
}

setupClickCounter('myButton');
// Each click increments the same 'clicks' variable
// Click 1: "Button clicked 1 time"
// Click 2: "Button clicked 2 times"
// Click 3: "Button clicked 3 times"

//
// 4. Memoization (Caching Results)

//Closures enable efficient caching of expensive computations:


function createMemoizedFunction(fn) {
  const cache = {};  // Cache persists across calls!
  
  return function(arg) {
    if (arg in cache) {
      console.log('Returning cached result');
      return cache[arg];
    }
    
    console.log('Computing result');
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}

// Expensive operation: calculate factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const memoizedFactorial = createMemoizedFunction(factorial);

console.log(memoizedFactorial(5));  // Computing result → 120
console.log(memoizedFactorial(5));  // Returning cached result → 120
console.log(memoizedFactorial(12));  // Returning cached result → 120


// pitfalls

// What does this print?
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// Most people expect: 0, 1, 2
// Actual output: 3, 3, 3

// What actually happens:

//   TIME ════════════════════════════════════════════════════►

//   ┌─────────────────────────────────────────────────────────┐
//   │ IMMEDIATELY (milliseconds):                             │
//   │                                                         │
//   │   Loop iteration 1: i = 0, schedule callback            │
//   │   Loop iteration 2: i = 1, schedule callback            │
//   │   Loop iteration 3: i = 2, schedule callback            │
//   │   Loop ends: i = 3                                      │
//   │                                                         │
//   │   All 3 callbacks point to the SAME 'i' variable ──┐    │
//   └─────────────────────────────────────────────────────│───┘
//                                                         │
//                                                         ▼
//   ┌─────────────────────────────────────────────────────────┐
//   │ ~1 SECOND LATER:                                        │
//   │                                                         │
//   │   callback1 runs: "What's i?" → i is 3 → prints 3       │
//   │   callback2 runs: "What's i?" → i is 3 → prints 3       │
//   │   callback3 runs: "What's i?" → i is 3 → prints 3       │
//   │                                                         │
//   └─────────────────────────────────────────────────────────┘

//   Result: 3, 3, 3 (not 0, 1, 2!)



// Memory Leaks from Closures
function createHeavyClosure() {
  const hugeData = new Array(1000000).fill('x');  // Large data
  
  return function() {
    // This reference to hugeData keeps the entire array in memory
    console.log(hugeData.length);
  };
}

const leakyFunction = createHeavyClosure();
// hugeData is still in memory because the closure references it


//note : Modern JavaScript engines like V8 can optimize closures that don’t actually use outer variables. However, it’s best practice to assume referenced variables are retained and explicitly clean up large data when you’re done with it. 


function setupHandler(element) {
  // Imagine this returns a large dataset
  const largeData = { users: new Array(10000).fill({ name: 'User' }) };
  
  const handler = function() {
    console.log(`Processing ${largeData.users.length} users`);
  };
  
  element.addEventListener('click', handler);
  
  // Return a cleanup function
  return function cleanup() {
    element.removeEventListener('click', handler);
    // Now handler and largeData can be garbage collected
  };
}

const button = document.getElementById('myButton');
const cleanup = setupHandler(button);

// Later, when you're done with this functionality:
cleanup();  // Removes listener, allows memory to be freed