import 'ant-design-vue/dist/antd.less'
import '@/style/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import setupRouterGuard from '@/router/guard'
import router from '@/router'
import { setupStore } from '@/store'
import { setupI18n } from '@/locales/setupI18n'
import { initAppConfigStore } from '@/settings/initAppConfig'
import { registerGlobComp } from '@/components/registerGlobComp'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  initAppConfigStore()

  registerGlobComp(app)

  await setupI18n(app)

  app.use(router)

  setupRouterGuard(router)

  app.mount('#app')
}

bootstrap()
