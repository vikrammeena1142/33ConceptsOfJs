// Event Loop Demonstration in JavaScript

// Synchronous execution
console.log('1. Start of script');

// Asynchronous macro task (setTimeout)
setTimeout(() => {
    console.log('4. Inside setTimeout (macro task)');
}, 0);

// Asynchronous micro task (Promise)
Promise.resolve().then(() => {
    console.log('3. Inside Promise.then (micro task)');
});

// Synchronous execution continues
console.log('2. End of script');

// Function example demonstrating execution order
function demonstrateExecution() {
    console.log('Function called synchronously');
}

demonstrateExecution();

// Another example with nested async
setTimeout(() => {
    console.log('5. Second setTimeout');
    Promise.resolve().then(() => {
        console.log('6. Promise inside setTimeout');
    });
}, 0);

// Output order:
// 1. Start of script
// 2. End of script
// 3. Inside Promise.then (micro task)
// 4. Inside setTimeout (macro task)
// Function called synchronously
// 5. Second setTimeout
// 6. Promise inside setTimeout

// This demonstrates:
// - Synchronous code runs first
// - Microtasks (Promises) run before macrotasks (setTimeout)
// - Event loop processes tasks in phases

//
console.log('Start');
setTimeout(() => console.log('Timeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('End');

// Output:
// Start
// End
// Promise
// Timeout


// What is the Event Loop?


// The event loop is JavaScript’s mechanism for executing code, handling events, and managing asynchronous operations. It coordinates execution by checking callback queues when the call stack is empty, then pushing queued tasks to the stack for execution. This enables non-blocking behavior despite JavaScript being single-threaded.


//
// The Restaurant Analogy
// Imagine a busy restaurant kitchen with a single chef who can only cook one dish at a time. Despite this limitation, the restaurant serves hundreds of customers because the kitchen has a clever system:


// THE JAVASCRIPT KITCHEN

//                                          ┌─────────────────────────┐
// ┌────────────────────────────────┐       │      KITCHEN TIMERS     │
// │         ORDER SPIKE            │       │      (Web APIs)         │
// │        (Call Stack)            │       │                         │
// │  ┌──────────────────────────┐  │       │  [Timer: 3 min - soup]  │
// │  │  Currently cooking:      │  │       │  [Timer: 10 min - roast]│
// │  │  "grilled cheese"        │  │       │  [Waiting: delivery]    │
// │  ├──────────────────────────┤  │       │                         │
// │  │  Next: "prep salad"      │  │       └───────────┬─────────────┘
// │  └──────────────────────────┘  │                   │
// └────────────────────────────────┘                   │ (timer done!)
//           ▲                                          ▼
//           │                          ┌──────────────────────────────┐
//           │                          │      "ORDER UP!" WINDOW      │
//     KITCHEN MANAGER                  │        (Task Queue)          │
//      (Event Loop)                    │                              │
//                                      │  [soup ready] [delivery here]│
//     "Chef free? ────────────────────►│                              │
//      Here's the next order!"         └──────────────────────────────┘
//           │                                          ▲
//           │                          ┌───────────────┴──────────────┐
//           │                          │       VIP RUSH ORDERS        │
//           └──────────────────────────│      (Microtask Queue)       │
//              (VIP orders first!)     │                              │
//                                      │  [plating] [garnish]         │
//                                      └──────────────────────────────┘


```Here’s how it maps to JavaScript:
Kitchen	JavaScript
Single Chef	JavaScript engine (single-threaded)
Order Spike	Call Stack (current work, LIFO)
Kitchen Timers	Web APIs (setTimeout, fetch, etc.)
”Order Up!” Window	Task Queue (callbacks waiting)
VIP Rush Orders	Microtask Queue (promises, high priority)
Kitchen Manager	Event Loop (coordinator)```

// The JavaScript Runtime Environment

// ┌─────────────────────────────────────────────────────────────────────────┐
// │                        JAVASCRIPT RUNTIME                               │
// │  ┌─────────────────────────────────────────────────────────────────┐   │
// │  │                      JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.) │   │
// │  │  ┌───────────────────────┐    ┌───────────────────────────┐     │   │
// │  │  │      CALL STACK       │    │          HEAP             │     │   │
// │  │  │                       │    │                           │     │   │
// │  │  │  ┌─────────────────┐  │    │   { objects stored here } │     │   │
// │  │  │  │ processData()   │  │    │   [ arrays stored here ]  │     │   │
// │  │  │  ├─────────────────┤  │    │   function references     │     │   │
// │  │  │  │ fetchUser()     │  │    │                           │     │   │
// │  │  │  ├─────────────────┤  │    │                           │     │   │
// │  │  │  │ main()          │  │    │                           │     │   │
// │  │  │  └─────────────────┘  │    └───────────────────────────┘     │   │
// │  │  └───────────────────────┘                                      │   │
// │  └─────────────────────────────────────────────────────────────────┘   │
// │                                                                         │
// │  ┌─────────────────────────────────────────────────────────────────┐   │
// │  │                    BROWSER / NODE.js APIs                        │   │
// │  │                                                                  │   │
// │  │   setTimeout()    setInterval()    fetch()    DOM events         │   │
// │  │   requestAnimationFrame()    IndexedDB    WebSockets             │   │
// │  │                                                                  │   │
// │  │   (These are handled outside of JavaScript execution!)           │   │
// │  └─────────────────────────────────────────────────────────────────┘   │
// │                                    │                                    │
// │                                    │ callbacks                          │
// │                                    ▼                                    │
// │  ┌──────────────────────────────────────────────────────────────────┐  │
// │  │  MICROTASK QUEUE                    TASK QUEUE (Macrotask)       │  │
// │  │  ┌────────────────────────┐        ┌─────────────────────────┐   │  │
// │  │  │ Promise.then()         │        │ setTimeout callback     │   │  │
// │  │  │ queueMicrotask()       │        │ setInterval callback    │   │  │
// │  │  │ MutationObserver       │        │ I/O callbacks           │   │  │
// │  │  │ async/await (after)    │        │ UI event handlers       │   │  │
// │  │  └────────────────────────┘        │ Event handlers          │   │  │
// │  │         ▲                          └─────────────────────────┘   │  │
// │  │         │ HIGHER PRIORITY                    ▲                   │  │
// │  └─────────┼────────────────────────────────────┼───────────────────┘  │
// │            │                                    │                       │
// │            └──────────┬─────────────────────────┘                       │
// │                       │                                                 │
// │              ┌────────┴────────┐                                        │
// │              │   EVENT LOOP    │                                        │
// │              │                 │                                        │
// │              │  "Is the call   │                                        │
// │              │   stack empty?" ├──────────► Push next callback          │
// │              │                 │            to call stack               │
// │              └─────────────────┘                                        │
// └─────────────────────────────────────────────────────────────────────────┘
// JavaScript is single-threaded — only one thing runs at a time on the call stack
// The Event Loop enables async — it coordinates between the call stack and callback queues
// Web APIs run in separate threads — timers, network requests, and events are handled by the browser
// Microtasks > Tasks — Promise callbacks ALWAYS run before setTimeout callbacks
// setTimeout delay is a minimum — actual timing depends on call stack and queue state
// setInterval can drift — use nested setTimeout for precise timing
// requestAnimationFrame for animations — syncs with browser refresh rate, pauses in background
// Never block the main thread — long sync operations freeze the entire UI
// Microtasks can starve tasks — infinite microtask loops prevent rendering
// The Event Loop isn’t JavaScript — it’s part of the runtime environment (browser/Node.js)

// Conclusion 
//