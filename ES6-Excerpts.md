# Chapter 2

```javascript
var funcs = [];

for (let i = 0; i < 5; i++) {
	funcs.push( function(){
		console.log( i );
	} );
}

funcs[3]();		// 3 with LET, 5 with VAR



{
	const a = [1,2,3];
	a.push( 4 );
	console.log( a );		// [1,2,3,4]
        // a = 4			// TypeError!
}





function foo(...args) {

	args.shift();
	console.log( ...args );
}

function bar() {

	let args = Array.prototype.slice.call( arguments );
	args.push( 4, 5 );

	// filter out odd numbers
	args = args.filter( v => v % 2 == 0 );

	// pass along all of `args` as arguments
	// to `foo(..)`
	foo(...args);
}

bar( 0, 1, 2, 3 );				// 2 4









function fooB(x,y) {
	x = (0 in arguments) ? x : 11;
	y = (1 in arguments) ? y : 31;

	console.log( x + y );
}

fooB( 5 );				// 36
fooB( 5, undefined );	// NaN







function bar(val) {
	console.log( "bar called!" );
	return y + val;
}

function fooC(x = y + 3, z = bar( x )) {
	console.log( x, z );
}

var y = 5;
fooC();								// "bar called"
									// 8 13
fooC( 10 );							// "bar called"
									// 10 15
y = 6;
fooC( undefined, 10 );				// 9 10






// NOT CLEAR!!!!!
function fooD( x =
	(function(v){ return v + 11; })( 31 )
) {
	console.log( x );
}

fooD();			// 42







var o1 = {
	foo() {
		console.log( "o1:foo" );
	}
};

var o2 = {
	foo() {
		super.foo();
		console.log( "o2:foo" );
	}
};

Object.setPrototypeOf( o2, o1 );

o2.foo();		// o1:foo
				// o2:foo


//Arrow functions
//the longer the function, the less => helps; the shorter the function, the more => can shine

var dollabillsyall = (strings, ...values) =>
	strings.reduce( (s,v,idx) => {
        
		if (idx > 0) {
			if (typeof values[idx-1] == "number") {
				s += `$${values[idx-1].toFixed( 2 )}`;
			}
			else {
				s += values[idx-1];
			}
		}

		return s + v;
	}, "" );



var amt1 = 11.99,
    amt2 = amt1 * 1.08,
    name = "Filip";

var text = dollabillsyall 
`Thanks for your purchase ${name}! Your product cost was ${amt1} (${amt2} with tax)`
console.log(text);




// Raw Strings
function showraw(strings, ...values) {
	console.log( strings );
	console.log( strings.raw );
}

showraw`Hello\nWorld`;
// [ "Hello
// World" ]
// [ "Hello\nWorld" ]



//Arrow functions

//------14 35------

var re1 = /foo/,
	str = "++foo++";

re1.lastIndex;			// 0
re1.test( str );		// true
re1.lastIndex;			// 0 -- not updated

re1.lastIndex = 4;
re1.test( str );		// true -- ignored `lastIndex`
re1.lastIndex;			// 4 -- not updated





var re = /f../y,
	str = "foo       far       fad";

str.match( re );		// ["foo"]

re.lastIndex = 10;
str.match( re );		// ["far"]

re.lastIndex = 20;
str.match( re );		// ["fad"]




var re2 = /o+./g,		// <-- look, `g`!
	str = "foot book more";

re2.exec( str );			// ["oot"]
re2.lastIndex;			// 4

re2.exec( str );			// ["ook"]
re2.lastIndex;			// 9

re2.exec( str );			// ["or"]
re2.lastIndex;			// 13

re2.exec( str );			// null -- no more matches!
re2.lastIndex;			// 0 -- starts over now!

var s1 = "\xE9";
s1.normalize().length;	




var o = {};

for (o.a of [1,2,3]) {
	console.log( o.a );
}
// 1 2 3

for ({x: o.a} of [ {x: 1}, {x: 2}, {x: 3} ]) {
  console.log( o.a );
}
// 1 2 3



var \u03A9 = 42;
// same as: var Ω = 42;

var \u{2B400} = 42;
// same as: var 𫐀 = 42;

var sym = Symbol( "some optional description" );
typeof sym;	

```



