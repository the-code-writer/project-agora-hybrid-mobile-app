export interface GoogleCloudFirestoreConfig {
  database: string;
}

export class Config implements GoogleCloudFirestoreConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
