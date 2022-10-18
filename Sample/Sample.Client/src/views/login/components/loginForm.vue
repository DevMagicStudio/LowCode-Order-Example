<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { LoginInfoType } from '@/types/login'
import * as api from '@/api/login'
import { Bcrypt } from '@/utils/bcrypt'
import { checkAccountValid } from '@/utils/verify'
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled
} from '@ant-design/icons-vue'
import { useLoginAccountStoreWithOut } from '@/store/modules/login'
import { useRouter } from 'vue-router'

import { notification } from 'ant-design-vue'

import { useI18n } from '@/hooks/web/useI18n'
import { message } from 'ant-design-vue'

const { t } = useI18n()
const props = defineProps({ userEmail: { type: String, default: '' } })
const loginInfo = reactive<LoginInfoType>({
  email: '',
  password: '',
  rememberMe: true
})

const loginRules = {
  email: [
    {
      required: true,
      message: t('system.login.accountPlaceholder'),
      trigger: 'blur'
    },
    { validator: checkAccountValid, trigger: 'change' }
  ],
  password: [
    {
      required: true,
      message: t('system.login.passwordPlaceholder'),
      trigger: 'blur'
    }
  ]
}
const router = useRouter()

const loginForm = ref()
const loginFormValidate = async () => {
  let valid = await loginForm.value.validate().catch((err: any) => err)
  if (!valid?.errorFields?.length) return valid
  return false
}

