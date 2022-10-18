import { computed } from 'vue'
import { setCssVar, lighten, darken } from './util'
import { useSettingsStore } from '@/store/modules/layout'
import { useThemeStore } from '@/store/modules/theme'
import { ThemeEnum } from '@/types/settings'

const blackish = ['#151515', '#394664', '#383f45']

const HEADER_BG_COLOR_VAR = '--header-bg-color'
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color'
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color'
const TOP_MENU_ACTIVE_COLOR = '--top-menu-active-color'
const LOGO_BOTTOM_BORDER_COLOR = '--logo-bottom-border-color'

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color'
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color'
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color'

export function updateHeaderBackground(color?: string) {
  const settingsStore = useSettingsStore()
  const themeStore = useThemeStore()

  const currentDarkMode = computed(
    (): boolean => themeStore.getDarkMode === ThemeEnum.DARK
  )

  if (!color) color = currentDarkMode.value ? '#151515' : '#ffffff'
  themeStore.setThemeColor('headerColor', color)

  const hoverColor = lighten(color, 10)
  setCssVar(HEADER_BG_COLOR_VAR, color)
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor)
  setCssVar(
    HEADER_MENU_ACTIVE_BG_COLOR_VAR,
    color === '#ffffff' ? '#0960bd' : hoverColor
  )
  setCssVar(TOP_MENU_ACTIVE_COLOR, color === '#ffffff' ? '#d9d9d9' : hoverColor)

  if (settingsStore.getAppLayout === 'TOP_MIXIN') {
    if (currentDarkMode.value && color === '#ffffff') {
      setCssVar(LOGO_BOTTOM_BORDER_COLOR, '#e5ebe7')
    } else if (!currentDarkMode.value && !blackish.includes(color)) {
      setCssVar(LOGO_BOTTOM_BORDER_COLOR, '#e5ebe7')
    } else {
      setCssVar(LOGO_BOTTOM_BORDER_COLOR, '#3a3a3a')
    }
  }
}

export function updateSiderBackground(color?: string) {
  const themeStore = useThemeStore()
  const currentDarkMode = computed(
    (): boolean => themeStore.getDarkMode === ThemeEnum.DARK
  )
  if (!color) color = currentDarkMode.value ? '#151515' : '#ffffff'
  themeStore.setThemeColor('siderColor', color)

  setCssVar(SIDER_DARK_BG_COLOR, color)
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color, 6))
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color, 5))
  setCssVar(
    LOGO_BOTTOM_BORDER_COLOR,
    color === '#ffffff' ? '#e5ebe7' : '#3a3a3a'
  )
}
