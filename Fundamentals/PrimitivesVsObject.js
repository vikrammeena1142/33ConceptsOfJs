// Primitives vs Objects: 
// Primitives are immutable, while objects are mutable.

// Primitives:
let name = 'John';
name[0] = 'J';  
console.log(name); // Output: 'John' (unchanged)

// Objects:
let person = { name: 'John' };
person.name = 'Jane';  
console.log(person.name); // Output: 'Jane' (changed)
// Primitives are passed by value, while objects are passed by reference.
// Primitives:
let a = 10;
let b = a;  
b = 20;  
console.log(a); // Output: 10 (unchanged)
console.log(b); // Output: 20 (changed)
// Objects:
let obj1 = { value: 10 };
let obj2 = obj1;  
obj2.value = 20;  
console.log(obj1.value);
console.log(obj2.value); // Output: 20 (both changed)   
// Conclusion:
// Primitives are simple data types that are immutable and passed by value, while objects are complex data types that are mutable and passed by reference. Understanding these differences is crucial for effective programming in JavaScript.  

const original = { name: "Alice" };
const copy = original;
copy.name = "Bob";

console.log(original.name);  // "Bob" — Wait, what?!
// In this example, both `original` and `copy` reference the same object in memory. When we change the `name` property through `copy`, it also changes for `original` because they point to the same object. This illustrates how objects are passed by reference in JavaScript.

// Common Myth	                          The Reality
// ”Value types” vs “reference types”   	ECMAScript only defines primitives and objects
// ”Primitives are stored on the stack”  	Implementation-specific — not in the spec
// ”Objects are stored on the heap” 	   Implementation-specific — not in the spec
// ”Primitives are passed by value”	       JavaScript uses call by sharing for ALL values
// ”Objects are passed by reference”    	Objects are passed by sharing (you can’t reassign the original)

// ECMAScript Term	What It Includes
// Primitive values	 -string, number, bigint, boolean, undefined, null, symbol
// Objects	-Everything else (plain objects, arrays, functions, dates, maps, sets, etc.)

//That’s it. The spec never mentions “value types,” “reference types,” “stack,” or “heap.” These are implementation details that vary by JavaScript engine.

 // The fundamental difference between primitives and objects is mutability: primitives are immutable, while objects are mutable.

 // Primitives are immutable — you cannot change a primitive value, only replace it with a new one. For example:
let str = "Hello";
str[0] = "h";
console.log(str); // "Hello" (unchanged)

// Objects are mutable — you can change their properties. For example:
let obj = { greeting: "Hello" };
obj.greeting = "Hi";
console.log(obj.greeting); // "Hi" (changed)


// Key characteristics:

// Immutable — you can’t change them, only replace them
// Behave independently — copies don’t affect each other
// Compared by value — same value = equal (except Symbols)

// Why immutability matters: When you write str.toUpperCase(), you get a NEW string. The original str is unchanged. This is true for ALL string methods — they never mutate the original string.

let greeting = "hello";
let shout = greeting.toUpperCase();

console.log(greeting);  // "hello" — unchanged!
console.log(shout);     // "HELLO" — new string
// 
// Objects: Mutable and Shared
// Everything that’s not a primitive is an object:
// Type	 Example	Key Behavior
// Object	{ name: "Alice" }	Mutable — properties can change
// Array	[1, 2, 3]	Mutable — elements can change
// Function 	function() {}	Mutable (has properties)
// Date	 new Date()	Mutable
// Map	 new Map()	Mutable
// Set 	new Set()	Mutable


//Key characteristics:
// Mutable — you CAN change their contents
// Shared by default — assignment copies the reference, not the object
// Compared by identity — same object = equal (not same contents!)
// Mutable — you can change them
// Behave dependently — copies affect each other (because they reference the same object)


// The House Key Analogy:
// Think of objects like houses and variables like keys to those houses:
// Primitives (like writing a note): You write “42” on a sticky note and give a copy to your friend. You each have independent notes. If they change theirs to “100”, your note still says “42”.
// Objects (like sharing house keys): Instead of giving your friend the house itself, you give them a copy of your house key. You both have keys to the SAME house. If they rearrange the furniture, you’ll see it too — because it’s the same house!

