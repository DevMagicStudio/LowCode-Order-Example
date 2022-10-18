import { message as Message } from 'ant-design-vue'
import { useI18n } from '@/hooks/web/useI18n'
import { PureHttpError } from './types'

import { useLoginAccountStoreWithOut } from '@/store/modules/login'

export function checkStatus(error?: PureHttpError): void {
  const { t } = useI18n()
  // @ts-ignore
  const { response, code, message } = error || {}
  const msg: string = response?.data?.error?.message ?? ''
  const err: string = error?.toString?.() ?? ''
  let errMessage = ''

  if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
    errMessage = t('system.api.apiTimeoutMessage')
  }
  if (err?.includes('Network Error')) {
    errMessage = t('system.api.networkExceptionMsg')
  }

  const status = error?.response?.status
  switch (status) {
    case 400:
      errMessage = t('system.api.apiRequestFailed')
      break
    case 401:
      errMessage = msg || t('system.api.errMsg401')
      //user no role
      //....clear login info and to login path
      const accountStore = useLoginAccountStoreWithOut()
      accountStore.logout(true)
      break
    case 403:
      errMessage = t('system.api.errMsg403')
      break
    case 404:
      errMessage = t('system.api.errMsg404')
      break
    case 405:
      errMessage = t('system.api.errMsg405')
      break
    case 408:
      errMessage = t('system.api.errMsg408')
      break
    case 500:
      errMessage = t('system.api.errMsg500')
      break
    case 501:
      errMessage = t('system.api.errMsg501')
      break
    case 502:
      errMessage = t('system.api.errMsg502')
      break
    case 503:
      errMessage = t('system.api.errMsg503')
      break
    case 504:
      errMessage = t('system.api.errMsg504')
      break
    case 505:
      errMessage = t('system.api.errMsg505')
      break
    default:
  }

  if (errMessage) {
    Message.error(errMessage)
  }
}
