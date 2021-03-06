'use strict';

/**
 * Turns a callback-based function into a Promise-based function.
 *
 * Object methods are a bit more complicated to transform, so in order to keep
 * this function simple, we need to pass the object as second parameter.
 *
 * @param [Function] func The function we want to promisify.
 * @param [Object] self The object this function belongs to. Optional.
 */
function promisify(func, self = func) {
  return function() {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-rest-params
      func.call(self, ...arguments, function(err, data) {
        err ? reject(err.message) : resolve(data);
      });
    });
  };
}

module.exports = {
  promisify,
};


/* Wrapping a promise return into a callback library and returning a promise again. */
if (!module.parent) {
  // The original func that returns a promise:
  function fooOld() {
    return barPromise()
      .then((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  }

  // The new func that also returns a promise
  // but also uses a callback lib - badCallback()
  function fooNew() {
    return new Promise((resolve, reject) => {
      barCallback('some param', function(data) {
        doSyncWork(data);

        barPromise()
          .then((res) => {
            // this will resolve the promise that we return from fooNew:
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  /*
  Here we have an object with a method that works with callbacks.
  We don't like that, so we'll wrap that in a method that works with promises.
  The important part is that the new method will still function as part of the object.
  */
  let obj = {}; // some object whose method we want to overwrite
  obj.method = function(params, callback) {
    // business logic...
  };
  obj.methodPromise = function(params) {
    let self = this;
    return new Promise(function(resolve, reject) {
      self.method(params, function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
}
