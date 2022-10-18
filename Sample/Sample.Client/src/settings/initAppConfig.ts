import { useLocaleStore } from '@/store/modules/locale'
import { useThemeStore } from '@/store/modules/theme'

import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env'

/**
 * @description init project config（theme/locale/...）
 */
export function initAppConfigStore() {
  const localeStore = useLocaleStore()
  localeStore.initLocale()

  // init theme
  const themeStore = useThemeStore()
  themeStore.initTheme()

  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName()

  ;[localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach(key => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}
