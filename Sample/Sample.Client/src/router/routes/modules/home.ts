import { AppRouteRecordRaw, PageNameEnum, PagePathEnum } from '../../types'

const Layout = () => import('@/layout/index.vue')

const homeRouter: AppRouteRecordRaw = {
  path: '/',
  name: PageNameEnum.BASE_HOME,
  component: Layout,
  redirect: PagePathEnum.BASE_HOME,
  meta: {
    icon: 'home-filled',
    title: 'routes.page.home',
    rank: 0
  },
  children: [
    {
      path: PagePathEnum.BASE_HOME,
      name: 'Welcome',
      component: () => import('@/views/home.vue'),
      meta: {
        title: 'routes.page.home',
        icon: 'home-filled',
        refreshRedirect: '/'
      }
    }
  ]
}

export default homeRouter
