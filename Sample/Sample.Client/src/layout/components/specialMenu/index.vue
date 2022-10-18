<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import {
  HomeOutlined,
  AppstoreOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined
} from '@ant-design/icons-vue'
import MenuItems from './menuItems.vue'

import { menus } from '@/router'

const { currentRoute } = useRouter()
let currentRoutePath = ref(currentRoute.value.path as string)

const emits = defineEmits(['changeWidth'])

const mainMenu = ref()
const menuItems = ref()
const showItem = ref<boolean>(false)
let showMenuContent = ref<boolean>(true)
const router = useRouter()
const childrenItems = ref<RouteRecordRaw[] | undefined>([])

onMounted(() => {
  initMenuColor()
})

const initMenuColor = () => {
  const value = currentRoutePath.value.split(/\//)[1]
  const currentMenuElement = mainMenu.value.$el.querySelector(
    `div[data-menu-id="/${value}"]`
  )
  currentMenuElement && (currentMenuElement.lastChild.style.color = 'white')
}

const setGrayColor = () => {
  const elements = mainMenu.value.$el.querySelectorAll(
    '.ant-list-item-meta-content'
  )
  elements.forEach((ele: HTMLDivElement) => (ele.style.color = '#ffffffa6'))
}

// Change menu as white
const changeColor = (e: HTMLDivElement) => {
  const currentElement = e.path.find(
    (ele: HTMLDivElement) =>
      ele.getAttribute('class') === 'ant-list-item-meta-content'
  )
  setGrayColor()
  currentElement && (currentElement.style.color = 'white')
}

const onSelectMenu = (e: HTMLDivElement, item: RouteRecordRaw) => {
  changeColor(e)

  if (item?.children?.length > 1) {
    if (menuItems.value.isFixed) {
      emits('changeWidth', 290)
    }
    showItem.value = true
  } else {
    emits('changeWidth', 80)
    showItem.value = false
    router.push(item.path)
  }
  childrenItems.value = item.children
}

const closeItems = () => {
  if (!menuItems.value.isFixed) {
    showItem.value = false
    emits('changeWidth', 80)
  } else {
    return
  }
}

const onSelectItem = () => {
  emits('changeWidth', 80)
  showItem.value = false
}

const fixedItem = (isFixed: boolean) => {
  isFixed && emits('changeWidth', 290)
  !isFixed && emits('changeWidth', 80)
}
</script>

<template>
  <div class="left-mixin-menu" @mouseleave="closeItems">
    <div class="menu">
      <div class="logo"><home-outlined /></div>

      <a-list item-layout="horizontal" :data-source="menus" ref="mainMenu">
        <template #renderItem="{ item }">
          <a-list-item @click="onSelectMenu($event, item)">
            <a-list-item-meta :data-menu-id="item.path">
              <template #description>
                <span v-show="showMenuContent">
                  {{ item.children[0].meta.title }}
                </span>
              </template>

              <template #title>
                <span :class="{ small: !showMenuContent }">
                  <appstore-outlined />
                </span>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>

      <div class="shrink" @click="showMenuContent = !showMenuContent">
        <double-right-outlined v-if="showMenuContent" />
        <double-left-outlined v-else />
      </div>
    </div>

    <MenuItems
      v-show="showItem"
      v-bind="{ routers: childrenItems, showItem: showItem }"
      ref="menuItems"
      @on-select-item="onSelectItem"
      @fixed-item="fixedItem"
    />
  </div>
</template>

<style lang="less" scoped>
.left-mixin-menu {
  display: flex;
  color: #fff;
  height: 100%;

  .menu {
    width: 80px;
    height: 100%;
    box-sizing: border-box;

    .logo {
      text-align: center;
      height: 48px;
      box-sizing: border-box;
      font-size: 32px;
    }

    .ant-list {
      height: calc(100% - 84px);
      overflow: auto;
      border-right: 1px solid #2d3033;
      transition: all 0.5s;

      .ant-list-item {
        border-bottom: 0;
      }

      :deep(.ant-list-item-meta-description),
      :deep(.ant-list-item-meta-title) {
        color: inherit;
        text-align: center;
      }

      :deep(.ant-list-item-meta-content) {
        color: #ffffffa6;

        &:hover,
        &:focus {
          cursor: pointer;
          color: white;
        }
      }

      :deep(.ant-list-item-meta-title) {
        font-size: 20px;

        .small {
          font-size: 16px;
        }
      }

      :deep(.ant-list-item-meta-description) {
        font-size: 12px;
      }
    }

    .shrink {
      text-align: center;
      cursor: pointer;
      color: white;
      font-size: 14px;
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;
      box-shadow: -1px -2px 4px -2px #409eff;
      border-right: 1px solid #2d3033;
      background-color: #001529 !important;
    }
  }
}
</style>
