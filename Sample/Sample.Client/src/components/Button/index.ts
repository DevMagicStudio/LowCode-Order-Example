import { withInstall } from '@/utils'

import footerButton from './src/FooterButton.vue'
import showSiderMenu from './src/ShowSiderMenu.vue'
import showTopButton from './src/ShowTopButton.vue'
import showLogo from './src/ShowLogo.vue'
import fixSiderMenu from './src/FixSiderMenu.vue.vue'

export const FooterButton = withInstall(footerButton)
export const ShowSiderMenu = withInstall(showSiderMenu)
export const ShowTopButton = withInstall(showTopButton)
export const ShowLogo = withInstall(showLogo)
export const FixSiderMenu = withInstall(fixSiderMenu)
