<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwithchType } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()

const { t } = useI18n()

const isFixHeaderStatus = computed(() => settingsStore.getFixHeader)
const fixHeaderToggle = (status: SwithchType) => {
  settingsStore.setFixHeader(status)
}
</script>

<template>
  <div class="footer-switch">
    <span> {{ t('layout.setting.fixedHeader') }} </span>
    <a-switch
      :checked="unref(isFixHeaderStatus)"
      checkedValue="on"
      unCheckedValue="off"
      @click="fixHeaderToggle"
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
