// This snippet file was generated by processing the source file:
// ./remoteconfig-next/index.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START rc_fetch_config_callback_modular]
import { fetchAndActivate } from "firebase/remote-config";

fetchAndActivate(remoteConfig)
  .then(() => {
    // ...
  })
  .catch((err) => {
    // ...
  });
// [END rc_fetch_config_callback_modular]