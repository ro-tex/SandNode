const Sand = require('../app/sand');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Sand', () => {

  /* SETUP STARTS */

  let result;

  // before(() => console.log('BEFORE'));

  beforeEach(() => {
    // console.log('BEFORE EACH');
    result = Sand.sand();
  });

  // afterEach(() => console.log('AFTER EACH'));

  // after(() => console.log('AFTER'));

  /* SETUP ENDS */

  it('tests a promise with mocha', function() {
    // if the promise fails, mocha will fail the test
    return result.then((data) => {
      expect(data).to.equal(5);
    });
  });

  it('tests a promise with mocha and chai-as-promised', function() {
    // with promises we need to use `eventually` and return the whole thing:
    return expect(result).to.eventually.equal(5);
  });

});
