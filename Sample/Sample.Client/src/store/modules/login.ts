import { message as Message } from 'ant-design-vue'
import type { AccountInformation } from '@/types/login'
import { Status, Result } from '@/utils/http/types.d'
import { LOGINACCOUNT_KEY } from '@/types/storage'
import router from '@/router'
import { useI18n } from '@/hooks/web/useI18n'
import * as api from '@/api/login'

import { defineStore } from 'pinia'
import { store } from '@/store'
import { createLocalStorage } from '@/utils/cache'
import { accountInformation } from '@/types/login'
import { PagePathEnum } from '@/router/types'

const local = createLocalStorage()
const lsLoginAccount = local.get(LOGINACCOUNT_KEY) as AccountInformation

export const useLoginAccountStore = defineStore({
  id: 'login-account-store',
  state: (): AccountInformation => ({
    email: lsLoginAccount?.email ?? accountInformation.email,
    username: lsLoginAccount?.username ?? accountInformation.username,
    userId: lsLoginAccount?.userId ?? accountInformation.userId,
    accessToken: lsLoginAccount?.accessToken ?? accountInformation.accessToken,
    expireTime: lsLoginAccount?.expireTime ?? accountInformation.expireTime
  }),
  getters: {
    getEmail(): string {
      return this.email ?? accountInformation.email
    },
    getUsername(): string {
      return this.username ? this.username : this.email ?? accountInformation.username
    },
    getUserId(): string {
      return this.userId ?? accountInformation.userId
    },
    getToken(): string {
      return this.accessToken ?? accountInformation.accessToken
    }
  },
  actions: {
    setEmail(email: string) {
      this.email = email
      local.set(LOGINACCOUNT_KEY, { ...this.$state, email })
    },
    setUsername(username: string) {
      this.username = username
      local.set(LOGINACCOUNT_KEY, { ...this.$state, username })
    },
    setUserId(userId: string) {
      this.userId = userId
      local.set(LOGINACCOUNT_KEY, { ...this.$state, userId })
    },
    setToken(token: string, tokenType?: string) {
      this.accessToken = tokenType ? tokenType + ' ' + token : token
      local.set(LOGINACCOUNT_KEY, {
        ...this.$state,
        accessToken: this.accessToken
      })
    },
    setExpireTime(expireTime: number) {
      this.expireTime = expireTime
      local.set(LOGINACCOUNT_KEY, {
        ...this.$state,
        expireTime
      })
    },
    computeExpireTime(expireIn: number) {
      // return Date.parse(new Date().toString()) + expireIn
      return Math.round(new Date().getTime() / 1000) + expireIn
    },
    checkExpireTime() {
      const expireTime = this.expireTime ? this.expireTime : 0
      // const currentTimeStamp = Date.parse(new Date().toString())
      const currentTimeStamp = Math.round(new Date().getTime() / 1000)
      if (expireTime === 0 || expireTime < currentTimeStamp) {
        this.removeLoginAccount()
        return false
      }
      return true
    },
    removeLoginAccount() {
      this.$state = { ...accountInformation }
      local.remove(LOGINACCOUNT_KEY)
    },
    initLoginAccount(loginAccount?: AccountInformation) {
      this.setEmail((loginAccount?.email ?? accountInformation.email) as string)
      this.setUsername(
        (loginAccount?.username ?? accountInformation.username) as string
      )
      this.setUserId(
        (loginAccount?.userId ?? accountInformation.userId) as string
      )
      this.setToken(
        loginAccount?.accessToken ?? (accountInformation.accessToken as string),
        loginAccount?.tokenType ?? (accountInformation.tokenType as string)
      )
      this.setExpireTime(
        loginAccount?.expireTime ?? (accountInformation.expireTime as number)
      )
    },

    /**
     * @description: logout
     */
    async logout(logoutParams: any, isGoLogin = false) {
      const { t } = useI18n()
      const res: Result<any> = { status: Status.SUCCESS, message: '' }
      // if (this.accessToken) {
      //   try {
      //     res = await api.onLogout() //logoutParams
      //   } catch {
      //     Message.error(t('system.api.operationFailed'))
      //   }
      // }
      if (res && res.status === 0) {
        this.removeLoginAccount()

        isGoLogin && (await router.push(PagePathEnum.BASE_LOGIN))
      } else {
        res.message && Message.error(res.message)
      }
    }
  }
})

export function useLoginAccountStoreWithOut() {
  return useLoginAccountStore(store)
}