// ┌─────────────────────────────────────────────────────────────────────────┐
// │                 PRIMITIVES vs OBJECTS: THE KEY ANALOGY                   │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │  PRIMITIVES (Independent Notes)        OBJECTS (Keys to Same House)      │
// │                                                                          │
// │  ┌─────────────┐                       ┌─────────────┐                   │
// │  │  a = "42"   │                       │  x = 🔑 ─────────────┐          │
// │  └─────────────┘                       └─────────────┘        │          │
// │                                                               ▼          │
// │  ┌─────────────┐                       ┌─────────────┐    ┌──────────┐   │
// │  │  b = "42"   │  (separate copy)      │  y = 🔑 ─────────►│  🏠     │   │
// │  └─────────────┘                       └─────────────┘    │ {name}   │   │
// │                                                           └──────────┘   │
// │  Change b to "100"?                    Change the house via y?           │
// │  a stays "42"!                         x sees the change too!            │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘


// The key insight: it’s not about where the key is stored, it’s about what it points to.

// Call by Sharing: How JavaScript Passes Arguments
// Here’s where most tutorials get it wrong. JavaScript doesn’t use “pass by value” OR “pass by reference.” It uses a third strategy called call by sharing (also known as “call by object sharing”).

// Call by sharing means that when you pass an object to a function, you’re passing a reference to the same object. The function can modify the object’s contents, but it cannot reassign the original variable to a new object.
function modify(obj) {
  obj.name = "Modified";
}

let myObj = { name: "Original" };
modify(myObj);
console.log(myObj.name); // "Modified" — the object was changed!

// BEFORE rename(user):              INSIDE rename(user):

// ┌────────────┐                    ┌────────────┐
// │user = 🔑 ──┼──► { name:         │user = 🔑 ──┼──► { name: "Bob" }
// └────────────┘    "Alice" }       ├────────────┤       ▲
//                                   │person= 🔑 ─┼───────┘
//                                   └────────────┘  (same house!)

function reassign(obj) {
  obj = { name: "Reassigned" }; // This creates a new object and assigns it to the local variable `obj`
}
reassign(myObj);
console.log(myObj.name); // "Modified" — the original object is unchanged!

// INSIDE replace(user):

// ┌────────────┐    ┌─────────────────┐
// │user = 🔑 ──┼───►│ { name: "Alice" }│  ← Original, unchanged
// ├────────────┤    └─────────────────┘
// │person= 🔑 ─┼───►┌───────────────────┐
// └────────────┘    │ { name: "Charlie" }│  ← New object, local only
                //   └───────────────────┘


// In the `modify` function, we change a property of the object that `myObj` references. This affects `myObj` because it points to the same object. In the `reassign` function, we create a new object and assign it to the local variable `obj`, but this does NOT affect `myObj` because it still points to the original object. This illustrates call by sharing: you can modify the shared object, but you cannot reassign the original reference.


 function double(num) {
  num = num * 2;    // Reassigns the LOCAL variable
  return num;
}

let x = 10;
let result = double(x);

console.log(x);       // 10 — unchanged (reassignment doesn't affect original)
console.log(result);  // 20 — returned value
  
let a1 = 10;
let b1 = a1;      // b gets an independent copy

b1 = 20;         // changing b has NO effect on a

console.log(a1); // 10 (unchanged!)
console.log(b1); // 20
// 
// Copying Objects: Shared References => Shared Mutations 

let objj1 = { name: "Alice" };
let objj2 = objj1;       // obj2 gets a copy of the REFERENCE

objj2.name = "Bob";     // modifies the SAME object!

console.log(objj1.name); // "Bob" (changed!)
console.log(objj2.name); // "Bob"


// The Array Gotcha/
// Arrays are objects too, so they behave the same way:
let arr1 = [1, 2, 3];
let arr2 = arr1;        // arr2 points to the SAME array

arr2.push(4);           // modifies the shared array

console.log(arr1);      // [1, 2, 3, 4] — Wait, what?!
console.log(arr2);      // [1, 2, 3, 4]

 // This trips up EVERYONE at first! When you write let arr2 = arr1, you’re NOT creating a new array. You’re creating a second variable that points to the same array. Any changes through either variable affect both.


  // Comparison Behavior
// Primitives are compared by value:
console.log(10 === 10); // true (same value)
console.log("hello" === "hello"); // true (same value)
console.log(true === true); // true (same value)

// Objects are compared by identity:
let o1 = { name: "Alice" };
let o2 = { name: "Alice" };
console.log(o1 === o2); // false (different objects)

// console.log({} === {});     // false — two different empty objects
// console.log([] === []);     // false — two different empty arrays
// console.log([1,2] === [1,2]); // false — two different arrays

