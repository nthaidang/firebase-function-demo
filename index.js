const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.updateDatabase = functions.storage.object().onChange(event => {
  console.log(event);
  const object = event.data; // The Storage object.
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("video/")) {
    console.log("This is not an video.");
    return;
  }
  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (resourceState === "exists" && metageneration > 1) {
    console.log("This is a metadata change event.");
    return;
  }
  // Exit if this is a move or deletion event.
  if (resourceState === "not_exists") {
    console.log("This is a deletion event.");
    return;
  }
  // Get the file name.
  const fileName = filePath.split("/").pop();
  const videoId = fileName.split(".").shift();
  const type = fileName.split(".").pop();
  console.log('Begin update database');
  // Update databse with video name & type
  admin.database().ref('video/' + videoId).set({
      type: type,
  }).then(data => console.log('update database success:' , data));
});
