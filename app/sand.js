'use strict';

let glob = 123;

class Sand {
  constructor(props) {
    this.props = props;
    this.field = 'default field value';
  }

  set field(newFieldVal) {
    this._field = newFieldVal; // NOTE the actual var name can't be the same as the name of the setter/getter
  }

  get field() {
    return this._field;
  }

  // a getter that exposes a global var (which is local to this class)
  get [glob]() {
    return glob;
  }

  set [glob](newGlob) {
    glob = newGlob;
  }

  // a method using the getter
  getGlob() {
    if (!this[glob]) {
      // if we don't have this the method will return `undefined` if we use the setter
      this[glob] = glob;
    }
    return this[glob];
  }

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
