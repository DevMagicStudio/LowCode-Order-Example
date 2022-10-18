<!-- <script setup lang="ts">
import { unref, computed } from 'vue'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import {
  animationSwitchs,
  animationSelects,
  LayoutModeEnum
} from '@/enums/appEnum'
import ContentSwitch from './components/contentSwitch.vue'
import ContentSelect from './components/contentSelect.vue'

const settingsStore = useSettingsStoreWithOut()
const layoutMode = computed(() => settingsStore.getAppLayout)
</script>

<template>
  <content-switch
    v-for="item in animationSwitchs"
    :key="item.displayName"
    :item="item"
    :disabled="!item.layout.includes(unref(layoutMode))"
  />
  <content-select
    v-for="item in animationSelects"
    :key="item.displayName"
    :selects="item"
    :disabled="!item.layout.includes(unref(layoutMode))"
  />
</template>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
</style> -->
