const Sand = require('../app/sand');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// const assert = require('assert'); // if we want to use the built-in Node library

// NOTE https://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/

describe('Sand', () => {

  /* SETUP STARTS */

  let result;

  // before(() => console.log('BEFORE'));

  // we can name the hooks, in case we have several and want to easily debug them
  beforeEach(function setup() {
    // console.log('BEFORE EACH');
    result = Sand.sand();

    // mocha will fail the test if this promise is rejected:
    // return configThatReturnsAPromise();
  });

  // afterEach('another hook name', () => console.log('AFTER EACH'));

  // after(() => console.log('AFTER'));

  /* SETUP ENDS */

  // deep-compare:
  // return expect(promise).to.eventually.deep.equal(obj);
  // return expect(promise).to.eventually.become(obj); // sugar for deep.equal

  // two ways to test an object's field - obj.someProp:
  // return promise.then((obj) => expect(obj.someProp).to.equal('something'));
  // return expect(promise.then(o => o.someProp)).to.eventually.equal('something');

  // testing against multiple promises (better avoid):
  // return Promise.all([
  //   expect(promise1).to.become('foo'),
  //   expect(promise2).to.become('bar')
  // ]);

  // assert that a given call fails as expected:
  // return expect(value).to.be.rejected;
  // return expect(value).to.be.rejectedWith(TypeError);
  // return expect(value).to.be.rejectedWith('Expected error message');

  // NOTE When testing promises ALWAYS RETURN the promise!
  // Otherwise mocha won't know it needs to test it as a promise and it might fail silently.

  it('tests a promise with mocha', function() {
    // if the promise fails, mocha will fail the test:
    return result.then((data) => expect(data).to.equal(5)); // no need to call `done()`
  });

  it('tests a promise with mocha and chai-as-promised', function() {
    // with promises we need to use `eventually` and return the whole thing:
    return expect(result).to.eventually.equal(5);
  });

  it('a pending test (no callback)');

});
