import DovellousF7Mobile from "./dovellous-f7-mobile";

let debugEnabled = true;

const DovellousF7MobilePlugin = {
  name: "framework7-dovellous",
  // extend app params with debugger params
  params: {
    debugger: false,
  },
  create: function () {
    var app = this;
    // extend app methods with debugger methods when app instance just created
    app.debugger = {
      enable: function () {
        debugEnabled = true;
      },
      disable: function () {
        debugEnabled = false;
      },
    };
    app.dovellous = DovellousF7Mobile;
  },
  on: {
    init: function () {
      var app = this;
      if (app.params.debugger) debugEnabled = true;
      if (debugEnabled) console.log("app init");
    },
    pageBeforeIn: function (page: any) {
      if (debugEnabled) console.log("pageBeforeIn", page);
    },
    pageAfterIn: function (page) {
      if (debugEnabled) console.log("pageAfterIn", page);
    },
    pageBeforeOut: function (page) {
      if (debugEnabled) console.log("pageBeforeOut", page);
    },
    pageAfterOut: function (page) {
      if (debugEnabled) console.log("pageAfterOut", page);
    },
    pageInit: function (page) {
      if (debugEnabled) console.log("pageInit", page);
    },
    pageBeforeRemove: function (page) {
      if (debugEnabled) console.log("pageBeforeRemove", page);
    },
  },
};

export default DovellousF7MobilePlugin;
