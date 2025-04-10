import type { EventName } from '@/types/events/interface.type'
import { ref } from 'vue'

const events = ref<Record<EventName | string, Function[]>>({})

export default {
  on(event: EventName, callback: Function) {
    if (!events.value[event]) {
      events.value[event] = []
    }
    events.value[event].push(callback)
  },
  off(event: EventName, callback?: Function) {
    if (events.value[event]) {
      if (callback) {
        events.value[event] = events.value[event].filter((cb: Function) => cb !== callback)
      } else {
        delete events.value[event]
      }
    }
  },
  emit(event: EventName, ...args: any[]) {
    if (events.value[event]) {
      events.value[event].forEach((callback: Function) => callback(...args))
    }
  }
}