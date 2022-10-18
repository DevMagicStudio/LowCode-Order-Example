<script setup lang="ts">
import { ref, watch, computed, inject, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { getParentPaths } from '@/router/menus'

import MenuItem from './menuItem.vue'

const { currentRoute, options } = useRouter()

const activeFirstMenu = inject('getActiveFirstMenu')
const currentRouteNames = ref()
const openKeys = ref()

let childrenRoute = computed(() => activeFirstMenu.value?.children || [])

watchEffect(() => {
  let path = currentRoute.value.path
  if (currentRoute.value.meta?.refreshRedirect) {
    path = currentRoute.value.meta.refreshRedirect as string
  }
  currentRouteNames.value = [path]

  const parentRoutes = getParentPaths(path, options.routes).filter(
    path => path !== '/'
  )
  openKeys.value = [...parentRoutes]
})
</script>

<template>
  <a-menu
    :openKeys="openKeys"
    v-model:selectedKeys="currentRouteNames"
    mode="inline"
    theme="dark"
    class="sider_menu"
  >
    <menu-item
      v-for="router in childrenRoute"
      :key="router.path"
      :item="router"
    />
  </a-menu>
</template>

<style lang="less" scoped>
.sider_menu {
  height: calc(100% - 48px); // sub header height
  overflow: hidden auto;
  transition: all 0.5s;
}
</style>
