import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { warpperEnv } from './build/index'
import { createProxy } from './build/vite/proxy'
import { getPluginsList } from './build/vite/plugin'
import { optimizeDeps } from './build/config/optimizeDeps'
import { generateModifyVars } from './build/generate/generateModifyVars'

/**
 * @description path resolve
 * @param dir
 * @returns
 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

/**
 * @description Set alias
 */
const alias: Record<string, string> = {
  '@': pathResolve('src'),
  '@build': pathResolve('build')
  // '/#': pathResolve('src/utils'),
}

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root: string = process.cwd()

  const viteEnv = warpperEnv(loadEnv(mode, root))
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY_DOMAIN,
    VITE_PROXY_DOMAIN_REAL
  } = viteEnv
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: { alias },
    server: {
      https: false,
      open: true,
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: createProxy(VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL)
    },
    plugins: getPluginsList(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps
  }
}
