// ┌─────────────────────────────────────────────────────────────────────────┐
// │                     THE OVERLY HELPFUL TRANSLATOR                        │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │  YOU: "Hey JavaScript, add 5 and '3' together"                           │
// │                                                                          │
// │  JAVASCRIPT (thinking): "Hmm, one's a number, one's a string...          │
// │                          I'll just convert the number to a string!       │
// │                          '5' + '3' = '53'. You're welcome!"              │
// │                                                                          │
// │  YOU: "That's... not what I meant."                                      │
// │                                                                          │
// │  JAVASCRIPT: "¯\_(ツ)_/¯"                                                │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘


// ┌─────────────────────────────────────────────────────────────────────────┐
// │                    TYPE COERCION: THE SHAPESHIFTER                       │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │        ┌─────────┐                    ┌─────────┐                        │
// │        │   "5"   │ ──── + 3 ────────► │  "53"   │  String won!           │
// │        │ string  │                    │ string  │                        │
// │        └─────────┘                    └─────────┘                        │
// │                                                                          │
// │        ┌─────────┐                    ┌─────────┐                        │
// │        │   "5"   │ ──── - 3 ────────► │    2    │  Number won!           │
// │        │ string  │                    │ number  │                        │
// │        └─────────┘                    └─────────┘                        │
// │                                                                          │
// │        Same values, different operators, different results!              │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘



// ┌─────────────────────────────────────────────────────────────────────────┐
// │                    THE THREE CONVERSION DESTINATIONS                     │
// ├─────────────────────────────────────────────────────────────────────────┤
// │                                                                          │
// │                      ┌──────────────────────┐                            │
// │                      │    ANY VALUE         │                            │
// │                      │  (string, number,    │                            │
// │                      │   object, array...)  │                            │
// │                      └──────────┬───────────┘                            │
// │                                 │                                        │
// │                ┌────────────────┼────────────────┐                       │
// │                ▼                ▼                ▼                       │
// │          ┌──────────┐    ┌──────────┐    ┌──────────┐                    │
// │          │  String  │    │  Number  │    │ Boolean  │                    │
// │          │   "42"   │    │    42    │    │   true   │                    │
// │          └──────────┘    └──────────┘    └──────────┘                    │
// │                                                                          │
// │          These are the ONLY three possible destinations!                 │
// │                                                                          │
// └─────────────────────────────────────────────────────────────────────────┘




// String Conversion Rules
// Value	Result	Notes
// 123	"123"	Numbers become digit strings
// -12.34	"-12.34"	Decimals and negatives work too
// true	"true"	Booleans become their word
// false	"false"	
// null	"null"	
// undefined	"undefined"	
// [1, 2, 3]	"1,2,3"	Arrays join with commas
// []	""	Empty array becomes empty string
// {}	"[object Object]"	Objects become this (usually useless)
// Symbol("id")	Throws TypeError!	Symbols can’t implicitly convert

// Explicit conversion
String(123)           // "123"
String(true)          // "true"
(123).toString()      // "123"

// Implicit conversion
123 + ""              // "123" (concatenation with empty string)
`Value: ${123}`       // "Value: 123" (template literal)
"Hello " + 123        // "Hello 123" (+ with a string)


// Number Conversion Rules
// Value	Result	Notes
// "123"	123	Numeric strings work
// " 123 "	123	Whitespace is trimmed
// "123abc"	NaN	Any non-numeric char → NaN
// ""	0	Empty string becomes 0
// " "	0	Whitespace-only becomes 0
// true	1	
// false	0	
// null	0	null → 0
// undefined	NaN	undefined → NaN (different!)
// []	0	Empty array → "" → 0
// [1]	1	Single element array
// [1, 2]	NaN	Multiple elements → NaN
// {}	NaN	Objects → NaN
// Explicit conversion
Number("42")          // 42
parseInt("42px")      // 42 (stops at non-digit)
parseFloat("3.14")    // 3.14
+"42"                 // 42 (unary plus trick)

// Implicit conversion
"6" - 2               // 4 (subtraction)
"6" * 2               // 12 (multiplication)
"6" / 2               // 3 (division)
"6" % 4               // 2 (modulo)
"10" > 5              // true (comparison)
+"42"                 // 42 (unary plus)

// +"42"        // 42
// +true        // 1
// +false       // 0
// +null        // 0
// +undefined   // NaN
// +"hello"     // NaN
// +""          // 0


// Explicit conversion
Boolean(1)            // true
Boolean(0)            // false
!!value               // double negation trick

// Implicit conversion
if (value) { }        // condition check
while (value) { }     // loop condition
value ? "yes" : "no"  // ternary operator
value && doSomething() // logical AND
value || defaultValue  // logical OR
!value                // logical NOT

