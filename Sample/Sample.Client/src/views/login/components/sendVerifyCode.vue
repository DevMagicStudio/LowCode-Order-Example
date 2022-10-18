<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'

import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const props = defineProps({
  totalCountDownTime: { type: Number, required: true },
  getVCodeResult: { type: Function, reuired: true, default: () => {} },
  enabled: { type: Boolean, default: false },
  size: { type: String, default: 'medium' }
})

let timer = ref<NodeJS.Timer | null>(null)
const countDownTime = ref<number>(0)
const verifyCodeStatus = ref<boolean>(true)
const isProcessing = ref<boolean>(true)

const reciprocalTime = () => {
  if (!timer.value) {
    countDownTime.value = props.totalCountDownTime
    verifyCodeStatus.value = false
    timer.value = setInterval(() => {
      if (
        countDownTime.value > 1 &&
        countDownTime.value <= props.totalCountDownTime
      ) {
        countDownTime.value--
      } else {
        isProcessing.value = true
        verifyCodeStatus.value = true

        clearInterval(Number(timer))
        timer.value = null
      }
    }, 1000)
  }
}

const sendVerifyCode = async () => {
  try {
    const res = await props.getVCodeResult()
    if (res && res.status === 0) {
      isProcessing.value = false
      message.success(res.data.message)
      reciprocalTime()
    } else {
      isProcessing.value = true
      message.error(res.message)
    }
  } catch {
    isProcessing.value = true
  }
}
</script>

<template>
  <a-button
    class="get-verifycode-btn"
    :class="{ 'is-disabled': !(enabled && isProcessing) }"
    @click="sendVerifyCode"
    :disabled="!(enabled && isProcessing)"
    >{{
      verifyCodeStatus
        ? t('system.login.getVerifyCode')
        : t('system.login.resendVerifyCodePrefix') +
          countDownTime +
          t('system.login.resendVerifyCodeSuffix')
    }}</a-button
  >
</template>

<style lang="less" scoped>
@import '../../../style/login.less';
.ant-btn {
  &[disabled],
  &[disabled]:hover {
    color: fade(@button-cancel-color, 40%) !important;
    border-color: fade(@button-cancel-border-color, 40%) !important;
  }
}
@media (max-width: 750px) {
  .ant-btn {
    padding: 4px;
  }
}
</style>
<style lang="less">
html[data-theme='dark'] {
  .login-wrapper {
    .ant-btn {
      &[disabled],
      &[disabled]:hover {
        color: rgba(255, 255, 255, 0.3) !important;
        border-color: #4a5569 !important;
      }
    }
  }
}
</style>
