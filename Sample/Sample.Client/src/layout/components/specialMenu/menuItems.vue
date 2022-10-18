<script setup lang="ts">
import { ref } from 'vue'
import { PushpinFilled, PushpinOutlined } from '@ant-design/icons-vue'
import MenuItem from '../menu/menuItem.vue'
import { useRouter } from 'vue-router'
import { MENU_FIXED_KEY_ } from '@/types/storage'

const { currentRoute } = useRouter()
let currentRouteNames = ref([currentRoute.value.name])

const isFixed = ref<boolean>(
  Boolean(sessionStorage.getItem(MENU_FIXED_KEY_)) ?? false
)

defineExpose({ isFixed })

const emits = defineEmits(['onSelectItem', 'fixedItem'])
const props = defineProps({
  routers: { type: Object, default: () => null },
  showItem: { type: Boolean, default: false }
})
const changeFixedStatu = () => {
  isFixed.value = !isFixed.value
  emits('fixedItem', isFixed.value)
  sessionStorage.setItem(MENU_FIXED_KEY_, JSON.stringify(isFixed.value))
}
</script>

<template>
  <div class="menuItems">
    <div class="header">
      <p>Vben Admin</p>
      <span class="fixed" @click="changeFixedStatu">
        <pushpin-filled v-if="isFixed" />
        <pushpin-outlined v-else />
      </span>
    </div>
    <a-menu
      v-show="showItem"
      v-model:selectedKeys="currentRouteNames"
      mode="inline"
      theme="dark"
      @click="emits('onSelectItem')"
    >
      <menu-item
        v-for="router in props.routers"
        :key="router.name"
        :item="router"
      />
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.menuItems {
  position: fixed;
  top: 0;
  left: 80px;
  height: 100%;
  z-index: 99;
  background-color: #001529;
  .header {
    width: 210px;
    height: 48px;
    margin-bottom: 10px;
    border-bottom: 1px solid #2d3033;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 20px;
      margin-bottom: 0px;
    }
    .fixed {
      font-size: 16px;
      margin-right: 6px;
      cursor: pointer;
      color: #ffffffa6;
      &:hover {
        color: white;
      }
    }
  }
  .ant-menu {
    height: calc(100% - 48px);
    overflow-y: auto;
    overflow-x: hidden;
    animation: showMenu 0.2s;
  }
}
@keyframes showMenu {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
