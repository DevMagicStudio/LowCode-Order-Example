import {
  ThemeType,
  ThemeEnum,
  AppThemeType,
  AppThemeEnum
} from '@/types/settings'
import { APP_DARK_MODE_KEY_, APP_THEME_COLOR_KEY_ } from '@/types/storage'

import { defineStore } from 'pinia'
import { store } from '@/store'
import { createLocalStorage } from '@/utils/cache'
import {
  updateDarkTheme,
  changeTheme,
  deepMerge,
  updateHeaderBackground,
  updateSiderBackground
} from '@/utils/theme'
import { setCssVar } from '@/utils/theme/util'
const SIDER_SELECT_COLOR = '--sider-select-color'
const MENU_THEME_COLOR = '--menu-theme-color'
const TOP_THEME_COLOR = '--top-theme-color'
const local = createLocalStorage()
let menuFont = ''

const darkMode = (local.get(APP_DARK_MODE_KEY_) || ThemeEnum.LIGHT) as ThemeType
const appThemeColor = (local.get(APP_THEME_COLOR_KEY_) ||
  AppThemeEnum) as AppThemeType

interface ThemeState {
  darkMode: ThemeType
  themeColor: AppThemeType
}

export const useThemeStore = defineStore({
  id: 'appeon-theme',
  state: (): ThemeState => ({
    darkMode: darkMode,
    themeColor: appThemeColor
  }),
  getters: {
    getDarkMode(): ThemeType {
      return this.darkMode ?? ThemeEnum.LIGHT
    },
    getThemeColor(): AppThemeType {
      return this.themeColor ?? JSON.stringify(AppThemeEnum)
    }
  },
  actions: {
    setDarkMode(darkMode: ThemeType) {
      this.darkMode = darkMode
      local.set(APP_DARK_MODE_KEY_, this.darkMode)
    },
    setThemeColor(event: string, color: string) {
      this.themeColor = deepMerge(this.themeColor, { [event]: color })
      if(this.themeColor.siderColor === '#ffffff')  menuFont = '#000'
      else menuFont = '#fff'
      setCssVar(SIDER_SELECT_COLOR, this.themeColor.systemColor)
      setCssVar(MENU_THEME_COLOR, menuFont)
      setCssVar(TOP_THEME_COLOR, this.themeColor.headerColor)
      
      local.set(APP_THEME_COLOR_KEY_, this.themeColor)
    },
    initTheme() {
      updateDarkTheme(this.darkMode)
      changeTheme(this.themeColor.systemColor)
      updateHeaderBackground(this.themeColor.headerColor)
      updateSiderBackground(this.themeColor.siderColor)
      setCssVar(SIDER_SELECT_COLOR, this.themeColor.systemColor)
      setCssVar(TOP_THEME_COLOR, this.themeColor.headerColor)
      if(this.themeColor.siderColor === '#ffffff')  menuFont = '#000'
      else menuFont = '#fff'
      setCssVar(MENU_THEME_COLOR, menuFont)
    },
    resetTheme() {
      this.setDarkMode(ThemeEnum.LIGHT)
      this.setThemeColor('systemColor', AppThemeEnum.systemColor)
      this.setThemeColor('headerColor', AppThemeEnum.headerColor)
      this.setThemeColor('siderColor', AppThemeEnum.siderColor)
      this.initTheme()
    }
  }
})

export function useThemeStoreWithOut() {
  return useThemeStore(store)
}
