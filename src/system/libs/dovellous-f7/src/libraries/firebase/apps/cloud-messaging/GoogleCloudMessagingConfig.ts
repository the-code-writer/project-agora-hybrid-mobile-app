export interface GoogleCloudMessagingConfig {
  database: string;
}

export class Config implements GoogleCloudMessagingConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