# Chapter 3
```javascript

var greeting = "hello world";
var ita = greeting[Symbol.iterator]();

ita.next(); // { value: "h", done: false }
ita.next(); // { value: "e", done: false }


var m = new Map();
m.set("foo", 42);
m.set({
    cool: true
}, "hello world");

var itb = m[Symbol.iterator]();
var itb = m.entries();

itb.next(); // { value: [ "foo", 42 ], done: false }
itb.next(); // { value: [ "foo", 42 ], done: false }




/*------------------------------------------TASKS------------------------------------------*/
var tasks = {
    [Symbol.iterator]() {
        var steps = this.actions.slice();

        return {
            // make the iterator an iterable
            [Symbol.iterator]() {
                return this;
            },

            next(...args) {
                if (steps.length > 0) {
                    let res = steps.shift()(...args);
                    return {
                        value: res,
                        done: false
                    };
                } else {
                    return {
                        done: true
                    }
                }
            },

            return (v) {
                steps.length = 0;
                return {
                    value: v,
                    done: true
                };
            }
        };
    },
    actions: []
};




tasks.actions.push(
    function step1(x) {
        console.log("step 1:", x);
        return x * 2;
    },
    function step2(x, y) {
        console.log("step 2:", x, y);
        return x + (y * 2);
    },
    function step3(x, y, z) {
        console.log("step 3:", x, y, z);
        return (x * y) + z;
    }
);

var itc = tasks[Symbol.iterator]();

itc.next(10); // step 1: 10 // { value:   20, done: false }
itc.next(20, 50); // step 2: 20 50 // { value:  120, done: false }
itc.next(20, 50, 120); // step 3: 20 50 120 // { value: 1120, done: false }
itc.next(); // { done: true }




/*------------------------------------------ITERATORS------------------------------------------*/
var a = [1, 2, 3, 4, 5];
var itd = a[Symbol.iterator]();

var [x, y] = itd; // take just the first two elements from `it`
var [z, ...w] = itd; // take the third, then the rest all at once

// is `it` fully exhausted? Yep.
itd.next(); // { value: undefined, done: true }

x; // 1
y; // 2
z; // 3
w; // [4,5]




function* foo() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

function* bar() {
    var x = yield* foo();
    console.log("x:", x);
}

for (var v of bar()) {
    console.log(v);
}
// 1 2 3
// x: 4

/*

Producing a series of values: This usage can be simple (e.g., random strings or incremented numbers), or it can represent more structured data access (e.g., iterating over rows returned from a database query).

Either way, we use the iterator to control a generator so that some logic can be invoked for each call to next(..). Normal iterators on data structures merely pull values without any controlling logic.

Queue of tasks to perform serially: This usage often represents flow control for the steps in an algorithm, where each step requires retrieval of data from some external source. The fulfillment of each piece of data may be immediate, or may be asynchronously delayed.

*/




function* foo2() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } finally {
        console.log("cleanup!");
    }
}

for (var v of foo2()) {
    console.log(v);
}
// 1 2 3
// cleanup!

var ite = foo2();

ite.next(); // { value: 1, done: false }
ite.return(42); // cleanup!
// { value: 42, done: true }




function* foo3() {
    try {
        yield 1;
    } catch (err) {
        console.log(err);
    }

    yield 2;
    throw "Hello!";
}

var itf = foo3();
itf.next(); // { value: 1, done: false }


try {
    itf.throw("Hi!"); // Hi!	// { value: 2, done: false }
    itf.next();
    console.log("never gets here");
} catch (err) {
    console.log(err); // Hello!
}


/*
Iterators provide sequential access to data or operations. They can be consumed by new language features like for..of and ....

Generators are locally pause/resume capable functions controlled by an iterator. They can be used to programmatically (and interactively, through yield/next(..) message passing) generate values to be consumed via iteration.

Modules allow private encapsulation of implementation details with a publicly exported API. Module definitions are file-based, singleton instances, and statically resolved at compile time.

Classes provide cleaner syntax around prototype-based coding. The addition of super also solves tricky issues with relative references in the [[Prototype]] chain.
*/
```
## From the exam
```javascript

/*--------------------ITERATORS-------------------*/
var arr = [4, 5, 6, 7, 8, 9];

arr[Symbol.iterator] = function*() {
    var idx = 1;
    do {
        yield this[idx];
    } while ((idx += 2) < this.length);
};

for (var v of arr) {
    console.log(v);
}
// 5 7 9 (just values from odd indexes)

    
/*--------------------GENERATORS-------------------*/
const myGen = function*(){
const one = yield 1;
const two = yield 2;
const three = yield 3;
console.log(one, two, three);
};

const gen = myGen();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());


//New addition
const n = [65, 44, 12, 4];

function sum(total, num) {
    return total + num;
}

console.log(n.reduce(sum));

```


