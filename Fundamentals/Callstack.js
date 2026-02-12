// Call Stack : 

// How does JavaScript keep track of which function is running? When a function calls another function, how does JavaScript know where to return when that function finishes?
// 




function greet(name) {
  const message = createMessage(name)
  console.log(message)
}

function createMessage(name) {
  return "Hello, " + name + "!"
}

greet("Alice")  // "Hello, Alice!"

//When greet calls createMessage, JavaScript remembers where it was in greet so it can return there after createMessage finishes. The call stack is what makes this possible.


// The Stack of Plates: A Real-World Analogy

// Imagine you’re working in a restaurant kitchen, washing dishes. As clean plates come out, you stack them one on top of another. When a server needs a plate, they always take the one from the top of the stack, not from the middle or bottom

// ┌───────────┐
//         │  Plate 3  │  ← You add here (top)
//         ├───────────┤
//         │  Plate 2  │
//         ├───────────┤
//         │  Plate 1  │  ← First plate (bottom)
//         └───────────┘
//This is exactly how JavaScript keeps track of your functions! When you call a function, JavaScript puts it on top of a “stack.” When that function finishes, JavaScript removes it from the top and goes back to whatever was underneath.
// This simple concept, adding to the top and removing from the top, is the foundation of how JavaScript executes your code.


//What is the Call Stack? 

//The call stack is a mechanism that JavaScript uses to keep track of where it is in your code. Think of it as JavaScript’s “to-do list” for function calls, but one where it can only work on the item at the top.


function first() { second(); }
function second() { third(); }
function third() { console.log('Hello!'); }

first();
// Stack grows: [first] → [second, first] → [third, second, first]
// Stack shrinks: [second, first] → [first] → []



// LIFO = Last In, First Out

// ┌─────────────────┐
// │   function C    │  ← Last in (most recent call)
// ├─────────────────┤     First to finish and leave
// │   function B    │
// ├─────────────────┤
// │   function A    │  ← First in (earliest call)
// └─────────────────┘     Last to finish

// 
// Why Does JavaScript Need a Call Stack?


//JavaScript is single-threaded, meaning it can only do one thing at a time. The call stack helps JavaScript:

// Remember where it is — Which function is currently running?
// Know where to go back — When a function finishes, where should execution continue?
// Keep track of local variables — Each function has its own variables that shouldn’t interfere with others



// Step 1:          Step 2:          Step 3:              Step 4:          Step 5:

// ┌─────────┐      ┌─────────┐      ┌────────────────┐   ┌─────────┐      ┌─────────┐
// │ (empty) │  →   │  greet  │  →   │createGreeting  │ → │  greet  │  →   │ (empty) │
// └─────────┘      └─────────┘      ├────────────────┤   └─────────┘      └─────────┘
//                                   │     greet      │
//                                   └────────────────┘

// Program          greet()          createGreeting()     createGreeting   greet()
// starts           called           called               returns          returns


// Step	Action	Stack (top → bottom)	What’s Happening
// 1	Start	[]	Program begins
// 2	Call greet("Alice")	[greet]	Enter greet function
// 3	Call createGreeting("Alice")	[createGreeting, greet]	greet pauses, enter createGreeting
// 4	Return from createGreeting	[greet]	createGreeting done, back to greet
// 5	Return from greet	[]	greet done, continue program
// 6	console.log("Done!")	[]	Print “Done!”



// ┌─────────────────────────────────────────┐
// │         EXECUTION CONTEXT               │
// │         Function: greet                 │
// ├─────────────────────────────────────────┤
// │  Arguments:    { name: "Alice" }        │
// │  Local Vars:   { greeting: undefined }  │
// │  this:         window (or undefined)    │
// │  Return to:    line 12, main program    │
// │  Outer Scope:  [global scope]           │
// └─────────────────────────────────────────┘


function multiply(x, y) {
  return x * y;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log(result);
}

printSquare(4);


//Stack: [ printSquare ]
//Stack: [ square, printSquare ]
//Stack: [ multiply, square, printSquare ]
//Stack: [ square, printSquare ]
//Stack: [ printSquare ]
//Stack: [ empty ]




// ┌─────────────────────────────────────────────────────────────────────────┐
// │                         STACK OVERFLOW                                   │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │  WRONG: No Base Case                    RIGHT: With Base Case            │
// │  ────────────────────                   ─────────────────────            │
// │                                                                          │
// │  function count() {                     function count(n) {              │
// │    count()  // Forever!                   if (n <= 0) return  // Stop!   │
// │  }                                        count(n - 1)                   │
// │                                         }                                │
// │                                                                          │
// │  Stack grows forever...                 Stack grows, then shrinks        │
// │  ┌─────────┐                            ┌─────────┐                      │
// │  │ count() │                            │ count(0)│ ← Returns            │
// │  ├─────────┤                            ├─────────┤                      │
// │  │ count() │                            │ count(1)│                      │
// │  ├─────────┤                            ├─────────┤                      │
// │  │ count() │                            │ count(2)│                      │
// │  ├─────────┤                            └─────────┘                      │
// │  │  ....   │                                                             │
// │  └─────────┘                                                             │
// │  💥 CRASH!                              ✓ Success!                       │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘


