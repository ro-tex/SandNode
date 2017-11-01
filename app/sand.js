'use strict';

class Sand {
  static hello() {
    return 'Hello World!';
  }

  static sand() {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < 1e9; ++i) {}
      resolve(5);
    });
  }
}

module.exports = Sand;