# Chapter 4

Thankfully, ES6 adds Promises to address one of the major shortcomings of callbacks: lack of trust in predictable behavior. Promises represent the future completion value from a potentially async task, normalizing behavior across sync and async boundaries.

But it's the combination of Promises with generators that fully realizes the benefits of rearranging our async flow control code to de-emphasize and abstract away that ugly callback soup (aka "hell").

Right now, we can manage these interactions with the aide of various async libraries' runners, but JavaScript is eventually going to support this interaction pattern with dedicated syntax alone!

(Promises examples are in the exam)





# Chapter 5
```javascript

var buf = new ArrayBuffer(32);
buf.byteLength;

var arr = new Uint16Array(buf);
arr.length;

/*
You can't use certain Array.prototype methods with TypedArrays that don't 
make sense, such as the mutators (splice(..), push(..), etc.) and concat(..).
*/




var m = new Map();

var x = {
        id: 1
    },
    y = {
        id: 2
    };

m.set(x, "foo");
m.set(y, "bar");

m.get(x); // "foo"
m.get(y);


m.delete(y);


m.size;




var m2 = new Map(m); // OR new Map( m.entries() );




var x = {
        id: 1
    },
    y = {
        id: 2
    };

var m3 = new Map([
    [x, "foo"],
    [y, "bar"]
]);

m3.get(x); // "foo"
m3.get(y); // "bar"




var m4 = new Map();

var x = {
        id: 1
    },
    y = {
        id: 2
    };

m4.set(x, "foo");
m4.set(y, "bar");

var vals = [...m4.entries()];

vals[0][0] === x; // true
vals[0][1]; // "foo"


var keys = [...m4.keys()];

keys[0] === x; // true
keys[1] === y; // true
m4.has(x);




var m5 = new WeakMap();

var x = {
        id: 1
    },
    y = {
        id: 2
    },
    z = {
        id: 3
    },
    w = {
        id: 4
    };

m5.set(x, y);

x = null; // { id: 1 } is GC-eligible
y = null; // { id: 2 } is GC-eligible
// only because { id: 1 } is

m5.set(z, w);

w = null; // { id: 4 } is not GC-eligible




/* unlike how Map(..) expects entries list (array of key/value arrays), 
Set(..) expects a values list (array of values):
*/

var s = new Set();

var x = {
        id: 1
    },
    y = {
        id: 2
    };

s.add(x);
s.add(y);
s.add(x);

s.size; // 2

s.delete(y);
s.size; // 1

s.clear();
s.size; // 0

s.has(x);

var x = {
        id: 1
    },
    y = {
        id: 2
    };

var s = new Set([x, y]);




var s2 = new Set();

var x = {
        id: 1
    },
    y = {
        id: 2
    };

s2.add(x).add(y);

var keys = [...s2.keys()],
    vals = [...s2.values()],
    entries = [...s2.entries()];

keys[0] === x;
keys[1] === y;

vals[0] === x;
vals[1] === y;

entries[0][0] === x;
entries[0][1] === x;
entries[1][0] === y;
entries[1][1] === y;




var s3 = new WeakSet();

var x = {
        id: 1
    },
    y = {
        id: 2
    };

s3.add(x);
s3.add(y);

x = null; // `x` is GC-eligible
y = null; // `y` is GC-eligible

/*
WeakMaps are maps where the key (object) is weakly held, so that GC is free to collect the entry if it's the last reference to an object.
WeakSets are sets where the value is weakly held, again so that GC can remove the entry if it's the last reference to that object.
*/
```


