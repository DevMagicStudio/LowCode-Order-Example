<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwithchType } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()

const { t } = useI18n()

const isShowSider = computed(() => settingsStore.getIsShowSider)
const siderToggle = (status: SwithchType) => {
  settingsStore.setIsShowSider(status)
}
</script>

<template>
  <div class="header-switch">
    <span> {{ t('layout.setting.sidebar') }} </span>
    <a-switch
      :checked="unref(isShowSider)"
      checkedValue="on"
      unCheckedValue="off"
      @click="siderToggle"
    >
      <template #checkedChildren>{{ t('layout.setting.on') }}</template>
      <template #unCheckedChildren>{{ t('layout.setting.off') }}</template>
    </a-switch>
  </div>
</template>

<style lang="less" scoped>
.header-switch {
  padding: 6px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
