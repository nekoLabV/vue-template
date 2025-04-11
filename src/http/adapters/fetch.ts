import type { HttpConfig, RequestConfig } from '@/types/http.type'

export default class FetchAdapter {
  #defaultConfig: HttpConfig
  constructor() {
    this.#defaultConfig = {
      baseUrl: '/'
    }
  }

  setConfig(config: HttpConfig) {
    this.#defaultConfig = { ...this.#defaultConfig, ...config }
  }

  async request(config: RequestConfig) {
    const { url, method = 'GET', headers, data, params, signal } = config

    const queryString = params
      ? '?' +
        Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')
      : ''

    const response = await fetch(url + queryString, {
      method,
      headers,
      body: JSON.stringify(data),
      signal,
      ...this.#defaultConfig
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }
}
