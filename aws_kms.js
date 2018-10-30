'use strict';

// This uses our credentials from ~/.aws/credentials:
const AWS = require('aws-sdk');
const KMS_CLIENT = new AWS.KMS({
  region: 'eu-west-1',
});

// KMS_CLIENT.decrypt(DECRYPT_SECRET_KEY_PARAMS).promise()
//   .then((secretKeyData) => {
//     console.log(secretKeyData); // get the KeyId from here!
//     let secretKey = new Buffer(secretKeyData.Plaintext).toString('ascii');
//     console.log('DECRYPTED', secretKey);
//     return secretKey;
//   });

const KMS_KEY_ID = 'arn:aws:kms:eu-west-1:412604355545:key/d575ee3c-48c0-4c9c-bb9b-7838242a52c8';

let params = {
  KeyId: KMS_KEY_ID,
  Plaintext: new Buffer('payload'),
};
KMS_CLIENT.encrypt(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(new Buffer(data.CiphertextBlob).toString('base64')); // successful response
});

// const verify = {
//   CiphertextBlob: new Buffer('cryptogram to verify', 'base64')
// };
// KMS_CLIENT.decrypt(verify).promise()
//   .then(secretKeyData => {
//     let secretKey = new Buffer(secretKeyData.Plaintext).toString('ascii');
//     console.log('DECRYPTED', secretKey);
//     return secretKey;
//   });
