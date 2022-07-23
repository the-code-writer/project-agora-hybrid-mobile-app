export interface GoogleFirebaseAuthenticationConfig {
  database: string;
}

export class Config implements GoogleFirebaseAuthenticationConfig {
  database: string;
  constructor(database: string = 'firebase') {
    this.database = database;
  }
}
