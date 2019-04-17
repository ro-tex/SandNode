const {describe, it} = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

function add(a, b) {
  return Promise.reject('boom');
  // return Promise.resolve(a + b);
}

describe('add', () => {
  it('a+b', async () => {
    const result = add(2, 3);
    // expect(result).eql(5, '5?'); // works
    expect(result).to.eventually.be.rejectedWith('boom');
  });
});
