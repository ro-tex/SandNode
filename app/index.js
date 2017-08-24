'use strict';

const sand = require('./sand') // import a module

console.log(sand.hello()) // call a module's method

const _ = require('lodash')

var hash = _.assign({
    'a': 1,
    'b': 2,
    'c': 3
})

console.log(hash);

var x = 100 // a global

function test() {
    x = 5 // modify the global

    console.log('args:', arguments); // all functions have this `arguments` operator that gives us an object

    // define a local x. this is hoisted to the top of the method,
    // so the previous statement doesn't affect the global either:
    var x = 20

    return x
}

console.log('global:    ', x);
console.log('test:      ', test());
console.log('global:    ', x);

x += 1 // this works
x++ // this works
++x // this works

console.log(x > 0 ? 'x is ' + x : 0); // yey for shorthand if!

console.log(typeof "123");

var o = {
    a: 1,
    b: '2',
    c: [1, 2, 3]
}

var arr = [1, 1, 2] // an array (actually an object)
arr.asdf = 100 // feels like a map to me...

arr.foo = function() { // or an object?!
    // self referencing:
    console.log(this[0], this.asdf, this.foo.field); // foo.field is still `undefined`
}

console.log(arr); // this is still an array...
arr.foo()
arr.foo.field = 'field value'
arr.foo() // now we should be able to get this

console.log(arr.foo);

// NOTE: The above is bad style. Stick to numeric indices with arrays and use objects for anything else.

var x = 'aaaa' // notice how we're re-declaring the variable with var but we don't get any errors.
if (typeof x.toUpperCase === 'function') { // check if x responds to a method
    console.log(x.toUpperCase());
}


function scopes() {
    let r = 1 // available throuout the entire block (incl. subblocks)
    {
        var p = 2 // available in the whole body of scopes()
        console.log(r, p);
    }
    console.log(r, p); // would throw an error if we define p with `let p` within that block
}

scopes()

/* LAMBDAS */

let l1 = (x) => { // "arrow function"?
    return x ** 2 // use `return` if you have a block and want to get a return value
}

let l2 = (x) => x ** 5 // the `return` is implicit if you have an expression

// if the expression is an object we need `()` around it so it's not treated as a block:
let l3 = x => ({
    foo: 'bar'
})

let l4 = x => x ** 5 // the parentheses around the param are optional if it's just one

let l5 = (...args) => args[1] ** 2 // the argument can be a compund one

console.log('lambda:', l5(3, 4, 5));

let mod = (o, val = 'default') => { // variable number of params via default values
    o.value = val // cause a side effect; no return value
}

let lambdaParam = {}
console.log('mod return:', mod(lambdaParam), 'param status after execution:', lambdaParam);

// Destructuring within the parameter list is also supported
// let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c; // commented so it doesn't get reformatted
// f();  // -> 6


function foo() {
    console.log('logging `this` from foo:', this);
}
// passing an object to call() makes the function run as a method of
// the supplied object (the object becomes `this` during the function execution)
foo.call(o)

/* ARRAYS */

arr = [1, 1, 2, 5, 8, 13]

let sumSquaredOdds = arr.filter(x => x % 2 == 1).map(x => x ** 2).reduce((x, y) => x + y)
console.log('sumSquaredOdds:', sumSquaredOdds);

/* PROMISES */
