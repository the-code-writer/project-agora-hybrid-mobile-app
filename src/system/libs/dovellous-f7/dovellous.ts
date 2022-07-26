// Import Framework7
// @ts-ignore
import Framework7 from 'framework7/lite-bundle';

import {CapacitorStorage} from './src/libraries/storage/capacitor-js-storage/CapacitorStorage';
import {JSONDatabaseService} from './src/libraries/storage/json-db-service/JSONDatabaseService';
import {Config as JSONDatabaseServiceConfig} from './src/libraries/storage/json-db-service/lib/JSONDatabaseServiceConfig';

import { VoiceCallConfig } from './src/libraries/agora/apps/voice/VoiceCallConfig';
import { InstantMessagingConfig } from './src/libraries/agora/apps/instant-messaging/InstantMessagingConfig';
import { VideoCallConfig } from './src/libraries/agora/apps/video/VideoCallConfig';
import { LiveStreamingConfig } from './src/libraries/agora/apps/live-streaming/LiveStreamingConfig';
import { WhiteBoardConfig } from './src/libraries/agora/apps/white-board/WhiteBoardConfig';
import Agora from './src/libraries/agora/Agora';

import SqliteService from './src/libraries/databases/sqlite-service';
import Blockchain from './src/libraries/cryptography/blockchain';
import Encryption from './src/libraries/cryptography/encryption';
import DeviceData from './src/libraries/device/device-data';
import MimeTypes from './src/libraries/media/mime-types';
import Base64 from './src/libraries/encodings/base64';
import AppThemes from './src/libraries/app/themes';
import AppImages from './src/libraries/app/images';
import K from './src/libraries/app/konstants';
import Snippets from './src/libraries/app/snippets';
import {GoogleFirebase} from './src/libraries/firebase/GoogleFirebase';
import {Vaida} from './src/libraries/vaida/Vaida';

import WalframAlpha from './src/libraries/wolfram-alpha';
import FileSystem from './src/libraries/filesystem';
import NetworkRequest from './src/libraries/services/requests';

interface DF7Modules {
    modules: any;
  }
  
class DF7Config implements DF7Modules {
    modules: any;
    constructor(
        _modules = {
            agora: {
                voiceCall: <VoiceCallConfig> {},
                videoCall: <VideoCallConfig> {},
                instantMessaging: <InstantMessagingConfig> {},
                liveStreaming: <LiveStreamingConfig> {},
                whiteBoard: <WhiteBoardConfig> {},
            }, 
        }) {
      this.modules = _modules;
    }
}

class Dovellous{

  Libraries = {

    Agora: null

  }

  constructor(paramsAgora){

    const self = this;

    window.addEventListener(K.Events.Modules.Agora.ON_APP_INIT, function (eventParams){

      self.Libraries.Agora = eventParams.detail[0];
    
      const eventData = eventParams.detail[1];
    
    });

    this.init(paramsAgora);

  }

  init (paramsAgora) {

    Agora(paramsAgora);

  }

}

export default {Dovellous, K, Snippets};