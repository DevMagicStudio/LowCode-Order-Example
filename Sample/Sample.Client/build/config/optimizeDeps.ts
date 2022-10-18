import { DepOptimizationOptions } from 'vite'

export const optimizeDeps: DepOptimizationOptions = {
  include: [
    'vue',
    'ant-design-vue/es/locale/zh_CN',
    'ant-design-vue/es/locale/en_US',
    '@ant-design/icons-vue',
    'vite-plugin-theme/es/client',
    'pinia',
    'vue-router',
    'lodash',
    'lodash-es',
    'axios',
    'qs',
    'dayjs',
    'sortablejs',
    '@vueuse/core'
  ]
}
