<script lang="ts" setup>
import { ref } from 'vue'
import { ClusterOutlined, HomeOutlined } from '@ant-design/icons-vue'
import type { AppRouteRecordRaw } from '@/router/types'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

interface childrenType extends AppRouteRecordRaw {
  noShowingChildren?: boolean
}
defineProps({
  item: {
    type: Object as PropType<AppRouteRecordRaw>,
    required: true
  }
})

const onlyOneChild = ref<Nullable<childrenType>>(null)

function menuHasChildren(
  children: AppRouteRecordRaw[] = [],
  parent: AppRouteRecordRaw
): boolean {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item
    return true
  })

  if (showingChildren[0]?.meta?.showParent) {
    return false
  }

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, noShowingChildren: true }
    return true
  }
  return false
}
</script>

<template>
  <a-menu-item
    v-if="
      menuHasChildren(item.children, item) &&
      (!onlyOneChild?.children || onlyOneChild.noShowingChildren)
    "
    :key="onlyOneChild?.path"
    style="margin-bottom: 4px; margin-top: 0"
  >
    <template v-if="onlyOneChild?.meta?.icon" #icon>
      <cluster-outlined :style="{ fontSize: '18px' }" />
    </template>
    <router-link :to="item.path">{{
      t(onlyOneChild?.meta?.title ?? '')
    }}</router-link>
  </a-menu-item>
  <a-sub-menu v-else :key="item.path">
    <template v-if="item?.meta?.icon" #icon>
      <home-outlined :style="{ fontSize: '18px' }" />
    </template>
    <template #title>
      {{ t(item?.meta?.title ?? '') }}
    </template>
    <menu-item v-for="child in item.children" :key="child.path" :item="child" />
  </a-sub-menu>
</template>

<style lang="less" scoped>
span {
  &:hover {
    color: white;
  }
}

.submenu-icon {
  :deep(.ancticon) {
    font-size: 10px;
  }
}
</style>
