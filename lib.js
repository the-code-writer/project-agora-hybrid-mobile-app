import RtcEngine from 'react-native-agora';


const AgoraLibrary = Class.extend({
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

			APP_ID: null,
			PRIMARY_CERTIFICATE: null,
			CHANNELS: null,
			DEFAULT_CHANNELS: null,
			TOKENS: null,
			DEFAULT_TOKENS: null,

			initModules: (app, options) => {

				console.warn("::INIT MODULES::", app, options);

				parent.APP_ID = options.agora.appId;
				parent.PRIMARY_CERTIFICATE = options.agora.primaryCertificate;
				parent.CHANNELS = options.agora.channels;
				parent.DEFAULT_CHANNELS = options.agora.channels.default;
				parent.TOKENS = options.agora.tokens;
				parent.DEFAULT_TOKENS = options.agora.tokens.default;

				RtcEngine.create(parent.APP_ID);

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
				},

				start: async function(destinationNumber, groupCall) {
					const calleeNumber = formatPhoneNumber(destinationNumber,false);
					return {
						source: {
							number: "+263772128622",
							title: "Douglas Maposa",
							subtitle: "Graphic Designer",
						},
						destination: {
							number: "+263773206067",
							title: "Rudo M. Mararira",
							subtitle: "Secretary",
						},
						details: {
							carrier: "NetCall Pvt Ltd.",
							module: "voiceCall",
						},
					};
				},
			},
			
			videoCall: {
				isReady: false,

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
				},

				start: async function(destinationNumber, groupCall) {
					const calleeNumber = formatPhoneNumber(destinationNumber,false);
					return {
						source: {
							number: "+263772128622",
							title: "Douglas Maposa",
							subtitle: "Graphic Designer",
						},
						destination: {
							number: "+263773206067",
							title: "Rudo M. Mararira",
							subtitle: "Secretary",
						},
						details: {
							carrier: "NetCall Pvt Ltd.",
							module: "videoCall",
						},
					};
				},
			},
			
			instantMessaging: {
				isReady: false,

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
				},

				start: async function(destinationNumber, groupCall) {
					const calleeNumber = formatPhoneNumber(destinationNumber,false);
					return {
						source: {
							number: "+263772128622",
							title: "Douglas Maposa",
							subtitle: "Graphic Designer",
						},
						destination: {
							number: "+263773206067",
							title: "Rudo M. Mararira",
							subtitle: "Secretary",
						},
						details: {
							carrier: "NetCall Pvt Ltd.",
							module: "instantMessenger",
						},
					};
				},
			},
			
			liveStreaming: {
				isReady: false,

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
				},

				start: async function(destinationNumber, groupCall) {
					const calleeNumber = formatPhoneNumber(destinationNumber,false);
					return {
						source: {
							number: "+263772128622",
							title: "Douglas Maposa",
							subtitle: "Graphic Designer",
						},
						destination: {
							number: "+263773206067",
							title: "Rudo M. Mararira",
							subtitle: "Secretary",
						},
						details: {
							carrier: "NetCall Pvt Ltd.",
							module: "liveStreaming",
						},
					};
				},
			},
			
			whiteBoard: {
				isReady: false,

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
				},

				start: async function(destinationNumber, groupCall) {
					const calleeNumber = formatPhoneNumber(destinationNumber,false);
					return {
						source: {
							number: "+263772128622",
							title: "Douglas Maposa",
							subtitle: "Graphic Designer",
						},
						destination: {
							number: "+263773206067",
							title: "Rudo M. Mararira",
							subtitle: "Secretary",
						},
						details: {
							module: "whiteBoard",
							carrier: "NetCall Pvt Ltd.",
						},
					};
				},
			},
			
		};
		return parent;
	})(),
});

// Parent constructor
function DovellousEvent(name) {
	this.name = name;
}

/**
 * Event dispatcher template:
 * param object data
 * return null
 */
DovellousEvent.prototype.dispatch = function(name, data) {
	// Dispatch the event
	window.dispatchEvent(new CustomEvent(name, {
		detail: data
	}));
};

// Child constructor
function DovellousLibraryEvent(name) {
	// Call parent constructor with proper arguments
	DovellousEvent.call(this, name);
}

// Inheritance
DovellousLibraryEvent.prototype = Object.create(DovellousEvent.prototype);
DovellousLibraryEvent.prototype.constructor = DovellousLibraryEvent;

const DovellousEventItems = K.Events.Modules.Agora;

Object.keys(DovellousEventItems).map((objKey, objIndex) => {

	Object.keys(DovellousEventItems[objKey]).map((key, index) => {
		/**
		 *
		 * @returns {*}
		 * @constructor
		 */
		DovellousLibraryEvent.prototype[DovellousEventItems[objKey][key]] = (data, f7) => {

			if(f7){

				f7.emit(DovellousEventItems[objKey][key], data);

			}
			
			// Call parent method
			return DovellousEvent.prototype.dispatch.call(this, DovellousEventItems[objKey][key], data);
		};

	});

});

/**
 *
 * @type {DovellousLibraryEvent}
 */
const agoraLibEvent = new DovellousLibraryEvent("agoraLibEvent");

const Agora = (options) => {
	/**
	 * @type {DovellousLibrary}
	 */
	return new AgoraLibrary(agoraLibEvent, options);
};

//export Agora;

/*

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

 */