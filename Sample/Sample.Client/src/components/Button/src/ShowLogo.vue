<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwithchType } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()

const { t } = useI18n()

const isShowLogo = computed(() => settingsStore.getIsShowLogo)
const logoToggle = (status: SwithchType) => {
  settingsStore.setIsShowLogo(status)
}
</script>

<template>
  <div class="header-switch">
    <span> {{ t('layout.setting.logo') }} </span>
    <a-switch
      :checked="unref(isShowLogo)"
      checkedValue="on"
      unCheckedValue="off"
      @click="logoToggle"
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
