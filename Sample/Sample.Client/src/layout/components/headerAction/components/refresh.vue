<script setup lang="ts">
import { ref, inject } from 'vue'
import { RedoOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const onReload = inject('onReload', () => {})

const refreshVisible = ref<boolean>(false)
const isSpin = ref<boolean>(false)

const refreshCurrentRouter = () => {
  refreshVisible.value = false
  isSpin.value = true
  onReload()
  setTimeout(() => {
    isSpin.value = false
  }, 600)
}
</script>

<template>
  <a-tooltip
    v-model:visible="refreshVisible"
    placement="bottom"
    :title="t('common.redo')"
  >
    <div class="click-box" @click="refreshCurrentRouter">
      <redo-outlined :spin="isSpin" />
    </div>
  </a-tooltip>
</template>

<style lang="less" scoped>
.click-box {
  padding: 0px 10px;
}
</style>
