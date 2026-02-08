// JavaScript has exactly 7 primitive types
const str = "hello";           // string  -Text data
const num = 42;                // number  - 	Numeric data (integers and decimals)
const big = 9007199254740993n; // bigint - Very large integers
const bool = true;             // boolean -Logical values
const undef = undefined;       // undefined - No value assigned
const nul = null;              // null  - Intentional absence of value
const sym = Symbol("id");      // symbol - Unique identifier

console.log(typeof str);   // "string"
console.log(typeof num);   // "number"
console.log(typeof nul);   // "object" — Wait, what?!


// 1. Immutable - Values Cannot Be Changed

let name = "Alice";
name.toUpperCase();    // Creates "ALICE" but doesn't change 'name'
console.log(name);     // Still "Alice"

// 2. Compared by Value - Equality Checks Compare Values

let a = "hello";
let b = "hello";
console.log(a === b);  // true - same value

let obj1 = { text: "hello" };
let obj2 = { text: "hello" };
console.log(obj1 === obj2);  // false - different objects!

// 3. Wrapper Objects - Primitives Have Object-Like Behavior

"hello".toUpperCase();  // Works! JS wraps "hello" in a String object



// ┌─────────────────────────────────────────────────────────────────────────┐
// │                     PRIMITIVES VS OBJECTS                                │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │   PRIMITIVES (Atoms)                    OBJECTS (Molecules)              │
// │                                                                          │
// │   ┌───┐  ┌─────┐  ┌──────┐             ┌────────────────────────────┐   │
// │   │ 5 │  │"hi" │  │ true │             │ { name: "Alice", age: 25 } │   │
// │   └───┘  └─────┘  └──────┘             └────────────────────────────┘   │
// │                                                                          │
// │   • Simple, indivisible                 • Complex, contains values       │
// │   • Stored directly                     • Stored as reference            │
// │   • Compared by value                   • Compared by reference          │
// │   • Immutable                           • Mutable                        │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘


// String - A sequence of characters


// Three ways to create strings
let single = 'Hello';           // Single quotes
let double = "World";           // Double quotes
let backtick = `Hello World`;   // Template literal (ES6)



// Strings Are Immutable
// You cannot change individual characters in a string:

let strn = "hello";
strn[0] = "H";        // Does nothing! No error, but no change
console.log(strn);    // Still "hello"

// To "change" a string, create a new one
let strn = "H" + strn.slice(1);
console.log(str);    // "Hello"

// String methods like toUpperCase(), slice(), replace() always return new strings. They never modify the original.


//Numbers - Numeric data (integers and decimals)
// JavaScript has only one number type: 64-bit floating point (same as Java's double)
let num1 = 42;        // Integer
let num2 = 3.14;      // Decimal
let num3 = -0.001;    // Negative decimal
let scientific = 2.5e6;  // 2,500,000 (scientific notation)

// Special numeric values
let infinity = Infinity;
let negInfinity = -Infinity;
let notANumber = NaN;  // Result of invalid math operations

// The Famous Floating-Point Problem

console.log(0.1 + 0.2);  // 0.30000000000000004 - Not exactly 0.3!
// This is due to how numbers are represented in binary. Some decimal fractions cannot be represented exactly, leading to small rounding errors.    

console.log(0.1 + 0.2 === 0.3);   // false! Welcome to JavaScript!

// Working with money? Never use floating-point for calculations! Store amounts in cents as integers, then use JavaScript’s built-in Intl.NumberFormat for display. 

// Bad: floating-point errors in calculations
let price = 0.1 + 0.2;  // 0.30000000000000004

// Good: calculate in cents, format for display
let priceInCents = 10 + 20;  // 30 (calculation is accurate!)

// Use Intl.NumberFormat to display as currency
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
console.log(formatter.format(priceInCents / 100));  // "$0.30"

// Works for any locale and currency!
const euroFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});
console.log(euroFormatter.format(1234.56));  // "1.234,56 €"


// Intl.NumberFormat is built into JavaScript. No external libraries needed! It handles currency symbols, decimal separators, and locale-specific formatting automatically.

// Safe Integer Range

console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER);  // -9007199254740991

// Beyond this range, precision is lost
console.log(9007199254740992 === 9007199254740993);  // true! (wrong!)

// Use BigInt for integers larger than MAX_SAFE_INTEGER

// Cannot mix BigInt and Number
let bigg = 10n;
let regular = 5;
// console.log(big + regular);  // TypeError!

