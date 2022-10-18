<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue'
import ItemSetting from './settingItems.vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { SwitchEnum } from '@/types/settings'

const { t } = useI18n()

const settingsStore = useSettingsStoreWithOut()

let settingVisible = ref<boolean>(false)

const fixedRight = computed(() => {
  return settingsStore.getIsShowHeader === SwitchEnum.OFF
})
const fixedLeft = computed(() => {
  return (
    settingsStore.getIsShowHeader === SwitchEnum.OFF && settingVisible.value
  )
})

const onCloseSetting = () => {
  settingVisible.value = false
}

const onOpenSetting = () => {
  settingVisible.value = true
}
</script>
<template>
  <div>
    <div
      :class="['click-box', { 'fixed-right': unref(fixedRight) }]"
      @click="onOpenSetting"
    >
      <setting-outlined />
    </div>
    <a-drawer
      placement="right"
      :visible="settingVisible"
      @close="onCloseSetting"
      :closable="!unref(fixedRight)"
      :destroyOnClose="true"
    >
      <template #title>
        {{ t('layout.setting.projectConfig') }}
      </template>

      <item-setting />

      <div
        class="fixed-left"
        style="color: #fff"
        v-show="fixedLeft"
        @click="onCloseSetting"
      >
        <close-outlined />
      </div>
    </a-drawer>
  </div>
</template>

<style lang="less" scoped>
.click-box {
  padding: 0px 10px;
}
.fixed-right {
  position: fixed;
  right: 0px;
  top: 30%;
  background-color: @button-primary-color;
  color: @white;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fixed-left {
  position: fixed;
  right: 378px;
  top: 45%;
  background-color: @button-primary-color;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
