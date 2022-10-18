<script lang="ts" setup>
import { ref, onMounted, inject, watchEffect } from 'vue'
import { ClusterOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { menus } from '@/router'
import { getParentPaths } from '@/router/menus'
import { useI18n } from '@/hooks/web/useI18n'
import { AppRouteRecordRaw } from '@/router/types'
const { t } = useI18n()

const { currentRoute, options } = useRouter()
const setActiveFirstMenu = inject('setActiveFirstMenu', () => {})

// filter menus
const menuHasChildren = (
  children: AppRouteRecordRaw[] = [],
  parent: AppRouteRecordRaw
) => {
  let onlyOneChild = {}
  const showingChildren = children.filter((item: any) => {
    onlyOneChild = item
    return true
  })

  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '', noShowingChildren: true }
    return onlyOneChild
  }

  if (showingChildren[0]?.meta?.showParent) {
    return parent
  }

  if (showingChildren.length === 1) {
    return onlyOneChild
  }

  return parent
}

const newMenus: AppRouteRecordRaw[] = []
menus.forEach(menu => {
  const onlyOneChild = menuHasChildren(menu.children, menu)
  newMenus.push(onlyOneChild)
})

const currentRouteNames = ref()

const onClickMenu = (item: { key: any }) => {
  const activeFirstMenu = newMenus.find(menu => menu.path === item.key)
  setActiveFirstMenu(activeFirstMenu)
}

watchEffect(() => {
  let path = currentRoute.value.path
  currentRouteNames.value = [path]
  if (currentRoute.value.meta?.refreshRedirect) {
    path = currentRoute.value.meta.refreshRedirect as string
    currentRouteNames.value.push(path)
  }

  if (
    !currentRouteNames.value.includes('/') &&
    !newMenus.find(menu => menu.path === path)
  ) {
    currentRouteNames.value = getParentPaths(path, options.routes).filter(
      path => path !== '/'
    )
  }

  onClickMenu({ key: currentRouteNames.value[0] })
})
</script>

<template>
  <a-menu
    :selectedKeys="currentRouteNames"
    class="top_model"
    mode="horizontal"
    theme="light"
    @click="onClickMenu"
  >
    <a-menu-item
      v-for="menu in newMenus"
      :key="menu.path"
      style="margin-top: 0"
    >
      <template v-if="menu.meta.icon" #icon>
        <cluster-outlined :style="{ fontSize: '18px' }" />
      </template>
      <router-link :to="menu.children ? menu.children[0].path : menu.path">
        {{ t(menu?.meta?.title) }}
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<style lang="less" scoped>
.top_model {
  :deep(.ant-menu-item),
  :deep(.ant-menu-submenu-title) {
    line-height: 48px;
  }
}
</style>
