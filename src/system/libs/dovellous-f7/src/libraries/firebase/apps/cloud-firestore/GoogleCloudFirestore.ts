import { GoogleCloudFirestoreError } from "./GoogleCloudFirestoreErrors";
import { Config, GoogleCloudFirestoreConfig } from "./GoogleCloudFirestoreConfig";

export class GoogleCloudFirestore {
  private readonly config: GoogleCloudFirestoreConfig;

  /**
   * GoogleCloudFirestore Constructor
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
