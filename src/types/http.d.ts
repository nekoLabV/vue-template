interface HttpClient {
  request(config: RequestConfig): Promise<any>;
}

interface HttpConfig {
  baseUrl: string;
}

interface RequestConfig extends RequestInit {
  url: string;
  data?: any;
  params?: Record<string, any>;
  timeoutId?: number;
}

interface HttpAdapter {
  setConfig(config: HttpConfig): void;
  request(config: RequestConfig): Promise<any>;
}

interface HttpPluginHook {
  client?: Client;
  install?(client): void;
  beforeRequest?(config: RequestConfig): Promise<any> | void;
  onError?(error, config: RequestConfig): Promise<any> | void;
  afterResponse?(response: Response, config: RequestConfig): Promise<any> | void;
}