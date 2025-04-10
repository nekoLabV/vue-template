interface Date {
  value: string
  expire?: number
}

export default function expirePlugin(): LocalPluginHook {
  return {
    beforeSet(_key: string, data: Date) {
      if (data && data.expire) {
        return {
          value: data.value,
          expire: Date.now() + data.expire * 1000
        }
      }
      return data
    },
    beforeGet(key: string, data: Date, defaultValue: string) {
      if (data && data.expire && Date.now() > data.expire) {
        console.warn(`localStorage Key "${key}" has expired.`)
        localStorage.removeItem(key)
        return defaultValue
      }
      return data
    }
  }
}