// How to compare objects/arrays by content:
function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
// Example usage:
console.log(areArraysEqual([1, 2], [1, 2])); // true (same contents)
console.log(areArraysEqual([1, 2], [2, 1])); // false (different order)
// Simple (but limited) approach
// JSON.stringify(obj1) === JSON.stringify(obj2)

// For arrays of primitives
// arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i])

// For complex cases, use a library like Lodash
// _.isEqual(obj1, obj2)

 // Caution with JSON.stringify: Property order matters! {a:1, b:2} and {b:2, a:1} produce different strings. It also fails with undefined, functions, Symbols, circular references, NaN, and Infinity.


 // Symbols: The Exception
// Symbols are primitives, but they are unique and compared by identity: two symbols with the same description are NOT equal:

const sym1 = Symbol("id");
const sym2 = Symbol("id");

console.log(sym1 === sym2);  // false — different symbols!
console.log(sym1 === sym1);  // true — same symbol

 // Mutation vs Reassignment
// Mutation: changing the contents of an object (affects all references) , Mutation modifies the existing object in place:
const arr = [1, 2, 3];

// These are all MUTATIONS:
arr.push(4);         // [1, 2, 3, 4]
arr[0] = 99;         // [99, 2, 3, 4]
arr.pop();           // [99, 2, 3]
arr.sort();          // modifies in place

const obj = { name: "Alice" };

// These are all MUTATIONS:
obj.name = "Bob";        // changes property
obj.age = 25;            // adds property
delete obj.age;          // removes property

// Reassignment: changing the variable to point to a new object (does NOT affect other references),
// Reassignment makes the variable point to something else entirely:
let arr = [1, 2, 3];
arr = [4, 5, 6];      // REASSIGNMENT — new array

let obj = { name: "Alice" };
obj = { name: "Bob" }; // REASSIGNMENT — new object

 // 
// The const Trap
// const only prevents reassignment of the variable, not mutation of the object it references:

const arr = [1, 2, 3];

// ✅ Mutations are ALLOWED:
arr.push(4);           // works!
arr[0] = 99;           // works!

// ❌ Reassignment is BLOCKED:
arr = [4, 5, 6];       // TypeError: Assignment to constant variable

const obj = { name: "Alice" };

// ✅ Mutations are ALLOWED:
obj.name = "Bob";      // works!
obj.age = 25;          // works!

// ❌ Reassignment is BLOCKED:
obj = { name: "Eve" }; // TypeError: Assignment to constant variable


// True Immutability with Object.freeze()
// Object.freeze() makes an object immutable — you can’t change its properties or add new ones:
const frozenObj = Object.freeze({ name: "Alice" });
frozenObj.name = "Bob"; // Fails silently in non-strict mode, throws in strict mode
console.log(frozenObj.name); // "Alice" (unchanged// Object.freeze() is shallow! It only freezes the top level. Nested objects can still be modified:
const nestedObj = Object.freeze({ name: "Alice", address: { city: "NY" } });
nestedObj.address.city = "LA"; // This works because the nested object is NOT frozen
console.log(nestedObj.address.city); // "LA" (changed)


// For deep freezing, you need a recursive function or use structuredClone() to create a deep copy first.

// Shallow Copy vs Deep Copy
// A shallow copy creates a new object but copies references to nested objects. A deep copy creates a new object and recursively copies all nested objects.

// A shallow copy creates a new object with copies of the top-level properties. But nested objects are still shared!
const original1 = { name: "Alice", address: { city: "NY" } };
const shallowCopy = { ...original1 }; // Shallow copy using spread syntax    
shallowCopy.name = "Bob"; // Changes the name in shallowCopy, not original1
shallowCopy.address.city = "LA"; // Changes the city in both shallowCopy and original1 (shared nested object)
console.log(original1.name); // "Alice" (unchanged)
console.log(original1.address.city); // "LA" (changed!)



// Deep Copy: All Levels
// A deep copy creates a new object and recursively copies all nested objects. This can be done with structuredClone() in modern JavaScript:

// A deep copy creates completely independent copies at every level.

const original2 = { name: "Alice", address: { city: "NY" } };
const deepCopy = structuredClone(original2);
deepCopy.name = "Bob"; // Changes the name in deepCopy, not original2
deepCopy.address.city = "LA"; // Changes the city in deepCopy, not original2 (independent nested object)
console.log(original2.name); // "Alice" (unchanged)
console.log(original2.address.city); // "NY" (unchanged)

