const K = {
    Modules: {
        AGORA: "agora",
        VAIDA: "vaida",
        FIREBASE: "firebase",
        JSON_DATABASE_SERVICE: "jsonDatabaseService"
    },
    Oauth: {
        BEARER_TOKEN: "Bearer Token",
        BASIC: "Basic",
        DIGEST: "Digest",
        OAUTH1: "Oauth v1",
        OAUTH2: "Oauth v2",
        API_KEY: "Api Key",
        NONE: "none"
    },
    RequestMethods: {
        GET: 'get',
        POST: 'post',
        PUT: 'put',
        DELETE: 'delete'
    },
    Inputs: {
        TEXT: 'text',
        PASSWORD: 'password',
        EMAIL: 'email',
        NUMBER: 'number',
        URL: 'url',
        DATE: 'date',
        TIME: 'time',
        TEXTAREA: 'textarea',
        RADIO: 'radio',
        CHECKBOX: 'checkbox',
        TOGGLE: 'toggle',
        SLIDER: 'slider'
    },
    Events: {
        Auth: {

            LOGIN_SUCCESS: 'auth_login_success',
            LOGIN_ERROR: 'auth_login_error',

        },
        Notification: {

            DEVICE_READY: 'event-app-device-ready',

        },
        Imessenger: {

            DEVICE_READY: 'event-app-device-ready',

        },
        Socket: {

            DEVICE_READY: 'event-app-device-ready',

        },
        Blockchain: {

            DEVICE_READY: 'event-app-device-ready',

        },
        Device: {

            DEVICE_READY: 'event-app-device-ready',

        },
    },
    Dots: {
        white: "Konstants",
        black: "⚫"
    }
};

export default K;
