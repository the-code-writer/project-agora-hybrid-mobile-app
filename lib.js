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

			initModules: (app, options) => {

				console.warn("::INIT MODULES::", app, options);

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
function AgoraEvent(name) {
	this.name = name;
}

/**
 * Event dispatcher template:
 * param object data
 * return null
 */
AgoraEvent.prototype.dispatch = function(name, data) {
	// Dispatch the event
	window.dispatchEvent(new CustomEvent(name, {
		detail: data
	}));
};

// Child constructor
function AgoraLibEvent(name) {
	// Call parent constructor with proper arguments
	AgoraEvent.call(this, name);
}

// Inheritance
AgoraLibEvent.prototype = Object.create(AgoraEvent.prototype);
AgoraLibEvent.prototype.constructor = AgoraLibEvent;

const AgoraEventItems = K.Events.Modules.Agora;

Object.keys(AgoraEventItems).map((objKey, objIndex) => {

	Object.keys(AgoraEventItems[objKey]).map((key, index) => {
		/**
		 *
		 * @returns {*}
		 * @constructor
		 */
		AgoraLibEvent.prototype[AgoraEventItems[objKey][key]] = (
			data) => {
			// Call parent method
			return AgoraEvent.prototype.dispatch.call(this,
				AgoraEventItems[objKey][key], data);
		};

	});

});

/**
 *
 * @type {AgoraLibEvent}
 */
const agoraLibEvent = new AgoraLibEvent("agoraLibEvent");

const Agora = (options) => {
	/**
	 * @type {AgoraLibrary}
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