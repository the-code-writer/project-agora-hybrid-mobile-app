import { GoogleCloudMessagingError } from "./GoogleCloudMessagingErrors";
import { Config, GoogleCloudMessagingConfig } from "./GoogleCloudMessagingConfig";

export class GoogleCloudMessaging {
  private readonly config: GoogleCloudMessagingConfig;

  /**
   * GoogleCloudMessaging Constructor
   * @param database .
   */

  constructor(database: any | Config) {
    if (database instanceof Config) {
      this.config = database;
    } else {
      this.config = new Config(database);
    }
  }

}
