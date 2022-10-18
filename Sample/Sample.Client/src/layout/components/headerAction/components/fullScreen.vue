<script setup lang="ts">
import { ref } from 'vue'
import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue'
import { useFullscreen } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { isFullscreen, toggle } = useFullscreen()

const enlageVisible = ref<boolean>(false)
</script>

<template>
  <a-tooltip
    v-model:visible="enlageVisible"
    placement="bottom"
    :title="t('layout.header.enLarge')"
  >
    <div
      class="click-box"
      @click="
        () => {
          toggle()
          enlageVisible = false
        }
      "
    >
      <fullscreen-exit-outlined v-if="isFullscreen" />
      <fullscreen-outlined v-else />
    </div>
  </a-tooltip>
</template>

<style lang="less" scoped>
.click-box {
  padding: 0px 10px;
}
</style>
