'use strict';

const app = require('express')();
const bodyParser = require('body-parser');

const User = require('./user');

// app.use(bodyParser.urlencoded());

app.post('/login', bodyParser.urlencoded(), function(req, res) {
  console.log('>>>>>>>', req.body);

  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password are required.');
    return;
  }

  User.findByUsername(req.body.username, function(err, user) {
    user.comparePassword(req.body.password, function(err, valid) {
      if (err) throw err;

      if (!valid) {
        res.status(401).send('Invalid credentials.');
        return;
      } else {
        res.status(200).send(`Hello ${req.body.username}!`);
      }
    });
  });
});

app.post('/user', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and password are required.');
    return;
  }

  let u = new User(req.body.username, req.body.password);
  console.log(`Created a new user: ${u}`);
  res.status(200).send('New user created!');
});

app.listen(3000, function() {
  console.log('Express app listening on port 3000!');
});
