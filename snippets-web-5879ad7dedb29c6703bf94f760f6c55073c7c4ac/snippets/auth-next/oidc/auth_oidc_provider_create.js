// This snippet file was generated by processing the source file:
// ./auth-next/oidc.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START auth_oidc_provider_create_modular]
import { OAuthProvider } from "firebase/auth";

const provider = new OAuthProvider("oidc.myProvider");
// [END auth_oidc_provider_create_modular]