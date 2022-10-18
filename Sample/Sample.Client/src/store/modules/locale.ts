import type { LocaleSetting, LocaleType } from '@/types/settings'
import { LOCALE_KEY } from '@/types/storage'

import { defineStore } from 'pinia'
import { store } from '@/store'
import { createLocalStorage } from '@/utils/cache'
import { localeSetting } from '@/layout/settings/localeSetting'

const local = createLocalStorage()
const lsLocaleSetting = (local.get(LOCALE_KEY) ||
  localeSetting) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'appeon-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting
  }),
  getters: {
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN'
    }
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
      local.set(LOCALE_KEY, this.localInfo)
    },
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo
      })
    }
  }
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
