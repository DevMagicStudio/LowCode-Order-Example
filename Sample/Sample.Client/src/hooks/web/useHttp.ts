import { message } from 'ant-design-vue'
import { Status, Result } from '@/utils/http/types.d'

export function useHttp(error: string, success?: string) {
  return function (res: Result, callback?: Function) {
    if (res.status === Status.SUCCESS) {
      success && message.success(success)
      callback && callback(res)
    } else {
      message.error(error)
    }
  }
}
