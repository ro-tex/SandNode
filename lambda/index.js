'use strict';

const app = require('./app');
const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);

/*
This function is all you need in order to power your AWS Lambda.
Just comment everything else out, zip this file on its own and upload it to Lambda.
Set you Handler to `index.handler` and it will run the code below.
The code within the body is anything you need - what's in there right now is just one way to do it.
(If you need libraries you can create a package.json in this dir and zip them together.)
*/
exports.handler = (event, context, callback) => {
  // Hand the event and the context over to an express.js server:
  return awsServerlessExpress.proxy(server, event, context);
};

let customEvent =
  `{
    "resource": "/",
    "path": "/",
    "httpMethod": "GET",
    "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en;q=0.9,bg;q=0.8,de;q=0.7",
        "cache-control": "max-age=0",
        "CloudFront-Forwarded-Proto": "https",
        "CloudFront-Is-Desktop-Viewer": "true",
        "CloudFront-Is-Mobile-Viewer": "false",
        "CloudFront-Is-SmartTV-Viewer": "false",
        "CloudFront-Is-Tablet-Viewer": "false",
        "CloudFront-Viewer-Country": "CH",
        "dnt": "1",
        "Host": "ub33cap3u2.execute-api.eu-west-1.amazonaws.com",
        "Referer": "https://eu-west-1.console.aws.amazon.com/apigateway/home?region=eu-west-1",
        "upgrade-insecure-requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36",
        "Via": "2.0 d8be805548e2ddcdc76c59a729c3cad5.cloudfront.net (CloudFront)",
        "X-Amz-Cf-Id": "KPMUiEydLo6X6zMNI2tVAkCfxjdAattshITwahjSlVzqPkOtTCNA_Q==",
        "X-Amzn-Trace-Id": "Root=1-5a030f03-5fb34b9b547064cf61122d14",
        "X-Forwarded-For": "212.23.246.56, 52.46.13.78",
        "X-Forwarded-Port": "443",
        "X-Forwarded-Proto": "https"
    },
    "queryStringParameters": null,
    "pathParameters": null,
    "stageVariables": null,
    "requestContext": {
        "path": "/prod",
        "accountId": "601343171996",
        "resourceId": "bn2ao8bchi",
        "stage": "prod",
        "requestId": "c9c73d68-c48d-11e7-be7d-df5859b22b62",
        "identity": {
            "cognitoIdentityPoolId": null,
            "accountId": null,
            "cognitoIdentityId": null,
            "caller": null,
            "apiKey": "",
            "sourceIp": "212.23.246.56",
            "accessKey": null,
            "cognitoAuthenticationType": null,
            "cognitoAuthenticationProvider": null,
            "userArn": null,
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36",
            "user": null
        },
        "resourcePath": "/",
        "httpMethod": "GET",
        "apiId": "ub33cap3u2"
    },
    "body": null,
    "isBase64Encoded": false
}`;

let customContext = {
  callbackWaitsForEmptyEventLoop: 'true',
  done: function(err, data) {
    waitToFinish = false;
    callback(err, data);
  },
  succeed: function(data) {
    checkExpectedArgRange('succeed', arguments, 0, 1); // eslint-disable-line
    context.done(null, data);
  },
  fail: function(err) {
    checkExpectedArgRange('fail', arguments, 0, 1); // eslint-disable-line
    context.done(isUndefinedOrNull(err) ? '__emptyFailParamBackCompat' : err, null);
  },
  logGroupName: '/aws/lambda/CommentService',
  logStreamName: '2017/11/08/[$LATEST]f0ffb0b4ff154c36b6ef3a288d526ceb',
  functionName: 'CommentService',
  memoryLimitInMB: '128',
  functionVersion: '$LATEST',
  getRemainingTimeInMillis: () => awslambda.getRemainingTime(),
  invokeid: 'e6e5e21f-c4a6-11e7-8235-353499f63471',
  awsRequestId: 'e6e5e21f-c4a6-11e7-8235-353499f63471',
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:601343171996:function:LoadTest',
};

exports.handler(customEvent, customContext);
