import {DF7} from "./df7";

/**
 * Dovellous F7 Plugin for Framework7 1.0.0
 * Keypad plugin extends Framework7 with additional custom keyboards
 * http://dovellous.com/f7/plugins/
 *
 * Copyright 2014-2022 Dovellous
 *
 * Released under the MIT License
 *
 * Released on: July 29, 2022
 */

function DovellousClassConstructor(Framework7Class: any) {
    return class Dovellous extends Framework7Class {
        constructor(
            app: { 
                utils: any; 
                $: any; 
                request: any; 
                params: { 
                    dovellous: any; 
                };
            }, 

            params: any) {

            super(params, [app]);

            const Utils = app.utils;

            const $ = app.$;

            const request = app.request;

            const dovellous = this;

            dovellous.app = app;

            const defaults = Utils.extend(
                {
                    on: {},
                },
                app.params.dovellous,
            );

            dovellous.params = Utils.extend(defaults, params);

        }

        fireEvent(name: any, data: any) {

            this.emit(name, data);
            
        }

    };
}

// eslint-disable-next-line
let debugEnabled = true;
const DovellousF7Plugin = {
    name: 'dovellous',
    install() {
        const Framework7 = this;
        Framework7.Dovellous = DovellousClassConstructor(Framework7.Class);
        Framework7.DF7 = new DF7(this.params.dovellous.modules);
    },
    params: {
        dovellous: {
            modules: {},
        },
        debugger: false,
    },
    create() {
        const app = this;
        const $ = app.$;
        app.df7 = DF7;
        app.debugger = {
            enable: function () {
              debugEnabled = true;
            },
            disable: function () {
              debugEnabled = false;
            },
          };
    },
    on: {
        init: () => {
            const app = this;
            if (app.params.debugger){
                debugEnabled = true;
            } 
            if (debugEnabled){
                console.log("app init");
            }
          },
          pageBeforeIn: function (page: any) {
            const $ = page.app.$;
            const app = page.app;
            if (debugEnabled) console.log("pageBeforeIn", page);
          },
          pageAfterIn: function (page: any) {
            if (debugEnabled) console.log("pageAfterIn", page);
          },
          pageBeforeOut: function (page: any) {
            if (debugEnabled) console.log("pageBeforeOut", page);
          },
          pageAfterOut: function (page: any) {
            if (debugEnabled) console.log("pageAfterOut", page);
          },
          pageInit: function (page: any) {
            if (debugEnabled) console.log("pageInit", page);
          },
          pageBeforeRemove: function (page: any) {
            if (debugEnabled) console.log("pageBeforeRemove", page);
          },
    },
};

export { DovellousF7Plugin as default };