// Must convert explicitly
console.log(bigg + BigInt(regular));  // 15n
console.log(Number(bigg) + regular);  // 15

// When to use BigInt: Cryptography, precise timestamps, database IDs, any calculation requiring integers larger than 9 quadrillion



//  Boolean - Logical values true and false
let isJavaScriptFun = true;
let isFishTasty = false;

let isLoggedIn = true;
let hasPermission = false;

// From comparisons
let isAdult = age >= 18;        // true or false
let isEqual = name === "Alice"; // true or false

// Truthy and Falsy

// In JavaScript, some values are "truthy" (evaluate to true in a boolean context) and others are "falsy" (evaluate to false).
// Falsy values: false, 0, -0, 0n, "", null, undefined, NaN
// Everything else is truthy!

// Falsy values (only 8!)
// false
// 0
// -0
// 0n        // BigInt zero
// ""        // Empty string
// null
// undefined
// NaN

// // Everything else is truthy
// "hello"   // truthy
// 42        // truthy
// []        // truthy (empty array!)
// {}        // truthy (empty object!)

// Convert any value to boolean
let value = "hello";
let booll = Boolean(value);  // true
let shortcut = !!value;     // true (double negation trick)


// undefined - No value assigned
// 1. Declared but not assigned
let x;
console.log(x);  // undefined
console.log(typeof x);  // "undefined"

// 2. Missing function parameters
function greet(name) {
  console.log(name);  // undefined if called without argument
}
greet();

// 3. Function with no return statement
function doNothing() {
  // no return
}
console.log(doNothing());  // undefined

// 4. Accessing non-existent object property
let person = { name: "Alice" };
console.log(person.age);  // undefined


// Don’t explicitly assign undefined to variables. Use null instead to indicate “intentionally empty.”


// null - Intentional absence of value
let emptyValue = null;  // This variable intentionally has no value
console.log(emptyValue);  // null
console.log(typeof emptyValue);  // "object" (this is a quirk in JavaScript)
// Use null to indicate "no value" or "empty". Don't use undefined for this purpose.


// Intentionally clearing a variable
let user = { name: "Alice" };
user = null;  // User logged out, clearing the reference

// Indicating no result
function findUser(id) {
  // ... search logic ...
  return null;  // User not found
}

console.log(typeof null);  // "object" — Wait, what?!

// Yes, really. This is one of JavaScript’s most famous quirks! It’s a historical mistake from JavaScript’s first implementation in 1995. It was never fixed because too much existing code depends on it.


// How to properly check for null
let val = null;
console.log(val === null);  // true (use strict equality)

// Avoid using typeof to check for null
console.log(typeof val === "object");  // true, but this is not a reliable way to check for null! Always use val === null instead.  

// In practice, just remember: null is for "no value", undefined is for "not assigned". And don't worry about the typeof quirk!

// Symbol - Unique identifier
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2);  // false - each symbol is unique, even with the same description

// Symbols are often used for object property keys to avoid name collisions
const mySymbol = Symbol("myKey");
const obj = {};
obj[mySymbol] = "secret value";
console.log(obj[mySymbol]);  // "secret value"

let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2);  // false — always unique!
console.log(id1.description);  // "id" (the description)

 const ID = Symbol("id");
const user1 = {
  name: "Alice",
  [ID]: 12345  // Symbol as property key
};

console.log(user1.name);    // "Alice"
console.log(user1[ID]);     // 12345

// Symbol keys don't appear in normal iteration
console.log(Object.keys(user1));  // ["name"] — ID not included

 // Symbol.iterator - make an object iterable
// Symbol.toStringTag - customize Object.prototype.toString
// Symbol.toPrimitive - customize type conversion


//  The typeof Operator - Returns a string indicating the type of a value

