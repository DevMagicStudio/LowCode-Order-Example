<script setup lang="ts">
import { menus } from '@/router'
import { useRouter } from 'vue-router'
import { ref, watchEffect, computed } from 'vue'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { LayoutModeEnum } from '@/types/settings'
import { getParentPaths } from '@/router/menus'

import MenuItem from './menuItem.vue'

const settingsStore = useSettingsStoreWithOut()
const appLayout = computed(() => settingsStore.getAppLayout)

const { currentRoute, options } = useRouter()
const currentRouteNames = ref()
const openKeys = ref()

watchEffect(() => {
  let path = currentRoute.value.path
  currentRouteNames.value = [path]
  if (currentRoute.value.meta?.refreshRedirect) {
    path = currentRoute.value.meta.refreshRedirect as string
    currentRouteNames.value.push(path)
  }
  const parentRoutes = getParentPaths(path, options.routes).filter(
    path => path !== '/'
  )
  openKeys.value = [...parentRoutes]
})
</script>

<template>
  <a-menu
    :openKeys="openKeys"
    :selectedKeys="currentRouteNames"
    :mode="appLayout === LayoutModeEnum.TOP ? 'horizontal' : 'inline'"
    :theme="appLayout === LayoutModeEnum.TOP ? 'light' : 'dark'"
    :class="[appLayout === LayoutModeEnum.TOP ? 'top_model' : 'sider_menu']"
  >
    <menu-item v-for="router in menus" :key="router.path" :item="router" />
  </a-menu>
</template>

<style lang="less" scoped>
.sider_menu {
  height: calc(100% - 48px - 48px); // sub header height and shrink height
  overflow: hidden auto;
  transition: all 0.5s;
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
</style>
