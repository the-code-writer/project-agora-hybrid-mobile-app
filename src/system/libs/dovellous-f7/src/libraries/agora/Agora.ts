import { VoiceCall } from "./apps/voice/VoiceCall";
import { VideoCall } from "./apps/video/VideoCall";
import { InstantMessaging } from "./apps/instant-messaging/InstantMessaging";
import { LiveStreaming } from "./apps/live-streaming/LiveStreaming";
import { WhiteBoard } from "./apps/white-board/WhiteBoard";

import {K, Snippets} from "../app/helpers";

import * as ModuleBaseClasses from "../app/module-base-classes";

//import RtcEngine from 'react-native-agora';

interface RtcEngine {
	create: null
}

var RtcEngine = {
	create: (appID) => {
		//console.warn(":: CREATE RTC ENGINE");
	}
}

const AgoraLibrary = ModuleBaseClasses.Class.extend({
	init: function(events, options) {

		let self = this;

		this.events = events;

		this.modules.params = self;

		this.modules.initModules(this, options);

	},
	modules: (function() {
		let parent = {

			isLoaded: false,

			params: null,

			RTC_ENGINE: RtcEngine,

			APP_ID: null,
			PRIMARY_CERTIFICATE: null,
			CHANNELS: null,
			DEFAULT_CHANNELS: null,
			TOKENS: null,
			DEFAULT_TOKENS: null,

			initModules: (app, options) => {

				parent.RTC_ENGINE = RtcEngine;

				parent.APP_ID = options.agora.appId;
				parent.PRIMARY_CERTIFICATE = options.agora.primaryCertificate;
				parent.CHANNELS = options.agora.channels;
				parent.DEFAULT_CHANNELS = options.agora.channels.default;
				parent.TOKENS = options.agora.tokens;
				parent.DEFAULT_TOKENS = options.agora.tokens.default;

				parent.RTC_ENGINE.create(parent.APP_ID);

				parent.voiceCall.init(
					app, options.agora.voiceCallConfig ||
					null);

				parent.videoCall.init(
					app, options.agora.videoCallConfig ||
					null);

				parent.instantMessaging.init(
					app, options.agora.instantMessagingConfig ||
					null);

				parent.liveStreaming.init(
					app, options.agora.liveStreamingConfig ||
					null);

				parent.whiteBoard.init(
					app, options.agora.whiteBoardConfig ||
					null);
					
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

export default Agora;