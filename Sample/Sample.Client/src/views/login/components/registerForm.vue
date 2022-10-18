<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RegisterInfoType, SendVerifyCodeInfoType } from '@/types/login'
import {
  checkAccountValid,
  // checkPhoneValid,
  checkPasswordValid,
  debounce
} from '@/utils/verify'
// import sendVerifyCode from './sendVerifyCode.vue'
import * as api from '@/api/login'
import { notification } from 'ant-design-vue'

import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

import StrengthMeter from './strengthMeter.vue'

import { Bcrypt } from '@/utils/bcrypt'
import { message } from 'ant-design-vue'
const registerInfo = reactive<RegisterInfoType>({
  email: '',
  verifyCode: '',
  password: '',
  confirmPassword: '',
  consent: false
})
const registerRules = {
  email: [
    {
      required: true,
      message: t('system.login.accountPlaceholder'),
      trigger: 'blur'
    },
    { validator: checkAccountValid, trigger: 'change' }
  ],
  // verifyCode: [
  //   {
  //     required: true,
  //     message: t('system.login.smsPlaceholder'),
  //     trigger: 'blur'
  //   }
  // ],
  password: [
    {
      required: true,
      message: t('system.login.passwordPlaceholder'),
      trigger: 'blur'
    },
    {
      min: 6,
      max: 30,
      message: t('system.login.PwdLength')
    },
    { validator: checkPasswordValid, trigger: 'change' }
  ],
  confirmPassword: [
    {
      required: true,
      message: t('system.login.passwordPlaceholder'),
      trigger: 'blur'
    },
    {
      validator: debounce((rule, value) => {
        if (value && value !== registerInfo.password) {
          return Promise.reject(t('system.login.diffPwd'))
        } else {
          return Promise.resolve()
        }
      }),
      trigger: 'change'
    }
  ],
  consent: [
    {
      validator: (rule, value) => {
        if (value === false) {
          return Promise.reject(t('system.login.policyPlaceholder'))
        } else {
          return Promise.resolve()
        }
      }
    }
  ]
}

const updatePw = (password: string) => {
  registerInfo.password = password
}

const emits = defineEmits(['switchForm', 'getUserEmail'])
const clickDiffFormBtn = (formName: string) => {
  emits('switchForm', formName)
}

const registerForm = ref()
//email validification
const emailLoginFormValidate = async () => {
  let valid = await registerForm.value
    .validate('email')
    .catch((err: any) => err)
  if (!valid?.errorFields?.length) return valid
  return false
}

const getVCodeResult = async () => {
  // const data: SendVerifyCodeInfoType = {
  //   email: registerInfo.email,
  //   accountType: 'email',
  //   operationType: 'register'
  // }
  let VCodeRequestResult = undefined
  let accountCheckResult = await emailLoginFormValidate()

  if (accountCheckResult) {
    // VCodeRequestResult = await api.sendVerifyCode(data)
    VCodeRequestResult = {
      status: 0,
      message: 'Verification code sent successfully'
    }
  }
  return VCodeRequestResult
}

const loginValidate = async () => {
  let valid = await registerForm.value.validate().catch((err: any) => err)
  if (!valid?.errorFields?.length) return valid
  return false
}

const loading = ref<boolean>(false)

//register mock
const onRegister = async () => {
  const data: RegisterInfoType = {
    email: registerInfo.email,
    // verifyCode: registerInfo.verifyCode,
    password: Bcrypt(registerInfo.password)
  }
  try {
    loading.value = true
    let infoCheckResult = await loginValidate()
    if (infoCheckResult) {
      const res = await api.onRegister(data)
      if (res && res.status === 0) {
        notification['success']({
          message: t('system.login.SignUpSuccessTitle'),
          description: t('system.login.SignUpSuccessDesc'),
          duration: 2
        })
        emits('getUserEmail', registerInfo.email)
        emits('switchForm', 'loginForm')
      } else {
        res.message && message.error(res.message)
      }
    }
    // } catch {
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-form-title">{{ t('system.login.signUpFormTitle') }}</div>
    <a-form :model="registerInfo" :rules="registerRules" ref="registerForm">
      <a-form-item name="email">
        <a-input
          v-model:value="registerInfo.email"
          :placeholder="$t('system.login.accountPlaceholder')"
        />
      </a-form-item>
      <!-- <a-form-item name="phone">
        <a-input
          v-model:value="registerInfo.phone"
          :placeholder="$t('system.login.mobilePlaceholder')"
        />
      </a-form-item> -->
      <!-- <div class="inline-input-btn">
        <a-form-item name="verifyCode">
          <a-input
            v-model:value="registerInfo.verifyCode"
            :placeholder="$t('system.login.smsPlaceholder')"
          />
        </a-form-item>
        <send-verify-code
          :totalCountDownTime="60"
          :enabled="true"
          :getVCodeResult="getVCodeResult"
        />
      </div> -->

      <a-form-item name="password">
        <!-- <a-input-password
          v-model:value="registerInfo.password"
          :placeholder="$t('system.login.passwordPlaceholder')"
          visibilityToggle
        /> -->
        <strength-meter
          :password="registerInfo.password"
          @update-pw="updatePw"
        />
      </a-form-item>
      <a-form-item name="confirmPassword">
        <a-input-password
          v-model:value="registerInfo.confirmPassword"
          :placeholder="$t('system.login.passwordPlaceholderAgain')"
        />
      </a-form-item>
      <a-form-item name="consent" class="consent-checkbox">
        <a-checkbox v-model:checked="registerInfo.consent">{{
          t('system.login.policy')
        }}</a-checkbox>
      </a-form-item>
      <div class="bottom-btns">
        <a-button
          type="primary"
          @click.prevent="onRegister()"
          html-type="submit"
          :loading="loading"
          >{{ t('system.login.registerButton') }}</a-button
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
