# Notes

## npm

Publish a module: $ npm publish

Add a patch version: $ npm version patch [ && npm publish ] // minor changes

New minor version: $ npm version minor [ && npm publish ] // backwards compatible

New major version: $ npm version major [ && npm publish ] // breaking changes

Coding style: <https://docs.npmjs.com/misc/coding-style>

Install `production` only: npm install --only=production

## AWS Lambda and Node.js

The Lambda function exits only after the Node.js event loop is empty (the Node.js event loop is not the same as the event that was passed as a parameter).

