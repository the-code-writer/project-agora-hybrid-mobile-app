
import {K, Snippets} from "../app/helpers";
import * as ModuleBaseClasses from "../app/module-base-classes";

import { VoiceCall } from "./apps/voice/VoiceCall";
import { VideoCall } from "./apps/video/VideoCall";
import { InstantMessaging } from "./apps/instant-messaging/InstantMessaging";
import { LiveStreaming } from "./apps/live-streaming/LiveStreaming";
import { WhiteBoard } from "./apps/white-board/WhiteBoard";

import { InstantMessagingConfig } from "./apps/instant-messaging/InstantMessagingConfig";
import { LiveStreamingConfig } from "./apps/live-streaming/LiveStreamingConfig";
import { VideoCallConfig } from "./apps/video/VideoCallConfig";
import { VoiceCallConfig } from "./apps/voice/VoiceCallConfig";
import { WhiteBoardConfig } from "./apps/white-board/WhiteBoardConfig";

import RtcEngine from 'react-native-agora';

interface AgoraInterface {
  videoCall: VideoCallConfig,
  voiceCall: VoiceCallConfig,
  instantMessaging:InstantMessagingConfig,
  liveStreaming:LiveStreamingConfig,
  whiteBoard: WhiteBoardConfig
}

class AgoraConfig implements AgoraInterface{
  videoCall: VideoCallConfig;
  voiceCall: VoiceCallConfig;
  instantMessaging:InstantMessagingConfig;
  liveStreaming:LiveStreamingConfig;
  whiteBoard: WhiteBoardConfig;
  static events: any;

  constructor(
    videoCall: VideoCallConfig,
    voiceCall: VoiceCallConfig,
    instantMessaging:InstantMessagingConfig,
    liveStreaming:LiveStreamingConfig,
    whiteBoard: WhiteBoardConfig
  ) {
    this.videoCall = videoCall;
    this.voiceCall = voiceCall;
    this.instantMessaging = instantMessaging;
    this.liveStreaming = liveStreaming;    
    this.whiteBoard = whiteBoard;
  }

}

