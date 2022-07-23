export interface GoogleCloudStorageConfig {
  database: string;
}

export class Config implements GoogleCloudStorageConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
