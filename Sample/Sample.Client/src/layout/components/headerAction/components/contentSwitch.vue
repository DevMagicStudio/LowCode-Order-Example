<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAppDisplay } from '../utils/index'

const { t } = useI18n()
const checked = ref<boolean>(false)

const props = defineProps({
  item: { type: Object, default: () => null },
  disabled: { type: Boolean, defalut: false }
})

const onChangeSwitch = (checked: boolean) => {
  useAppDisplay(props.item.type, checked)
}
</script>

<template>
  <div class="flex">
    <span>{{ t(props.item.displayName) }}</span>
    <a-switch
      v-model:checked="checked"
      :disabled="disabled"
      :checked-children="t('layout.setting.on')"
      :un-checked-children="t('layout.setting.off')"
      @change="onChangeSwitch"
    />
  </div>
</template>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
}
</style>
