<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwithchType } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()

const { t } = useI18n()

const isShowHeader = computed(()=> settingsStore.getIsShowHeader)
const headerToggle = (status: SwithchType) => {
  settingsStore.setIsShowHeader(status)
}
</script>

<template>
  <div class="header-switch">
    <span> {{ t('layout.setting.header') }} </span>
    <a-switch
      :checked="unref(isShowHeader)"
      checkedValue="on"
      unCheckedValue="off"
      @click="headerToggle"
    >
      <template #checkedChildren>{{ t('layout.setting.on') }}</template>
      <template #unCheckedChildren>{{ t('layout.setting.off') }}</template>
    </a-switch>
  </div>
</template>

<style lang="less" scoped>
.header-switch {
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
