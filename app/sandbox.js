'use strict';

const Sand = require('./sand'); // import a module

console.log(Sand.hello()); // call a module's method

var x = 100; // a global

function test() {
  x = 5; // modify the global

  console.log('args:', arguments); // all functions have this `arguments` operator that gives us an object

  // define a local x. this is hoisted to the top of the method,
  // so the previous statement doesn't affect the global either:
  var x = 20;

  return x;
}

console.log('global:    ', x);
console.log('test:      ', test());
console.log('global:    ', x);

x += 1; // this works
x++; // this works
++x; // this works

console.log(x > 0 ? 'x is ' + x : 0); // yey for shorthand if!

console.log(typeof '123');

let o = {
  a: 1,
  b: '2',
  c: [1, 2, 3], // the trailing comma is ignored
};

let arr = [1, 1, 2]; // an array (actually an object)
arr.asdf = 100; // feels like a map to me...

arr.foo = function() { // or an object?!
  // self referencing:
  console.log(this[0], this.asdf, this.foo.field); // foo.field is still `undefined`
};

console.log(arr); // this is still an array...
arr.foo();
arr.foo.field = 'field value';
arr.foo(); // now we should be able to get this

console.log(arr.foo);

// NOTE: The above is bad style. Stick to numeric indices with arrays and use objects for anything else.

var x = 'aaaa'; // notice how we're re-declaring the variable with var but we don't get any errors.
if (typeof x.toUpperCase === 'function') { // check if x responds to a method
  console.log(x.toUpperCase());
}


function scopes() {
  let r = 1; // available throuout the entire block (incl. subblocks)
  {
    var p = 2; // available in the whole body of scopes()
    console.log(r, p);
  }
  console.log(r, p); // would throw an error if we define p with `let p` within that block
}

scopes();

/* LAMBDAS */

let l1 = (x) => { // "arrow function"?
  return x ** 2 // use `return` if you have a block and want to get a return value
};


let l2 = (x) => x ** 5 // the `return` is implicit if you have an expression

// if the expression is an object we need `()` around it so it's not treated as a block:
let l3 = (x) => ({
  foo: 'bar',
});

let l4 = x => x ** 5 // the parentheses around the param are optional if it's just one

// let l5 = (...args) => args[1] ** 2 // the argument can be a compund one

console.log('lambda:', l5(3, 4, 5));

let mod = (o, val = 'default') => { // variable number of params via default values
  o.value = val; // cause a side effect; no return value
};

let lambdaParam = {};
console.log('mod return:', mod(lambdaParam), 'param status after execution:', lambdaParam);

// Destructuring within the parameter list is also supported
// let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c; // commented so it doesn't get reformatted
// f();  // -> 6


function foo() {
  console.log('logging `this` from foo:', this);
}
// passing an object to call() makes the function run as a method of
// the supplied object (the object becomes `this` during the function execution)
foo.call(o);

/* ARRAYS */

arr = [1, 1, 2, 5, 8, 13]; // the trailing comma is ignored

console.log('ARR', arr);

let sumSquaredOdds = arr.filter(x => x % 2 == 1).map(x => x ** 2).reduce((x, y) => x + y)
console.log('sumSquaredOdds:', sumSquaredOdds);

arr.push(1);
arr.pop();
arr.unshift(2);
arr.shift();

arr.slice(1, 3); // arr[1:3] doesn't work

/* PROMISES */

function work(ms) {
  let now = Date.now();
  while (Date.now() < now + ms) {}
  return now % 3 > 0; // semi-random output
}

function err(error) {
  return console.error(`Error: ${error}`);
}

function asyncWork() {
  return new Promise(
    function(resolve, reject) { // at this point these are just placeholders for functions
      let success = work(1000);
      if (success) {
        resolve('Success!'); // call the success placeholder
      } else {
        reject('Error!'); // we can throw an Error() here
      }
    }
  );
}

// this is the same as above but with a single-line lambda
function asyncWorkSimple(param) {
  console.log('doing work...', param);
  return new Promise((resolve, reject) => work(100) ? resolve('Succ') : reject('Err'));
}

if (false) {
  let p = asyncWorkSimple();
  // process the promise:
  p.then(console.log, console.log); // pass the resolve/reject functions. they will be given the return value of the promise as a param
  // another consequence of the same promise:
  p.then((resolve) => console.log('+++'), (reject) => console.log('---')); // we can pass them by name, too. but then they won't be auto-given a param
}

if (false) {
  console.log('A promises chain:');
  asyncWorkSimple('initial') // returns a promise
    // .then(resolve => asyncWorkSimple('subsequent'), reject => err(reject))
    .then(asyncWorkSimple)
    .then(asyncWorkSimple) // if this errors out, the next `then` with a reject call is called or we hit the `catch`
    // .then(3) // => Promise.resolve(3)
    // .then(x => x) // => Promise.resolve(x)
    // .then(x => new Promise((resolve, reject) => {resolve(123123)}))
    .catch(err)
    .then(() => console.log('another call after the catch. basically a `finally`'), err);
}

