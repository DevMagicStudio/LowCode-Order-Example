import type { Router } from 'vue-router'
// import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { useLoginAccountStoreWithOut } from '@/store/modules/login'
// import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { PagePathEnum } from '../types'

export function createStoreGuard(router: Router) {
  router.afterEach(to => {
    // Just enter the login page and clear the authentication information
    if (to.path === PagePathEnum.BASE_LOGIN) {
      // const appStore = useSettingsStoreWithOut()
      const loginStore = useLoginAccountStoreWithOut()
      // const permissionStore = usePermissionStoreWithOut();
      // appStore.resetAllState()
      // permissionStore.resetState();
      loginStore.initLoginAccount()
    }
  })
}
