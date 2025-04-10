interface LocalPluginHook {
  beforeSet?(key: string, data: any): any;
  afterSet?(key: string, data: any): any;
  beforeGet?(key: string, data: any, defaultValue: any): any;
  afterGet?(key: string, data: any, defaultValue: any): any;
}

type LocalPlugin = (storage?) => LocalPluginHook;