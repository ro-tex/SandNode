const AWS = require('aws-sdk')
const stepfunctions = new AWS.StepFunctions();

// var params = {
//   executionArn: 'arn:aws:states:eu-west-1:601343171996:execution:PureMailAsynchronous:f9481137-39aa-439e-b7d6-d6dd9671411b',
//   maxResults: 1000,
//   reverseOrder: false
// };
// stepfunctions.getExecutionHistory(params, function(err, data) {
//   if (err) console.log(err, err.stack);
//   else {
//     console.log(data);
//     console.log(data.events[data.events.length - 1]);
//   }
// });

// var params = {
//   stateMachineArn: 'arn:aws:states:eu-west-1:601343171996:stateMachine:PureMailAsynchronous',
//   /* required */
//   maxResults: 10 //,
//   // nextToken: 'STRING_VALUE',
//   // statusFilter: 'FAILED' // RUNNING | SUCCEEDED | FAILED | TIMED_OUT | ABORTED
// };
// stepfunctions.listExecutions(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data); // successful response
// });

const start = new Date('August 13, 2018 00:00:00').getTime();

var params = {
  stateMachineArn: 'arn:aws:states:eu-west-1:601343171996:stateMachine:PureMailAsynchronous',
  maxResults: 10
    // , nextToken: 'STRING_VALUE'
    // , statusFilter: 'FAILED' // RUNNING | SUCCEEDED | FAILED | TIMED_OUT | ABORTED
    ,
  statusFilter: 'SUCCEEDED'
};

let executions = [];

const getExecs = (params) => {
  stepfunctions.listExecutions(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return;
    }

    executions = executions.concat(data.executions);

    let isWithinTheWeek = new Date(data.executions[data.executions.length - 1].startDate).getTime() > start;

    if (data.nextToken && isWithinTheWeek) {
      let localParams = params;
      localParams.nextToken = data.nextToken;
      getExecs(localParams)
    } else {
      // console.log(executions)
      scanExecutions(executions);
    }
  });
}

getExecs(params);

// { executionArn: 'arn:aws:states:eu-west-1:601343171996:execution:PureMailAsynchronous:bf74674c-f9d8-49bf-b886-26fdc725106f',
//   stateMachineArn: 'arn:aws:states:eu-west-1:601343171996:stateMachine:PureMailAsynchronous',
//   name: 'bf74674c-f9d8-49bf-b886-26fdc725106f',
//   status: 'SUCCEEDED',
//   startDate: 2018-08-20T22:16:37.684Z,
//   stopDate: 2018-08-20T22:16:47.010Z }
function scanExecutions(execs) {
  let results = {};
  let counter = 0;
  for (let i = 0; i < execs.length; i++) {
    if (results[execs[i].status] === undefined) {
      results[execs[i].status] = [];
    }

    var params = {
      executionArn: execs[i].executionArn,
      maxResults: 1,
      reverseOrder: false
    };

    counter++;

    stepfunctions.getExecutionHistory(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        let lastEvent = data.events[data.events.length - 1];

        let output = null;
        if (lastEvent && lastEvent.stateExitedEventDetails && lastEvent.stateExitedEventDetails.output) {
          output = JSON.parse(lastEvent.stateExitedEventDetails.output);
        }
        if (output && output.body.emailNotificationTo.includes('tradeprint')) {
          results[execs[i].status].push(output.body);
        }

        counter--;

        if (counter === 0) {
          console.log(results);
        }
      }
    });
  }
}
