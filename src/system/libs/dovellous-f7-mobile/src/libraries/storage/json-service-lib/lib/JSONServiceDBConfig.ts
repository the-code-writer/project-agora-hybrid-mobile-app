export interface JSONServiceDBConfig {
  dbuuid: string,
  autoSave: boolean,
  prettyFormat: boolean,
  separator: string,
  syncOnSave: boolean
}

export class Config implements JSONServiceDBConfig {
  dbuuid: string
  prettyFormat: boolean
  autoSave: boolean
  separator: string
  syncOnSave: boolean

  constructor(dbuuid: string, autoSave: boolean = true, prettyFormat: boolean = false, separator: string = '.', syncOnSave: boolean = false) {
    this.dbuuid = dbuuid
    this.prettyFormat = prettyFormat
    this.autoSave = autoSave
    this.separator = separator
    this.syncOnSave = syncOnSave
  }
  
}