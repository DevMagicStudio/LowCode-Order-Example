<!-- <script setup lang="ts">
import MenuItem from './menuItem.vue'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue'
// import { useSettingsStore } from '@/store/modules/layout'
import { CURRENT_ROUTE_CHILD_key_ } from '@/types/storage'

const { currentRoute } = useRouter()
// const appStore = useSettingsStore()
const showMenuContent = ref<boolean>(true)
let currentRouteNames = ref([currentRoute.value.name])
// const currentRouteChild = ref(appStore.getCurrentChildRoute)
const currentRouteChild = ref(
  sessionStorage.getItem(CURRENT_ROUTE_CHILD_key_)
    ? JSON.parse(sessionStorage.getItem(CURRENT_ROUTE_CHILD_key_) as string)
    : []
)

watch(
  () => currentRoute.value.path,
  () => {}
)
// currentRouteChild=JSON.parse(sessionStorage.getItem(CURRENT_ROUTE_CHILD_key_)
</script>

<template>
  <div class="menu">
    {{ currentRouteChild }}
    <a-menu
      v-if="currentRouteChild.length > 1"
      v-model:selectedKeys="currentRouteNames"
      mode="inline"
      theme="dark"
      class="top_model"
    >
      <menu-item
        v-for="router in currentRouteChild"
        :key="router.name"
        :item="router"
      />
    </a-menu>

    <div class="shrink" @click="showMenuContent = !showMenuContent">
      <double-right-outlined v-if="showMenuContent" />
      <double-left-outlined v-else />
    </div>
  </div>
</template>

<style lang="less" scoped>
.top_model {
  height: 100%;
  align-items: center;
  justify-content: center;
  min-width: 0;
  flex: 1;
  :deep(.ant-menu-item),
  :deep(.ant-menu-submenu-title) {
    line-height: 48px;
  }
}
.shrink {
  padding-left: 20px;
  color: white;
  font-size: 14px;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  line-height: 40px;
  box-shadow: -1px -2px 4px -2px #409eff;
  position: absolute;
  bottom: 0;
  left: 0;
  cursor: pointer;
}
</style> -->
