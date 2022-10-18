<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  selects: { type: Object, default: () => null },
  disabled: { type: Boolean, defalut: false }
})

const value = ref<string>('')
</script>
<template>
  <div class="flex">
    <span>{{ props.selects.displayName }}</span>

    <a-select v-model:value="value" :disabled="disabled">
      <a-select-option
        v-for="item in props.selects.items"
        :key="item"
        :value="item"
      >
        {{ item }}
      </a-select-option>
    </a-select>
  </div>
</template>

<style lang="less" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
  .ant-select {
    width: 120px;
  }
}
</style>
