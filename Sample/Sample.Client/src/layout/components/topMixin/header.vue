<script setup lang="ts">
import { unref, computed } from 'vue'
import breadcrumb from '../breadcrumb/index.vue'
import headerAction from '../headerAction/index.vue'
import AppLogo from '../logo/index.vue'
import FirstMenu from '../menu/firstMenu.vue'

import { useThemeStore } from '@/store/modules/theme'
import { useSettingsStore } from '@/store/modules/layout'
import { SwitchEnum } from '@/types/settings'

const settingsStore = useSettingsStore()
const themeStore = useThemeStore()
const blackish = ['#151515', '#394664', '#383f45']

const isHeaderbgWhite = computed(
  (): boolean => themeStore.getThemeColor.headerColor === '#ffffff'
)

const isHeaderbgOther = computed(
  (): boolean => themeStore.getThemeColor.headerColor != '#ffffff'
)

const borderBottom = computed((): string => {
  if (blackish.includes(themeStore.getThemeColor.headerColor)) {
    return '1px solid #3a3a3a'
  } else if (isHeaderbgWhite.value) {
    return '1px solid #e5ebe7'
  } else {
    return '0'
  }
})
</script>

<template>
  <a-layout-header
    :style="{
      borderBottom,
      height: settingsStore.getIsShowHeader == SwitchEnum.ON ? '48px' : '0px'
    }"
    :class="['border-bottom', 'fix-header']"
  >
    <div
      :class="[
        'top',
        { hidheadtop: settingsStore.getIsShowHeader == SwitchEnum.OFF }
      ]"
    >
      <div class="left">
        <app-logo
          :class="[
            'logo',
            unref(isHeaderbgWhite) ? 'logo-light' : 'logo-unLight'
          ]"
          v-show="settingsStore.getIsShowLogo === SwitchEnum.ON"
        />
        <breadcrumb v-show="settingsStore.getAutoSplice == SwitchEnum.OFF" />
      </div>
      <first-menu
        v-if="settingsStore.getAutoSplice === SwitchEnum.ON"
        :class="[
          'header-flex',
          { 'header-menu-shrink': unref(isHeaderbgOther) },
          'menu',
          unref(isHeaderbgWhite) ? 'header-menu-light' : 'header-menu-unLight'
        ]"
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
    border-bottom: 1px solid @header-border-white-color;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .menu {
      background-color: @header-dark-bg-color;
      height: 48px;
      border-bottom: 1px solid var(--header-border-color);
    }

    .left {
      display: flex;
      align-items: center;
      .logo {
        width: 210px;
      }
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
    height: 0px;
    display: none;
  }
  .header-flex {
    height: 100%;
    align-items: center;
    justify-content: center;
    min-width: 0;
    flex: 1;
  }
  .top_model {
    height: 100%;
    align-items: center;
    justify-content: center;
    min-width: 0;
    overflow: inherit;
    flex: 1;

    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu-title) {
      line-height: 48px;
    }
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
