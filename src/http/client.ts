import type {
  HttpAdapter,
  HttpClient,
  HttpPluginHook,
  RequestConfig,
  HttpConfig
} from '@/types/http.type'

export default class Client implements HttpClient {
  #adapter: HttpAdapter
  #plugins: HttpPluginHook[]
  constructor(adapter: HttpAdapter) {
    this.#adapter = adapter
    this.#plugins = []
  }

  use(plugin: HttpPluginHook) {
    if (typeof plugin === 'function') {
      this.#plugins.push(plugin)
    } else if (plugin.install && typeof plugin.install === 'function') {
      plugin.install(this)
      this.#plugins.push(plugin)
    } else if (plugin.beforeRequest || plugin.onError || plugin.afterResponse) {
      this.#plugins.push(plugin)
    } else {
      throw new Error(
        'Invalid plugin format. Plugin should be a function or an object with an install method.'
      )
    }
  }

  setConfig(config: HttpConfig) {
    if (this.#adapter.setConfig) {
      this.#adapter.setConfig(config)
    }
  }

  async request(config: RequestConfig) {
    for (const plugin of this.#plugins) {
      if (plugin.beforeRequest) {
        config = (await plugin.beforeRequest(config)) ?? config
      }
    }

    let response
    try {
      response = await this.#adapter.request(config)
    } catch (error) {
      for (const plugin of this.#plugins) {
        if (plugin.onError) {
          error = (await plugin.onError(error, config)) ?? error
        }
      }
      throw error
    }

    for (const plugin of this.#plugins) {
      if (plugin.afterResponse) {
        response = (await plugin.afterResponse(response, config)) ?? response
      }
    }

    return response
  }

  get(url: string, params?: Record<string, any>, config?: RequestConfig) {
    return this.request({ ...config, method: 'GET', url, params })
  }

  post(url: string, data: any, config?: RequestConfig) {
    return this.request({ ...config, method: 'POST', url, data })
  }

  put(url: string, data: any, config?: RequestConfig) {
    return this.request({ ...config, method: 'PUT', url, data })
  }

  delete(url: string, config?: RequestConfig) {
    return this.request({ ...config, method: 'DELETE', url })
  }
}
