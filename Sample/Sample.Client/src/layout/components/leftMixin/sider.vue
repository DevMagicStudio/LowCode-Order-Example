<script setup lang="ts">
import { ref } from 'vue'
import SpecialMenu from '../specialMenu/index.vue'

const collapsed = ref<boolean>(false)
const siderWidth = ref<number>(80)
const changeWidth = (width: number) => {
  siderWidth.value = width
}
</script>

<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :width="siderWidth"
    collapsedWidth="60"
    :trigger="null"
    collapsible
    :style="{
      boxShadow: '2px 0 8px 0 rgb(29, 35 41 / 5%)'
    }"
  >
    <special-menu @change-width="changeWidth" />
  </a-layout-sider>
</template>

<style scoped lang="less">
.shrink {
  padding-left: 20px;
  color: white;
  font-size: 14px;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  line-height: 40px;
  box-shadow: -1px -2px 4px -2px #409eff;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
