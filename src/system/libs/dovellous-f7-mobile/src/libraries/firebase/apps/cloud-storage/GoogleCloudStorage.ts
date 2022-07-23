import { GoogleCloudStorageError } from "./GoogleCloudStorageErrors";
import { Config, GoogleCloudStorageConfig } from "./GoogleCloudStorageConfig";

export class GoogleCloudStorage {
  private readonly config: GoogleCloudStorageConfig;

  /**
   * GoogleCloudStorage Constructor
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
