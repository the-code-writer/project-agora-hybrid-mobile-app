import { GoogleFirebaseAuthenticationError } from "./GoogleFirebaseAuthenticationErrors";
import { Config, GoogleFirebaseAuthenticationConfig } from "./GoogleFirebaseAuthenticationConfig";

export class GoogleFirebaseAuthentication {
  private readonly config: GoogleFirebaseAuthenticationConfig;

  /**
   * GoogleFirebaseAuthentication Constructor
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
