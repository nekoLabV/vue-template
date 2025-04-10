import Client from './client'
import FetchAdapter from './adapters/fetch'
import XhrAdapter from './adapters/xhr'
import timeoutPlugin from './plugins/timeout'
import loggerPlugin from './plugins/logger'
import retryPlugin from './plugins/retry'
import codeEventPlugin from './plugins/codeEvent'
import config from './config'

const adapter = (() => {
  switch (import.meta.env.VITE_HTTP_ADAPTER) {
    case 'fetch':
      return new FetchAdapter()
    case 'xhr':
      return new XhrAdapter()
    default:
      return new FetchAdapter()
  }
})()

const http = new Client(adapter)

http.use(timeoutPlugin())
http.use(loggerPlugin)
http.use(retryPlugin())
http.use(codeEventPlugin)

http.setConfig({
  baseUrl: config.baseUrl
})

export default http