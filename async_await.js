'use strict';

function getJSON() {
  return Promise.resolve('data');
}

function wait(n) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('hi');
    }, n || 500);
  });
}

(async () => {
  // console.log(await getJSON());
  // console.log(await wait());
  // console.log(await getJSON());

  // Execute in sequence:
  console.log(await wait());
  console.log(await wait());
  console.log(await wait());

  // Execute in parallel:
  Promise.all([wait(), wait(), wait()]).then((data) => console.log(data));
})();
