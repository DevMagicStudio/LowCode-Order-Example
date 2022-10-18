<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import AppeonSearchModal from './searchModal.vue'

const { t } = useI18n()
const searchVisible = ref<boolean>(false)
const searchModal = ref()

const onOpenSearch = () => {
  searchModal.value.onOpen()
  searchVisible.value = false
}
</script>

<template>
  <a-tooltip
    v-model:visible="searchVisible"
    placement="bottom"
    :title="t('layout.search')"
  >
    <div @click="onOpenSearch" class="click-box">
      <search-outlined />
    </div>
    <appeon-search-modal ref="searchModal" />
  </a-tooltip>
</template>

<style lang="less" scoped>
.click-box {
  padding: 0px 10px;
}
</style>
