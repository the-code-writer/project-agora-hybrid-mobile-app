import Foundation
import Capacitor
import FirebaseCore
import FirebaseDynamicLinks

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(CapFirebaseDynamicLinksPlugin)
public class CapFirebaseDynamicLinksPlugin: CAPPlugin {
    private let implementation = CapFirebaseDynamicLinks()

    
    public override func load() {
        if(FirebaseApp.app() == nil) {
            FirebaseApp.configure()
        }
        
        NotificationCenter.default
            .addObserver(self, selector: #selector(self.handleUrlOpened(notification:)),
                         name: Notification.Name.capacitorOpenURL, object: nil)
        NotificationCenter.default
            .addObserver(self, selector: #selector(self.handleUniversalLink(notification:)),
                         name: Notification.Name.capacitorOpenUniversalLink, object: nil)
    }
    
    @objc public func handleUrlOpened(notification: NSNotification) {
        guard let object = notification.object as? [String:Any?] else {
            return
        }
        let objUrl = object["url"] as! URL
        guard let dynamicLink = DynamicLinks.dynamicLinks().dynamicLink(fromCustomSchemeURL: objUrl) else {
            return
        }
        let url = dynamicLink.url?.absoluteString ?? ""
        self.notifyListeners("onDynamicLink", data: ["url": url,"timestampClicked": ""],
                             retainUntilConsumed: true)
        }
    
    @objc public func handleUniversalLink(notification: NSNotification) {
        guard let object = notification.object as? [String:Any?] else {
                    return
        }
        DynamicLinks.dynamicLinks()
            .handleUniversalLink(object["url"] as! URL, completion: {(result,error) in
                if(result == nil) {
                    return
                }
                let dynamicLink = result!
                let url = dynamicLink.url?.absoluteString ?? ""
                self.notifyListeners("onDynamicLink", data: ["url": url,"timestampClicked": ""],
                                     retainUntilConsumed: true)
            })
    }
    
}
