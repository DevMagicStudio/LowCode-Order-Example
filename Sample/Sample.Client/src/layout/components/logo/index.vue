<script setup lang="ts">
import { loadEnv } from '@build/index'
import { useGo } from '@/hooks/web/usePage'
import logoSvg from '@/assets/svg/logo.svg'

const go = useGo()

const { VITE_APP_TITLE: title } = loadEnv()

const props = defineProps({
  collapsed: {
    type: Boolean as PropType<boolean>,
    default: false
  }
})

function goHome() {
  go()
}
</script>

<template>
  <div class="logo" @click="goHome">
    <img :src="logoSvg" />
    <span class="title" v-show="!props.collapsed">
      {{ title }}
    </span>
  </div>
</template>

<style lang="less" scoped>
@import '@/layout/style/theme.less';

.logo {
  height: 48px;
  max-width: 211px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  img {
    width: 28px;
    height: 28px;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
