import { createRouter, createWebHistory } from 'vue-router'
import { generateRouteByFile } from '@/utils/route'

const routes = generateRouteByFile()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
