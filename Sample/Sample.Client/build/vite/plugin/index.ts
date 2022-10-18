import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import configMockPlugin from './mock'
import configSvgIconsPlugin from './svg'
import { configThemePlugin } from './theme'
import { configStyleImportPlugin } from './styleImport'

export function getPluginsList(
  viteEnv: ViteEnv,
  isBuild: boolean
): (PluginOption | PluginOption[])[] {
  const { VITE_USE_MOCK, VITE_APP_TITLE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      inject: {
        data: {
          title: VITE_APP_TITLE
        }
      }
    }),
    Components()
  ]

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild))

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild))

  return vitePlugins
}
