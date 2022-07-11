// Import Framework7
// @ts-ignore
import Framework7 from 'framework7/lite-bundle';

import CapacitorStorage from './libraries/storage/capacitor-storage';
import SqliteService from './libraries/databases/sqlite-service';
import Blockchain from './libraries/cryptography/blockchain';
import Encryption from './libraries/cryptography/encryption';
import DeviceData from './libraries/device/device-data';
import Snippets from './libraries/snippets/snippets';
import MimeTypes from './libraries/media/mime-types';
import Base64 from './libraries/encodings/base64';
import AppThemes from './libraries/app/themes';
import AppImages from './libraries/app/images';
import Konstants from './libraries/app/konstants';
import GoogleFirebase from './libraries/google/firebase';
import Vaida from './libraries/messaging/vaida';
import WalframAlpha from './libraries/wolfram-alpha';
import FileSystem from './libraries/filesystem';
import NetworkRequest from './libraries/services/requests';

let authEvents: any, 
    notificationEvents: any, 
    imessengerEvents: any, 
    socketEvents: any, 
    blockchainEvents = new Framework7.Events();

const Framework7DovellousLibrary = {

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
            storeJS: {},
        },
        databases: {
            sqliteService: SqliteService,
        }
    },

    device: DeviceData,

    mimeTypes: MimeTypes,

    snippets: Snippets,

    walframAlpha: WalframAlpha,
    
    fileSystem: FileSystem,

    request: NetworkRequest,

};

export default Framework7DovellousLibrary;
