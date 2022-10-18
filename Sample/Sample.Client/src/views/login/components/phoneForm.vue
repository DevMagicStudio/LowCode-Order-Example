<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PhoneLoginInfoType, SendVerifyCodeInfoType } from '@/types/login'
import { checkPhoneValid } from '@/utils/verify'
import sendVerifyCode from './sendVerifyCode.vue'
// import * as api from '@/api/login'

import { useLoginAccountStoreWithOut } from '@/store/modules/login'
import { useRouter } from 'vue-router'

import { notification } from 'ant-design-vue'

import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const phoneLoginInfo = reactive<PhoneLoginInfoType>({
  phone: '',
  verifyCode: ''
})

const phoneLoginRules = {
  phone: [
    {
      required: true,
      message: t('system.login.mobilePlaceholder'),
      trigger: 'blur'
    },
    { validator: checkPhoneValid, trigger: 'change' }
  ],
  verifyCode: [
    {
      required: true,
      message: t('system.login.smsPlaceholder'),
      trigger: 'blur'
    }
  ]
}

const emits = defineEmits(['switchForm'])
const clickDiffFormBtn = (formName: string) => {
  emits('switchForm', formName)
}

const phoneLoginForm = ref()

/**
 * @description Mobile phone number verification method before sending verification code
 */
const phoneLoginFormValidate = async () => {
  let valid = await phoneLoginForm.value
    .validate('phone')
    .catch((err: any) => err)
  if (!valid?.errorFields?.length) return valid
  return false
}

/**
 * @description Call the method of sending verification code interface
 */
const getVCodeResult = async () => {
  // const data: SendVerifyCodeInfoType = {
  //   email: phoneLoginInfo.phone,
  //   accountType: 'phone',
  //   operationType: 'phoneLogin'
  // }
  let VCodeRequestResult = undefined
  let accountCheckResult = await phoneLoginFormValidate()

  if (accountCheckResult) {
    // VCodeRequestResult = await api.sendVerifyCode(data)
    VCodeRequestResult = {
      status: 0,
      message: 'Verification code sent successfully'
    }
  }
  return VCodeRequestResult
}

/**
 * @desciption Check before login
 */
const loginValidate = async () => {
  let valid = await phoneLoginForm.value.validate().catch((err: any) => err)
  if (!valid?.errorFields?.length) return valid
  return false
}

const router = useRouter()

const loading = ref<boolean>(false)
//login mock
const onLogin = async () => {
  const data: PhoneLoginInfoType = {
    phone: phoneLoginInfo.phone,
    verifyCode: phoneLoginInfo.verifyCode
  }
  try {
    loading.value = true
    let infoCheckResult = await loginValidate()
    if (infoCheckResult) {
      //The interface needs to be changed - fields will be added later
      // const res = await api.onLogin(data)
      // if (res && res.status === 0) {
      const localStore = useLoginAccountStoreWithOut()
      localStore.initLoginAccount({
        username: 'Admin',
        token: 'test-token-content'
        // testUseAuth: true
      })
      router.push('/home')
      notification['success']({
        message: t('system.login.loginSuccessTitle'),
        description: t('system.login.loginSuccessDesc') + 'Admin-test',
        duration: 2
      })
      // }
    }
  } catch {
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-form-title">
      {{ t('system.login.mobileSignInFormTitle') }}
    </div>
    <a-form
      :model="phoneLoginInfo"
      :rules="phoneLoginRules"
      ref="phoneLoginForm"
    >
      <a-form-item name="phone">
        <a-input
          v-model:value="phoneLoginInfo.phone"
          :placeholder="$t('system.login.mobilePlaceholder')"
        />
      </a-form-item>
      <div class="inline-input-btn">
        <a-form-item name="verifyCode">
          <a-input
            v-model:value="phoneLoginInfo.verifyCode"
            :placeholder="$t('system.login.smsPlaceholder')"
          />
        </a-form-item>
        <send-verify-code
          :totalCountDownTime="60"
          :enabled="true"
          :getVCodeResult="getVCodeResult"
        />
      </div>

      <div class="bottom-btns">
        <a-button
          type="primary"
          @click.prevent="onLogin()"
          html-type="submit"
          :loading="loading"
          >{{ t('system.login.loginButton') }}</a-button
        >
        <a-button @click="clickDiffFormBtn('loginForm')">{{
          t('system.login.backSignIn')
        }}</a-button>
      </div>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
@import '../../../style/login.less';

.bottom-btns {
  &::after {
    content: '';
    display: block;
    height: 70.84px;
    @media (max-width: 1170px) {
      display: none;
    }
  }
}
</style>