// Which to use:
// Use a shallow copy when you only need to copy the top-level properties and don’t mind shared nested objects.
// Use a deep copy when you need completely independent objects, including all nested objects.

// structuredClone() — Use this for most cases (modern browsers)
// JSON.parse(JSON.stringify(obj)) — Use this for simple objects without functions, Symbols, or circular references. It’s not recommended for complex objects due to limitations and performance issues.

// lodash’s _.cloneDeep() — Use this for complex objects in environments where structuredClone() is not available. It handles many edge cases but adds a dependency. When you need maximum compatibility


// How Engines Actually Store Values:

// 
// The ECMAScript Specification Doesn’t Define Storage

// The idea that primitives are stored on the stack and objects on the heap is an oversimplification. In reality, JavaScript engines use various optimizations and may store values in different ways depending on the context. The spec does not mandate any specific memory model, so it’s best to focus on the conceptual differences rather than implementation details.

// The ECMAScript specification defines behavior, not implementation. It never mentions “stack” or “heap.” Different JavaScript engines can store values however they want, as long as the behavior matches the spec.

// 
// How V8 Actually Works
// V8 (the JavaScript engine used in Chrome and Node.js) uses a combination of techniques to optimize memory usage and performance. It may store small objects inline within the variable’s memory location, while larger objects are stored on the heap. Primitives may be stored directly in registers or on the stack, but this is an implementation detail that can vary.
 // V8 (Chrome, Node.js, Deno) uses a technique called pointer tagging to efficiently represent values.


// Smis (Small Integers): The Only “Direct” Values
// The ONLY values V8 stores “directly” (not on the heap) are Smis — Small Integers in the range approximately -2³¹ to 2³¹-1 (about -2 billion to 2 billion). Smis are stored in a single machine word with a special tag bit to indicate they are integers. This allows for very fast access and operations on small integers without heap allocation.

// ┌─────────────────────────────────────────────────────────────────────────┐
// │                      V8 POINTER TAGGING                                  │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │  Smi (Small Integer):                                                    │
// │  ┌────────────────────────────────────────────────────────────┬─────┐   │
// │  │                    Integer Value (31 bits)                  │  0  │   │
// │  └────────────────────────────────────────────────────────────┴─────┘   │
// │                                                              Tag bit     │
// │                                                                          │
// │  Heap Pointer (everything else):                                         │
// │  ┌────────────────────────────────────────────────────────────┬─────┐   │
// │  │                    Memory Address                           │  1  │   │
// │  └────────────────────────────────────────────────────────────┴─────┘   │
// │                                                              Tag bit     │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘

// 
// Everything Else Lives on the Heap
// All other values (objects, arrays, functions, strings, etc.) are stored on the heap. Variables that reference these values actually hold a pointer to the memory location where the value is stored. When you access or modify these values, the engine follows the pointer to the heap to retrieve or update the data. This is why objects are mutable and shared by reference — because multiple variables can point to the same heap location.

// This includes values you might think are “simple”:
let str = "Hello"; // Stored on the heap (strings are objects in JavaScript)
let bool = true;   // Stored on the heap (booleans are objects in JavaScript)

// Value Type                  	Where It’s Stored	                    Why
// Small integers (-2³¹ to 2³¹-1)	Directly (as Smi)	Fixed size, fits in pointer
// Large numbers          	Heap (HeapNumber)	          Needs 64-bit float
// Strings	Heap	                                    Dynamically sized
// BigInts	Heap	                                    Arbitrary precision
// Objects, Arrays          	Heap	                    Complex structure

// Conclusion: The “stack vs heap” model is a simplification. In reality, JavaScript engines use various optimizations to store values efficiently. The key takeaway is to understand the conceptual differences between primitives and objects, rather than focusing on where they are stored in memory.

// The big misconception: Strings are NOT fixed-size values stored on the stack. A string like "hello" and a string with a million characters are both stored on the heap. The variable just holds a pointer to that heap location.

// 
// Why the Stack/Heap Model is Taught

// Things that “behave like stack values” = act independently
// Things that “behave like heap values” = can be shared and mutated

// The stack/heap model is a useful mental model for beginners to understand the differences in behavior between primitives and objects. It emphasizes that primitives are independent values, while objects can be shared and mutated. However, it’s important to remember that this is a simplification and not an accurate representation of how JavaScript engines actually manage memory.

