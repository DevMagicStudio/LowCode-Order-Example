import type { LocaleSetting } from '@/types/settings'
import { LOCALE } from '@/types/settings'

// locale list
export const localeList = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN
  },
  {
    text: 'English',
    event: LOCALE.EN_US
  }
]

export const localeSetting: LocaleSetting = {
  // Locale
  locale: LOCALE.EN_US,
  // 默认 locale
  fallback: LOCALE.EN_US,
  // available Locales
  availableLocales: localeList.map(l => l.event)
}
