'use strict';

function wait(n, msg) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(msg || 'hi');
    }, n || 500);
  });
}

(async () => {
  // Execute in sequence: each of these waits for resolution before the next one starts
  console.log(await wait(100, '100'));
  console.log(await wait(300, '300'));

  await wait(1000, '1000')
    .catch(console.log) // some error-handling
    .then(console.log); // post error-handling

  // Execute in parallel:
  let data = await Promise.all([wait(), wait(), wait()]);
  console.log(data); // alternative to `.then(console.log);`
})();
