<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwithchType, LayoutModeEnum } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()

const { t } = useI18n()

const isFixSiderStatus = computed(() => settingsStore.getFixSiderMode)
const fixSiderToggle = (status: SwithchType) => {
  settingsStore.setFixSiderMode(status)
}
</script>

<template>
  <div class="footer-switch">
    <span> {{ t('layout.setting.fixsidermenu') }} </span>
    <a-switch
      :checked="unref(isFixSiderStatus)"
      checkedValue="on"
      unCheckedValue="off"
      :disabled="settingsStore.getAppLayout == LayoutModeEnum.TOP"
      @click="fixSiderToggle"
    >
      <template #checkedChildren>{{ t('layout.setting.on') }}</template>
      <template #unCheckedChildren>{{ t('layout.setting.off') }}</template>
    </a-switch>
  </div>
</template>

<style lang="less" scoped>
.footer-switch {
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
