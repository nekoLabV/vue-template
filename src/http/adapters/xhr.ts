export default class XhrAdapter {
  #defaultConfig: HttpConfig
  constructor() {
    this.#defaultConfig = {
      baseUrl: '/'
    }
  }
  setConfig(config: HttpConfig) {
    this.#defaultConfig = { ...this.#defaultConfig, ...config }
  }

  request(config: RequestConfig): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const { url, method = 'GET', headers = {}, data } = config

      xhr.open(method, url, true)

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject(new Error(`HTTP error! status: ${xhr.status}`))
          }
        }
      }

      xhr.send(data ? JSON.stringify(data) : null)
    })
  }
}