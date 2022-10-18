/**
 * @description app setting emun and types
 */

export interface LocaleSetting {
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export interface modelType {
  name: string
  type: string
  className1?: string
  className2: string
}

export interface switchType {
  displayName: string
  type: string
  layout: string[]
}

export interface selectType {
  displayName: string
  items: string[]
  layout: string[]
}

export interface inputNumberType {
  displayName: string
  defaultValue: number
  formatter: (value: number) => string
  min: number
  max: number
  step: number
  layout: string[]
}
/*
---------------------------------------
--------- layout ----------------------
---------------------------------------
*/
export enum LayoutModeEnum {
  DEFAULT = 'DEFAULT',
  TOP_MIXIN = 'TOP_MIXIN',
  TOP = 'TOP',
  LEFT_MIXIN = 'LEFT_MIXIN'
}

// Minified versions of the four layout modules
export const navModels: modelType[] = [
  {
    name: 'layout.setting.default',
    type: LayoutModeEnum.DEFAULT,
    className1: 'black-left',
    className2: 'gray-left'
  },
  {
    name: 'layout.setting.top',
    type: LayoutModeEnum.TOP,
    className2: 'gray-top'
  },
  {
    name: 'layout.setting.topMixin',
    type: LayoutModeEnum.TOP_MIXIN,
    className1: 'black-top-mixin',
    className2: 'gray-top-mixin'
  },
  // {
  //   name: 'layout.setting.leftMixin',
  //   type: LayoutModeEnum.LEFT_MIXIN,
  //   className1: 'black-left-mixin',
  //   className2: 'gray-left-mixin'
  // }
]

/*
---------------------------------------
--------- I18n ----------------------
---------------------------------------
*/
export type LocaleType = 'zh_CN' | 'en'

export enum LOCALE {
  ZH_CN = 'zh_CN',
  EN_US = 'en'
}

/*
---------------------------------------
----- Theme ------
---------------------------------------
 */
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light'
}

export type ThemeType = 'dark' | 'light'

export enum SwitchEnum {
  ON = 'on',
  OFF = 'off'
}
export enum ContentEnum {
  FLUID = 'fluid',
  FIXED = 'fixed'
}
export type SwithchType = 'off' | 'on'
export type ContentType = 'fluid' | 'fixed'
export const prefixCls = 'appeon'

export const darkMode = ThemeEnum.LIGHT

export enum AppThemeEnum {
  systemColor = '#0084f4',
  headerColor = '#ffffff',
  siderColor = '#ffffff'
}

export interface AppThemeType {
  systemColor: string
  headerColor: string
  siderColor: string
}

// App theme system color
export const APP_SYSTEM_COLOR_LIST: string[] = [
  '#0084f4',
  '#0960bd',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800'
]

// App theme header color
export const APP_HEADER_COLOR_LIST: string[] = [
  '#ffffff',
  '#151515',
  '#009688',
  '#5172DC',
  '#018ffb',
  '#409eff',
  '#e74c3c',
  '#394664',
  '#383f45'
]

// App theme sider color
export const APP_SIDER_COLOR_LIST: string[] = [
  '#ffffff',
  '#151515',
  '#212121',
  '#273352',
  '#191b24',
  '#001628',
  '#28333E',
  '#344058',
  '#383f45'
]

export const displaySwitchs: switchType[] = [
  // {
  //   displayName: '面包屑',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: '面包屑图标',
  //   layout: [
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: '标签页',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: '标签页刷新按钮',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: '标签页快捷按钮',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: '标签页折叠按钮',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: '左侧菜单',
  //   layout: [
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: '顶栏',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.LEFT_MIXIN
  //   ]
  // },
  // {
  //   displayName: 'Logo',
  //   layout: [
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN,
  //     LayoutModeEnum.TOP
  //   ]
  // },
  // {
  //   displayName: '页脚',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN
  //   ]
  // },
  // {
  //   displayName: '全屏内容',
  //   layout: [
  //     LayoutModeEnum.TOP,
  //     LayoutModeEnum.DEFAULT,
  //     LayoutModeEnum.TOP_MIXIN
  //   ]
  // },
  {
    displayName: 'layout.setting.grayMode',
    type: 'grayMode',
    layout: [
      LayoutModeEnum.TOP,
      LayoutModeEnum.DEFAULT,
      LayoutModeEnum.TOP_MIXIN
    ]
  },
  {
    displayName: 'layout.setting.colorWeak',
    type: 'colorWeak',
    layout: [
      LayoutModeEnum.TOP,
      LayoutModeEnum.DEFAULT,
      LayoutModeEnum.TOP_MIXIN
    ]
  }
]
