import { AppRouteRecordRaw, PageNameEnum, PagePathEnum } from '../types'

// Routing of business modules
const modulesFiles: Recordable = import.meta.globEager('./modules/*.ts')
export const modulesRouter = Object.keys(modulesFiles).reduce(
  (res: AppRouteRecordRaw[], key: string): AppRouteRecordRaw[] => {
    // Exclude array types
    if (!Array.isArray(modulesFiles[key].default)) {
      res.push(modulesFiles[key].default)
      return res
    } else {
      return res.concat(modulesFiles[key].default)
    }
  },
  [] as AppRouteRecordRaw[]
)
// console.log(modulesRouter)

// Login route
export const loginRouter: AppRouteRecordRaw[] = [
  {
    path: PagePathEnum.BASE_LOGIN,
    name: PageNameEnum.BASE_LOGIN,
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Login'
    }
  }
]

// whitelist routing
export const notFoundRouter: AppRouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/error/404'
  }
]

export const whiteListRouter: AppRouteRecordRaw[] = [...loginRouter, ...notFoundRouter]
// export const basicRoutes = [loginRouter, ...modulesRouter, ...notFoundRouter]
