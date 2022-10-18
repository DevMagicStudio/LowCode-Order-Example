import { genMessage } from '../util'
import antdLocale from 'ant-design-vue/es/locale/zh_CN'

const modules: Record<string, { [key: string]: any }> = import.meta.globEager(
  './zh-CN/**/*.ts'
)
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    antdLocale
  }
}
