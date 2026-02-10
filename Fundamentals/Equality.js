// Equality: == vs ===

// == checks for value equality with type coercion, while === checks for strict equality without coercion

// Examples:
console.log(5 == '5'); // true (type coercion converts '5' to 5)
console.log(5 === '5'); // false (different types, no coercion)

console.log(null == undefined); // true (both are considered equal in non-strict equality)
console.log(null === undefined); // false (different types)
console.log(0 == false); // true (type coercion converts false to 0)
console.log(0 === false); // false (different types)
console.log('' == false); // true (type coercion converts '' to 0 and false to 0)
console.log('' === false); // false (different types)
console.log([] == false); // true (type coercion converts [] to '' and then to 0)
console.log([] === false);
// false (different types)
console.log([] == '');
// true (type coercion converts [] to '')
console.log([] === '');
// false (different types)
console.log({} == '[object Object]');
// true (type coercion converts {} to '[object Object]')
console.log({} === '[object Object]');
// false (different types)

// The Three Equality Operators: Overview
// == (loose equality) — Checks for value equality with type coercion
// === (strict equality) — Checks for value equality without type coercion
// Object.is() — Similar to === but treats NaN as equal to itself and distinguishes +0 and -0

// The Teacher Grading Papers: A Real-World Analogy
// Imagine a teacher grading papers. The teacher has two ways to check if a student's answer is correct:
// 1. Loose Equality (==): The teacher is lenient and allows for some flexibility. If the student's answer is close enough to the correct answer, the teacher gives them credit. For example, if the correct answer is "5" and the student writes 5, the teacher would say, "Close enough! I'll give you credit." This is like how == works in JavaScript, where it performs type coercion to compare values.
// 2. Strict Equality (===): The teacher is strict and only gives credit if the student's answer matches the correct answer exactly, both in value and type. So if the correct answer is "5" and the student writes 5, the teacher would say, "That's not correct! You need to write '5' as a string." This is like how === works in JavaScript, where it checks for both value and type without coercion.

// RELAXED GRADING (==)                  STRICT GRADING (===)
//       "Is the answer correct?"              "Is it exactly right?"
    
//     ┌─────────────┐   ┌─────────────┐    ┌─────────────┐   ┌─────────────┐
//     │      4      │ = │    "4"      │    │      4      │ ≠ │    "4"      │
//     │  (number)   │   │  (string)   │    │  (number)   │   │  (string)   │
//     └─────────────┘   └─────────────┘    └─────────────┘   └─────────────┘
//           │                 │                  │                 │
//           └────────┬────────┘                  └────────┬────────┘
//                    ▼                                    ▼
//           "Close enough!" ✓                    "Different types!" ✗



//  JavaScript gives you both types of teachers:
// Loose equality (==) — The relaxed teacher. Accepts 4 and "4" as the same answer because the meaning is similar. Converts values to match before comparing.
// Strict equality (===) — The strict teacher. Only accepts the exact answer in the exact format. The number 4 and the string "4" are different answers.
// typeof — Asks “What kind of answer is this?” Is it a number? A string? Something else?
// Object.is() — The most precise teacher. Even stricter than === — can spot tiny differences that others miss.


 // TL;DR: Use === for almost everything. Use == null to check for both null and undefined. Use Object.is() only for NaN or -0 edge cases.


 // Loose Equality (==): The Relaxed Comparison
// == performs type coercion, converting values to a common type before comparing
console.log(5 == '5'); // true (type coercion converts '5' to 5)
console.log(null == undefined);// true (both are considered equal in non-strict equality)
console.log(0 == false); // true (type coercion converts false to 0)
console.log('' == false);// true (type coercion converts '' to 0 and false to 0)
console.log([] == false); // true (type coercion converts [] to '' and then to 0)
console.log([] == ''); // true (type coercion converts [] to '')
console.log({} == '[object Object]'); // true (type coercion converts {} to '[object Object]')

