'use strict';

class CustomError extends Error {
  constructor(msg, causedBy) {
    super(msg);
    this.__causedBy = causedBy;
  }

  getCausedBy() {
    return this.__causedBy;
  }
}

module.exports = CustomError;

// try {
//   let a = [];
//   console.log(a.doesntexist.hi);
// } catch (e) {
//   let err = new CustomError('custom err msg', e);
//   console.log(err);
// }