const loading = ref<boolean>(false)
//login
const onLogin = async () => {
  const data: LoginInfoType = {
    email: loginInfo.email,
    password: Bcrypt(loginInfo.password),
    rememberMe: loginInfo.rememberMe
  }
  try {
    loading.value = true
    let infoCheckResult = await loginFormValidate()

    if (infoCheckResult) {
      const res = await api.onLogin(data)
      if (res && res.status === 0) {
        const localStore = useLoginAccountStoreWithOut()
        const expireTime = localStore.computeExpireTime(res.data.expireIn)

        localStore.initLoginAccount({
          // ...res.data
          email: loginInfo.email,
          accessToken: res.data.accessToken,
          tokenType: res.data.tokenType,
          expireTime: expireTime
        })
        await router.push('/home')

        notification.success({
          message: t('system.login.loginSuccessTitle'),
          description:
            t('system.login.loginSuccessDesc') + localStore.getUsername,
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

//(mock) third party login
const loginIconClick = async (e: any) => {
  let target = e.target
  if (target && target.className !== 'other-login-icon') {
    while (target.tagName !== 'SPAN') {
      target = target.parentNode
    }
  }
  const way = target.id
  // const code = await api.getAuthCode(way)
  const code = {
    status: 0,
    data: {
      message: 'Third Party permission, ',
      accessCode: 'mockAccessCode:'
    }
  }
  if (code && code.status === 0) {
    message.success(code.data.message + code.data.accessCode + way)
    // const res = await api.thirdPartyLogin(code.data.accessCode)
    // if (res && res.status === 0) {
    //   if (res.data.token === '') {
    //     clickDiffFormBtn('registerForm')
    //   } else {
    // const localStore = useLoginAccountStoreWithOut()
    // localStore.initLoginAccount({
    //   username: 'Admin-test',
    //   userId: 'test-user-id',
    //   token: 'test-token-content'
    //   // testUseAuth: true
    // })
    router.push('/home')
    notification.success({
      message: t('system.login.loginSuccessTitle'),
      description: t('system.login.loginSuccessDesc') + 'Admin-test',
      duration: 2
    })
    //   }
    // }
  }
}
onMounted(() => {
  const loginStore = useLoginAccountStoreWithOut()
  loginInfo.email = props.userEmail
    ? props.userEmail
    : loginStore.getEmail
    ? loginStore.getEmail
    : ''
})

const emits = defineEmits(['switchForm', 'getUserEmail'])
const clickDiffFormBtn = (formName: string) => {
  if (formName === 'resetPasswordForm') {
    emits('getUserEmail', loginInfo.email)
  }
  emits('switchForm', formName)
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-form-title">{{ t('system.login.signInFormTitle') }}</div>
    <a-form
      class="login-form"
      :model="loginInfo"
      :rules="loginRules"
      ref="loginForm"
    >
      <a-form-item name="email">
        <a-input
          v-model:value="loginInfo.email"
          :placeholder="$t('system.login.accountPlaceholder')"
        />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          password
          v-model:value="loginInfo.password"
          :placeholder="$t('system.login.passwordPlaceholder')"
          visibilityToggle
        />
      </a-form-item>
      <div class="login-details-selection">
        <a-checkbox v-model:checked="loginInfo.rememberMe">{{
          t('system.login.rememberMe')
        }}</a-checkbox>
        <a
          class="link"
          @click.prevent="clickDiffFormBtn('resetPasswordForm')"
          >{{ t('system.login.forgetPassword') }}</a
        >
      </div>
      <a-button
        type="primary"
        @click.prevent="onLogin"
        html-type="submit"
        :loading="loading"
        >{{ t('system.login.loginButton') }}</a-button
      >
    </a-form>
    <div class="other-login-ways">
      <!-- <a-button @click="clickDiffFormBtn('phoneForm')">{{
        t('system.login.mobileSignInFormTitle')
      }}</a-button> -->
      <!-- <a-button @click="clickDiffFormBtn('qrCodeForm')">{{
        t('system.login.qrSignInFormTitle')
      }}</a-button> -->
      <a-button @click="clickDiffFormBtn('registerForm')">{{
        t('system.login.registerButton')
      }}</a-button>
    </div>
    <a-divider>{{ t('system.login.otherSignIn') }}</a-divider>
    <div class="other-login-box">
      <div class="other-login-icon">
        <GithubFilled id="github" />
        <WechatFilled id="wechat" />
        <AlipayCircleFilled id="alipay" />
        <GoogleCircleFilled id="google" />
        <TwitterCircleFilled id="twitter" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import '../../../style/login.less';
.login-details-selection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.other-login-ways {
  display: flex;
  justify-content: space-between;
  .ant-btn {
    width: 100%;
    // styles for other button (mobile/QR sign in entry)
    // width: 200px;
    // @media (max-width: 1176px) {
    //   width: 168px;
    // }
    // @media (max-width: 750px) {
    //   width: auto;
    //   margin-bottom: 5px;
    // }
  }
  @media (max-width: 750px) {
    flex-direction: column;
  }
}

.other-login-box {
  .other-login-icon {
    margin: 0 auto;
    width: 65%;
    display: flex;
    justify-content: space-between;
    :deep(.anticon) {
      font-size: 22px;
      color: #888;
      cursor: pointer;
      &:hover {
        color: @button-primary-color;
      }
    }
  }
}
</style>
<style lang="less">
.login-wrapper {
  input:-webkit-autofill {
    box-shadow: none !important;
  }
  input:autofill {
    box-shadow: none !important;
  }
}
html[data-theme='dark'] {
  .login-wrapper {
    .ant-input,
    .ant-input-affix-wrapper {
      border-color: #4a5569;
      background-color: #232a3b;
    }

    .ant-form-item-has-error
      :not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
    .ant-form-item-has-error
      :not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper {
      background-color: #232a3b;
    }
    .ant-divider-inner-text {
      color: #8b949e !important;
    }
    input:-webkit-autofill {
      box-shadow: 0 0 0 1000px#232a3b inset !important;
      -webkit-text-fill-color: #c9d1d9;
    }
    input:autofill {
      box-shadow: 0 0 0 1000px#232a3b inset !important;
      -webkit-text-fill-color: #c9d1d9;
    }
  }
}
.dark .login-wrapper .ant-checkbox-inner {
  border-color: #4a5569;
}
.dark .login-wrapper .ant-input-password .ant-input::placeholder {
  color: #c9d1d9 !important;
}
// .dark .login-wrapper .ant-form-item-control-input-content {
//   background-color: #232a3b !important;
// }
.dark .login-wrapper .consent-checkbox .ant-form-item-control-input-content {
  background-color: #293146 !important;
}
</style>
