// This snippet file was generated by processing the source file:
// ./messaging-next/index.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START messaging_request_permission_modular]
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve a registration token for use with FCM.
    // ...
  } else {
    console.log('Unable to get permission to notify.');
  }
});
// [END messaging_request_permission_modular]