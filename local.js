'use strict';

const express = require('express');
const debug = require('debug');
const app = express();

/* In order to debug:
     - start the app as `node debug local.js`
     - hit `c` to allow it to run freely (it will stop initially at the first line)
     - the execution will pause on the first line with `debugger` on it

    Alternatively:
     - run `node --inspect local.js`
     - visit chrome://inspect or about:inspect (in Chrome)
*/

app.get('/', (req, res) => {
  debugger;
  res.send({
    status: 'hello world!',
  });
  debug('info')('request served! (info)');
});

app.listen(3000, () => {
  console.log('Server started.');
});
