<!-- <script setup lang="ts">
  import { unref, computed } from 'vue'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import {
  functionSwitchs,
  functionSelects,
  functionInputNumbers,
  LayoutModeEnum
} from '@/enums/appEnum'
import ContentSwitch from './components/contentSwitch.vue'
import ContentSelect from './components/contentSelect.vue'
import ContentInputNumber from './components/contentInputNumber.vue'

const settingsStore = useSettingsStoreWithOut()
const layoutMode = computed(() => settingsStore.getAppLayout)
</script>

<template>
  <content-switch
    v-for="item in functionSwitchs"
    :key="item.displayName"
    :item="item"
    :disabled="!item.layout.includes(unref(layoutMode))"
  />
  <content-select
    v-for="item in functionSelects"
    :key="item.displayName"
    :selects="item"
    :disabled="!item.layout.includes(unref(layoutMode))"
  />
  <content-input-number
    v-for="item in functionInputNumbers"
    :key="item.displayName"
    :inputNumbers="item"
  />
</template>

<style lang="less" scoped></style> -->
