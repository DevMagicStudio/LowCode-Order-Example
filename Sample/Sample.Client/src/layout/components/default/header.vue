<script setup lang="ts">
import breadcrumb from '../breadcrumb/index.vue'
import headerAction from '../headerAction/index.vue'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwitchEnum } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()
</script>

<template>
  <a-layout-header
    :style="{
      height: settingsStore.getIsShowHeader == SwitchEnum.ON ? '48px' : '0px'
    }"
    :class="[
      { 'fix-header': settingsStore.getFixHeader === SwitchEnum.ON },
      {
        'shrink-header':
          settingsStore.getCollapsed &&
          settingsStore.getFixHeader === SwitchEnum.ON
      }
    ]"
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
  box-sizing: border-box;
  background-color: @header-dark-bg-color;
  color: @header-text-color;

  .top {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid @header-action-bottom-border-color;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

    :deep(.ant-space) {
      .ant-space-item {
        &:hover {
          background-color: rgba(204, 204, 204, 0.4) !important;
        }
      }
    }
  }
  .hidheadtop {
    height: 0px;
    display: none;
  }
}
.fix-header {
  position: fixed;
  top: 0;
  z-index: 88;
  height: 48px;
  width: calc(100% - 210px);
  transition: all 0.5s;
}
.shrink-header {
  width: calc(100% - 60px) !important;
  transition: all 0.5s;
}
</style>
