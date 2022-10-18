<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RedoOutlined } from '@ant-design/icons-vue'

import {
  changeTheme,
  updateHeaderBackground,
  updateSiderBackground
} from '@/utils/theme'
import { LayoutModeEnum, ThemeType, SwitchEnum } from '@/types/settings'

import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { useThemeStore } from '@/store/modules/theme'

// import AppFunction from './appFunction.vue'
import AppDisplay from './../../appDisplay.vue'
// import Animation from './animation.vue'

import {
  APP_SYSTEM_COLOR_LIST,
  APP_HEADER_COLOR_LIST,
  APP_SIDER_COLOR_LIST,
  modelType,
  navModels,
  ContentEnum
} from '@/types/settings'

const { t } = useI18n()
const settingsStore = useSettingsStoreWithOut()
const themeStore = useThemeStore()

const modelRef = ref()

onMounted(() => {
  setLayoutBorderColor(settingsStore.getAppLayout)
})

/* ------------------layout--------------------- */
// Setting selected layout border color
const setLayoutBorderColor = (layout: string) => {
  var currentLayoutElement = modelRef.value.querySelector(
    `div[mode-type=${layout}]`
  )
  currentLayoutElement.style.border = '2px solid #0960bd'
}

// When change layout
const onChangeLayout = (model: modelType) => {
  setNoBorder()
  setLayoutBorderColor(model.type)
  settingsStore.setAppLayout(model.type)
  if ([LayoutModeEnum.DEFAULT, LayoutModeEnum.TOP_MIXIN].includes(model.type)) {
    settingsStore.setContentWidth(ContentEnum.FLUID)
    settingsStore.setAutoSplice(SwitchEnum.OFF)
  }
  // when set autosplit that checked nav mode
  if (settingsStore.getAppLayout === LayoutModeEnum.TOP_MIXIN) {
    settingsStore.setAutoSplice(SwitchEnum.ON)
  }
}

// Hiden all layout border
const setNoBorder = () => {
  const elements = modelRef.value.querySelectorAll('.part')
  elements.forEach((ele: HTMLDivElement) => {
    ele.style.border = '0'
  })
}

/* ------------------theme--------------------- */
// Change system theme
const currentSystemColor = ref<string>(themeStore.getThemeColor.systemColor)
const currentSiderColor = ref<string>(themeStore.getThemeColor.siderColor)
const currentHeaderColor = ref<string>(themeStore.getThemeColor.headerColor)

const onDarkModeChange = (darkMode: ThemeType) => {
  currentSiderColor.value = themeStore.getThemeColor.siderColor
  currentHeaderColor.value = themeStore.getThemeColor.headerColor
}

const onSystemColorChange = (event: string, color: string) => {
  themeStore.setThemeColor(event, color)
  currentSystemColor.value = color

  changeTheme(currentSystemColor.value)
}

const onSiderColorChange = (event: string, color: string) => {
  currentSiderColor.value = color

  updateSiderBackground(color)
}

const onHeaderColorChange = (event: string, color: string) => {
  currentHeaderColor.value = color

  updateHeaderBackground(color)
}

const resetSettings = () => {
  settingsStore.resetSettings()
  themeStore.resetTheme()
  location.reload()
}
</script>

<template>
  <a-divider>{{ t('layout.setting.darkMode') }}</a-divider>
  <div style="text-align: center">
    <app-dark-mode-toggle @change="onDarkModeChange" />
  </div>

  <a-divider>{{ t('layout.setting.navMode') }}</a-divider>
  <div class="navModel" ref="modelRef">
    <a-tooltip v-for="model in navModels" :key="model.name">
      <template #title> {{ t(model.name) }} </template>
      <div class="part" :mode-type="model.type" @click="onChangeLayout(model)">
        <div v-if="model.className1" :class="model.className1"></div>
        <div :class="model.className2"></div>
      </div>
    </a-tooltip>
  </div>

  <a-divider>{{ t('layout.setting.sysTheme') }}</a-divider>
  <div style="text-align: center">
    <theme-color-picker
      :colorList="APP_SYSTEM_COLOR_LIST"
      :defaultValue="currentSystemColor"
      event="systemColor"
      @change="onSystemColorChange"
    />
  </div>

  <a-divider>{{ t('layout.setting.headerTheme') }}</a-divider>
  <div style="text-align: center">
    <theme-color-picker
      :colorList="APP_HEADER_COLOR_LIST"
      :defaultValue="currentHeaderColor"
      event="headerColor"
      @change="onHeaderColorChange"
    />
  </div>

  <a-divider>{{ t('layout.setting.sidebarTheme') }}</a-divider>
  <div style="text-align: center">
    <theme-color-picker
      :colorList="APP_SIDER_COLOR_LIST"
      :defaultValue="currentSiderColor"
      event="siderColor"
      @change="onSiderColorChange"
    />
  </div>

  <a-divider>{{ t('layout.setting.contentArea') }}</a-divider>
  <!-- add footer -->
  <div style="text-align: center">
    <footer-button />
  </div>
  <!-- header is show -->
  <div style="text-align: center">
    <show-top-button />
  </div>
  <!-- menu is show -->
  <div style="text-align: center">
    <show-sider-menu />
  </div>
  <!-- LOGO -->
  <div style="text-align: center">
    <show-logo />
  </div>

  <a-divider>{{ t('layout.setting.interfaceFunction') }}</a-divider>
  <!-- 内容区域宽度 -->
  <div style="text-align: center">
    <content-width />
  </div>
  <!-- 固定header  -->
  <div style="text-align: center">
    <fix-header />
  </div>
  <!-- 固定侧边菜单  -->
  <div style="text-align: center">
    <fix-sider-menu />
  </div>
  <!-- 自动分割菜单 -->
  <div style="text-align: center">
    <auto-splice-menu />
  </div>
  <app-display />

  <!-- <a-divider>{{ t('layout.setting.headerTheme') }}</a-divider>
    <a-divider>{{ t('layout.setting.sidebarTheme') }}</a-divider> -->

  <!-- <a-divider>{{ t('layout.setting.interfaceFunction') }}</a-divider>
    <app-function />
  
    <a-divider>{{ t('layout.setting.interfaceDisplay') }}</a-divider>
    <app-display />
  
    <a-divider>{{ t('layout.setting.animation') }}</a-divider>
    <animation />
  
    <a-divider />
    <a-button type="primary">
      <copy-outlined />
      <span>{{ t('layout.setting.copyBtn') }}</span>
    </a-button> -->
  <a-button type="warning" @click="resetSettings">
    <redo-outlined />
    <span>{{ t('layout.setting.resetBtn') }}</span>
  </a-button>
</template>

<style lang="less" scoped>
@import '../../../../style/model.less';

.navModel {
  display: flex;
  justify-content: space-between;

  .ant-tooltip {
    width: 100%;
    height: 45px;
  }
}

:deep(.ant-drawer-body) {
  width: 100%;
}

.ant-btn {
  width: 100%;
  margin: 8px 0;
}

:deep(.ant-btn-primary) {
  background: #ff9800;
}

.ant-btn-warning:not(.ant-btn-link, .is-disabled) {
  color: #fff;
  background-color: #efbd47;
  border-color: #efbd47;
}
</style>
