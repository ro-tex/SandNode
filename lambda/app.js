const app = require('express')();

// https://www.youtube.com/watch?v=c4rvh_Iq6LE

app.get('/', sayHello);

function sayHello(req, res) {
  res.end('Hello!');
}

module.exports = () => {};