if (false) {
  console.log('parallel processing with promises:');
  // this will run `asyncWorkSimple` on all elements of `arr` in parallel and only succeed if all calls succeed.
  // otherwise the returned promise will trigger its reject clause (or hit the `catch`).
  Promise.all(arr.map((element) => asyncWorkSimple(element)))
    .then((resolve) => console.log('success!', resolve)) // all returned values are passed here as an array
    .catch((reject) => err(reject)); // only the first error is passed here

  // This is super useful when we want to get a given resource and there is more than one provider.
  // We can poll them all and return the resource as soon as the fastest provider responds.
  // The above assumes calls are free.
  console.log('pick the fastest responder (or failer):');
  Promise.race(arr.map((el) => asyncWorkSimple(el)))
    .then((resolve) => console.log('success', resolve)) // returns the first one that succeeds
    .catch((reject) => err(reject)); // the first error is passed here
}

function showProps(obj, objName = 'this') {
  let result = '';
  for (let i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      result += objName + '.' + i + ' = ' + obj[i] + ' ' + typeof obj[i] + '\n';
    }
  }
  return result;
}

let a = new Object();
a.a = 1;
a.b = [1, 2, 3];
a.c = 'asdfasfd';
a.d = null;
a.e = () => {
  console.log();
};
a.f = function hello() {
  console.log(this.a);
};
// console.log(showProps(a));
// console.log(a);
// console.log(JSON.stringify(a));

// NOTE variable names may cover function names
if (false) {
  function f() {
    return 1;
  }
  console.log(f()); // -> 1

  f = () => 2; // overwriting the function name here
  console.log(f()); // -> 2

  // let f = () => 10; -> SyntaxError: Identifier 'f' has already been declared
  // var f = ... will act like `f = ...` unless we have strict mode, then it will act like `let f = ...`

  f = 3;
  console.log(f()); // -> TypeError: f is not a function
}

/* OBJECTS */

if (false) {
  let parent = {
    hi: () => console.log('Hello!'),
    toString: () => 'parent',
  };

  let obj = {
    __proto__: parent, // inheritance

    toString() { // equivalent to `toString: function toString() {`
      return 'obj:' + super.toString();
    },

    data: 42,

    ['prop_' + (() => Date.now())()]: 42, // a dynamicaly named field
  };

  obj.hi();
  console.log(obj);

  // All objects are `true`:
  let b = new Boolean(false);
  if (b) {} // NOTE this condition evaluates to true
  if (b == true) {} // this condition evaluates to false


  class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    // methods are defined without the `function` keyword
    sum() {
      return this.x + this.y;
    }
  }

  // patching the class (like monkey patching in Ruby)
  Vector.prototype.toString = function() {
    return `X:${this.x} Y:${this.y}`;
  };

  let v = new Vector(2, 3);
  console.log(v.toString());

  // true monkey patching of an object
  v.toString2 = function() {
    return `>X<:${this.x} >Y<:${this.y}`;
  };

  console.log(v.toString2());

  console.log(Object.keys(v), Object.values(v));
}


let fs = [(x) => console.log('func 1', x), (x) => console.log('func 2', x), (x) => console.log('func 3', x)];

let applyAsync = (acc, val) => acc.then(val);
let composeAsync = (...funcs) => (x) => funcs.reduce(applyAsync, Promise.resolve(x));
composeAsync(fs)('>>> some value <<<');


if (true) { // generators
  function* generator1() {
    // console.log(0);

    yield 1;
    yield 2;
    yield 3;
    // return 4; // optional, in case we don't want an mepty loop at the end
  }

  let iterator = generator1();
  let current;

  do {
    current = iterator.next();
    console.log(current.value, current.done);
  } while (!current.done);

  // generators can be passed values:
  function* generator2() {
    let a = yield;

    return 2 * a;
  }

  iterator = generator2();

  iterator.next();
  console.log(iterator.next(2));
}

/**
 * Returns a deep copy (by value) of the object guiven as argunent.
 *
 * DOES NOT WORK WITH DEEP OBJECTS!
 *
 * @see https://stackoverflow.com/a/5344074/363293
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns true when the two obejcts are identical.
 * Note: field order matters, unfortunately.
 *
 * DOES NOT WORK WITH DEEP OBJECTS!
 *
 * @see https://stackoverflow.com/a/1144249/363293
 */
function compare(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function isIterable(obj) {
  return !!obj && typeof obj[Symbol.iterator] === 'function';
}

function foo() {
  console.log(arguments[0]);
}
foo.call({bar: 'baz'}, ...[1, 2, 3]); // call takes indivdual parameters
foo.apply({bar: 'bzz'}, [1, 2, 3]);   // apply takes the params as an array

// https://stackoverflow.com/questions/34361379/arrow-function-vs-function-declaration-expressions-are-they-equivalent-exch

// generators
function* gen() {
  let n = 0;
  while (true) {
    yield n++;
  }
}
for (let i of gen()) {
  console.log(i);
}

// destructuring
let {a, c: b} = {a: 1, c: 2};
let [c, d] = [1, 2];
({c, d} = {c: 3, d: 4}); // parentheses are needed, otherwise JS thinks the first part is a block
console.log(a, b, c, d);
