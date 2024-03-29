// This snippet file was generated by processing the source file:
// ./auth-next/github.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_github_signin_redirect_result_modular]
import { getAuth, getRedirectResult, GithubAuthProvider } from "firebase/auth";

const auth = getAuth();
getRedirectResult(auth)
  .then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    if (credential) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const token = credential.accessToken;
      // ...
    }

    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...
  });
// [END auth_github_signin_redirect_result_modular]