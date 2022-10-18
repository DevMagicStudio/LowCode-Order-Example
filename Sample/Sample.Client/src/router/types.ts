import type {
  RouteRecordRaw,
  RouteMeta,
  RouteLocationNormalized
} from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface Meta extends RouteMeta {
  icon?: string
  title?: string
  rank?: number
  showLink?: boolean
  showParent?: boolean
  ignoreAuth?: boolean
  refreshRedirect?: string
}

export interface AppRouteRecordRaw
  extends Omit<RouteRecordRaw, 'component' | 'children'> {
  name?: string
  meta?: Meta
  path: string
  id?: number
  parentId?: number | null
  pathList?: number[]
  component?: Component | string
  children?: AppRouteRecordRaw[]
}

/**
 * @description Whitelist route enumeration
 */
export enum PagePathEnum {
  // Login path
  BASE_LOGIN = '/login',
  // Home path
  BASE_HOME = '/home',
  // Page path
  ERROR_PAGE = '/error'
}

export enum PageNameEnum {
  BASE_LOGIN = 'Login',
  // Home path
  BASE_HOME = 'Home',
  // Page path
  ERROR_PAGE = 'Error'
}

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    refreshRedirect: string
    title: string
    loaded?: boolean
  }
}
