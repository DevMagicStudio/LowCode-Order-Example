<script setup lang="ts">
import { ref } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const infoVisible = ref<boolean>(false)
const activeKey = ref<string>('1')
const current = ref<number>(2)
</script>

<template>
  <a-tooltip
    v-model:visible="infoVisible"
    placement="bottom"
    :title="t('layout.message.notice')"
  >
    <div
      @click="
        () => {
          infoVisible = false
        }
      "
      class="notice-box"
    >
      <a-popover trigger="click" :arrowPointAtCenter="true">
        <template #content>
          <a-tabs v-model="activeKey" class="message">
            <a-tab-pane key="1">
              <template #tab>
                <a-badge count="3" :overflowCount="99" :offset="[5, -5]">
                  {{ t('layout.message.notice') }}
                </a-badge>
              </template>
              <div class="content">{{ t('layout.message.notice') }}</div>
              <a-pagination
                v-model="current"
                :total="10"
                show-less-items
                size="small"
              />
            </a-tab-pane>

            <a-tab-pane key="2">
              <template #tab>
                <a-badge count="100" :overflowCount="99" :offset="[12, -5]">
                  {{ t('layout.message.information') }}
                </a-badge>
              </template>
              <div class="content">{{ t('layout.message.information') }}</div>
              <a-pagination
                v-model="current"
                :total="10"
                show-less-items
                size="small"
              />
            </a-tab-pane>

            <a-tab-pane key="3">
              <template #tab>
                <a-badge count="5" :overflowCount="99" :offset="[5, -5]">
                  {{ t('layout.message.upcoming') }}
                </a-badge>
              </template>
              <div class="content">{{ t('layout.message.upcoming') }}</div>
              <a-pagination
                v-model="current"
                :total="10"
                show-less-items
                size="small"
              />
            </a-tab-pane>
          </a-tabs>
        </template>
        <span class="notice-box">
          <a-badge :dot="true">
            <bell-outlined />
          </a-badge>
        </span>
      </a-popover>
    </div>
  </a-tooltip>
</template>

<style lang="less" scoped>
.ant-badge {
  height: 69%;
  display: inline-block;
  width: 89%;
  padding: 0px 10px;
}
:deep(.ant-tabs-nav-wrap) {
  padding: 0 10px;
}
.notice-box {
  height: 100%;
  width: 100%;

  .message {
    min-width: 164px;
    max-height: 500px;

    .content {
      max-height: 428px;
      overflow: auto;
    }
  }
}
</style>
