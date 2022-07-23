import { GoogleFirebaseAuthenticationConfig } from "../apps/authentication/GoogleFirebaseAuthenticationConfig";
import { GoogleCloudFirestoreConfig } from "../apps/cloud-firestore/GoogleCloudFirestoreConfig";
import { GoogleCloudMessagingConfig } from "../apps/cloud-messaging/GoogleCloudMessagingConfig";
import { GoogleCloudStorageConfig } from "../apps/cloud-storage/GoogleCloudStorageConfig";
import { GoogleRealtimeDatabaseConfig } from "../apps/realtime-database/GoogleRealtimeDatabaseConfig";

export interface GoogleFirebaseConfig {
  authentication:GoogleFirebaseAuthenticationConfig,
  firestore:GoogleCloudFirestoreConfig,
  messaging: GoogleCloudMessagingConfig,
  storage: GoogleCloudStorageConfig,
  database: GoogleRealtimeDatabaseConfig
}

export class Config implements GoogleFirebaseConfig {

  authentication:GoogleFirebaseAuthenticationConfig;
  firestore:GoogleCloudFirestoreConfig;
  messaging: GoogleCloudMessagingConfig;
  storage: GoogleCloudStorageConfig;
  database: GoogleRealtimeDatabaseConfig;

  constructor(authentication: GoogleFirebaseAuthenticationConfig, firestore: GoogleCloudFirestoreConfig, messaging: GoogleCloudMessagingConfig, storage: GoogleCloudStorageConfig, database: GoogleRealtimeDatabaseConfig) {
    this.authentication = authentication;
    this.firestore = firestore;
    this.messaging = messaging;
    this.storage = storage;
    this.database = database;
  }
}