console.log(typeof "hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof 42n);         // "bigint"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof null);        // "object" ⚠️ (bug!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" - arrays are technically objects in JavaScript
console.log(typeof function(){}); // "function" - functions are a special type of object in JavaScript
 // Check for null specifically
let value2 = null; // This is the correct way to check for null
if (value2 === null) {
  console.log("It's null"); // true
}

// Check for arrays
Array.isArray([1, 2, 3]);  // true
Array.isArray("hello");    // false

// Get precise type with Object.prototype.toString
Object.prototype.toString.call(null);       // "[object Null]"
Object.prototype.toString.call([]);         // "[object Array]"
Object.prototype.toString.call(new Date()); // "[object Date]"

// The typeof operator is great for quick checks, but remember its quirks (especially with null). For more precise type checking, consider using Array.isArray() for arrays and Object.prototype.toString for other types.

// Immutability Explained - Primitive values cannot be changed. When you perform an operation on a primitive, it creates a new value instead of modifying the original. This is why strings are immutable: methods like toUpperCase() return a new string rather than changing the original.

// Immutable means “cannot be changed.” Primitive values are immutable. You cannot alter the value itself. When you perform an operation on a primitive, it creates a new value instead of modifying the original. This is why strings are immutable: methods like toUpperCase() return a new string rather than changing the original.

let str2 = "hello";

// These methods don't change 'str' — they return NEW strings
str2.toUpperCase();     // Returns "HELLO"
console.log(str2);      // Still "hello"!

// To capture the new value, you must reassign
str2 = str2.toUpperCase();
console.log(str2);      // Now "HELLO"

// BEFORE str.toUpperCase():
// ┌─────────────────┐
// │  str → "hello"  │   (original string)
// └─────────────────┘

// AFTER str.toUpperCase() (without reassignment):
// ┌─────────────────┐
// │  str → "hello"  │   (unchanged!)
// └─────────────────┘
// ┌─────────────────┐
// │     "HELLO"     │   (new string, not captured, garbage collected)
// └─────────────────┘

// AFTER str = str.toUpperCase():
// ┌─────────────────┐
// │  str → "HELLO"  │   (str now points to new string)
// └─────────────────┘
//Common Misconception: const vs Immutability

// const prevents reassignment
const name2 = "Alice";
// name = "Bob";  // Error! Cannot reassign const

// But const doesn't make objects immutable
const person2 = { name2: "Alice" };
person2.name2 = "Bob";     // Works! Mutating the object
person2.age = 25;         // Works! Adding a property
// person = {};          // Error! Cannot reassign const

// Primitives are immutable regardless of const/let
let str3 = "hello";
str3[0] = "H";  // Silently fails — can't mutate primitive3

// Think of it this way: const protects the variable (the container). Immutability protects the value (the content).


// Autoboxing: The Secret Life of Primitives
// When you call a method on a primitive, JavaScript temporarily wraps it in an object to provide access to methods. This is called autoboxing.

let greeting = "hello";
console.log(greeting.toUpperCase());  // "HELLO"

// Wrapper Objects - Each primitive type (except null and undefined) has a corresponding wrapper object:
// String → String object
// Number → Number object
// BigInt → BigInt object
// Boolean → Boolean object
// Symbol → Symbol object
// When you call a method on a primitive, JavaScript creates a temporary wrapper object to provide access to methods. After the method call, the wrapper is discarded.


// Using new String(), new Number(), or new Boolean() creates objects, not primitives. This can cause confusing bugs with equality checks and typeof.
let str4 = new String("hello");
console.log(typeof str4);  // "object" (not "string"!)
console.log(str4 === "hello");  // false (object is not equal to primitive)


// null vs undefined - These two “empty” values confuse many developers. Here’s how they differ:


// Aspect	undefined	null
// Meaning”-No value assigned yet"	-"Intentionally empty”
// Set by	-JavaScript automatically	-Developer explicitly
// typeof-	"undefined"	-"object" (bug)
// In JSON	-Omitted from output	-Preserved as null
// Default params-	Triggers default-	Doesn’t trigger default
// Loose equality	-null == undefined is true	
// Strict equality	-null === undefined is false

// 1. Uninitialized variables
let x1;
console.log(x1);  // undefined

// 2. Missing function arguments
function greet(name) {
  console.log(name);
}
greet();  // undefined

// 3. No return statement
function noReturn() {}
console.log(noReturn());  // undefined

// 4. Non-existent properties
let obj = {};
console.log(obj.missing);  // undefined

// 5. Array holes
let arr5 = [1, , 3];
console.log(arr5[1]);  // undefined


// 1. Explicitly "clearing" a value
let user3 = { name: "Alice" };
user4 = null;  // User logged out

// 2. Function returning "no result"
function findUser(id) {
  // Search logic...
  return null;  // Not found
}

// 3. Optional object properties
let config = {
  cache: true,
  timeout: null  // Explicitly no timeout
};

// 4. Resetting references
let timer = setTimeout(callback, 1000);
clearTimeout(timer);
timer = null;  // Clear reference

// Check for either null or undefined (loose equality)
if (value == null) {
  console.log("Value is null or undefined");
}

// Check for specifically undefined
if (value === undefined) {
  console.log("Value is undefined");
}

// Check for specifically null
if (value === null) {
  console.log("Value is null");
}

// Check for "has a value" (not null/undefined)
if (value != null) {
  console.log("Value exists");
}


// ┌─────────────────────────────────────────────────────────────────────────┐
// │                     PRIMITIVES VS WRAPPER OBJECTS                        │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │  WRONG WAY                              RIGHT WAY                        │
// │  ─────────                              ─────────                        │
// │  new String("hello")                    "hello"                          │
// │  new Number(42)                         42                               │
// │  new Boolean(true)                      true                             │
// │                                                                          │
// │  typeof new String("hi") → "object"     typeof "hi" → "string"          │
// │  new String("hi") === "hi" → false      "hi" === "hi" → true            │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘

// ❌ WRONG - Creates an object, not a primitive
const str5 = new String("hello");
console.log(typeof str5);        // "object" (not "string"!)
console.log(str5 === "hello");   // false (object vs primitive)

// ✓ CORRECT - Use primitive literals
const str6 = "hello";
console.log(typeof str6);       // "string"
console.log(str6 === "hello");  // true


// JavaScript Quirks & Gotchas
// 1. typeof null is "object" (historical bug)
console.log(typeof null);  // "object" — this is a well-known quirk in JavaScript. It’s a historical bug from the first implementation of JavaScript in 1995. It was never fixed because too much existing code depends on it. Always check for null with val === null instead of typeof.

//2 . NaN is the only value in JavaScript that is not equal to itself
console.log(NaN === NaN);  // false! NaN is not equal to anything, including itself. To check for NaN, use Number.isNaN(value) instead. 

// 3. 0 and -0 are distinct values
console.log(0 === -0);  // true (0 and -0 are considered equal in JavaScript)
console.log(1 / 0);
console.log(1 / -0);  // Infinity and -Infinity are distinct values, but 0 and -0 are considered equal in JavaScript. This can lead to some unexpected behavior when performing division or other operations that involve zero.

// 4. typeof function(){} is "function" (functions are a special type of object)
console.log(typeof function(){});  // "function" — functions are technically objects in JavaScript, but typeof treats them as a separate type for historical reasons.

 // 5. Empty String is Falsy, But...

console.log(Boolean(""));      // false (empty string is falsy)
console.log(Boolean(" "));     // true (space is truthy!)
console.log(Boolean("0"));     // true (string "0" is truthy!)
console.log(Boolean(0));       // false (number 0 is falsy)

console.log("" == false);      // true (coercion)
console.log("" === false);     // false (different types)

//  + Operator String Concatenation
console.log(1 + 2);        // 3 (number addition)
console.log("1" + "2");    // "12" (string concatenation)
console.log(1 + "2");      // "12" (number converted to string!)
console.log("1" + 2);      // "12" (number converted to string!)
console.log(1 + 2 + "3");  // "33" (left to right: 1+2=3, then 3+"3"="33")
console.log("1" + 2 + 3);  // "123" (left to right: "1"+2="12", "12"+3="123")

// Force number addition
Number("1") + Number("2");  // 3
parseInt("1") + parseInt("2");  // 3

// Force string concatenation
String(1) + String(2);  // "12"
`${1}${2}`;  // "12"




//  undefined: Means “no value has been assigned.” JavaScript sets this automatically for uninitialized variables, missing function arguments, and non-existent properties.
// null: Means “intentionally empty.” Developers use this explicitly to indicate “this has no value on purpose.”


// summary: JavaScript has 7 primitive types: string, number, bigint, boolean, undefined, null, and symbol. Primitives are immutable and compared by value. The typeof operator has quirks (especially with null). Autoboxing allows primitives to use methods. Be mindful of gotchas like NaN !== NaN and 0.1 + 0.2 !== 0.3. Avoid using new String() etc., as they create objects instead of primitives. Use Number.isNaN() to check for NaN.

// 1. Primitives are immutable — you can’t change the value itself, only create new values
// 2. Compared by value — "hello" === "hello" is true because the values match
// 3. typeof works for most types — except typeof null returns "object" (historical bug)
// 4. Autoboxing allows primitives to use methods — JavaScript wraps them temporarily
// 5. undefined vs null — undefined is “not assigned,” null is “intentionally empty”
// 6. Be aware of gotchas — NaN !== NaN, 0.1 + 0.2 !== 0.3, falsy values
// 7. Don’t use new String() etc. — creates objects, not primitives
// 8. Symbols create unique identifiers — even Symbol("id") !== Symbol("id")
// 9. Use Number.isNaN() to check for NaN — don’t use equality comparison since NaN !== NaN

