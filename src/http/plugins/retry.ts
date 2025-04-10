export default function retryPlugin(retries = 3) {
  return {
    client: undefined as HttpClient | undefined,
    install(httpClient: HttpClient) {
      this.client = httpClient
    },
    async onError(error: unknown, config: RequestConfig): Promise<any> {
      if (retries > 0) {
        retries--
        console.log(`重试中...剩余尝试次数: ${retries}`)
        return this.client?.request(config)
      }
      return Promise.resolve(new Error(`${error}`))
    }
  }
}