// Strict Equality (===): The Exact Comparison
// === checks for both value and type equality without coercion
console.log(5 === '5'); // false (different types)
console.log(null === undefined); // false (different types)
console.log(0 === false);// false (different types)
console.log('' === false);// false (different types)
console.log([] === false);// false (different types)
console.log([] === '');// false (different types)
console.log({} === '[object Object]');// false (different types)

// Object.is(): The Most Precise Comparison

// Object.is() is similar to === but treats NaN as equal to itself and distinguishes +0 and -0
console.log(Object.is(NaN, NaN)); // true (NaN is considered equal to itself in Object.is())
console.log(Object.is(+0, -0)); // false (+0 and -0 are considered different in Object.is())

// x == y
//                                  │
//                     ┌────────────┴────────────┐
//                     ▼                         ▼
//                Same type?                Different types?
//                     │                         │
//                    YES                       YES
//                     │                         │
//                     ▼                         ▼
//             Compare values           ┌────────┴────────┐
//             (like ===)               │                 │
//                                      ▼                 ▼
//                               null == undefined?   Apply coercion
//                                      │              rules above
//                                     YES                 │
//                                      │                  ▼
//                                      ▼             Convert types
//                                    true            then compare
//                                                      again



// The Complete Coercion Rules Table
// Type of x	Type of y	Coercion Applied
// Number	String	ToNumber(y) — String becomes Number
// String	Number	ToNumber(x) — String becomes Number
// BigInt	String	ToBigInt(y) — String becomes BigInt
// String	BigInt	ToBigInt(x) — String becomes BigInt
// Boolean	Any	ToNumber(x) — Boolean becomes Number (0 or 1)
// Any	Boolean	ToNumber(y) — Boolean becomes Number (0 or 1)
// Object	String/Number/BigInt/Symbol	ToPrimitive(x) — Object becomes primitive
// String/Number/BigInt/Symbol	Object	ToPrimitive(y) — Object becomes primitive
// BigInt	Number	Compare mathematical values directly
// Number	BigInt	Compare mathematical values directly
// null	undefined	true (special case)
// undefined	null	true (special case)
// null	Any (except undefined)	false
// undefined	Any (except null)	false


 // String converted to Number
1 == "1"              // true  ("1" → 1)
0 == ""               // true  ("" → 0)
0 == "0"              // true  ("0" → 0)
100 == "1e2"          // true  ("1e2" → 100)

// But string-to-string is direct comparison
"" == "0"             // false (both strings, different values)

// NaN conversions (NaN is "Not a Number")
NaN == "NaN"          // false (NaN ≠ anything, including itself)
0 == "hello"          // false ("hello" → NaN, 0 ≠ NaN)


// Booleans become 0 or 1 FIRST
true == 1             // true  (true → 1)
false == 0            // true  (false → 0)
true == "1"           // true  (true → 1, "1" → 1)
false == ""           // true  (false → 0, "" → 0)

// This is why these are confusing:
true == "true"        // false! (true → 1, "true" → NaN)
false == "false"      // false! (false → 0, "false" → NaN)

// And these seem wrong:
true == 2             // false (true → 1, 1 ≠ 2)
true == "2"           // false (true → 1, "2" → 2, 1 ≠ 2)


  // The special relationship
null == undefined     // true  (special rule!)
undefined == null     // true

// But they don't equal anything else
null == 0             // false
null == false         // false
null == ""            // false
undefined == 0        // false
undefined == false    // false
undefined == ""       // false

// This is actually useful!
let value = null;
if (value == null) {
  // Catches both null AND undefined
  console.log("Value is nullish");
}


 // Arrays convert via ToPrimitive (usually toString)
[] == false           // true  ([] → "" → 0, false → 0)
[] == 0               // true  ([] → "" → 0)
[] == ""              // true  ([] → "")
[1] == 1              // true  ([1] → "1" → 1)
[1] == "1"            // true  ([1] → "1")
[1,2] == "1,2"        // true  ([1,2] → "1,2")

// Empty array gotcha
[] == ![]             // true! (see explanation below)

// Objects with valueOf/toString
let obj = { valueOf: () => 42 };
obj == 42             // true  (obj.valueOf() → 42)


 // All of these are false (different types)
