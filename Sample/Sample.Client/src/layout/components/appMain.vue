<script lang="ts" setup>
import { unref, computed } from 'vue'
import Footer from './default/footer.vue'
import AppeonSettings from './headerAction/components/settings/index.vue'
import { useSettingsStoreWithOut } from '@/store/modules/layout'
import { LayoutModeEnum, ContentEnum, SwitchEnum } from '@/types/settings'

const transitionType = 'fade-slide'
const settingsStore = useSettingsStoreWithOut()
const layoutContentMinHeight = computed(() => {
  if (
    settingsStore.getIsShowHeader === SwitchEnum.ON &&
    settingsStore.getFooterMode === SwitchEnum.ON
  ) {
    return 'calc(100vh - 48px - 70px)'
  }

  if (settingsStore.getIsShowHeader === SwitchEnum.ON) {
    return 'calc(100vh - 48px)'
  }

  if (settingsStore.getFooterMode === SwitchEnum.ON) {
    return 'calc(100vh - 70px)'
  }

  return 'calc(100vh)'
})
</script>
<template>
  <a-layout-content
    :class="['app-main']"
    :style="{
      'min-height': unref(layoutContentMinHeight)
    }"
  >
    <router-view>
      <template #default="{ Component, route }">
        <transition :name="transitionType" mode="out-in" appear>
          <component
            :is="Component"
            :key="route.fullPath"
            :class="[
              'main-content',
              {
                wide:
                  settingsStore.getAppLayout == LayoutModeEnum.TOP &&
                  settingsStore.getContentWidth == ContentEnum.FIXED
              }
            ]"
          />
        </transition>
      </template>
    </router-view>
    <appeon-settings
      v-show="settingsStore.getIsShowHeader === SwitchEnum.OFF"
    />
  </a-layout-content>
  <Footer> Copyright &copy; 2022 Appeon Design </Footer>
</template>

<style lang="less" scoped>
.app-main {
  width: 100%;
  // overflow: auto;
}

.ant-layout-footer {
  color: #d9d9d9;
}
.wide {
  margin: 0 auto;
  max-width: 1200px;
}
</style>
