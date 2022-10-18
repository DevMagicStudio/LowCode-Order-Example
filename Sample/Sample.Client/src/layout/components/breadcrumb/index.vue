<script setup lang="ts">
import { PagePathEnum, AppRouteRecordRaw } from '@/router/types'
import { useRouter } from 'vue-router'
import { menus } from '@/router'
import { ref, watchEffect, computed } from 'vue'
import { getParentPaths, findRouteByPath } from '@/router/menus'
import { useThemeStore } from '@/store/modules/theme'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const themeStore = useThemeStore()
const { currentRoute, options } = useRouter()
const routesChildren = options.routes[0].children
const list = ref<AppRouteRecordRaw[]>([])

const isHeaderbgWhite = computed(
  (): boolean => themeStore.getThemeColor.headerColor === '#ffffff'
)

watchEffect(() => {
  getBreadcrumbList()
})
function getBreadcrumbList() {
  const current = routesChildren?.find(
    r => r.name === currentRoute.value.name
  ) as AppRouteRecordRaw

  if (!current || current.path === PagePathEnum.BASE_HOME) {
    list.value = [currentRoute.value as unknown as AppRouteRecordRaw]
    return
  }

  let searchPath = current.path
  if (current.meta?.refreshRedirect) {
    searchPath = current.meta?.refreshRedirect
  }

  const parentPaths = getParentPaths(searchPath, options.routes)
  const matched = parentPaths.reduce((res, path) => {
    const router = findRouteByPath(path, menus)
    if (router) {
      res.push(filterItem(router))
    }
    return res
  }, [] as AppRouteRecordRaw[])

  if (matched[matched.length - 1].path !== currentRoute.value.path) {
    const current = findRouteByPath(currentRoute.value.path, options.routes)
    if (current) {
      matched.push(current)
    }
  }
  list.value = matched
}

function filterItem(router: AppRouteRecordRaw) {
  if (router.children && router.children.length > 0) {
    if (router.children[0].meta?.showParent) {
      return router
    }
    if (router.children.length === 1) {
      return router.children[0]
    }
  }
  return router
}
</script>

<template>
  <div
    :class="[
      'breadcrumb',
      isHeaderbgWhite ? 'breadcrumb-light' : 'breadcrumb-unLight'
    ]"
  >
    <a-breadcrumb :routes="list">
      <template #itemRender="{ route: routesMatched, paths }">
        <span v-if="list.indexOf(routesMatched) === list.length - 1">
          {{ t(routesMatched.meta.title) }}
        </span>

        <router-link v-else :to="'/' + paths[paths.length - 1]">
          {{ t(routesMatched.meta.title) }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>

<style lang="less" scoped>
@import '@/layout/style/theme.less';

.breadcrumb {
  padding-left: 16px;
}
</style>