1 === "1"              // false
0 === ""               // false
true === 1             // false
false === 0            // false
null === undefined     // false
[] === ""              // false

// All of these are true (same type, same value)
1 === 1                // true
"hello" === "hello"    // true
true === true          // true
null === null          // true
undefined === undefined // true


 // NaN is the only value that is not equal to itself
NaN === NaN           // false!

// NaN doesn't equal anything, not even itself!
// This is part of how numbers work in all programming languages

// This is by design (IEEE 754 specification)
// NaN represents "Not a Number" - an undefined result
// Since it's not a specific number, it can't equal anything

// How to check for NaN:
Number.isNaN(NaN)     // true (recommended)
isNaN(NaN)            // true (but has quirks — see below)
Object.is(NaN, NaN)   // true (ES6)

// The isNaN() quirk:
isNaN("hello")        // true! (converts to NaN first)
Number.isNaN("hello") // false (no conversion)


// Positive zero and negative zero are considered equal
+0 === -0             // true
-0 === 0              // true

// But they ARE different! Watch this:
1 / +0                // Infinity
1 / -0                // -Infinity

// Two zeros, two different infinities. Math is wild.

// How to distinguish them:
Object.is(+0, -0)     // false (ES6)
1 / +0 === 1 / -0     // false (Infinity vs -Infinity)

// When does -0 appear?
0 * -1                // -0
Math.sign(-0)         // -0
JSON.parse("-0")      // -0



// Objects are compared by REFERENCE, not by value
const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" };
const obj3 = obj1;

obj1 === obj2    // false (different objects in memory)
obj1 === obj3    // true  (same reference)

// Same with arrays
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = arr1;

arr1 === arr2    // false (different arrays)
arr1 === arr3    // true  (same reference)

// And functions
const fn1 = () => {};
const fn2 = () => {};
const fn3 = fn1;

fn1 === fn2      // false (different functions)
fn1 === fn3      // true  (same reference)


MEMORY VISUALIZATION:

// obj1 ──────┐
//            ├──► { name: "Alice" }    (Object A)
// obj3 ──────┘

// obj2 ──────────► { name: "Alice" }   (Object B)

// obj1 === obj3 → true  (both point to Object A)
// obj1 === obj2 → false (different objects, even with same content)



// How It Differs from ===
// Object.is() behaves exactly like === except for these two cases:
// Expression	===	Object.is()
// NaN, NaN	false	true
// +0, -0	true	false
// -0, 0	true	false
// 1, 1	true	true
// "a", "a"	true	true
// null, null	true	true
// {}, {}	false	false
// ​
// Complete Comparison Table
// Values	==	===	Object.is()
// 1, "1"	true	false	false
// 0, false	true	false	false
// null, undefined	true	false	false
// NaN, NaN	false	false	true
// +0, -0	true	true	false
// [], []	false	false	false
// {}, {}	false	false	false


// when to use this 
// 1. Checking for NaN (alternative to Number.isNaN)
function isReallyNaN(value) {
  return Object.is(value, NaN);
}

// 2. Distinguishing +0 from -0 (rare, but needed in math/physics)
function isNegativeZero(value) {
  return Object.is(value, -0);
}

// 3. Implementing SameValue comparison (like in Map/Set)
// Maps use SameValueZero (like Object.is but +0 === -0)
const map = new Map();
map.set(NaN, "value");
map.get(NaN);  // "value" (NaN works as a key!)

// 4. Library code and polyfills
// When you need exact specification compliance



// Complete Results Table
// Value	typeof Result	Notes
// "hello"	"string"	
// 42	"number"	Includes Infinity, NaN
// 42n	"bigint"	ES2020
// true / false	"boolean"	
// undefined	"undefined"	
// Symbol()	"symbol"	ES6
// null	"object"	Famous bug!
// {}	"object"	
// []	"object"	Arrays are objects
// function(){}	"function"	Special case
// class {}	"function"	Classes are functions
// new Date()	"object"	
// /regex/	"object"	


 /// Array.isArray([])           // true (recommended)
Array.isArray({})           // false
Array.isArray("hello")      // false

