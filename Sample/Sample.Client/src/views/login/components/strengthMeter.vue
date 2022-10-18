<script setup lang="ts">
import { ref, computed } from 'vue'

import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const props = defineProps({ password: { type: String, default: '' } })
const emits = defineEmits(['updatePw'])

const updatePw = (pw: string) => {
  emits('updatePw', pw)
}
const password = ref(props.password)
const getPasswordStrength = computed(() => {
  let score = -1
  if (password.value.length === 0) return -1
  if (/\d/.test(password.value)) score++
  if (/[a-z]/.test(password.value)) score++
  if (/[A-Z]/.test(password.value)) score++
  if (/\W/.test(password.value)) score++
  if (password.value.length > 8) score++
  return score
})
</script>

<template>
  <div>
    <a-input-password
      autoComplete="new-password"
      v-model:value="password"
      :placeholder="$t('system.login.passwordPlaceholder')"
      visibilityToggle
      @input="updatePw($event.target.value)"
    />
    <div class="strength-bar">
      <div class="strength-bar-fill" :data-score="getPasswordStrength"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '../../../style/login.less';
.strength-bar {
  position: relative;
  height: 6px;
  margin: 10px auto 6px;
  background-color: @disabled-color;
  border-radius: 6px;

  &::before,
  &::after {
    position: absolute;
    z-index: 10;
    display: block;
    width: 20%;
    height: inherit;
    background-color: transparent;
    border-color: @white;
    border-style: solid;
    border-width: 0 5px;
    content: '';
  }

  &::before {
    left: 20%;
  }

  &::after {
    right: 20%;
  }

  &-fill {
    position: absolute;
    width: 0;
    height: inherit;
    background-color: transparent;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;

    &[data-score='0'] {
      width: 21%;
      background-color: darken(@error-color, 10%);
    }

    &[data-score='1'] {
      width: 40%;
      background-color: @error-color;
    }

    &[data-score='2'] {
      width: 61%;
      background-color: @warning-color;
    }

    &[data-score='3'] {
      width: 80%;
      background-color: fade(@success-color, 50%);
    }

    &[data-score='4'] {
      width: 100%;
      background-color: @success-color;
    }
  }
}
.dark .strength-bar {
  background-color: #4a5569;

  &::before,
  &::after {
    border-color: #293146;
  }
}
</style>
