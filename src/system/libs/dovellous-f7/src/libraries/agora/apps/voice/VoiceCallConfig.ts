export interface VoiceCallConfig {
  defaultChannel: string;
}

export class Config implements VoiceCallConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = 'CHAUD0100') {
    this.defaultChannel = defaultChannel;
  }
}
