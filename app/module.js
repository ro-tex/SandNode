'use strict';

/**
This module will export some simple functions.

There are several ways to handle exporting in Node.js:
 - by using `module.exports`
 - by using `exports` (which is an alias of `module.exports`)

 A key thing to know is that `module` is an object with a field called `exports`
 and `exports` points to that field. At the end of the runtime of a Node.js file,
 the environment returns `module.exports` as a result. So, if we overwrite `exports`
 with some value that value will not get exported (see the example below labelled 'wrong').

 Links:
  - https://stackoverflow.com/questions/16383795/difference-between-module-exports-and-exports-in-the-commonjs-module-system

*/

/*
This is what's being run implicitly at the start of the file:
let module = {exports:{}}; // it has other fields as well - `in`, `children`, etc.
let exports = module.exports;
*/

if (false) {
  /*
  If we call this we'll change the address of `module.exports` and `exports` won't be
  pointing at it any more, so anything we attach to `exports` won't be exported.

  Sometimes there is a good reason to do that:
    1) if all that you're exporting is a single function:
    const doStuff = require('./do_stuff');
    doStuff();

    2) if you want to be able to call some initialiser for this module right after you require it:
    const express = require('express'); // `express` basically exports its factory
    const app = express();
  */
  class Foo {
    bar() {
      console.log('hello world from class foo, function bar');
    }
    static factory() {
      return new Foo();
    }
  }

  module.exports = Foo.factory;
} else {
  /*
  In the general case you'll want to just add stuff to the already existing `module.exports` object:
   - functions
   - constants
   - sub-objects
  */

  // right - adds a field to the object at the address to which `exports` point
  exports.f0 = function() {
    console.log('hello world 0');
  };

  // right
  module.exports.f1 = function() {
    console.log('hello world 1');
  };

  // wrong - changes the address `export` points to, so this function won't be exported!
  exports = function() {
    console.log('hello world 2');
  };
}

if (!module.parent) {
  console.log('Here is what is being exported: ', module.exports);
}
