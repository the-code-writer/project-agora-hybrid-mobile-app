import { GoogleFirebaseError } from "./lib/GoogleFirebaseErrors";

import { Config, GoogleFirebaseConfig } from "./lib/GoogleFirebaseConfig";

import {GoogleFirebaseAuthentication} from "./apps/authentication/GoogleFirebaseAuthentication";

import {GoogleCloudFirestore} from "./apps/cloud-firestore/GoogleCloudFirestore";

import {GoogleCloudMessaging} from "./apps/cloud-messaging/GoogleCloudMessaging";

import {GoogleCloudStorage} from "./apps/cloud-storage/GoogleCloudStorage";

import {GoogleRealtimeDatabase} from "./apps/realtime-database/GoogleRealtimeDatabase";
import { GoogleFirebaseAuthenticationConfig } from "./apps/authentication/GoogleFirebaseAuthenticationConfig";
import { GoogleCloudFirestoreConfig } from "./apps/cloud-firestore/GoogleCloudFirestoreConfig";
import { GoogleCloudMessagingConfig } from "./apps/cloud-messaging/GoogleCloudMessagingConfig";
import { GoogleCloudStorageConfig } from "./apps/cloud-storage/GoogleCloudStorageConfig";
import { GoogleRealtimeDatabaseConfig } from "./apps/realtime-database/GoogleRealtimeDatabaseConfig";

export class GoogleFirebase {

  private readonly config: GoogleFirebaseConfig;

  public googleFirebaseAuthentication: GoogleFirebaseAuthentication;
  public googleCloudFirestore: GoogleCloudFirestore;
  public googleCloudMessaging: GoogleCloudMessaging;
  public googleCloudStorage: GoogleCloudStorage;
  public googleRealtimeDatabase: GoogleRealtimeDatabase;

  /**
   * GoogleFirebase Constructor
   * @param database .
   */

  constructor(authentication: GoogleFirebaseAuthenticationConfig | Config, firestore: GoogleCloudFirestoreConfig, messaging: GoogleCloudMessagingConfig, storage: GoogleCloudStorageConfig, database: GoogleRealtimeDatabaseConfig) {
    if (authentication instanceof Config) {
      this.config = authentication;
    } else {
      this.config = new Config(authentication, firestore, messaging, storage, database);
    }

    if(!this.config){
      throw new GoogleFirebaseError("Firebase error", 1);
    }

  }

  private initGoogleFirebaseAuthentication (){

    this.googleFirebaseAuthentication = new GoogleFirebaseAuthentication(this.config.authentication);

  }

  private initGoogleCloudFirestore (){

    this.googleCloudFirestore = new GoogleCloudFirestore(this.config.firestore);

  }

  private initGoogleCloudMessaging (){

    this.googleCloudMessaging = new GoogleCloudMessaging(this.config.messaging);

  }

  private initGoogleCloudStorage (){

    this.googleCloudStorage = new GoogleCloudStorage(this.config.storage);

  }

  private initGoogleRealtimeDatabase (){

    this.googleRealtimeDatabase = new GoogleRealtimeDatabase(this.config.database);

  }

}
