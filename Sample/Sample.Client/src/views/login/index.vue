<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { loadEnv } from '@build/index'

import loginForm from './components/loginForm.vue'
import registerForm from './components/registerForm.vue'
import resetPasswordForm from './components/resetPasswordForm.vue'
import phoneForm from './components/phoneForm.vue'
import qrCodeForm from './components/qrCodeForm.vue'

import { AppLocalePicker, AppDarkModeToggle } from '@/components/Application'

import { useThemeStoreWithOut } from '@/store/modules/theme'

const { t } = useI18n()
const { VITE_APP_TITLE } = loadEnv()

const currentForm = ref<string>('loginForm')
const forms = shallowRef<object>({
  loginForm,
  registerForm,
  resetPasswordForm,
  phoneForm,
  qrCodeForm
})

const userEmail = ref<string>('')

const getUserEmail = (email: string) => {
  userEmail.value = email
}

const onSwitchForm = (formName: string) => {
  currentForm.value = formName
}

const themeStore = useThemeStoreWithOut()
const isBlack = computed(() => {
  return themeStore.getDarkMode === 'light'
})
</script>

<template>
  <div class="login-page">
    <div class="main-box">
      <div class="logo">
        <div style="display: flex">
          <img class="logo-img" src="../../assets/svg/logo.svg" alt="logo" />
          <span class="logo-title">
            {{ VITE_APP_TITLE }}
          </span>
        </div>
        <div class="global-settings">
          <app-locale-picker :reload="true" :is-black="isBlack" />
          <app-dark-mode-toggle class="login-dark-mode-toggle" />
        </div>
      </div>
      <a-row>
        <a-col :xs="0" :sm="0" :md="0" :lg="0" :xl="12">
          <div class="content-col left-col">
            <div class="welcome-title">
              <img alt="" src="../../assets/svg/login-box-bg.svg" />
              <div class="welcome-content">
                <h1>{{ t('system.login.signInTitle') }}</h1>
                <p>{{ t('system.login.signInDesc') }}</p>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12" class="content-col">
          <div class="form-container">
            <transition name="fade-slide" mode="out-in">
              <component
                :is="forms[currentForm]"
                @switch-form="onSwitchForm"
                :user-email="userEmail"
                @get-user-email="getUserEmail"
              />
            </transition>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  width: 100%;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(../../assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';

    //breakpoint:1170px
    @media (max-width: 1170px) {
      display: none;
    }
  }

  .main-box {
    width: 90%;
    max-width: 1600px;
    margin: 0 auto;
    position: relative;

    .logo {
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: space-between;
      top: 1.2rem;
      z-index: 3;

      .logo-img {
        width: 38px;
        @media (max-width: 750px) {
          width: 36px;
        }
      }

      .logo-title {
        color: @white;
        font-size: 24px;
        font-weight: 700;
        margin: 0.5rem;
        transition: all 0.5s;
        @media (max-width: 1170px) {
          color: #293146;
        }
        @media (max-width: 750px) {
          font-size: 16px;
        }
      }

      .global-settings {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .login-dark-mode-toggle {
          margin-left: 10px;
        }
      }
    }

    .content-col {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .welcome-title {
      img {
        margin-top: -4rem;
        width: 50%;
        max-width: 100%;
      }

      .welcome-content {
        margin-top: 2.5rem;

        h1 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          color: #ffffff;
          margin: 1rem 0 0 0;
        }

        p {
          color: #ffffff;
          margin: 1.25rem 0 0 0;
        }
      }
    }

    .form-container {
      width: 404px;
      @media (max-width: 1170px) {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: #ffffff;
        padding: 32px;
        border-radius: 4px;
      }
      @media (max-width: 750px) {
        width: 350px;
        min-width: 350px;
      }
    }
  }
}

html[data-theme='dark'] {
  .login-page {
    background-color: #293146;

    &::before {
      background-image: url(../../assets/svg/login-bg-dark.svg);
    }
  }

  .logo-title {
    color: @white;
  }

  .form-container {
    @media (max-width: 1170px) {
      background-color: transparent !important;
      box-shadow: 0 0 3px 3px #7d7f8585;
    }
  }
}
</style>
