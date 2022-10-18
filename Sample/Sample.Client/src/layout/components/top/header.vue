<script setup lang="ts">
import { computed } from 'vue'
import AppLogo from '../logo/index.vue'
import headerAction from '../headerAction/index.vue'
import AppMenu from '../menu/index.vue'

import { useThemeStore } from '@/store/modules/theme'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwitchEnum } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()

const themeStore = useThemeStore()
const isHeaderbgWhite = computed(
  (): boolean => themeStore.getThemeColor.headerColor === '#ffffff'
)
</script>

<template>
  <a-layout-header
    :style="{
      height: settingsStore.getIsShowHeader == SwitchEnum.ON ? '48px' : '0px'
    }"
    :class="[
      'border-bottom',
      { 'fix-header': settingsStore.getFixHeader === SwitchEnum.ON }
    ]"
  >
    <div
      :class="[
        'top',
        { hidheadtop: settingsStore.getIsShowHeader == SwitchEnum.OFF }
      ]"
    >
      <app-logo
        :class="['logo', isHeaderbgWhite ? 'logo-light' : 'logo-unLight']"
        v-show="settingsStore.getIsShowLogo === SwitchEnum.ON"
      />
      <app-menu
        :class="[
          'menu',
          isHeaderbgWhite ? 'header-menu-light' : 'header-menu-unLight'
        ]"
        :style="{
          justifyContent:
            settingsStore.getIsShowLogo == SwitchEnum.OFF ? 'left' : 'center'
        }"
      />
      <headerAction style="padding-right: 16px" />
    </div>
  </a-layout-header>
</template>

<style lang="less" scoped>
@import '@/layout/style/theme.less';

.ant-layout-header {
  padding: 0;
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
    padding-left: 6px;

    .menu {
      background-color: @header-dark-bg-color;
      height: 48px;
      border-bottom: 1px solid var(--header-border-color);
    }

    :deep(.ant-space) {
      .ant-space-item {
        &:hover {
          background-color: rgba(204, 204, 204, 0.4) !important;
        }
      }
    }
  }

  .hidheadtop {
    height: 48px;
    display: none;
  }
  .menu-left {
    justify-content: left;
  }
}
.fix-header {
  position: fixed;
  top: 0;
  z-index: 88;
  height: 48px;
  width: 100%;
  transition: all 0.5s;
}
</style>
