<script setup lang="ts">
import { reactive } from 'vue'
import formTitle from './formTitle.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emits = defineEmits(['switchForm'])
const clickDiffFormBtn = (formName: string) => {
  emits('switchForm', formName)
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-form-title">
      {{ t('system.login.qrSignInFormTitle') }}
    </div>
    <div class="qr-box"></div>
    <a-divider>{{ t('system.login.scanSign') }}</a-divider>
    <div class="bottom-btns">
      <a-button @click="clickDiffFormBtn('loginForm')">{{
        t('system.login.backSignIn')
      }}</a-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../../../style/login.less';

.qr-box {
  height: 14rem;
}
</style>
