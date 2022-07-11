import React, {useState, useEffect} from 'react';
import {getDevice} from 'framework7/lite-bundle';
import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter, Button
} from 'framework7-react';

import Dom7 from "dom7";

import capacitorApp from '../../assets/js/capacitor-app';
import routes from '../assets/js/routes';
import store from '../assets/js/store';

const MainApp = () => {

    let [authPIN, setAuthPIN] = useState('____');

    let [loginPIN, setLoginPIN] = useState('');

    const validAuthPIN = useState('1234');

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    let validateAuthPINMode = true;
    let updateAuthPIN1 = "";
    let updateAuthPIN2 = "";
    let updateAuthPINAttempt = 0;

    let pinModal, pinModalMini;

    const device = getDevice();
    // Framework7 Parameters
    const f7params = {
        name: 'JobTrac', // App name
        theme: 'auto', // Automatic theme detection


        id: 'io.framework7.myapp', // App bundle ID
        // App store
        store: store,
        // App routes
        routes: routes,
        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV === 'production' ? {
            path: '/service-worker.js',
        } : {},
        // Input settings
        input: {
            scrollIntoViewOnFocus: device.capacitor,
            scrollIntoViewCentered: device.capacitor,
        },
        // Capacitor Statusbar settings
        statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
        },
    };

    const authorizePIN = () => {

        validateAuthPINMode = true;

        authPIN = "⚪⚪⚪⚪";

        f7.emit('OPEN_PIN_MODAL');

    }

    const changeUserPIN = () => {

        validateAuthPINMode = false;

        f7.on('PIN_INPUT', (value)=>{

            updateAuthPINAttempt++;

            authPIN = "⚪⚪⚪⚪";

            if (updateAuthPINAttempt === 1){

                updateAuthPIN1 = value;

                console.log("PIN 1: INPUT", value);

                f7.emit('OPEN_PIN_MODAL');

            } else if (updateAuthPINAttempt === 2){

                updateAuthPIN2 = value;

                console.log("PIN 2: INPUT", value);

                if (updateAuthPIN1 === updateAuthPIN2){
                    console.log("USER_PIN_VALID");
                }else{
                    console.log("USER_PIN_INVALID");
                }

            }else{

                console.log("PIN X: INPUT ATTEMPT#", updateAuthPINAttempt);

            }

        });

        f7.emit('OPEN_PIN_MODAL');

    }

    const loggedInUser = (user) => {

        setIsLoggedIn(true);

        if ("id" in user){

            console.log("::LOGGED_IN_USER::",user);

        }else{

            console.log("::FAKE LOGGED_IN_USER::",user);

        }

    }

    const logOut = () => {
        f7.dialog.confirm(
            "Are you sure you want to logout?",
            () => {
                console.log("Logout");
                f7.emit("LOGOUT");
                Dom7("#view-login").show();
                Dom7("#view-main").hide();
            },
            () => {

                console.log("Cancelled Logout");
                /*
                                helper.data.getKey(
                                    'app.themes.dark',
                                    function (data: any){
                                        console.log(data,  "DATA : Cancelled Logout");
                                    }
                                );
                */
            });
    }


    const initPINModal = () => {

        pinModal = f7.keypad.create({
            inputEl: '#demo-numpad-inline',
            containerEl: '#numpad-inline-container',
            toolbar: false,
            valueMaxLength: 4,
            dotButton: false,
            formatValue: function (value) {
                value = value.toString();
                authPIN = ('⚫⚫⚫⚫').substring(0, value.length) + ('⚪⚪⚪⚪').substring(0, 4 - value.length);
                console.log("INPUT (MASKED|UNMASKED)", authPIN, value);
                return authPIN;
            },
            on: {
                change: function (keypad, value) {
                    console.log(keypad, value);
                    value = value.toString();
                    if (value.length === 4) {

                        if (validateAuthPINMode) {

                            if (value === validAuthPIN[0]) {
                                f7.emit("PIN_CORRECT");
                                f7.emit('CLOSE_PIN_MODAL');
                            } else {
                                Dom7("#demo-numpad-inline").addClass("shake");
                                setTimeout(function () {
                                    Dom7("#demo-numpad-inline").removeClass("shake");
                                    f7.emit("PIN_INCORRECT");
                                }, 1000);
                            }

                        }else{

                            f7.emit("PIN_INPUT", value);

                        }
                    }
                }
            }
        });

        pinModal.open();



        Dom7("#numpad-mini").hide();

    }

    f7ready(() => {

        // Init capacitor APIs (see capacitor-app.js)
        if (f7.device.capacitor) {
            capacitorApp.init(f7);
        }
        // Call F7 APIs here

        f7.authorizePIN = authorizePIN;

        f7.changeUserPIN = changeUserPIN;

        f7.loggedInUser = loggedInUser;

        f7.on("AUTH_LOGGED_IN_USER", function (user) {

            setIsLoggedIn(true);

            if ("id" in user){

                console.log("::AUTH LOGGED_IN_USER::",user);

            }else{

                console.log("::AUTH FAKE LOGGED_IN_USER::",user);

            }

        })

        f7.on("AUTH_LOGGED_OUT_USER", function (data) {

            setIsLoggedIn(false);

            console.log("::AUTH_LOGGED_OUT_USER::1",isLoggedIn);

            setTimeout(()=>{

                console.log("::AUTH_LOGGED_OUT_USER::2",isLoggedIn);

            },5000);

        })

        f7.on("LOGIN_USER", function (data) {

            setIsLoggedIn(true);

            Dom7("#view-login").hide();
            Dom7("#view-main").show();

        })

        f7.on("OPEN_USER_PIN_KEYPAD", function (e) {

            console.log("EVENT: OPEN_USER_PIN_KEYPAD", e);

            Dom7("#numpad-mini").show();

        })

        f7.on("OPEN_PIN_MODAL", function (e) {

            console.log("EVENT: OPEN_PIN_MODAL", e);

            f7.popup.open(".popup-pin-authentication");

        })

        f7.on("CLOSE_PIN_MODAL", function (e) {

            console.log("EVENT: CLOSE_PIN_MODAL", e);

            f7.popup.close(".popup-pin-authentication");

        })

        initPINModal();

    });

    return (
        <App {...f7params} >

            {/* Left panel with cover effect*/}
            <Panel left cover dark>
                <View>
                    <Page>
                        <Navbar title="Left Panel"/>
                        <Block>Left panel content goes here</Block>
                    </Page>
                </View>
            </Panel>


            {/* Right panel with reveal effect*/}
            <Panel right reveal dark>
                <View>
                    <Page>
                        <Navbar title="Right Panel"/>
                        <Block>Right panel content goes here</Block>
                    </Page>
                </View>
            </Panel>


            {/* Your main view, should have "view-main" class */}

            {isLoggedIn ? (
                <View className="safe-areas" url="/" id="f7-view-main"/>
            ) : (
                <View main className="safe-areas" url="/login/" id="f7-view-login"/>
            )}

            {/* Popup */}

            <Popup className="popup-pin-authentication" swipeToClose={false} closeOnEscape={false}>
                <Page>

                    <div className="page-content pin-keypad-screen-content">
                        {validateAuthPINMode && (
                            <Link iconIos="f7:xmark" iconAurora="f7:xmark" iconMd="material:close"
                                  popupClose=".popup-pin-authentication"/>
                        )}
                        <div className="pin-keypad-screen-title">Enter Your PIN</div>
                        <List form>
                            <input id="demo-numpad-inline"
                                   type="text" readOnly={true}
                                   value={authPIN}
                                   onInput={(e) => {
                                       setAuthPIN(e.target.value);
                                   }}
                            />
                        </List>
                        <div className="block block-strong no-padding no-margin passcode-numpad">
                            <div id="numpad-inline-container"/>
                        </div>
                    </div>

                </Page>
            </Popup>



        </App>
    )
}
export default MainApp;