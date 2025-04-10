export const defineStorage = () => {
  const plugins: LocalPluginHook[] = []

  const storageUtil = {
    /**
     * 注册插件
     * @param {function} plugin
     */
    use(plugin: LocalPluginHook | LocalPlugin) {
      let pluginInstance
      if (typeof plugin === 'function') {
        pluginInstance = plugin(this) // 执行插件函数，返回插件对象
      } else if (typeof plugin === 'object') {
        pluginInstance = plugin
      } else {
        throw new Error('Invalid plugin format. Plugin must be a function or an object.')
      }

      // 验证插件实例是否符合规范
      if (
        typeof pluginInstance.beforeSet === 'function' ||
        typeof pluginInstance.beforeGet === 'function' ||
        typeof pluginInstance.afterSet === 'function' ||
        typeof pluginInstance.afterGet === 'function'
      ) {
        plugins.push(pluginInstance)
      } else {
        throw new Error('Plugin must implement at least one of the lifecycle hooks: beforeSet, beforeGet, afterSet, afterGet.')
      }
    },

    /**
     * 设置数据
     * @param {string} key
     * @param {*} value
     */
    set(key: string, value: JSONValue) {
      let data = value
      for (const plugin of plugins) {
        if (plugin.beforeSet) {
          data = plugin.beforeSet(key, data)
        }
      }
      localStorage.setItem(key, JSON.stringify(data))
      for (const plugin of plugins) {
        if (plugin.afterSet) {
          plugin.afterSet(key, data)
        }
      }
    },

    /**
     * 获取数据
     * @param {string} key
     * @param {*} [defaultValue]
     */
    get(key: string, defaultValue = null) {
      const itemStr = localStorage.getItem(key)
      if (!itemStr) {
        return defaultValue
      }

      let data = JSON.parse(itemStr)
      for (const plugin of plugins) {
        if (plugin.beforeGet) {
          data = plugin.beforeGet(key, data, defaultValue)
        }
      }
      for (const plugin of plugins) {
        if (plugin.afterGet) {
          data = plugin.afterGet(key, data, defaultValue)
        }
      }
      return data
    },

    /**
     * 移除数据
     * @param {string} key
     */
    remove(key: string) {
      localStorage.removeItem(key)
    },

    /**
     * 清空所有数据
     */
    clear() {
      localStorage.clear()
    }
  }

  return storageUtil
}