// ❌ BAD: This will crash!
function countdown(n) {
  console.log(n);
  countdown(n - 1);  // Calls itself forever!
}

countdown(5);


// Stack: [ countdown(5) ]
// Stack: [ countdown(4), countdown(5) ]
// Stack: [ countdown(3), countdown(4), countdown(5) ]
// Stack: [ countdown(2), countdown(3), countdown(4), countdown(5) ]
// ... keeps growing forever ...
// 💥 CRASH: Maximum call stack size exceeded


// ✅ GOOD: This works correctly
function countdown(n) {
  if (n <= 0) {
    console.log("Done!");
    return;  // ← BASE CASE: Stop here!
  }
  console.log(n);
  countdown(n - 1);
}

countdown(5);
// Output: 5, 4, 3, 2, 1, Done!


// Stack: [ countdown(5) ]
// Stack: [ countdown(4), countdown(5) ]
// Stack: [ countdown(3), countdown(4), countdown(5) ]
// Stack: [ countdown(2), countdown(3), ..., countdown(5) ]
// Stack: [ countdown(1), countdown(2), ..., countdown(5) ]
// Stack: [ countdown(0), countdown(1), ..., countdown(5) ]
//        ↑ Base case reached! Start returning.
// Stack: [ countdown(1), ..., countdown(5) ]
// Stack: [ countdown(2), ..., countdown(5) ]
// ... stack unwinds ...
// Stack: [ countdown(5) ]
// Stack: [ empty ]
// ✅ Program completes successfully

// JavaScript is single-threaded — It has ONE call stack and can only do one thing at a time
// LIFO principle — Last In, First Out. The most recent function call finishes first
// Execution contexts — Each function call creates a “frame” containing arguments, local variables, and return address
// Synchronous execution — Functions must complete before their callers can continue
// Stack overflow — Happens when the stack gets too deep, usually from infinite recursion
// Always have a base case — Recursive functions need a stopping condition
// Stack traces are your friend — They show you exactly how your program got to an error
// Async callbacks wait — setTimeout, fetch, and event callbacks don’t run until the call stack is empty
// Each frame is isolated — Local variables in one function call don’t affect variables in another call of the same function
// Debugging tools show the stack — Browser DevTools let you pause execution and inspect the current call stack


//Question 1: What does LIFO stand for and why is it important?

//Answer: LIFO stands for Last In, First Out.
// It’s important because it determines the order in which functions execute and return. The most recently called function must complete before the function that called it can continue. This is how JavaScript keeps track of nested function calls and knows where to return when a function finishes.

//Question 2: What's the maximum stack depth for this code?

function a() { b(); }
function b() { c(); }
function c() { d(); }
function d() { console.log('done'); }
a();

//Answer: The maximum stack depth is 4 frames.

//Stack at deepest point: [ d, c, b, a ]

//When d() is executing, all four functions are on the stack. After d() logs “done” and returns, the stack starts unwinding.


//Question 3: Why does this code cause a stack overflow?

function greet() {
  greet();
}
greet();

// Answer: This code causes a stack overflow because there’s no base case to stop the recursion.
// greet() is called
// greet() calls greet() again
// That greet() calls greet() again
// This continues forever, adding new frames to the stack
// Eventually the stack runs out of space → Maximum call stack size exceeded
// Fix: Add a condition to stop the recursion:
function greet(times) {
  if (times <= 0) return;  // Base case
  console.log('Hello!');
  greet(times - 1);
}
greet(3);


//Question 4: What information is stored in an execution context?

// Answer: An execution context (stack frame) contains:
// 1.Function arguments — The values passed to the function
// 2 Local variables — Variables declared with var, let, or const
// 3 The this value — The context binding for the function
// 4 Return address — Where to continue executing after the function returns
// 5 Scope chain — Access to variables from outer (parent) functions
// This is why each function call can have its own independent set of variables without interfering with other calls.

// /Question 5: What's the output of this code and why?
console.log('First')

setTimeout(() => {
  console.log('Second')
}, 0)

console.log('Third')

// Answer: The output is:

// First
// Third
// Second


//Even though setTimeout has a 0ms delay, “Second” prints last because:
// setTimeout doesn’t put the callback directly on the call stack
// Instead, the callback waits in the task queue
// The event loop only moves it to the call stack when the stack is empty
// “Third” runs first because it’s already on the call stack
// This demonstrates that the call stack must be empty before async callbacks execute.


//Question 6: How do you read a stack trace?


// Given this error:
// Error: Something went wrong!
//     at c (script.js:4:9)
//     at b (script.js:2:14)
//     at a (script.js:1:14)
//     at script.js:7:1


//Answer: Read stack traces from top to bottom (most recent to oldest):
// Top line (at c) — Where the error actually occurred (function c, line 4, column 9)
// Following lines — The chain of function calls that led here
// Bottom line — Where the chain started (the initial call)
// The trace tells you: the program started at line 7, called a(), which called b(), which called c(), where the error was thrown. This helps you trace back through your code to find the root cause.