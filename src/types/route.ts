import type { RouteMeta } from 'vue-router'

/**
 * 路由元信息
 */
export interface Meta {
  title?: string
  name?: string
  path?: string
  meta?: RouteMeta
}
