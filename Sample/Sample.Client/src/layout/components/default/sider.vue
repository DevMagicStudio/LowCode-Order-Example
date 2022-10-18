<script setup lang="ts">
import { ref, unref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import AppMenu from '../menu/index.vue'
import AppLogo from '../logo/index.vue'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { useThemeStore } from '@/store/modules/theme'
import { SwitchEnum } from '@/types/settings'

const themeStore = useThemeStore()
const settingsStore = useSettingsStoreWithOut()

const { t } = useI18n()
const collapsed = ref<boolean>(settingsStore.getCollapsed)
const isSiderbgWhite = computed(
  (): boolean => themeStore.getThemeColor.siderColor === '#ffffff'
)
watch(
  () => collapsed.value,
  () => {
    settingsStore.setCollapsed(collapsed.value)
  }
)
</script>
<template>
  <a-layout-sider
    :collapsed="collapsed"
    width="210"
    collapsedWidth="60"
    :trigger="null"
    collapsible
    :style="{
      boxShadow: '2px 0 8px 0  rgb(29 35 41 / 5%)'
    }"
    :class="[{ 'fix-sider': settingsStore.getFixSiderMode === SwitchEnum.ON }]"
  >
    <app-logo
      :collapsed="collapsed"
      :class="[
        'logo',
        unref(isSiderbgWhite) ? ['logo-light', 'border-bottom'] : 'logo-unLight'
      ]"
      v-show="settingsStore.getIsShowLogo === SwitchEnum.ON"
    />

    <app-menu
      :class="[unref(isSiderbgWhite) ? 'menu-light' : 'menu-unLight']"
    />

    <div :class="['shrink', { 'shrink-color': unref(isSiderbgWhite) }]">
      <a-popover
        v-if="collapsed"
        trigger="hover"
        placement="right"
        :content="t('layout.menu.clickClose')"
      >
        <menu-unfold-outlined @click="() => (collapsed = !collapsed)" />
      </a-popover>

      <a-popover
        v-else
        trigger="hover"
        placement="right"
        :content="t('layout.menu.clickOpen')"
      >
        <menu-fold-outlined @click="() => (collapsed = !collapsed)" />
      </a-popover>
    </div>
  </a-layout-sider>
</template>

<style scoped lang="less">
@import '@/layout/style/theme.less';

.logo {
  background-color: @sider-dark-bg-color;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);

  &.border-bottom {
    border-bottom: 1px solid @logo-bottom-border-color;
  }
}

.shrink {
  padding-left: 20px;
  color: #fff;
  font-size: 14px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;
  line-height: 48px;
  box-shadow: -1px -2px 4px -2px #409eff;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: @sider-dark-bg-color;
}
.shrink-color {
  color: #000;
}
.fix-sider {
  position: fixed;
  height: 100%;
}
</style>
