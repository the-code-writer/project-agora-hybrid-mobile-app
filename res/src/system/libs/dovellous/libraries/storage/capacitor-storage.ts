import {Storage} from '@capacitor/storage';

const CapacitorStorage = {

    setKey: async (key, value, callbackSuccess, callbackError) => {

        Storage.set({
            key: key,
            value: value,
        }).then(success => {

            //console.log("SAVED",key);

            if (typeof callbackSuccess === "function") {

                Storage.get({key: key})
                    .then(savedValue => {
                        callbackSuccess(savedValue.value);
                    })
                    .catch(error => {

                        if (typeof callbackError === "function") {

                            console.warn('Item with specified key does not exist.', 3, key, error);

                            callbackError(error);

                        }

                    });

            }

        }).catch(error => {

            if (typeof callbackError === "function") {

                console.warn('Item with specified key does not exist.', 2, key, error);

                callbackError(error);

            }

        });

    },

    getKey: async (key, callbackSuccess, callbackError) => {

        Storage.get({key: key})
            .then(savedValue => {

                if (typeof callbackSuccess === "function") {

                    callbackSuccess(savedValue.value);

                }

            })
            .catch(error => {

                if (typeof callbackError === "function") {

                    console.warn('Item with specified key does not exist.', 1, key, error);

                    callbackError(error);

                }

            });

    }

}

export default CapacitorStorage;