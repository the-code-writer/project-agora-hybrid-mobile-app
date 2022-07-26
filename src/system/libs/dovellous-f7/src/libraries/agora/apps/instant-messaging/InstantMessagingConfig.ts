export interface InstantMessagingConfig {
  defaultChannel: string;
}

export class Config implements InstantMessagingConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = 'CHTXT0100') {
    this.defaultChannel = defaultChannel;
  }
}
