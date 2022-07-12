import React, { useState, useRef } from 'react';
import {
    f7,
    Page,
    LoginScreenTitle,
    List,
    ListInput,
    ListButton,
    Checkbox,
    Row,
    Col,
    BlockFooter, Block, Button, f7ready,
} from 'framework7-react';

import loginScreenLogo from "../assets/img/logo-rectangle.png"
import Dom7 from "dom7";

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userEnteredPIN, setUserEnteredPIN] = useState([]);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    const [rememberMe, setRememberMe] = useState(['RememberMe', false]);

    const sheet = useRef(null);

    const pinModalMini = useRef(null);

    const socialAccountsArray = [
        {
            title: "Google",
            icon: "logo_google",
            image: "assets/png/logos/google.png",
            provider: "GOOGLE",
            id: "google",
            domain: "google.com",
            color: "#f44336"
        },
        {
            title: "Facebook",
            icon: "logo_facebook",
            image: "assets/png/logos/facebook.png",
            provider: "FACEBOOK",
            id: "facebook",
            domain: "facebook.com",
            color: "#3f51b5"
        },
        {
            title: "Twitter",
            icon: "logo_twitter",
            image: "assets/png/logos/twitter.png",
            provider: "TWITTER",
            id: "twitter",
            domain: "twitter.com",
            color: "#2196f3"
        },
        {
            title: "Microsoft",
            icon: "logo_windows",
            image: "assets/png/logos/microsoft.png",
            provider: "MICROSOFT",
            id: "microsoft",
            domain: "microsoft.com",
            color: "#03a9f4"
        },
        {
            title: "Apple",
            icon: "logo_apple",
            image: "assets/png/logos/apple.png",
            provider: "APPLE",
            id: "apple",
            domain: "apple.com",
            color: "#121212"
        },
    ];

    const resetPIN = () => {

        // @ts-ignore
        f7.changeUserPIN();

    }

    const onRememberMe = (e: { target: { value: any; checked: any; }; }) => {
        setRememberMe([e.target.value, e.target.checked]);
        console.log("REMEMBER ME", [e.target.value, e.target.checked]);
    };

    const signUp = () => {
        console.log("SIGN UP NOW");
    }

    const signInSocial = () => {
        f7.sheet.open(".sheet-swipe-to-close-sign-in-with-social");
    }

    const signInViaSocialAccount = (item: any) => {
        console.log("SIGN IN VIA SOCIAL ACCOUNT", item);
    }

    const signIn = (pin: string | any[]) => {

        if (isLoading) {
            return;
        }

        if (username===""){
            console.error("USERNAME missing", [username]);
            signInError({
                message: "Please enter your Username",
                shakeEl: "username"
            },  false);
            return;
        }

        if (typeof pin === "object"){
            pin = Dom7('#numpad-mini-input').val();
        }

        if (typeof pin === "undefined"){
            console.error("PIN missing", [pin]);
            signInError({
                message: "Please enter your PIN",
                shakeEl: "pin"
            },  false);
            renderLoginKeyPad();
            return;
        }

        const password = pin.toString();

        if (password.length<4){
            console.error("PIN incomplete", [password]);
            const pinMessage = password.length===0?"Please enter your PIN":"Please complete your PIN";
            signInError({
                message: pinMessage,
                shakeEl: "pin"
            },  false);
            renderLoginKeyPad();
            return;
        }

        setIsLoading(true);

        f7.request.post('https://communicator.hyperefficient2.net/react/login_user', { username: username, pin: password, rememberMe: rememberMe })
            .then(function (res) {
                const result = JSON.parse(res.data);
                console.log('Load was performed', result);

                if (result.status === "ok"){

                    if ("user" in result) {

                        // @ts-ignore
                        if (pinModalMini.current !== null){
                            // @ts-ignore
                            pinModalMini.current.setValue("");
                        }

                        setIsLoading(false);

                        setUserEnteredPIN([]);

                        Dom7(".error-message").hide();

                        f7.sheet.close('#numpad-mini-sheet-modal');

                        console.log("CORRECT PIN", result.user);

                        if (rememberMe[1]){

                            console.log("REMEMBER ME", result.user);

                        }

                        f7.emit(`AUTH_LOGGED_IN_USER`, result.user);

                    } else {

                        signInError(result,  false);

                    }

                }else{

                    signInError(result,  false);

                }

            }).catch(error =>{

            signInError(error,  true);

        });

    };

    const signInError = (err: string|object, serverError: boolean) => {

        let message: string;
        let shakeEl: string = ".username-wrapper, .pin-wrapper";
        let errorMessageLabel: string = ".username-label .error-message, .pin-label .error-message";
        if (typeof err === 'object') {
            if (serverError) {
                // @ts-ignore
                message = err.message
                console.log(err.xhr)
                console.log(err.status)
                console.error(err.message)
            } else {
                // @ts-ignore
                message = err.message;

                if ("shakeEl" in err){
                    const shakeElArray = [];
                    const errorMessageLabelArray = []
                    const shakeElSplit =  err.shakeEl.split("|");
                    for (let i=0; i<shakeElSplit.length; i++){
                        shakeElArray.push(`.${shakeElSplit[i]}-wrapper`);
                        errorMessageLabelArray.push(`.${shakeElSplit[i]}-label .error-message`);
                    }
                    shakeEl = shakeElArray.join(",");
                    errorMessageLabel = errorMessageLabelArray.join(",");
                }

            }
        }else if(typeof err === 'string') {
            message = err;
        }else{
            message = "A network error occured. Please try again later";
        }

        // @ts-ignore
        if (pinModalMini.current !== null){
            // @ts-ignore
            pinModalMini.current.setValue("");
        }

        setIsLoading(false);

        setUserEnteredPIN([]);

        setLoginErrorMessage(message);

        Dom7(shakeEl).addClass("shake");

        Dom7(errorMessageLabel).show();

        setTimeout(function () {
            Dom7(shakeEl).removeClass("shake");
        }, 1000);

        setTimeout(function () {
            Dom7(errorMessageLabel).hide();
        }, 3000);

    }

    const renderLoginKeyPad = () => {
        // Create sheet modal
        if (!sheet.current) {
            // @ts-ignore
            sheet.current = f7.sheet.create({
                backdrop: false,
                swipeToClose: true,
                animate: true,
                content: `
                  <div id="numpad-mini-sheet-modal" class="sheet-modal">
                    <div class="sheet-modal-inner">
                      <div class="page-content">
                        <div id="numpad-mini" />
                      </div>
                    </div>
                  </div>
                `.trim(),
            });
        }

        // @ts-ignore
        sheet.current.open();

        // @ts-ignore
        pinModalMini.current = f7.keypad.create({
            inputEl: '#numpad-mini-input',
            containerEl: '#numpad-mini',
            toolbar: false,
            backdrop: false,
            dotButton: false,
            valueMaxLength: 4,
            openIn: "auto",
            formatValue: function (value) {
                value = value.toString();
                setUserEnteredPIN(value.split(""));
                setPassword(value);
                Dom7('#numpad-mini-input').val(value);
            },
            on: {
                change: function (keypad: any, value: string | any[]) {
                    console.log(keypad, value);
                    value = value.toString();
                    if (value.length === 4) {
                        const pinArray: string[] = value.split("");
                        if (pinArray.length===4) {
                            f7.sheet.close('#numpad-mini-sheet-modal');

                            console.log("CALL : SIGN IN :", [username,  password, pinArray, value ])

                            setTimeout(()=>{
                                signIn(value);
                            },100)
                        }
                    }
                }
            }
        });

        // @ts-ignore
        pinModalMini.current.open();

    };

    f7ready((f7X)=> {

        Dom7(".close-pin-keypad").on("click", function (e){

            f7.sheet.close('#numpad-mini-sheet-modal');

        });

        // @ts-ignore
        f7.on("LOGIN_PIN_ARRAY", function (pinArray: any) {

            setUserEnteredPIN(pinArray);

            console.log("PIN ARRAY", pinArray, pinArray.length);



        });

    })

    return (
        <Page noToolbar noNavbar noSwipeback loginScreen >
            <LoginScreenTitle>
                <img className="login-screen-logo close-pin-keypad" src={loginScreenLogo} />
            </LoginScreenTitle>
            <Block>
                <List noHairlinesMd>

                    <div key={'username-label-key'} className={"label-wrapper username-label"}>
                        USERNAME
                        <br/>
                        <span className={"red-text d-none error-message"}>{loginErrorMessage}</span>
                    </div>
                    <ListInput
                        key={'username-input-key'}
                        className={"username-wrapper username-input close-pin-keypad"}
                        outline
                        type="text"
                        placeholder="Enter your username"
                        clearButton
                        value={username}
                        onInput={(e) => {
                            setUsername(e.target.value);
                        }}
                    >
                    </ListInput>
                    <div key={'pin-label-key'} className={"label-wrapper pin-label m-t-16"}>
                        PIN
                        <br/>
                        <span className={"red-text d-none error-message"}>{loginErrorMessage}</span>
                    </div>
                    <Row key={'pin-wrapper-key'} className={"pin-wrapper"} onClick={() => { renderLoginKeyPad();  }}>
                        <Col key={'pin-wrapper-col-1'}>
                            <div className="display-flex justify-content-center align-items-center pin-input" >
                                {userEnteredPIN.length>0 && (
                                    <p className="pin-bullet">⚫</p>
                                )}
                                {userEnteredPIN.length<1 && (
                                    <p className="pin-bullet">&nbsp;</p>
                                )}
                            </div>
                        </Col>
                        <Col key={'pin-wrapper-col-2'}>
                            <div className="display-flex justify-content-center align-items-center pin-input" >
                                {userEnteredPIN.length>1 && (
                                    <p className="pin-bullet">⚫</p>
                                )}
                                {userEnteredPIN.length<2 && (
                                    <p className="pin-bullet">&nbsp;</p>
                                )}
                            </div>
                        </Col>
                        <Col key={'pin-wrapper-col-3'}>
                            <div className="display-flex justify-content-center align-items-center pin-input" >
                                {userEnteredPIN.length>2 && (
                                    <p className="pin-bullet">⚫</p>
                                )}
                                {userEnteredPIN.length<3 && (
                                    <p className="pin-bullet">&nbsp;</p>
                                )}
                            </div>
                        </Col>
                        <Col key={'pin-wrapper-col-4'}>
                            <div className="display-flex justify-content-center align-items-center pin-input" >
                                {userEnteredPIN.length>3 && (
                                    <p className="pin-bullet">⚫</p>
                                )}
                                {userEnteredPIN.length<4 && (
                                    <p className="pin-bullet">&nbsp;</p>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <div key={'remember-me-checkbox-wrapper-key'} className={"label-wrapper"}>
                            <Checkbox
                                name="checkbox-1"
                                value={rememberMe[0]}
                                checked={rememberMe[1]}
                                onChange={(e) => onRememberMe(e)}
                            /> Remember me
                    </div>
                </List>
            </Block>

            <Block strong>
                <Button large fill preloader color="red" loading={isLoading} onClick={signIn} className={"login-button"}>
                    LOGIN
                </Button>
            </Block>
            <List className={"d-none"}>
                <ListButton key={'reset-pin-button-key'} onClick={resetPIN}>Reset PIN</ListButton>
                <ListButton key={'sign-up-button-key'} onClick={signUp}>Not account? Create one now</ListButton>
                <ListButton key={'sign-in-button-key'} onClick={signInSocial}>Sign In via Social Account</ListButton>
            </List>
            <BlockFooter key={'copyright-text-key'} className={"m-t-24"} >
                &copy; 2022. JobTrac. All Rights Reserved.
            </BlockFooter>
            <div className="sheet-modal sheet-swipe-to-close-sign-in-with-social" style={{height:"auto"}}>
                <div className="sheet-modal-inner">
                    <div className="page-content">
                        <div className="block-title block-title-medium">Social Account Sign In</div>
                        <div className="block">
                            <p>
                                <b>Save time by signing in with a social account.</b>
                            </p>
                        </div>
                            <div className="list media-list">
                                <ul>
                                    {socialAccountsArray.map((item: any, index: number) => (
                                        <li key={`social-media-account-key-${index}`}>
                                            <a href="#" className="item-link item-content"
                                               onClick={(e) => signInViaSocialAccount(item)} >
                                            <div className="item-media">
                                                <span>
                                                    <i className="f7-icons" style={{color: `${item.color} !important`, opacity: 1}}>{item.icon}</i>
                                                </span>
                                            </div>
                                            <div className="item-inner">
                                                <div className="item-title-row no-chevron">
                                                    <div className="item-title">
                                                        Sign in with <span>{item.title}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="numpad-mini-input" />
        </Page>
    );
}

export default LoginPage;