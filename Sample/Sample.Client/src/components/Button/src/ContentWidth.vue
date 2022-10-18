<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import type { ContentType } from '@/types/settings'
import { ContentEnum, LayoutModeEnum } from '@/types/settings'

const settingsStore = useSettingsStoreWithOut()

const { t } = useI18n()

const contentWidthMode = computed(() => settingsStore.getContentWidth)
const handleChange = (value: ContentType) => {
  settingsStore.setContentWidth(value)
}
</script>

<template>
  <div class="content-switch">
    <span> {{ t('layout.setting.contentMode') }} </span>
    <a-select
      ref="select"
      :value="unref(contentWidthMode)"
      @change="handleChange"
      style="width: 70px"
      :disabled="
        settingsStore.getAppLayout === LayoutModeEnum.TOP ? false : true
      "
    >
      <a-select-option :value="ContentEnum.FLUID">{{
        t('layout.setting.fluid')
      }}</a-select-option>
      <a-select-option :value="ContentEnum.FIXED">{{
        t('layout.setting.fixed')
      }}</a-select-option>
    </a-select>
  </div>
</template>

<style lang="less" scoped>
.content-switch {
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}
</style>

<style lang="less">
.content-switch {
  .ant-select-selector {
    height: 28px !important;
    padding: 0px 0px !important;
    .ant-select-selection-item {
      line-height: 26px !important;
    }
  }
}
</style>
