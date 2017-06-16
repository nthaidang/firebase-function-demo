# FIREBASE CLOUD FUNCTIONS

This is a small Firebase Function to update your FireBase Database whenever a video is upload to your Firebase Storage

## Init Function
1. Run `firebase login` to connect to your firebase application
2. Run `firebase init functions` to init generate npm repertory

## Deploy
1. Run `firebase deploy --only functions` to deploy your functions.
2. You can target a specific function too `firebase deploy --only functions:updateDatabase` 
