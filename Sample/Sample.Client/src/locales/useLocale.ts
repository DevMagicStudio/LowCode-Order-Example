import type { LocaleType } from '@/types/settings'

import { i18n } from './setupI18n'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { unref, computed } from 'vue'
import { loadLocalePool, setHtmlPageLang } from './util'

interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}

export function useLocale() {
  const loacleStore = useLocaleStoreWithOut()
  const getLocale = computed(() => loacleStore.getLocale)
  const getAntdLocale = computed(
    // @ts-ignore
    (): any => i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {}
  )

  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    const langModule = ((await import(`./lang/${locale}.ts`)) as any)
      .default as LangModule

    if (!langModule) return

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    changeLocale,
    getAntdLocale
  }
}