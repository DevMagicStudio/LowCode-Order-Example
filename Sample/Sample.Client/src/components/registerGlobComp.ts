import type { App } from 'vue'
import AntDesign from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app.use(AntDesign)
}
