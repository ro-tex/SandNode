const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

// function work() {
//   let c = 0;
//   for (; c < 1000000000;) {
//     c++;
//   }
//   return c;
// }

if (isMainThread) {
  const threads = [];
  const workloads = [];

  // initialise the thread pool:
  for (let i = 0; i < 3; i++) {
    threads[i] = new Worker(__filename, {
      workerData: i,
    });
  }

  // send workloads:
  for (let i = 0; i < 9; i++) {
    const wrkr = threads[i % 3];
    wrkr.postMessage(`workload ${i}`);
    workloads[i] = new Promise((resolve, reject) => {
      wrkr.on('message', resolve);
      wrkr.on('error', reject);
      wrkr.on('exit', (code) => {
        console.log(`"Exit" event received from worker. Code: ${code}`);
        code === 0 ? resolve(code) : reject(code);
      });
    });
  }

  const terminationCallback = function(err, data) {
    if (err) {
      console.log(`Error shutting down thread: ${err}`);
    } else {
      // Thread shut down successfully
    }
  };

  Promise.all(workloads).then((results) => {
      console.log(results);
    })
    .then(() => {
      // work();
      // work();
      // work();
      for (let i = 0; i < threads.length; i++) {
        console.log('will shut worker down');
        threads[i].terminate(terminationCallback);
      }
    });
} else {
  parentPort.on('message', (workload) => {
    console.log(`[Worker ${workerData}] Processing: ${workload}...`);
    // work();
    parentPort.postMessage(`[Worker ${workerData}] Done: ${workload}`);
  });
}
