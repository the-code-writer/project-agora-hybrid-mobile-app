package com.cap.firebasedynamiclinks;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;

@CapacitorPlugin(name = "CapFirebaseDynamicLinks")
public class CapFirebaseDynamicLinksPlugin extends Plugin {

    private CapFirebaseDynamicLinks implementation = new CapFirebaseDynamicLinks();

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);

        FirebaseDynamicLinks
                .getInstance()
                .getDynamicLink(intent)
                .addOnSuccessListener(pendingDynamicLinkData -> {
                    if (pendingDynamicLinkData == null) {
                        return;
                    }
                    Uri link = pendingDynamicLinkData.getLink();
                    if (link == null) {
                        return;
                    }
                    JSObject obj = new JSObject()
                            .put("url", link.toString())
                            .put("timestampClicked", pendingDynamicLinkData.getClickTimestamp());
                    notifyListeners("onDynamicLink", obj, true);
                })
                .addOnFailureListener(failure -> Log.e("Dynamic Link failure", failure.getMessage()));

    }
}