// Common Bugs and Pitfalls\
// 1. Assuming primitives are mutable:
let str = "Hello";
str[0] = "h";     
console.log(str); // "Hello" (unchanged)

// 2. Assuming objects are independent:
let objjj1 = { name: "Alice" };
let obj2 = objjj1;
obj2.name = "Bob";
console.log(objjj1.name); // "Bob" (changed!)

// 1 . 1. Accidental Object/Array Mutation
// BUG: Modifying function parameter
function processUsers(users) {
  users.push({ name: "New User" });  // Mutates original!
  return users;
}

const myUsers = [{ name: "Alice" }];
processUsers(myUsers);
console.log(myUsers);  // [{ name: "Alice" }, { name: "New User" }]

// FIX: Create a copy first
function processUsers(users) {
  const copy = [...users];
  copy.push({ name: "New User" });
  return copy;
}

// 2. Array Methods That Mutate
// These MUTATE the original array:
arr.push()   ;   arr.pop()
arr.shift()   ;  arr.unshift()
arr.splice()   ; arr.sort()
arr.reverse()  ; arr.fill()

// These RETURN a new array (safe):
arr.map()   ;    arr.filter()
arr.slice()  ;   arr.concat()
arr.flat()     ; arr.flatMap()
arr.toSorted();  arr.toReversed()  // ES2023
arr.toSpliced() ;// ES2023

// GOTCHA: sort() mutates!
const nums = [3, 1, 2];
const sorted = nums.sort();  // nums is NOW [1, 2, 3]!

// FIX: Copy first, or use toSorted()
const sorted1 = [...nums].sort();
const sorted2 = nums.toSorted();  // ES2023

 // 3. Comparing Objects/Arrays

// BUG: This will NEVER work
if (user1 === user2) { }      // Compares identity
if (arr1 === arr2) { }        // Compares identity

// Even these fail:
// [] === []                      // false
// {} === {}                      // false
// [1, 2] === [1, 2]              // false

// FIX: Compare contents
JSON.stringify(a) === JSON.stringify(b)  // Simple but limited

// Or use a deep equality function/library


// 4. Shallow Copy with Nested Objects


// BUG: Shallow copy doesn't clone nested objects
const user = {
  name: "Alice",
  settings: { theme: "dark" }
};

const copy = { ...user };
copy.settings.theme = "light";

console.log(user.settings.theme);  // "light" — Original changed!

// FIX: Use deep copy
const copy = structuredClone(user);

// 5. Forgetting Arrays Are Objects

// BUG: Thinking you have two arrays
const original3 = [1, 2, 3];
const backup = original3;  // NOT a backup!

original3.push(4);
console.log(backup);  // [1, 2, 3, 4] — "backup" changed!

// FIX: Actually copy the array
const backup2 = [...original3];
const backup3 = original3.slice();

// Best Practices
// 1. Use const for objects/arrays to prevent reassignment, but remember they can still be mutated.
// 2. Use immutable patterns (like map, filter) when working with arrays to avoid unintended mutations.
// 3. Use deep copy techniques when you need independent copies of complex objects.
// 4. Be cautious with JSON.stringify for comparing or copying objects — it has limitations.
// 5. Consider using libraries like Lodash for deep cloning and equality checks in complex cases.

// Treat objects as immutable when possible


// Instead of mutating:
user.name = "Bob";

// Create a new object:
const updatedUser = { ...user, name: "Bob" };

 // Know which methods mutate
// Mutating: push, pop, sort, reverse, splice
// Non-mutating: map, filter, slice, concat, toSorted

//  / Key Takeaways

//  1 . Primitives vs Objects — the ECMAScript terms (not “value types” vs “reference types”)
// 2. The real difference is mutability — primitives are immutable, objects are mutable
// 3 .Call by sharing — JavaScript passes ALL values as copies of references; mutation works, reassignment doesn’t
// Object identity — objects are compared by identity, not content ({} === {} is false)
// const prevents reassignment, not mutation — use Object.freeze() for true immutability
// Shallow copy shares nested objects — use structuredClone() for deep copies
// Know your array methods — push/pop/sort mutate; map/filter/slice don’t
// The stack/heap model is a simplification — useful for understanding behavior, not technically accurate
// In V8, only Smis are stored directly — strings, BigInts, and objects all live on the heap
// Symbols have identity — two Symbol("id") are different, unlike other primitives

