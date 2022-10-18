import { AppRouteRecordRaw, PageNameEnum, PagePathEnum } from '../../types'
const Layout = () => import('@/layout/index.vue')
const errorRouter: AppRouteRecordRaw = {
  path: PagePathEnum.ERROR_PAGE,
  name: PageNameEnum.ERROR_PAGE,
  component: Layout,
  redirect: '/error/404',
  meta: {
    icon: 'information-line',
    title: 'routes.page.error',
    rank: 9,
    showLink: false,
    ignoreAuth: true
  },
  children: [
    {
      path: '/error/404',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      props: {
        status: 404,
        title: '404',
        subTitle: 'system.exception.subTitle404'
      },
      meta: {
        title: 'routes.page.error',
        icon: 'information-line',
        ignoreAuth: true
      }
    }
  ]
}

export default errorRouter
