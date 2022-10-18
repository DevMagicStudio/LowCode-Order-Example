<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SearchOutlined } from '@ant-design/icons-vue'
import SearchFooter from './searchFooter.vue'
import SearchList from './searchList.vue'

const { t } = useI18n()
const visible = ref<boolean>(false)
const keyword = ref<string>('')

const emits = defineEmits(['onClosed'])

const onChange = (e: any) => {
  // console.log('onChange', e)
}

const onPressEnter = (e: any) => {
  // console.log('onPressEnter', e)
}

const onClose = () => {
  visible.value = false
  emits('onClosed')
}

const onOpen = () => {
  visible.value = true
}

defineExpose({ onClose, onOpen })
</script>

<template>
  <div class="searchModal" ref="searchModal">
    <a-modal
      v-model:visible="visible"
      :closable="false"
      style="top: 50px"
      :getContainer="() => $refs.searchModal"
    >
      <div class="modal">
        <div class="search">
          <a-input
            v-model:value="keyword"
            :placeholder="t('layout.search')"
            allowClear
            size="large"
            @change="onChange"
            @press-enter="onPressEnter"
          >
            <template #prefix>
              <search-outlined />
            </template>
          </a-input>
        </div>

        <div class="content">
          <div v-if="true" class="noData">
            {{ t('component.app.searchNotData') }}
          </div>
          <search-list v-else />
        </div>
      </div>
      <template #footer>
        <search-footer />
      </template>
    </a-modal>
  </div>
</template>

<style lang="less" scoped>
.searchModal {
  :deep(.ant-modal) {
    .ant-modal-content {
      border-radius: 14px !important;
      .ant-modal-footer {
        text-align: left;
        height: 44px;
        padding: 0 16px;
      }
    }
    .ant-modal-body {
      padding: 6px 16px;
    }
  }
}

.modal {
  border-radius: 20px;
  .search {
    padding-top: 14px;
    :deep(.ant-input-affix-wrapper-lg) {
      border-radius: 8px;
      .ant-input-prefix {
        color: #999;
        :deep(.ant-space-item span) {
          font-size: 21px;
        }
      }
    }
  }
  .content {
    min-height: 100px;
    max-height: 452px;
    .noData {
      text-align: center;
      line-height: 100px;
      color: #969faf;
    }
  }
}
</style>