// THE FALSY EIGHT
Boolean(false)        // false (obviously)
Boolean(0)            // false
Boolean(-0)           // false (yes, -0 exists)
Boolean(0n)           // false ([BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) zero)
Boolean("")           // false (empty string)
Boolean(null)         // false
Boolean(undefined)    // false
Boolean(NaN)          // false


 // These are all TRUE!
Boolean(true)         // true (obviously)
Boolean(1)            // true
Boolean(-1)           // true (negative numbers!)
Boolean("hello")      // true
Boolean("0")          // true (non-empty string!)
Boolean("false")      // true (non-empty string!)
Boolean([])           // true (empty array!)
Boolean({})           // true (empty object!)
Boolean(function(){}) // true
Boolean(new Date())   // true
Boolean(Infinity)     // true
Boolean(-Infinity)    // true



// || returns the FIRST truthy value (or the last value)
"hello" || "world"    // "hello"
"" || "world"         // "world"
"" || 0 || null || "yes"  // "yes"

// && returns the FIRST falsy value (or the last value)
"hello" && "world"    // "world"
"" && "world"         // ""
1 && 2 && 3           // 3

// This is useful for defaults!
const name = userInput || "Anonymous";
const display = user && user.name;




// Arrays - toString() returns joined elements
[1, 2, 3].toString()   // "1,2,3"
[1, 2, 3] + ""         // "1,2,3"
[1, 2, 3] - 0          // NaN (can't convert "1,2,3" to number)

// [].toString()          // ""
// [] + ""                // ""
// [] - 0                 // 0 (empty string → 0)

[1].toString()         // "1"
[1] - 0                // 1

// Plain objects - toString() returns "[object Object]"
({}).toString()        // "[object Object]"
({}) + ""              // "[object Object]"

// Dates - special case, prefers string for + operator
const date = new Date(0);
date.toString()        // "Thu Jan 01 1970 ..."
date.valueOf()         // 0 (timestamp in ms)

date + ""              // "Thu Jan 01 1970 ..." (uses toString)
date - 0               // 0 (uses valueOf)




// Example 1: "5" == 5
// "5" == 5
// String vs Number → convert string to number
// 5 == 5
// Result: true

// Example 2: true == "1"
// true == "1"
// Boolean involved → convert boolean to number first
// 1 == "1"
// Number vs String → convert string to number
// 1 == 1
// Result: true

// Example 3: [] == false
// [] == false
// Boolean involved → convert boolean to number first
// [] == 0
// Object vs Number → convert object to primitive
// "" == 0 (empty array → empty string)
// String vs Number → convert string to number
// 0 == 0
// Result: true

// Example 4: [] == ![]
// [] == ![]
// First, evaluate ![] → false (arrays are truthy)
// [] == false
// Boolean involved → false becomes 0
// [] == 0
// Object vs Number → [] becomes ""
// "" == 0
// String vs Number → "" becomes 0
// 0 == 0
// Result: true (yes, really!)


//  Operators & Coercion Cheat Sheet
// Quick reference for which operators trigger which coercion:
// Operator	Coercion Type	Example	Result
// + (with string)	String	"5" + 3	"53"
// + (unary)	Number	+"5"	5
// - * / %	Number	"5" - 3	2
// ++ --	Number	let x = "5"; x++	6
// > < >= <=	Number	"10" > 5	true
// == !=	Complex	"5" == 5	true
// === !==	None	"5" === 5	false
// && ||	Boolean (internal)	"hi" || "bye"	"hi"
// !	Boolean	!"hello"	false
// if while ? :	Boolean	if ("hello")	true
// & | ^ ~	Number (32-bit int)	"5" | 0	5


//  Best Practices
// How to avoid coercion bugs:
// Use === instead of == — No surprises, no coercion
// Be explicit — Use Number(), String(), Boolean() when converting
// Validate input — Don’t assume types, especially from user input
// Use Number.isNaN() — Not isNaN() or === NaN
// Be careful with + — Remember it concatenates if any operand is a string


// Three conversions only — JavaScript converts to String, Number, or Boolean — nothing else
// Implicit vs Explicit — Know when JS converts automatically vs when you control it
// The 8 common falsy values — false, 0, -0, 0n, "", null, undefined, NaN — everything else is truthy (plus the rare document.all)
// + is special — It prefers string concatenation if ANY operand is a string
// - * / % are consistent — They ALWAYS convert to numbers
// == coerces, === doesn’t — Use === by default to avoid surprises
// null == undefined — This is true, but neither equals anything else with ==
// Objects convert via valueOf() and toString() — Learn these methods to control conversion
// When in doubt, be explicit — Use Number(), String(), Boolean()
// NaN is unique — It’s the only value not equal to itself; use Number.isNaN() to check