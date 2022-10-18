<script setup lang="ts">
import { unref, computed } from 'vue'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { displaySwitchs } from '@/types/settings'
import ContentSwitch from './components/contentSwitch.vue'

const settingsStore = useSettingsStoreWithOut()
const layoutMode = computed(() => settingsStore.getAppLayout)
</script>

<template>
  <content-switch
    v-for="item in displaySwitchs"
    :key="item.displayName"
    :item="item"
    :disabled="!item.layout.includes(unref(layoutMode))"
  />
</template>

<style lang="less" scoped></style>
