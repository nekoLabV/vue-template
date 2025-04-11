import type { RequestConfig } from '@/types/http.type'

export default function timeoutPlugin(timeout = 8000) {
  return {
    beforeRequest(config: RequestConfig) {
      const controller = new AbortController()
      config.signal = controller.signal

      config.timeoutId = setTimeout(() => controller.abort(), timeout)
      return Promise.resolve(config)
    },
    afterResponse(response: Response, config: RequestConfig) {
      if (config.timeoutId) {
        clearTimeout(config.timeoutId)
      }
      return Promise.resolve(response)
    },
    onError(error: Error) {
      return Promise.resolve(new Error(`${error}`))
    }
  }
}
