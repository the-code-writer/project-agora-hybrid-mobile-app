const K = {
	Modules: {
		AGORA: "agora",
		VAIDA: "vaida",
		FIREBASE: "firebase",
		JSON_DATABASE_SERVICE: "jsonDatabaseService",
	},
	Oauth: {
		BEARER_TOKEN: "Bearer Token",
		BASIC: "Basic",
		DIGEST: "Digest",
		OAUTH1: "Oauth v1",
		OAUTH2: "Oauth v2",
		API_KEY: "Api Key",
		NONE: "none",
	},
	RequestMethods: {
		GET: "get",
		POST: "post",
		PUT: "put",
		DELETE: "delete",
	},
	Inputs: {
		TEXT: "text",
		PASSWORD: "password",
		EMAIL: "email",
		NUMBER: "number",
		URL: "url",
		DATE: "date",
		TIME: "time",
		TEXTAREA: "textarea",
		RADIO: "radio",
		CHECKBOX: "checkbox",
		TOGGLE: "toggle",
		SLIDER: "slider",
	},
	Events: {
		Auth: {
			LOGIN_SUCCESS: "auth_login_success",
			LOGIN_ERROR: "auth_login_error",
		},
		Notification: {
			DEVICE_READY: "event-app-device-ready",
		},
		Imessenger: {
			DEVICE_READY: "event-app-device-ready",
		},
		Socket: {
			DEVICE_READY: "event-app-device-ready",
		},
		Blockchain: {
			DEVICE_READY: "event-app-device-ready",
		},
		Device: {
			DEVICE_READY: "event-app-device-ready",
			DEVICE_THEME_CHANGED: "event-app-device-ready",
		},
		Modules: {
			Agora: {
				AgoraLibEvent: {
					NAME: "agoraLibEvent",
				},
				VoiceCall: {
					ON_APP_INIT: "ModulesAgoraVoiceCallOnAppInit",
					ON_INCOMING_CALL: "ModulesAgoraVoiceCallOnIncomingCall",
					ON_OUTGOING_CALL: "ModulesAgoraVoiceCallOnOutgoingCall",
					ON_CALL_ANSWERED: "ModulesAgoraVoiceCallOnAnswered",
					ON_CALL_REJECTED: "ModulesAgoraVoiceCallOnCallReject",
					ON_CALL_STARTED: "ModulesAgoraVoiceCallOnCallStarted",
					ON_CALL_ENDED: "ModulesAgoraVoiceCallOnCallEnded",
					ON_CALL_HOLD: "ModulesAgoraVoiceCallOnCallHold",
					ON_CALL_UNHOLD: "ModulesAgoraVoiceCallOnCallUnHold",
					ON_CALL_ABORT: "ModulesAgoraVoiceCallOnCallAbort",
					ON_CALL_ON_MUTE: "ModulesAgoraVoiceCallOnCallMute",
					ON_CALL_ON_UNMUTE: "ModulesAgoraVoiceCallOnCallUnmute",
					ON_INCOMING_GROUP_CALL: "ModulesAgoraVoiceCallOnIncomingGroupCall",
					ON_OUTGOING_GROUP_CALL: "ModulesAgoraVoiceCallOnOutgoingGroupCall",
					ON_GROUP_CALL_ANSWERED: "ModulesAgoraVoiceCallOnGroupCallAnswered",
					ON_GROUP_CALL_REJECTED: "ModulesAgoraVoiceCallOnGroupCallReject",
					ON_GROUP_CALL_STARTED: "ModulesAgoraVoiceCallOnGroupCallStarted",
					ON_GROUP_CALL_ENDED: "ModulesAgoraVoiceCallOnGroupCallEnded",
					ON_GROUP_CALL_HOLD: "ModulesAgoraVoiceCallOnGroupCallHold",
					ON_GROUP_CALL_UNHOLD: "ModulesAgoraVoiceCallOnGroupCallUnHold",
					ON_GROUP_CALL_ABORT: "ModulesAgoraVoiceCallOnGroupCallAbort",
					ON_GROUP_CALL_MUTE: "ModulesAgoraVoiceCallOnGroupCallMute",
					ON_GROUP_CALL_UNMUTE: "ModulesAgoraVoiceCallOnGroupCallUnmute",
					ON_GROUP_CALL_PARTICIPANT_JOIN: "ModulesAgoraVoiceCallOnGroupCallParticipantJoin",
					ON_GROUP_CALL_PARTICIPANT_LEAVE: "ModulesAgoraVoiceCallOnGroupCallParticipantLeave",
					ON_GROUP_CALL_PARTICIPANT_ADDED: "ModulesAgoraVoiceCallOnGroupCallParticipantAdded",
					ON_GROUP_CALL_PARTICIPANT_REMOVED: "ModulesAgoraVoiceCallOnGroupCallParticipantRemoved",
				},
				VideoCall: {
					ON_APP_INIT: "ModulesAgoraVideoCallOnAppInit",
					ON_INCOMING_CALL: "ModulesAgoraVideoCallOnIncomingCall",
					ON_OUTGOING_CALL: "ModulesAgoraVideoCallOnOutgoingCall",
					ON_CALL_ANSWERED: "ModulesAgoraVideoCallOnAnswered",
					ON_CALL_REJECTED: "ModulesAgoraVideoCallOnCallReject",
					ON_CALL_STARTED: "ModulesAgoraVideoCallOnCallStarted",
					ON_CALL_ENDED: "ModulesAgoraVideoCallOnCallEnded",
					ON_CALL_HOLD: "ModulesAgoraVideoCallOnCallHold",
					ON_CALL_UNHOLD: "ModulesAgoraVideoCallOnCallUnHold",
					ON_CALL_ABORT: "ModulesAgoraVideoCallOnCallAbort",
					ON_CALL_ON_MUTE: "ModulesAgoraVideoCallOnCallMute",
					ON_CALL_ON_UNMUTE: "ModulesAgoraVideoCallOnCallUnmute",
					ON_INCOMING_GROUP_CALL: "ModulesAgoraVideoCallOnIncomingGroupCall",
					ON_OUTGOING_GROUP_CALL: "ModulesAgoraVideoCallOnOutgoingGroupCall",
					ON_GROUP_CALL_ANSWERED: "ModulesAgoraVideoCallOnGroupCallAnswered",
					ON_GROUP_CALL_REJECTED: "ModulesAgoraVideoCallOnGroupCallReject",
					ON_GROUP_CALL_STARTED: "ModulesAgoraVideoCallOnGroupCallStarted",
					ON_GROUP_CALL_ENDED: "ModulesAgoraVideoCallOnGroupCallEnded",
					ON_GROUP_CALL_HOLD: "ModulesAgoraVideoCallOnGroupCallHold",
					ON_GROUP_CALL_UNHOLD: "ModulesAgoraVideoCallOnGroupCallUnHold",
					ON_GROUP_CALL_ABORT: "ModulesAgoraVideoCallOnGroupCallAbort",
					ON_GROUP_CALL_MUTE: "ModulesAgoraVideoCallOnGroupCallMute",
					ON_GROUP_CALL_UNMUTE: "ModulesAgoraVideoCallOnGroupCallUnmute",
					ON_GROUP_CALL_PARTICIPANT_JOIN: "ModulesAgoraVideoCallOnGroupCallParticipantJoin",
					ON_GROUP_CALL_PARTICIPANT_LEAVE: "ModulesAgoraVideoCallOnGroupCallParticipantLeave",
					ON_GROUP_CALL_PARTICIPANT_ADDED: "ModulesAgoraVideoCallOnGroupCallParticipantAdded",
					ON_GROUP_CALL_PARTICIPANT_REMOVED: "ModulesAgoraVideoCallOnGroupCallParticipantRemoved",
				},
				InstantMessaging: {
					ON_APP_INIT: "ModulesAgoraInstantMessengerOnAppInit",
				},
				LiveStreaming: {
					ON_APP_INIT: "ModulesAgoraLiveStreamingOnAppInit",
				},
				WhiteBoard: {
					ON_APP_INIT: "ModulesAgoraWhiteBoardOnAppInit",
				},
			},
		},
	},
	Dots: {
		white: "Konstants",
		black: "⚫",
	},
};

