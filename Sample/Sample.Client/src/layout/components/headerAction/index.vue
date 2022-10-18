<script setup lang="ts">
import { unref, computed } from 'vue'
import AppeonNotification from './components/notification/index.vue'
import AppeonSearch from './components/search/index.vue'
import AppeonFullScreen from './components/fullScreen.vue'
import AppeonRefresh from './components/refresh.vue'
import AppeonUserDropdown from './components/userDropdown/index.vue'
import AppeonSettings from './components/settings/index.vue'

//get account info from store
import { useThemeStore } from '@/store/modules/theme'

const themeStore = useThemeStore()

const isHeaderbgWhite = computed(
  (): boolean => themeStore.getThemeColor.headerColor === '#ffffff'
)

const isBlackLocale = computed(() => {
  return themeStore.getThemeColor.headerColor === '#ffffff'
})
</script>

<template>
  <a-space
    :size="20"
    :class="[
      unref(isHeaderbgWhite) ? 'header-action-light' : 'header-action-unLight'
    ]"
  >
    <appeon-refresh />

    <!-- <appeon-search /> -->

    <appeon-full-screen />

    <AppLocalePicker
      :reload="true"
      :className="true"
      :is-black="isBlackLocale"
    />

    <!-- <appeon-notification /> -->

    <appeon-user-dropdown />

    <appeon-settings />
  </a-space>
</template>

<style lang="less" scoped>
@import '@/layout/style/theme.less';

.ant-space {
  height: 100%;
  gap: 4px !important;
  padding-right: 0 !important;

  :deep(.ant-space-item) {
    height: 48px;
    line-height: 48px;
    cursor: pointer;

    span {
      font-size: 16px;
    }
  }
}
</style>
