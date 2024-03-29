// This snippet file was generated by processing the source file:
// ./auth-next/apple.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_apple_signin_redirect_result_modular]
import { getAuth, getRedirectResult, OAuthProvider } from "firebase/auth";

// Result from Redirect auth flow.
const auth = getAuth();
getRedirectResult(auth)
  .then((result) => {
    const credential = OAuthProvider.credentialFromResult(result);
    if (credential) {
      // You can also get the Apple OAuth Access and ID Tokens.
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
    }
    // The signed-in user info.
    const user = result.user;
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The credential that was used.
    const credential = OAuthProvider.credentialFromError(error);

    // ...
  });
// [END auth_apple_signin_redirect_result_modular]