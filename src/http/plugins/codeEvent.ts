import type { HttpResponse } from '@/types/http.type'
import eventBus from '@/utils/eventBus'

export default {
  afterResponse(response: HttpResponse) {
    const map: Record<number, Function> = {
      401: () => eventBus.emit('unauthorized', response),
      403: () => eventBus.emit('forbidden', response),
      500: () => eventBus.emit('server-error', response)
    }
    map[response.status] && map[response.status]()
  }
}
