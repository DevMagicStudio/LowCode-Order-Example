<script setup lang="ts">
import breadcrumb from '../breadcrumb/index.vue'
import headerAction from '../headerAction/index.vue'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwitchEnum } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()
</script>

<template>
  <a-layout-header
    class="border-bottom"
    :style="{
      height: settingsStore.getIsShowHeader == SwitchEnum.ON ? '48px' : '0px'
    }"
  >
    <div
      :class="[
        'top',
        { hidheadtop: settingsStore.getIsShowHeader == SwitchEnum.OFF }
      ]"
    >
      <breadcrumb />
      <headerAction style="padding-right: 16px" />
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
.ant-layout-header {
  padding: 0;
  height: 86px;
  box-sizing: border-box;
  background-color: @header-dark-bg-color;
  color: @header-text-color;
  &.border-bottom {
    border-bottom: 1px solid @border-color;
  }

  .top {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hidheadtop {
    height: 0px;
    display: none;
  }
}
</style>
