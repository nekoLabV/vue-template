import type { RouteRecordRaw } from 'vue-router'
import type { Meta } from '@/types/route'

export const generateRouteByFile = (): RouteRecordRaw[] => {
  const comps = import.meta.glob('@/views/**/*.vue')
  const pages: Record<string, Meta> = import.meta.glob('@/views/**/page.ts', {
    eager: true,
    import: 'default'
  })

  const routes: RouteRecordRaw[] = []

  Object.entries(pages).map(([path, meta]) => {
    const pagePath = path
    path = path.replace('/src/views', '').replace('/page.ts', '')
    path = path ?? '/'
    const name = path.split('/').filter(Boolean).join('-')
    const compPath = pagePath.replace('page.ts', 'index.vue')

    routes.push({
      meta: meta.meta,
      name: meta.name || name,
      path: meta.path || path,
      component: comps[compPath]
    })
  })

  return routes
}
