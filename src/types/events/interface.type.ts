import type { Code } from './network.type'

export type EventName = keyof Code
export type EventCallback<T extends EventName> = (event: T, ...args: any[]) => void
export type EventMap = {
  [K in EventName]: EventCallback<K>
}