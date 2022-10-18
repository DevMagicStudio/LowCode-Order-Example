<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ResetInfoType, SendVerifyCodeInfoType } from '@/types/login'
import {
  checkAccountValid,
  // checkPhoneValid,
  checkPasswordValid,
  debounce
} from '@/utils/verify'
// import sendVerifyCode from './sendVerifyCode.vue'
import StrengthMeter from './strengthMeter.vue'

import * as api from '@/api/login'

import { useRouter } from 'vue-router'

import { notification } from 'ant-design-vue'

import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

import { Bcrypt } from '@/utils/bcrypt'
import { message } from 'ant-design-vue'

const props = defineProps({ userEmail: { type: String, default: '' } })

const resetInfo = reactive<ResetInfoType>({
  email: '',
  // phone: '',
  verifyCode: '',
  password: '',
  confirmPassword: ''
})

const resetRules = {
  email: [
    {
      required: true,
      message: t('system.login.accountPlaceholder'),
      trigger: 'blur'
    },
    { validator: checkAccountValid, trigger: 'blur' }
  ],
  // phone: [
  //   {
  //     required: true,
  //     message: t('system.login.mobilePlaceholder'),
  //     trigger: 'blur'
  //   },
  //   { validator: checkPhoneValid, trigger: 'blur' }
  // ],
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
        if (value && value !== resetInfo.password) {
          return Promise.reject(t('system.login.diffPwd'))
        } else {
          return Promise.resolve()
        }
      }),
      trigger: 'change'
    }
  ]
}

onMounted(() => {
  resetInfo.email = props.userEmail ? props.userEmail : ''
})

const emits = defineEmits(['switchForm', 'getUserEmail'])
const clickDiffFormBtn = (formName: string) => {
  emits('switchForm', formName)
}

const updatePw = (password: string) => {
  resetInfo.password = password
}

const resetPasswordForm = ref()
//phone verification before send verify code
const phoneLoginFormValidate = async () => {
  let valid = await resetPasswordForm.value
    .validate('email') //phone
    .catch((err: any) => err)
  if (!valid?.errorFields?.length) return valid
  return false
}

//use api to get verify code
const getVCodeResult = async () => {
  // const data: SendVerifyCodeInfoType = {
  //   email: resetInfo.email,
  //   accountType: 'email',
  //   operationType: 'resetPassword'
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

// verification before reset password
const resetValidate = async () => {
  let valid = await resetPasswordForm.value.validate().catch((err: any) => err)
  if (!valid?.errorFields?.length) return valid
  return false
}

const loading = ref<boolean>(false)
//reset mock
const onResetPassword = async () => {
  const data: ResetInfoType = {
    email: resetInfo.email,
    // phone: resetInfo.phone,
    // verifyCode: resetInfo.verifyCode,
    password: Bcrypt(resetInfo.password)
  }
  try {
    loading.value = true
    let infoCheckResult = await resetValidate()
    if (infoCheckResult) {
      const res = await api.resetPassword(data)
      if (res && res.status === 0) {
        emits('getUserEmail', resetInfo.email)
        clickDiffFormBtn('loginForm')
        notification['success']({
          message: t('system.login.ResetPwdSuccessTitle'), //res.data.message
          description: t('system.login.backToSignin'),
          duration: 2
        })
      } else {
        res.message && message.error(res.message)
      }
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-form-title">{{ t('system.login.forgetFormTitle') }}</div>
    <a-form :model="resetInfo" :rules="resetRules" ref="resetPasswordForm">
      <a-form-item name="email">
        <a-input
          v-model:value="resetInfo.email"
          :placeholder="$t('system.login.accountPlaceholder')"
        />
      </a-form-item>
      <!-- <a-form-item name="phone">
        <a-input
          v-model:value="resetInfo.phone"
          :placeholder="$t('system.login.mobilePlaceholder')"
        />
      </a-form-item> -->
      <!-- <div class="inline-input-btn">
        <a-form-item name="verifyCode">
          <a-input
            v-model:value="resetInfo.verifyCode"
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
        <strength-meter :password="resetInfo.password" @update-pw="updatePw" />
      </a-form-item>
      <a-form-item name="confirmPassword">
        <a-input-password
          v-model:value="resetInfo.confirmPassword"
          :placeholder="$t('system.login.passwordPlaceholderAgain')"
        />
      </a-form-item>
      <div class="bottom-btns">
        <a-button
          type="primary"
          @click.prevent="onResetPassword()"
          html-type="submit"
          :loading="loading"
          >{{ t('system.login.resetButton') }}</a-button
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
