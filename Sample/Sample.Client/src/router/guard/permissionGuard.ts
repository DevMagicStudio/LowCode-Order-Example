import type { Router } from 'vue-router'
import { useLoginAccountStoreWithOut } from '@/store/modules/login'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { PagePathEnum, PageNameEnum } from '../types'
// import * as loginApi from '@/api/login'
/**
 * @description Permission guard
 * @param router
 */
export function createPermissionGuard(router: Router) {
  const loginStore = useLoginAccountStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from) => {
    // You can access without permission. You need to set the routing meta.ignoreAuth to true
    if (to.meta?.ignoreAuth) {
      return true
    } else {
      // Whether the login expired
      const isAuthenticated = loginStore.checkExpireTime()
      // try {
      if (to.path !== PagePathEnum.BASE_LOGIN && !isAuthenticated) {
        return { name: PageNameEnum.BASE_LOGIN }
      } else if (to.path === PagePathEnum.BASE_LOGIN && isAuthenticated) {
        return { name: 'Welcome' }
      } else {
        return true
      }
      // } catch (error) {
      //   next({ name: '/error', replace: true })
      //   return
      // }
    }
  })
}
