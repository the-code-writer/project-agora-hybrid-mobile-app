// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START detach_listener_modular]
import { collection, onSnapshot } from "firebase/firestore";

const unsubscribe = onSnapshot(collection(db, "cities"), () => {
  // Respond to data
  // ...
});

// Later ...

// Stop listening to changes
unsubscribe();
// [END detach_listener_modular]