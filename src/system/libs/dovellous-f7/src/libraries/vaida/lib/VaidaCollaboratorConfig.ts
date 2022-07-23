export interface VaidaCollaboratorConfig {
  database: string;
}

export class Config implements VaidaCollaboratorConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
