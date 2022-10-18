import { http } from '../utils/http'

import type { LoginInfoType } from '@/types/login'

/**
 * @description User login
 * @param {String} email Login email
 * @param {String} password Password
 * @returns
 */
export const onLogin = async (data: { email: string; password: string }) => {
  return http.request('post', '/api/Account/Login', {
    data
  })
}

/**
 * @description User register
 * @param {String} email Register email
 * @param {String} password Password
 * @returns
 */
export const onRegister = async (data: { email: string; password: string }) => {
  return http.request('post', '/api/Account/Register', {
    data
  })
}

/**
 * @description Request User third party authorization
 * @param {String} loginWays (e.g.)
 * @returns
 */
export const getAuthCode = async (data: { loginWay: string }) => {
  return http.request('post', '/api/login/thirdPartyAuth', {
    data
  })
}

/**
 * @description  User Third party authorization Login
 * @param {String} authorization code (e.g.)
 * @returns
 */
export const thirdPartyLogin = async (data: { authCode: string }) => {
  return http.request('post', '/api/login/thirdPartyLogin', {
    data
  })
}

/**
 * @description Send the verification code
 * @param {String} account Account (currently: mobile phone number)
 * @param {String} accountType phone
 * @param {String} operationType register/resetPassword/phoneLogin
 */
export const sendVerifyCode = async (data: {
  account: string
  accountType: string
  operationType: string
}) => {
  return http.request('post', '/api/login/sendVerifyCode', {
    data
  })
}

/**
 * @description Reset Password
 * @param {String} account Account (currently: mobile phone number)
 * @param {String} accountType phone
 * @param {String} operationType register/resetPassword/phoneLogin
 */
export const resetPassword = async (data: {
  email: string
  // phone: string
  // verifyCode: string
  password: string
}) => {
  return http.request('post', '/api/Account/ResetPassword', {
    data
  })
}

/**
 * @description User logout
 * @param {String} logoutId Logout number
 * @returns
 */
export const onLogout = async () => {
  return http.request('post', '/api/Account/LoginOut')
}

/**
 * @description Account authentication
 * @returns
 */
export const isAuthenticated = async () => {
  return http.request('get', '/api/Values')
}

/**
 * @description require cookie for rememberMe use
 * @returns
 */
export const requireRemember = async () => {
  return http.request('get', '/api/requireRem')
}
