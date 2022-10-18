import { getThemeColors, generateColors } from '@build/config/themeConfig'

import { replaceStyleVariables } from 'vite-plugin-theme/es/client'
import {
  mixLighten,
  mixDarken,
  tinycolor
} from 'vite-plugin-theme/es/colorUtils'
import { isObject } from '@/utils/is'

export * from './dark'
export * from './updateBackground'
export * from './updateColorWeak'
export * from './updateGrayMode'

export async function changeTheme(color: string) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color
  })

  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors]
  })
}

//Used for object assignment without changing the original object
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}
