const functions = require('firebase-functions');
const admin = require('firebase-admin')
const gcs = require('@google-cloud/storage')();

admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello World!");
});

exports.storage = functions.https.onRequest((request, response) => {
  const uid = 'foo';
  admin.firestore()
    .collection('test')
    .doc(uid)
    .get()
    .then(succ => response.send("Hello from Firebase!"))
    .catch(err => response.send("Error"))
});

exports.gcs = functions.https.onRequest((request, response) => {
  const path = 'test/f8-cinemacon-30mar17-01.jpg';
  const bucket = gcs.bucket('functions-test-fa10b.appspot.com');
  const file = bucket.file(path);
  console.log('a');
  file.exists()
    .then(data => {
      console.log('b');
      console.log(data);
      response.send('b');
      return 
    })
    .catch(err => response.send('error', err));
});
