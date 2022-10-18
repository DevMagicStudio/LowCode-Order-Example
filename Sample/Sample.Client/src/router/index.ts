import { createRouter, createWebHashHistory } from 'vue-router'
import { Router, RouteRecordRaw } from 'vue-router'
import { loadEnv } from '@build/index'
import { modulesRouter, whiteListRouter } from './routes'
import {
  filterTree,
  ascending,
  formatFlatteningRoutes,
  formatTwoStageRoutes
} from './menus'
import { buildHierarchyTree } from '@/utils/tree'

// for rendering menus
export const constantRoutes = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(modulesRouter)))
).concat(whiteListRouter)

export const menus = filterTree(ascending(modulesRouter))

const router: Router = createRouter({
  // Create a hash history
  history: createWebHashHistory(loadEnv().VITE_ROUTER_HISTORY),
  // Create a hash history
  routes: constantRoutes as unknown as RouteRecordRaw[],
  // Whether trailing slashes should be disallowed. Default is false
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
