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

const KMS_KEY_ID = 'arn:aws:kms:eu-west-1:601343171996:key/5ff8bd01-5aeb-4050-a819-977218a66db9';

let params = {
  KeyId: KMS_KEY_ID,
  Plaintext: new Buffer('87K0rPycpFjHBKQk1YrmeBTmDmpJvADF2aK9mym7'),
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
