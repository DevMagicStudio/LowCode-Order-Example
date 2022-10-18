/**
 * @description login types and enums
 * */
export interface LoginInfoType {
  email: string
  password: string
  rememberMe?: boolean
}
export interface PhoneLoginInfoType {
  phone: string
  verifyCode: string
}
export interface RegisterInfoType {
  email: string
  // phone: string
  verifyCode?: string
  password: string
  confirmPassword?: string
  consent?: Boolean
}
export interface ResetInfoType {
  email: string
  // phone: string
  verifyCode?: string
  password: string
  confirmPassword?: string
}

export interface AccountInfoType {
  account: string
  token: string
  avatar: string
  phone: string
}
export interface SendVerifyCodeInfoType {
  email: string
  accountType: string
  operationType: string
}
export interface AccountInformation {
  email?: string
  username?: string
  userId?: string
  // avatar: string
  accessToken: string
  tokenType?: string
  expireTime: number
}

export const accountInformation: AccountInformation = {
  email: '',
  username: '',
  userId: '',
  // avatar: '',
  accessToken: '',
  tokenType: '',
  expireTime: 0
}
