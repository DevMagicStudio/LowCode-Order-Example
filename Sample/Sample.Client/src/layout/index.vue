<script setup lang="ts">
import { ref, nextTick, provide, computed, reactive } from 'vue'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { LayoutModeEnum, SwitchEnum } from '@/types/settings'

import AppMain from './components/appMain.vue'
import DefaultSider from './components/default/sider.vue'
import DefaultHeader from './components/default/header.vue'

import TopMixinHeader from './components/topMixin/header.vue'
import TopMixinSider from './components/topMixin/sider.vue'

import TopHeader from './components/top/header.vue'

// import LeftMixinSider from './components/leftMixin/sider.vue'
// import LeftMixinHeader from './components/leftMixin/header.vue'
let settingsStore = useSettingsStoreWithOut()
const appLayout = computed(() => settingsStore.getAppLayout)

let isReload = ref<boolean>(true)
let activeFirstMenu = ref()

const onReload = () => {
  isReload.value = false
  nextTick(function () {
    isReload.value = true
  })
}

const setActiveFirstMenu = (menu: any) => {
  activeFirstMenu.value = menu
}

provide('onReload', onReload)
provide('setActiveFirstMenu', setActiveFirstMenu)
provide('getActiveFirstMenu', activeFirstMenu)
</script>
<template>
  <a-layout style="min-height: 100%">
    <!-- default -->
    <template
      :key="LayoutModeEnum.DEFAULT"
      v-if="appLayout === LayoutModeEnum.DEFAULT"
    >
      <div
        :class="[
          'fix-siderbar',
          ,
          { 'shrink-sider': settingsStore.getCollapsed }
        ]"
        v-show="
          settingsStore.getIsShowSider === SwitchEnum.ON &&
          settingsStore.getFixSiderMode === SwitchEnum.ON
        "
      ></div>
      <default-sider v-show="settingsStore.getIsShowSider === SwitchEnum.ON" />
      <a-layout>
        <div
          class="fix-header"
          v-show="
            settingsStore.getIsShowHeader === SwitchEnum.ON &&
            settingsStore.getFixHeader === SwitchEnum.ON
          "
        ></div>
        <default-header />
        <app-main v-if="isReload" />
      </a-layout>
    </template>

    <!-- TOP -->
    <template
      :key="LayoutModeEnum.TOP"
      v-else-if="appLayout === LayoutModeEnum.TOP"
    >
      <div
        class="fix-header"
        v-show="
          settingsStore.getIsShowHeader === SwitchEnum.ON &&
          settingsStore.getFixHeader === SwitchEnum.ON
        "
      ></div>
      <top-header v-if="appLayout === LayoutModeEnum.TOP" />
      <app-main v-if="isReload" />
    </template>

    <!-- top_mixin -->
    <template :key="LayoutModeEnum.TOP_MIXIN" v-else>
      <div
        class="fix-header"
        v-show="settingsStore.getIsShowHeader === SwitchEnum.ON"
      ></div>
      <top-mixin-header />
      <a-layout>
        <top-mixin-sider
          v-if="settingsStore.getIsShowSider === SwitchEnum.ON"
        />
        <a-layout>
          <app-main v-if="isReload" />
        </a-layout>
      </a-layout>
    </template>
  </a-layout>

  <!-- left_mixin -->
  <!-- <a-layout
    v-show="appLayout === LayoutModeEnum.LEFT_MIXIN"
    style="height: 100%"
  >
    <left-mixin-sider />
    <a-layout>
      <left-mixin-header />
      <app-main v-if="isReload" />
    </a-layout>
  </a-layout> -->
</template>

<style lang="less" scoped>
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
}
.fix-header {
  height: 48px;
  line-height: 48px;
  transition: all 0.5s;
}
</style>
