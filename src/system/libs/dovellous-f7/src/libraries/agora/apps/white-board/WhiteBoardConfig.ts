export interface WhiteBoardConfig {
  defaultChannel: string;
}

export class Config implements WhiteBoardConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = 'CHCLB0100') {
    this.defaultChannel = defaultChannel;
  }
}
