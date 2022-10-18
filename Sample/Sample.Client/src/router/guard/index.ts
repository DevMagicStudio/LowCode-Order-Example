import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import { loadEnv } from '@build/index'
import { useI18n } from '@/hooks/web/useI18n'

import { createPermissionGuard } from './permissionGuard'
import { createStoreGuard } from './storeGuard'

export default function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createStoreGuard(router)
}

function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async to => {
    to.meta.loaded = !!loadedPageMap.get(to.path)
    return true
  })

  router.afterEach(to => {
    loadedPageMap.set(to.path, true)
    return true
  })
}

export function createProgressGuard(router: Router) {
  const { t } = useI18n()
  router.beforeEach(async to => {
    if (to.meta.loaded) {
      return true
    }
    const { VITE_APP_TITLE } = loadEnv()
    document.title = to.meta.title
      ? `${t(to.meta.title as string)} | ${VITE_APP_TITLE}`
      : VITE_APP_TITLE
    NProgress.start()
    return true
  })

  router.afterEach(async () => {
    NProgress.done()
    return true
  })
}
