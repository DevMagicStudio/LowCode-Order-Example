import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

/**
 * @description Check Account，default email
 * @param rule
 * @param value
 * @returns
 */
export function checkAccount(rule: Rule, value: string) {
  const lag = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/

  if (value && !lag.test(value)) {
    return Promise.reject(t('system.login.emailFormatNotValid'))
  } else {
    return Promise.resolve()
  }
}

/**
 * @description Check Phone
 * @param rule
 * @param value
 * @returns
 */
export function checkPhone(rule: Rule, value: string) {
  const lag =
    /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/

  if (value && !lag.test(value)) {
    return Promise.reject(t('system.login.phoneFormatNotValid'))
  } else {
    return Promise.resolve()
  }
}

/**
 * @description Check Password
 * @param rule
 * @param value
 * @returns
 */
export function checkPassword(rule: Rule, value: string) {
  const lag =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]])[\d,a-z,A-Z,`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]]+$/g

  if (value && !lag.test(value)) {
    return Promise.reject(t('system.login.passwordFormatNotValid'))
  } else {
    return Promise.resolve()
  }
}

interface SourceFunction {
  (...args: any[]): any
}

interface TargetFunction {
  (...args: any[]): void
}

/**
 * @description debounce handle
 * @param func
 * @param delay
 * @returns
 */
export function debounce(func: SourceFunction, delay = 500): TargetFunction {
  let timer: ReturnType<typeof setTimeout>
  return async function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    return new Promise(resolve => {
      timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(func(...args)) //func.apply(null,args)
      }, delay)
    })
  }
}

interface validateAccount {
  (rule: any, value: any): void
}

export const checkAccountValid: validateAccount = debounce(checkAccount)
export const checkPhoneValid: validateAccount = debounce(checkPhone)
export const checkPasswordValid: validateAccount = debounce(checkPassword)
