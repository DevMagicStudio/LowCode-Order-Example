<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwitchEnum } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()
</script>

<template>
  <a-layout-footer
    style="text-align: center"
    v-if="settingsStore.getFooterMode === SwitchEnum.ON"
  >
    <slot> </slot>
  </a-layout-footer>
</template>

<style lang="less" scoped></style>
