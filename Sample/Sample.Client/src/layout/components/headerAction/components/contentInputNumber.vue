<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  inputNumbers: { type: Object, default: () => null },
  disabled: { type: Boolean, defalut: false }
})
const value = ref<number>(props.inputNumbers.defaultValue)
</script>

<template>
  <div class="flex">
    <span>{{ props.inputNumbers.displayName }}</span>
    <a-input-number
      v-model:value="value"
      :keyboard="true"
      size="large"
      :disabled="disabled"
      :min="props.inputNumbers.min"
      :max="props.inputNumbers.max"
      :step="props.inputNumbers.step"
      :defaultValue="props.inputNumbers.defaultValue"
      :formatter="props.inputNumbers.formatter"
    />
  </div>
</template>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  .ant-input-number {
    width: 200px;
  }
}
</style>
