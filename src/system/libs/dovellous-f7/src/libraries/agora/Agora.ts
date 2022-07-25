import { VoiceCall } from "./apps/voice/VoiceCall";
import { VideoCall } from "./apps/video/VideoCall";
import { InstantMessaging } from "./apps/instant-messaging/InstantMessaging";
import { LiveStreaming } from "./apps/live-streaming/LiveStreaming";
import { WhiteBoard } from "./apps/white-board/WhiteBoard";

import K from "../app/konstants";

/* Simple JavaScript Inheritance
 * By John Resig https://johnresig.com/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
  let initializing = false, fnTest = /vaida/.test(function () {
    vaida;
  }) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function () {
  };

  // Create a new Class that inherits from this class
  Class.extend = function (prop) {
    let _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    let prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (let name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function (name, fn) {
          return function () {
            let tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            let ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init)
        this.init.apply(this, arguments);
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

const AgoraLibrary = Class.extend({

  init: function (events, options) {

    let self = this;

    this.events = events;

    this.modules.params = self;

    this.modules.initModules(this, options);


  },
  modules: (function () {

    let parent = {

      isLoaded: false,

      params: null,

      initModules: (app, options) => {

        parent.voiceCall.init(app, options);

      },

      voiceCall: {

        isReady: false,

        params: {
          foo: "MODULE_BAR",
        },

        init: (app, options) => {

          Object.keys(options).map(function (key, index) {
            parent.voiceCall.params[key] = options[key];
          });

          console.error("::EVENTS::", parent.params.events, parent.voiceCall.params);

          parent.params.events.OnAppInit({ "INIT_EVENT_DATA": [app, parent.voiceCall.params] });

        },

        helloWorld: async function () {

          return parent.voiceCall.params;

        },

      },
    };

    return parent;

  })()

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
AgoraEvent.prototype.dispatch = function (name, data) {

  // Dispatch the event
  window.dispatchEvent(new CustomEvent(name, { detail: data }));

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

Object.keys(AgoraEventItems).map((key, index) => {

  /**
   *
   * @returns {*}
   * @constructor
   */
  AgoraLibEvent.prototype[AgoraEventItems[key]] = (data) => {

    // Call parent method
    return AgoraEvent.prototype.dispatch.call(this, AgoraEventItems[key], data);

  };

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

}
 
export Agora;

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