// Or using Object.prototype.toString
Object.prototype.toString.call([])  // "[object Array]"


  typeof function() {}    // "function"
typeof (() => {})       // "function"
typeof class {}         // "function"
typeof Math.sin         // "function"



// Arrays
Array.isArray(value)           // true for arrays only

// NaN
Number.isNaN(value)            // true for NaN only (no coercion)

// Finite numbers
Number.isFinite(value)         // true for finite numbers

// Integers
Number.isInteger(value)        // true for integers

// Safe integers
Number.isSafeInteger(value)    // true for safe integers


// Check if an object is an instance of a constructor
[] instanceof Array            // true
{} instanceof Object           // true
new Date() instanceof Date     // true
/regex/ instanceof RegExp      // true

// Works with custom classes
class Person {}
const p = new Person();
p instanceof Person            // true

// Caveat: doesn't work across iframes/realms
// The Array in iframe A is different from Array in iframe B


  const getType = (value) => 
  Object.prototype.toString.call(value).slice(8, -1);

getType(null)           // "Null"
getType(undefined)      // "Undefined"
getType([])             // "Array"
getType({})             // "Object"
getType(new Date())     // "Date"
getType(/regex/)        // "RegExp"
getType(new Map())      // "Map"
getType(new Set())      // "Set"
getType(Promise.resolve()) // "Promise"
getType(function(){})   // "Function"
getType(42)             // "Number"
getType("hello")        // "String"
getType(Symbol())       // "Symbol"
getType(42n)            // "BigInt"



function getType(value) {
  // Handle null specially (typeof bug)
  if (value === null) return "null";
  
  // Handle primitives
  const type = typeof value;
  if (type !== "object" && type !== "function") {
    return type;
  }
  
  // Handle objects with Object.prototype.toString
  const tag = Object.prototype.toString.call(value);
  return tag.slice(8, -1).toLowerCase();
}

// Usage
getType(null)           // "null"
getType([])             // "array"
getType({})             // "object"
getType(new Date())     // "date"
getType(/regex/)        // "regexp"
getType(new Map())      // "map"
getType(Promise.resolve()) // "promise"



// Need to compare two values?
//                               │
//                               ▼
//               ┌───────────────────────────────┐
//               │ Checking for null/undefined?  │
//               └───────────────────────────────┘
//                       │               │
//                      YES              NO
//                       │               │
//                       ▼               ▼
//                ┌──────────┐   ┌───────────────────┐
//                │ == null  │   │ Need NaN or ±0?   │
//                └──────────┘   └───────────────────┘
//                                   │           │
//                                  YES          NO
//                                   │           │
//                                   ▼           ▼
//                             ┌──────────┐ ┌─────────┐
//                             │Object.is │ │   ===   │
//                             │    or    │ └─────────┘
//                             │Number.   │
//                             │ isNaN()  │
//                             └──────────┘



// Quick Reference
// Scenario	Use	Example
// Default comparison	===	if (x === 5)
// Check nullish	== null	if (value == null)
// Check NaN	Number.isNaN()	if (Number.isNaN(x))
// Check array	Array.isArray()	if (Array.isArray(x))
// Check type	typeof	if (typeof x === "string")
// Distinguish ±0	Object.is()	Object.is(x, -0)

// The key things to remember about Equality Operators:
// Use === by default — It’s predictable and doesn’t convert types
// == converts types first — This leads to unexpected results like "0" == false being true
// Only use == for null checks — value == null checks for both null and undefined
// NaN !== NaN — NaN doesn’t equal anything, not even itself. Use Number.isNaN() to check for it
// Objects compare by reference — {} === {} is false because they’re different objects in memory
// typeof null === "object" — This is a bug that can’t be fixed. Always check for null directly
// Object.is() for edge cases — Use it when you need to check for NaN or distinguish +0 from -0
// Arrays return "object" from typeof — Use Array.isArray() to check for arrays
// These rules are commonly asked in interviews — Now you’re prepared!
// Configure ESLint — Use the eqeqeq rule to enforce === in your projects


