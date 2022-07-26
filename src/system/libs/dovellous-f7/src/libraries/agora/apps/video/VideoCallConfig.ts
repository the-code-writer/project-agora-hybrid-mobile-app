export interface VideoCallConfig {
  defaultChannel: string;
}

export class Config implements VideoCallConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = 'CHVID0100') {
    this.defaultChannel = defaultChannel;
  }
}
