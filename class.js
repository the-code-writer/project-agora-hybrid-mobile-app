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
		},
		Modules: {
			Agora: {
				VoiceCall: {
					ON_APP_INIT: "ModulesAgoraVoiceCallOnAppInit",
				},
				VideoCall: {
					ON_APP_INIT: "ModulesAgoraVideoCallOnAppInit",
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
  