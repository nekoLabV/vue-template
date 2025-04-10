interface HttpClient {
  request(config: RequestConfig): Promise<any>
}

interface HttpConfig {
  baseUrl: string
}

interface RequestConfig extends RequestInit {
  url: string
  data?: any
  params?: Record<string, any>
  timeoutId?: number
}

interface HttpResponse {
  status: number
  msg?: string
  data?: any
}

interface HttpAdapter {
  setConfig(config: HttpConfig): void
  request(config: RequestConfig): Promise<HttpResponse>
}

interface HttpPluginHook {
  client?: Client
  install?(client): void
  beforeRequest?(config: RequestConfig): Promise<any> | void
  onError?(error, config: RequestConfig): Promise<any> | void
  afterResponse?(response: HttpResponse, config: RequestConfig): Promise<HttpResponse> | void
}