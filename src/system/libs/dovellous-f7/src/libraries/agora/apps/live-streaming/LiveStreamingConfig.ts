export interface LiveStreamingConfig {
  defaultChannel: string;
}

export class Config implements LiveStreamingConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = 'CHLVE0100') {
    this.defaultChannel = defaultChannel;
  }
}
