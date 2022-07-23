export interface GoogleRealtimeDatabaseConfig {
  database: string;
}

export class Config implements GoogleRealtimeDatabaseConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
