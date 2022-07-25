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
import Snippets from './src/libraries/snippets/snippets';
import MimeTypes from './src/libraries/media/mime-types';
import Base64 from './src/libraries/encodings/base64';
import AppThemes from './src/libraries/app/themes';
import AppImages from './src/libraries/app/images';
import K from './src/libraries/app/konstants';
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

  constructor(){

    const self = this;

    window.addEventListener(K.Events.Modules.Agora.ON_APP_INIT, function (eventParams){

      self.Libraries.Agora = eventParams.detail[0];
    
      const eventData = eventParams.detail[1];
    
    });

    this.init();

  }

  init () {

    Agora(params);

  }

}

export class DF7X {

    config: DF7Config;

    K: any = K;

    agora: any = {};

    appImages: any;

    appThemes: any;

    base64: any;

    blockchain: any;

    capacitorStorage: any;

    device: any;

    fileSystem: any;

    firebase: any;

    vaida: any;

    encryption: any;

    jsonDatabaseService: any;

    mimeTypes: any;

    request: any;
  
    snippets: any;

    sqliteService: any;

    walframAlpha: any;
    
    /**
     * CapacitorStorage Constructor
     * @param modules the JSON file will be readable easily by a human
     */
  
    constructor(modules: any) {
      if (modules instanceof DF7Config) {
        this.config = modules;
      } else {
        this.config = new DF7Config(modules);
      }
      this.loadModules();
    }
  
    loadModules(){

        //Initialise AgoraLibrary

        if(
          this.config.modules.hasOwnProperty(K.Modules.AGORA) 
          ){

            if(this.config.modules.agora.voiceCall){

              this.agora.voiceCall = Agora.Module("VoiceCall");

            }
              this.config.modules.agora.voiceCall || <VoiceCallConfig> {},
              this.config.modules.agora.videoCall || <VideoCallConfig> {},
              this.config.modules.agora.instantMessaging || <InstantMessagingConfig> {},
              this.config.modules.agora.voiceCall || <LiveStreamingConfig> {},
              this.config.modules.agora.voiceCall || <WhiteBoardConfig> {}

          };
      }
      
    }
 
window.addEventListener("OnAppInit", function (eventParams){

  const agora = eventParams.detail[0];

  const eventData = eventParams.detail[1];

  agora.modules.voiceCall.helloWorld().then(function (res) {

    console.log(":: RES ::", res);

    console.warn(":: EVENT DATA ::", eventData);

    console.log(":: AGORA ::", agora);

    console.warn(":: EVENT DETAIL ::", eventParams.detail);

  });

});

  const params = {
    a: "A",
    b: [1, 2, 3, 4, 5]
  };

Agora(params);