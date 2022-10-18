import type { App, Plugin } from 'vue'
import { isObject } from '@/utils/is'

/**
 * @description Component install
 * @param component
 * @returns
 */
export const withInstall = <T>(component: T) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName || comp.__name, component)
  }
  return component as T & Plugin
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}
