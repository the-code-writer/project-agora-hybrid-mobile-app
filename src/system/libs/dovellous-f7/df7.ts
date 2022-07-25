// Import Framework7
// @ts-ignore
import Framework7 from 'framework7/lite-bundle';

import {CapacitorStorage} from './src/libraries/storage/capacitor-js-storage/CapacitorStorage';
import {JSONDatabaseService} from './src/libraries/storage/json-db-service/JSONDatabaseService';
import {Config as JSONDatabaseServiceConfig} from './src/libraries/storage/json-db-service/lib/JSONDatabaseServiceConfig';

import { Config as AgoraConfig } from './src/libraries/agora/lib/AgoraConfig';
import { VoiceCallConfig } from './src/libraries/agora/apps/voice/VoiceCallConfig';
import { InstantMessagingConfig } from './src/libraries/agora/apps/instant-messaging/InstantMessagingConfig';
import { VideoCallConfig } from './src/libraries/agora/apps/video/VideoCallConfig';
import { LiveStreamingConfig } from './src/libraries/agora/apps/live-streaming/LiveStreamingConfig';
import { WhiteBoardConfig } from './src/libraries/agora/apps/white-board/WhiteBoardConfig';

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
import {Agora} from './src/libraries/agora/Agora';
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

export class DF7 {

    public config: DF7Config;

    public K: any = K;

    public agora: Agora;

    public appImages: any = AppImages;

    public appThemes: any = AppThemes;

    public base64: any = Base64;

    public blockchain: any = Blockchain;

    public capacitorStorage: CapacitorStorage;

    public device: any =  DeviceData;

    public fileSystem: FileSystem;

    public firebase: GoogleFirebase;

    public vaida: Vaida;

    public encryption: any = Encryption;

    public jsonDatabaseService: any;

    public mimeTypes: any = MimeTypes;

    public request: any = NetworkRequest;
  
    public snippets: any = Snippets;

    public sqliteService: any = SqliteService;

    public walframAlpha: any = WalframAlpha;
    
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
  
    private loadModules(){

        //Initialise AgoraLibrary

        if(
          this.config.modules.hasOwnProperty(K.Modules.AGORA) 
          ){
          this.agora = new Agora(
              this.config.modules.agora.voiceCall || <VoiceCallConfig> {},
              this.config.modules.agora.videoCall || <VideoCallConfig> {},
              this.config.modules.agora.instantMessaging || <InstantMessagingConfig> {},
              this.config.modules.agora.voiceCall || <LiveStreamingConfig> {},
              this.config.modules.agora.voiceCall || <WhiteBoardConfig> {},
          );
      }
      
      //Initialise JsonDatabaseService

      if(
        this.config.modules.hasOwnProperty(K.Modules.JSON_DATABASE_SERVICE) 
      ){
        
        this.jsonDatabaseService = JSONDatabaseService.prototype;

      }
    
    }

  }
