// This snippet file was generated by processing the source file:
// ./auth-next/custom-dependencies.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_get_auth_equivalent_modular]
import {initializeAuth, browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, indexedDBLocalPersistence} from "firebase/auth";
import {initializeApp} from "firebase/app";

const app = initializeApp({/** Your app config */});
const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence],
  popupRedirectResolver: browserPopupRedirectResolver,
});
// [END auth_get_auth_equivalent_modular]