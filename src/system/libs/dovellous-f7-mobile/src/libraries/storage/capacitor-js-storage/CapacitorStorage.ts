import { Storage } from "@capacitor/storage";

import { CapacitorStorageError, StorageDataError } from "./lib/Errors";
import { Config, CapacitorStorageConfig } from "./lib/CapacitorStorageConfig";

export class CapacitorStorage {

  private readonly config: CapacitorStorageConfig;

  /**
   * CapacitorStorage Constructor
   * @param prettyFormat the JSON file will be readable easily by a human
   */

  constructor(prettyFormat: boolean | Config) {
    if (prettyFormat instanceof Config) {
      this.config = prettyFormat;
    } else {
      this.config = new Config(prettyFormat);
    }

    //
  }

  /**
   * Process datapath into different parts
   * @param dataPath
   */
  public setKey(key, value, callbackSuccess, callbackError) {
    Storage.set({
      key: key,
      value: value,
    })
      .then((success) => {
        //console.log("SAVED",key);

        if (typeof callbackSuccess === "function") {
          Storage.get({ key: key })
            .then((savedValue) => {
              callbackSuccess(savedValue.value);
            })
            .catch((error) => {
              if (typeof callbackError === "function") {
                console.warn(
                  "Item with specified key does not exist.",
                  3,
                  key,
                  error
                );

                callbackError(error);
              }
            });
        }
      })
      .catch((error) => {
        if (typeof callbackError === "function") {
          console.warn(
            "Item with specified key does not exist.",
            2,
            key,
            error
          );

          callbackError(error);
        }
      });
  }

  public getKey(key, callbackSuccess, callbackError) {
    Storage.get({ key: key })
      .then((savedValue) => {
        if (typeof callbackSuccess === "function") {
          callbackSuccess(savedValue.value);
        }
      })
      .catch((error) => {
        if (typeof callbackError === "function") {
          console.warn(
            "Item with specified key does not exist.",
            1,
            key,
            error
          );

          callbackError(error);
        }
      });
  }
}
