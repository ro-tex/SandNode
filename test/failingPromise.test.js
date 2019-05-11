const {describe, it} = require('mocha');
const {expect} = require('chai');

async function add(a, b) {
  if (a + b === 0) {
    throw new Error('boom');
  }
  // return Promise.reject('boom'); // doesn't work
  return Promise.resolve(a + b);
}

describe('add', () => {
  it('success', async () => {
    try {
      const result = await add(2, 3);
      expect(result).eql(5, '5?'); // hit this
    } catch (e) {
      expect(e.message).eql('boom');
    }
  });
  it('failure', async () => {
    try {
      const result = await add(0, 0);
      expect(result).eql(5, '5?');
    } catch (e) {
      expect(e.message).eql('boom'); // hit this
    }
  });
});
