import { genMessage } from '../util'
import antdLocale from 'ant-design-vue/es/locale/en_US'

const modules: Record<string, { [key: string]: any }> = import.meta.globEager(
  './en/**/*.ts'
)
export default {
  message: {
    ...genMessage(modules, 'en'),
    antdLocale
  },
  dateLocale: null,
  dateLocaleName: 'en'
}