const AgoraLibrary = ModuleBaseClasses.Class.extend({

  config: null,

	init: function(
    events: any, 
    videoCall: VideoCallConfig | AgoraConfig,
    voiceCall: VoiceCallConfig,
    instantMessaging:InstantMessagingConfig,
    liveStreaming:LiveStreamingConfig,
    whiteBoard: WhiteBoardConfig 
  ) {

		let self = this;

    let options: AgoraConfig;

    if (videoCall instanceof AgoraConfig) {
      options = videoCall;
    } else {
      options = new AgoraConfig(voiceCall, videoCall, instantMessaging, liveStreaming, whiteBoard);
    }

		this.events = events;

		this.modules.params = self;

		this.modules.initModules(this, options);

	},
	modules: (function() {
		let parent = {

			isLoaded: false,

			params: AgoraConfig,

			RTC_ENGINE: RtcEngine,
			APP_ID: null,
			PRIMARY_CERTIFICATE: null,
			CHANNELS: null,
			DEFAULT_CHANNELS: null,
			TOKENS: null,
			DEFAULT_TOKENS: null,

			initModules: (app, options) => {

				parent.RTC_ENGINE = RtcEngine;

				parent.APP_ID = options.appId;
				parent.PRIMARY_CERTIFICATE = options.primaryCertificate;
				parent.CHANNELS = options.agora.channels;
				parent.DEFAULT_CHANNELS = options.channels.default;
				parent.TOKENS = options.tokens;
				parent.DEFAULT_TOKENS = options.tokens.default;

				parent.RTC_ENGINE.create(options.appId);

				parent.voiceCall.init(app, options.voiceCall);

				parent.videoCall.init(app, options.videoCall);

				parent.instantMessaging.init(app, options.instantMessaging);

				parent.liveStreaming.init(app, options.liveStreaming);

				parent.whiteBoard.init(app, options.whiteBoard);

        parent.params.events[K
          .Events.Modules
          .Agora.AgoraLibEvent.MODULE_LOADED
        ]({
          agoraApp: app,
          agoraModule: parent
        });
					
			},

			generateToken: ()=>{

			},

			voiceCall: {

				isReady: false,

        lib: VoiceCall,

				params: {
					foo: "MODULE_BAR",
				},

				init: (app, options) => { 
					
					Object.keys(options).map(( key, index ) => {
						parent.voiceCall.params[key] = options[key];
					});

					parent.params.events[K
						.Events.Modules
						.Agora.VoiceCall.ON_APP_INIT
					]([
						app,
						parent
						.voiceCall
						.params
					]);

          parent.voiceCall.start();
          
				},

				start: async () => {
					
          parent.voiceCall.lib = VoiceCall;
          parent.voiceCall.isReady = true;
          
          return parent.voiceCall;

				},
			},
			
			videoCall: {

				isReady: false,

        lib: VideoCall,

				params: {
					foo: "MODULE_BAR",
				},

				init: (app, options) => { 
					
					Object.keys(options).map(( key, index ) => {
						parent.videoCall.params[key] = options[key];
					});

					parent.params.events[K
						.Events.Modules
						.Agora.VideoCall.ON_APP_INIT
					]([
						app,
						parent
						.videoCall
						.params
					]);

          parent.videoCall.start();
          
				},

				start: async () => {
					
          parent.videoCall.lib = VideoCall;
          parent.videoCall.isReady = true;
          
          return parent.instantMessaging;

				},
			},
			
			instantMessaging: {

				isReady: false,

        lib: InstantMessaging,

				params: {
					foo: "MODULE_BAR",
				},

				init: (app, options) => { 
					
					Object.keys(options).map(( key, index ) => {
						parent.instantMessaging.params[key] = options[key];
					});

					parent.params.events[K
						.Events.Modules
						.Agora.InstantMessaging.ON_APP_INIT
					]([
						app,
						parent
						.instantMessaging
						.params
					]);

          parent.instantMessaging.start();
          
				},

				start: async () => {
					
          parent.instantMessaging.lib = InstantMessaging;
          parent.instantMessaging.isReady = true;
          
          return parent.instantMessaging;

				},
			},
			
			liveStreaming: {

				isReady: false,

        lib: LiveStreaming,

				params: {
					foo: "MODULE_BAR",
				},

				init: (app, options) => { 
					
					Object.keys(options).map(( key, index ) => {
						parent.liveStreaming.params[key] = options[key];
					});

					parent.params.events[K
						.Events.Modules
						.Agora.LiveStreaming.ON_APP_INIT
					]([
						app,
						parent
						.liveStreaming
						.params
					]);

          parent.liveStreaming.start();
          
				},

				start: async () => {
					
          parent.liveStreaming.lib = LiveStreaming;
          parent.liveStreaming.isReady = true;
          
          return parent.liveStreaming;

				},
			},
			
			whiteBoard: {
				
				isReady: false,

        lib: WhiteBoard,

				params: {
					foo: "MODULE_BAR",
				},

				init: (app, options) => { 
					
					Object.keys(options).map(( key, index ) => {
						parent.whiteBoard.params[key] = options[key];
					});

					parent.params.events[K
						.Events.Modules
						.Agora.WhiteBoard.ON_APP_INIT
					]([
						app,
						parent
						.whiteBoard
						.params
					]);

          parent.whiteBoard.start();
          
				},

				start: async () => {
					
          parent.whiteBoard.lib = WhiteBoard;
          parent.whiteBoard.isReady = true;
          
          return parent.whiteBoard;

				},
        
			},
			
		};
		return parent;
	})(),
});

// Agora Module Here

ModuleBaseClasses.DovellousEventDispatcher(K.Events.Modules.Agora);

/**
 *
 * @type {ModuleBaseClasses.DovellousLibraryEvent}
 */
const agoraLibEvent = new ModuleBaseClasses.DovellousLibraryEvent(K.Events.Modules.Agora.AgoraLibEvent.NAME);

const Agora = (options) => {
	/**
	 * @type {ModuleBaseClasses.DovellousLibrary}
	 */
	return new AgoraLibrary(agoraLibEvent, options);

};

export {Agora, AgoraConfig};