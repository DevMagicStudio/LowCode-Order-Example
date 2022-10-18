<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useThemeStore } from '@/store/modules/theme'
import { ThemeType, ThemeEnum, prefixCls } from '@/types/settings'
import {
  updateDarkTheme,
  updateHeaderBackground,
  updateSiderBackground
} from '@/utils/theme'

const themeStore = useThemeStore()
const darkMode = themeStore.getDarkMode

const prefixClass = `${prefixCls}-dark-switch`
const isDark = computed(() => themeStore.getDarkMode === ThemeEnum.DARK)

const getClass = computed(() => [
  prefixClass,
  {
    [`${prefixClass}--dark`]: unref(isDark)
  }
])

const emits = defineEmits(['change'])

const onDarkModeToggle = (darkMode: ThemeType) => {
  themeStore.setDarkMode(darkMode)
  updateDarkTheme(darkMode)
  updateHeaderBackground()
  updateSiderBackground()

  emits('change', darkMode)
}
</script>

<template>
  <div :class="getClass">
    <a-switch
      v-model:checked="darkMode"
      checkedValue="dark"
      unCheckedValue="light"
      @change="onDarkModeToggle"
    >
      <template #checkedChildren
        ><img class="sun" src="@/assets/svg/sun_line.svg"
      /></template>
      <template #unCheckedChildren
        ><img class="moon" src="@/assets/svg/moon_stars_line.svg"
      /></template>
    </a-switch>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-dark-switch';

.@{prefix-cls} {
  .ant-switch {
    width: 48px;
  }
  .ant-switch,
  .ant-switch:focus {
    background-color: #000;
    border: 1px solid #888;
    box-sizing: content-box;
  }
  &--dark {
    .ant-switch {
      background-color: #000;
    }
  }
  .ant-switch:focus,
  .ant-switch-checked:focus {
    box-shadow: none;
  }
  .ant-switch-inner {
    position: relative;
    img {
      width: 20px;
      position: absolute;
      top: 1px;
    }
    .moon {
      right: 2px;
    }
    .sun {
      left: 2px;
    }
  }
}
</style>