/* Simple JavaScript Inheritance
 * By John Resig https://johnresig.com/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function() {
	let initializing = false,
		fnTest = /vaida/.test(function() {
			vaida;
		}) ?
		/\b_super\b/ :
		/.*/;

	// The base Class implementation (does nothing)
	this.Class = function() {};

	// Create a new Class that inherits from this class
	Class.extend = function(prop) {
		let _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		let prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (let name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] =
				typeof prop[name] == "function" &&
				typeof _super[name] == "function" &&
				fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						let tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						let ret = fn.apply(this,
							arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init) this.init.apply(
				this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();

// Class Library Events

// Parent constructor
class DovellousEvent {
	constructor(name) {
		this.name = name;
	}
	/**
	 * Event dispatcher template:
	 * param object data
	 * return null
	 */
	dispatch(name, data) {
		// Dispatch the event
		window.dispatchEvent(new CustomEvent(name, {
			detail: data
		}));
	}
}


// Child constructor
class DovellousLibraryEvent {
	constructor(name) {
		// Call parent constructor with proper arguments
		new DovellousEvent(this, name);
	}
}

// Inheritance
DovellousLibraryEvent.prototype = Object.create(DovellousEvent.prototype);

function DovellousEventDispatcher(DovellousEventItems){

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

}

let formatPhoneNumber = (str, styleNumber) => {
	//Filter only numbers from the input
	let cleaned = ('' + str).replace(/\D/g, '');
	//Check if the input is of correct length
	let match = cleaned.match(/^(\d{1,5})(\d{2})(\d{3})(\d{4})$/);
	if (match) {    
	  if(typeof styleNumber !== "undefined" && styleNumber){
		  return '+' + match[1] + '(' + match[2] + ')' + match[3] + '-' + match[4];
	  }else{
		  return '+' + match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
	  }    
	};
	return str
  };
  