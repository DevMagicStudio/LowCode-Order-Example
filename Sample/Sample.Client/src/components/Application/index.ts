import { withInstall } from '@/utils'

import appLocalePicker from './src/AppLocalePicker.vue'
import appDarkModeToggle from './src/AppDarkModeToggle.vue'
import themeColorPicker from './src/ThemeColorPicker.vue'

export const AppLocalePicker = withInstall(appLocalePicker)
export const AppDarkModeToggle = withInstall(appDarkModeToggle)
export const ThemeColorPicker = withInstall(themeColorPicker)
