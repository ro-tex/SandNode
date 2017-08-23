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
