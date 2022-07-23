import { VaidaCollaboratorError } from "./lib/Errors";
import { Config, VaidaCollaboratorConfig } from "./lib/VaidaCollaboratorConfig";

export class VaidaCollaborator {
  private readonly config: VaidaCollaboratorConfig;

  /**
   * VaidaCollaborator Constructor
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
