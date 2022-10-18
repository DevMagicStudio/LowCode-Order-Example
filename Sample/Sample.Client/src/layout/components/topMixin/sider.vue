<script setup lang="ts">
import { ref, unref, computed, watch, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import AppMenu from '../menu/index.vue'
import SplitMenu from '../menu/splitMenu.vue'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { useThemeStore } from '@/store/modules/theme'
import { SwitchEnum } from '@/types/settings'

const { t } = useI18n()
const themeStore = useThemeStore()
const settingsStore = useSettingsStoreWithOut()
const collapsed = ref<boolean>(settingsStore.getCollapsed)

const isSiderbgWhite = computed(
  (): boolean => themeStore.getThemeColor.siderColor === '#ffffff'
)
const activeFirstMenu = inject('getActiveFirstMenu')
const isShowSpliceMenu = computed(() => {
  if (activeFirstMenu?.value?.children?.length > 1) {
    if (activeFirstMenu?.value?.children[0]?.meta?.showParent != false) {
      return true
    }
  }

  return false
})

watch(
  () => collapsed.value,
  () => {
    settingsStore.setCollapsed(collapsed.value)
  }
)
</script>

<template>
  <div
    :class="['fix-siderbar', { 'shrink-sider': settingsStore.getCollapsed }]"
    v-show="
      settingsStore.getFixSiderMode === SwitchEnum.ON &&
      (settingsStore.getAutoSplice !== SwitchEnum.ON || unref(isShowSpliceMenu))
    "
  ></div>
  <a-layout-sider
    v-if="
      settingsStore.getAutoSplice !== SwitchEnum.ON || unref(isShowSpliceMenu)
    "
    :collapsed="collapsed"
    width="210"
    collapsedWidth="60"
    :trigger="null"
    collapsible
    :class="[{ 'fix-sider': settingsStore.getFixSiderMode === SwitchEnum.ON }]"
    :style="[
      {
        'padding-top':
          settingsStore.getFixSiderMode == SwitchEnum.ON &&
          settingsStore.getIsShowHeader == SwitchEnum.ON
            ? '45px'
            : '0px'
      },
      { boxShadow: '2px 0 8px 0 rgb(29, 35 41 / 5%)' }
    ]"
  >
    <split-menu
      v-if="settingsStore.getAutoSplice == SwitchEnum.ON"
      :class="[unref(isSiderbgWhite) ? 'menu-light' : 'menu-unLight']"
    />
    <app-menu
      v-if="settingsStore.getAutoSplice == SwitchEnum.OFF"
      :class="[
        'sider-height',
        unref(isSiderbgWhite) ? 'menu-light' : 'menu-unLight'
      ]"
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

<style lang="less" scoped>
@import '@/layout/style/theme.less';
.shrink {
  padding-left: 20px;
  color: white;
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
.sider-height {
  height: 100%;
}
.fix-sider {
  position: fixed;
  height: 100%;
  top: 0px;
  padding-top: 48px;
}

.fix-siderbar {
  max-width: 210px;
  min-width: 210px;
  width: 210px;
  overflow: hidden;
  transition: all 0.5s;
}
.shrink-sider {
  max-width: 60px !important;
  min-width: 60px !important;
  transition: all 0.5s;
}
</style>
