const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onRequest(async (req, res) => {
 // Grab the text parameter.
 const original = req.query.text;
 const snapshot = await admin.database().ref('/messages').push({original: original});
 // Send back a message that we've succesfully written the message
 res.redirect(303, snapshot.ref.toString());

});
