import { GoogleRealtimeDatabaseError } from "./GoogleRealtimeDatabaseErrors";
import { Config, GoogleRealtimeDatabaseConfig } from "./GoogleRealtimeDatabaseConfig";

export class GoogleRealtimeDatabase {
  private readonly config: GoogleRealtimeDatabaseConfig;

  /**
   * GoogleRealtimeDatabase Constructor
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
