<script setup lang="ts">
import {
  EnterOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined
} from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="searchFooter">
    <enter-outlined class="footer-item" />
    <span class="context">{{ t('component.app.toSearch') }}</span>

    <arrow-down-outlined class="footer-item" />
    <arrow-up-outlined class="footer-item" />
    <span class="context">{{ t('component.app.toNavigate') }}</span>

    <span class="footer-item"> ESC </span>
    <span class="context">{{ t('layout.headerSearch.close') }}</span>
  </div>
</template>

<style lang="less" scoped>
.searchFooter {
  height: 44px;
  display: flex;
  align-items: center;
  .footer-item {
    width: 20px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px !important;
    margin-right: 5px;
    margin-left: 14px;
    padding: 1px;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px #1e235a66;
    &:nth-child(1),
    &:nth-child(4) {
      margin-left: 0;
    }
    :deep(.anticon) {
      font-size: 12px;
    }
  }
  .context {
    color: #666;
    font-size: 12px !important;
  }
}
</style>