# Chapter 6


```javascript
var arrLike = {
    length: 4,
    2: "foo"
};

Array.from(arrLike);
// [ undefined, undefined, "foo", undefined ]

var c = Array.from({
    length: 4
}); // four `undefined` values




var arrLike2 = {
    length: 4,
    2: "foo"
};

Array.from(arrLike2, function mapper(val, idx) {
    if (typeof val == "string") {
        return val.toUpperCase();
    } else {
        return idx;
    }
});
// [ 0, 1, "FOO", 3 ]




/* Overwrite species to the parent Array constructor
For example, when using methods such as map() that return the default constructor,
you want these methods to return a parent Array object, instead of the MyArray object.
*/

class coolArray extends Array{
    static get[Symbol.species](){
        return Array;
    }
}

var x = new coolArray(1, 2, 3);
var mapped = x.map(x => x*x);
console.log(mapped);

console.log(mapped instanceof coolArray); // false
console.log(mapped instanceof Array);   // true





[1, 2, 3, 4, 5].copyWithin(3, 0); // [1,2,3,1,2]

[1, 2, 3, 4, 5].copyWithin(3, 0, 1); // [1,2,3,1,5]

[1, 2, 3, 4, 5].copyWithin(0, -2); // [4,5,3,4,5]

[1, 2, 3, 4, 5].copyWithin(0, -2, -1); // [4,2,3,4,5]




var x = NaN,
    y = 0,
    z = -0;

x === x; // false
y === z; // true

Object.is(x, x); // true
Object.is(y, z); // false




var o = {
    foo: 42,
    [Symbol("bar")]: "hello world",
    baz: true
};

Object.getOwnPropertySymbols(o); // [ Symbol(bar) ]




var o1 = {
    foo() {
        console.log("foo");
    }
};
var o2 = {
    // .. o2's definition ..
};

Object.setPrototypeOf(o2, o1);

// delegates to `o1.foo()`
o2.foo(); // foo




var o1 = {
    foo() {
        console.log("foo");
    }
};

var o2 = Object.assign(
    Object.create(o1), {
        // .. o2's definition ..
    }
);

// delegates to `o1.foo()`
o2.foo(); // foo




// New Math functions

//Trigonometry
Math.cosh(8);
Math.acosh(8);
Math.sinh(8);
Math.asinh(8);
Math.tanh(8);
Math.atanh(8);
Math.hypot(8);


//Arithmetic
Math.cbrt(8);
Math.clz32(8);
Math.expm1(8);
Math.log2(8);
Math.log(10);
Math.log1p(8);
Math.imul(8);

//Meta
Math.sign(8);
Math.trunc(8.8); //8
Math.fround(8.8); //9


Number.EPSILON;
Number.MAX_SAFE_INTEGER;
Number.MIN_SAFE_INTEGER;




var a = NaN,
    b = "NaN",
    c = 42;

isNaN(a); // true
isNaN(b); // true -- oops!
isNaN(c); // false

Number.isNaN(a); // true
Number.isNaN(b); // false -- fixed!
Number.isNaN(c); // false


var a = NaN,
    b = Infinity,
    c = 42;

Number.isFinite(a); // false
Number.isFinite(b); // false
Number.isFinite(c); // true



var a = "42";

isFinite(a); // true
Number.isFinite(a); // false

Number.isInteger(4.2); // false


var x = Math.pow(2, 53);
Number.isSafeInteger(x - 1);




String.fromCodePoint(0x1d49e); // "𝒞"
"ab𝒞d".codePointAt(2).toString(16); // "1d49e"


var palindrome = "step on no pets";

palindrome.startsWith("step on"); // true
palindrome.startsWith("on", 5); // true

palindrome.endsWith("no pets"); // true
palindrome.endsWith("no", 10); // true

palindrome.includes("on"); // true
palindrome.includes("on", 6); // false

const obj = {
  log: ['test'],
  get latest() {
    if (this.log.length == 0) return undefined;
    return this.log[this.log.length - 1];
  }
};
console.log(obj.latest); // Will return "test".

```
# Chapter 7
```javascript



var abc = function() {
    // ..
};

abc.name; // "abc"




function Foo(greeting) {
    this.greeting = greeting;
}

Foo.prototype[Symbol.toStringTag] = "Foo";

Object.defineProperty(Foo, Symbol.hasInstance, {
    value: function(inst) {
        return inst.greeting == "hello";
    }
});

var a = new Foo("hello"),
    b = new Foo("world");

b[Symbol.toStringTag] = "cool";

a.toString(); // [object Foo]
String(b); // [object cool]

a instanceof Foo; // true
b instanceof Foo; // false




class Cool {
    // defer `@@species` to derived constructor
    static get[Symbol.species]() {
        return this;
    }

    again() {
        return new this.constructor[Symbol.species]();
    }
}

class Fun extends Cool {}

class Awesome extends Cool {
    // force `@@species` to be parent constructor
    static get[Symbol.species]() {
        return Cool;
    }
}

var a = new Fun(),
    b = new Awesome(),
    c = a.again(),
    d = b.again();

c instanceof Fun; // true
d instanceof Awesome; // false
d instanceof Cool; // true




var arr = [1, 2, 3, 4, 5];

arr + 10; // 1,2,3,4,510

arr[Symbol.toPrimitive] = function(hint) {
    if (hint == "default" || hint == "number") {
        // sum all numbers
        return this.reduce(function(acc, curr) {
            return acc + curr;
        }, 0);
    }
};

arr + 10; // 25




// note: target === obj,
// context === pobj

var obj = {
        a: 1
    },
    handlers = {
        get(target, key, context) {
            console.log("accessing: ", key);
            return Reflect.get(target, key, context);
        }
    },
    pobj = new Proxy(obj, handlers);

obj.a;
// 1

pobj.a;
// accessing: a
// 1




var obj = {
        a: 1
    },
    handlers = {
        get(target, key, context) {
            // note: target === obj,
            // context === pobj
            console.log("accessing: ", key);
            return target[key];
        }
    },
    {
        proxy: pobj,
        revoke: prevoke
    } =
    Proxy.revocable(obj, handlers);

pobj.a;
// accessing: a
// 1

// later:
prevoke();

//pobj.a;
// TypeError




var handlers = {
        get(target, key, context) {
            return function() {
                context.speak(key + "!");
            };
        }
    },
    catchall = new Proxy({}, handlers),
    greeter = {
        speak(who = "someone") {
            console.log("hello", who);
        }
    };

// setup `greeter` to fall back to `catchall`
Object.setPrototypeOf(greeter, catchall);

greeter.speak(); // hello someone
greeter.speak("world"); // hello world

greeter.everyone(); // hello everyone!




"use strict";

function foo(x) {
    return x * 2;
}

function bar(x) {
    x = x + 1;
    if (x > 10) {
        return foo(x);
    } else {
        return bar(x + 1);
    }
}

bar(5); // 24
bar(15); // 32



"use strict";

try {
    (function foo(x) {
        if (x < 5E5) return foo(x + 1);
    })(1);

    TCO_ENABLED = true;
} catch (err) {
    TCO_ENABLED = false;
}
// + get/set + proxies - spread to more IN DEPTH questions
```



# Chapter 8 - (might change)
```javascript

var a = 2;

a ** 4;			// Math.pow( a, 4 ) == 16

a **= 3;		// a = Math.pow( a, 3 )
a;				// 8




async function request(url) {
	var resp = await (
		new Promise( function(resolve,reject){
			var xhr = new XMLHttpRequest();
			xhr.open( "GET", url );
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve( xhr );
					}
					else {
						reject( xhr.statusText );
					}
				}
			};
			xhr.send();
		} )
	);

	return resp.responseText;
}

var pr = request( "https://some.url.1" );

pr.then(
	function fulfilled(responseText){
		// ajax success
	},
	function rejected(reason){
		// Oops, something went wrong
	}
);






var vals = [ "foo", "bar", 42, "baz" ];

if (~vals.indexOf( 42 )) {
	// found it!
}


/*
The reason for the >= 0 check is because indexOf(..) returns a numeric value of 0 or greater if found, or -1 if not found. In other words, we're using an index-returning function in a boolean context. But because -1 is truthy instead of falsy, we have to be more manual with our checks.
*/

```
