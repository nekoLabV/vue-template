export interface HttpClient {
  request(config: RequestConfig): Promise<any>
}

export interface HttpConfig {
  baseUrl: string
}

export interface RequestConfig extends RequestInit {
  url: string
  data?: any
  params?: Record<string, any>
  timeoutId?: number
}

export interface HttpResponse {
  status: number
  msg?: string
  data?: any
}

export interface HttpAdapter {
  setConfig(config: HttpConfig): void
  request(config: RequestConfig): Promise<HttpResponse>
}

export interface HttpPluginHook {
  client?: any
  install?(client: any): void
  beforeRequest?(config: RequestConfig): Promise<any> | void
  onError?(error: unknown, config: RequestConfig): Promise<any> | void
  afterResponse?(response: HttpResponse, config: RequestConfig): Promise<HttpResponse> | void
}
