// Import Framework7
// @ts-ignore
import Framework7 from 'framework7/lite-bundle';

import CapacitorStorage from './src/libraries/storage/capacitor-storage';
import JSONService from './src/libraries/storage/json-service';
import SqliteService from './src/libraries/databases/sqlite-service';
import Blockchain from './src/libraries/cryptography/blockchain';
import Encryption from './src/libraries/cryptography/encryption';
import DeviceData from './src/libraries/device/device-data';
import Snippets from './src/libraries/snippets/snippets';
import MimeTypes from './src/libraries/media/mime-types';
import Base64 from './src/libraries/encodings/base64';
import AppThemes from './src/libraries/app/themes';
import AppImages from './src/libraries/app/images';
import Konstants from './src/libraries/app/konstants';
import GoogleFirebase from './src/libraries/google/firebase';
import Vaida from './src/libraries/messaging/vaida';
import WalframAlpha from './src/libraries/wolfram-alpha';
import FileSystem from './src/libraries/filesystem';
import NetworkRequest from './src/libraries/services/requests';

let authEvents: any, 
    notificationEvents: any, 
    imessengerEvents: any, 
    socketEvents: any, 
    blockchainEvents = new Framework7.Events();


const F7Mobile = {

    events: {
        auth: authEvents,
        notification: notificationEvents,
        imessenger: imessengerEvents,
        socket: socketEvents,
        blockchain: blockchainEvents,
    },

    vaida: Vaida,

    K: Konstants,

    appImages: AppImages,

    appThemes: AppThemes,

    base64: Base64,

    blockchain: Blockchain,

    firebase: GoogleFirebase,

    encryption: Encryption,

    data: {
        storage: {
            cp: CapacitorStorage,
            storeJS: {}
        },
        databases: {
            sqliteService: SqliteService,            
        },
        json: JSONService,
        getJSON: (filename: any) => {
            const db = JSONService;
            db.init(filename);
            return db.resource;
        }
    },

    device: DeviceData,

    mimeTypes: MimeTypes,

    snippets: Snippets,

    walframAlpha: WalframAlpha,
    
    fileSystem: FileSystem,

    request: NetworkRequest,

};

const LanguageResource = F7Mobile.data.getJSON("languages");

const Languages = {
    text: (path: any): void=>{
        LanguageResource.getData(path);
    }
};

export {F7Mobile, LanguageResource, Languages};