// Summary of Key Points
// == vs === — == allows type coercion, while === does not. Use === by default to avoid surprises.
// null == undefined — This is true, but neither equals anything else with ==. Use this for nullish checks.
// NaN is unique — It’s the only value not equal to itself; use Number.isNaN() to check for it.
// Objects compare by reference — {} === {} is false because they’re different objects in memory.
// typeof null === "object" — This is a known bug in JavaScript. Always check for null directly.
// Object.is() — Use this for edge cases like NaN and distinguishing +0 from -0.
// Arrays are objects — typeof [] returns "object". Use Array.isArray() to check for arrays.
// Common pitfalls — Be cautious with == comparisons involving strings, numbers, and booleans due to coercion rules.
// Tips for Interviews — Understand these concepts thoroughly as they are frequently asked in technical interviews.
// Final Cheatsheet
// Use === for almost everything
// Use == null to check for both null and undefined
// Use Object.is() only for NaN or -0 edge cases
// Type Coercion Summary
// Three conversions only — String, Number, Boolean
// Implicit vs Explicit — Know when JS converts automatically vs when you control it
// The 8 common falsy values — false, 0, -0, 0n, "", null, undefined, NaN — everything else is truthy (plus the rare document.all)
// + is special — It prefers string concatenation if ANY operand is a string
// - * / % are consistent — They ALWAYS convert to numbers
// == coerces, === doesn’t — Use === by default to avoid surprises
// null == undefined — This is true, but neither equals anything else with ==
// Objects convert via valueOf() and toString() — Learn these methods to control conversion
// When in doubt, be explicit — Use Number(), String(), Boolean()
// NaN is unique — It’s the only value not equal to itself; use Number.isNaN() to check
// Summary of Key Points
// Use === by default — It’s predictable and doesn’t convert types
// == converts types first — This leads to unexpected results like "0" == false being true.
// Only use == for null checks — value == null checks for both null and undefined
// NaN !== NaN — NaN doesn’t equal anything, not even itself. Use Number.isNaN() to check for it.
// Objects compare by reference — {} === {} is false because they’re different objects in memory
// typeof null === "object" — This is a bug that can’t be fixed. Always check for null directly
// Object.is() for edge cases — Use it when you need to check for NaN or distinguish +0 from -0
// Arrays return "object" from typeof — Use Array.isArray() to check for arrays
// These rules are commonly asked in interviews — Now you’re prepared!
// TL;DR: Use === for almost everything. Use == null to check for both null and undefined. Use Object.is() only for NaN or -0 edge cases.
// Type Coercion Summary
// Three conversions only — String, Number, Boolean
// Implicit vs Explicit — Know when JS converts automatically vs when you control it
// The 8 common falsy values — false, 0, -0, 0n, "", null, undefined, NaN — everything else is truthy (plus the rare document.all)
// + is special — It prefers string concatenation if ANY operand is a string
// - * / % are consistent — They ALWAYS convert to numbers
// == coerces, === doesn’t — Use === by default to avoid surprises
// null == undefined — This is true, but neither equals anything else with ==
// Objects convert via valueOf() and toString() — Learn these methods to control conversion
// When in doubt, be explicit — Use Number(), String(), Boolean()
// NaN is unique — It’s the only value not equal to itself; use Number.isNaN() to check
// TL;DR: Use === for almost everything. Use == null to check for both null and undefined. Use Object.is() only for NaN or -0 edge cases.
// Type Coercion Summary
// Three conversions only — String, Number, Boolean
// Implicit vs Explicit — Know when JS converts automatically vs when you control it
// The 8 common falsy values — false, 0, -0, 0n, "", null, undefined, NaN — everything else is truthy (plus the rare document.all)
// + is special — It prefers string concatenation if ANY operand is a string
// - * / % are consistent — They ALWAYS convert to numbers
// == coerces, === doesn’t — Use === by default to avoid surprises
// null == undefined — This is true, but neither equals anything else with ==
// Objects convert via valueOf() and toString() — Learn these methods to control conversion
// When in doubt, be explicit — Use Number(), String(), Boolean()
// NaN is unique — It’s the only value not equal to itself; use Number.isNaN() to check
