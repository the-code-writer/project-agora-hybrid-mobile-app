// This snippet file was generated by processing the source file:
// ./database-next/offline.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START rtdb_ondisconnect_cancel_modular]
const onDisconnectRef = onDisconnect(presenceRef);
onDisconnectRef.set("I disconnected");
// some time later when we change our minds
onDisconnectRef.cancel();
// [END rtdb_ondisconnect_cancel_modular]