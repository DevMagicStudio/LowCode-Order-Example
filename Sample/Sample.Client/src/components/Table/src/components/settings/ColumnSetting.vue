<script setup lang="ts">
import { ref, unref, watchEffect, nextTick } from 'vue'
import { SettingOutlined, DragOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@/hooks/web/useI18n'
import Sortablejs from 'sortablejs'
import type Sortable from 'sortablejs'
import { BasicPageParams, BasicTableColumn } from '@/types'

const { t } = useI18n()

const props = defineProps({
  checked: { type: Boolean },
  sortColumns: {
    type: Array as PropType<BasicTableColumn[]>,
    default: () => []
  },
  columns: { type: Array as PropType<BasicTableColumn[]>, default: () => [] },
  pageParams: { type: Object as PropType<BasicPageParams>, default: () => {} }
})

const emit = defineEmits(['reset', 'change-select', 'update:checked'])
const indexChecked = ref(false)
const selectChecked = ref(true)

watchEffect(() => {
  indexChecked.value = props.checked
})
const sortRef = ref()
const sortable = ref<Sortable>()
let sortableOrder: string[] = []
let sortInited = false

const handleSettingPopoverChange = function () {
  if (sortInited) return
  nextTick(() => {
    const columnListEl = unref(sortRef)
    if (!columnListEl) return
    const el = columnListEl.$el as any
    if (!el) return

    sortable.value = new Sortablejs(el, {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      ghostClass: 'blue-background-class',
      handle: '.table-column-drag-icon ',
      onEnd: ({ oldIndex, newIndex }) => {
        let old = oldIndex as number
        let now = newIndex as number
        const source = props.sortColumns[old]
        const destination = props.sortColumns[now]
        props.sortColumns[now] = source
        props.sortColumns[old] = destination
      }
    })
    sortableOrder = sortable.value.toArray()
    sortInited = true
  })
}

const reset = function () {
  sortable.value?.sort(sortableOrder)
  indexChecked.value = false
  selectChecked.value = true
  emit('update:checked', indexChecked.value)
  emit('reset')
}
</script>

<template>
  <a-tooltip>
    <template #title> {{ t('component.table.settingColumn') }} </template>
    <a-popover
      trigger="click"
      placement="bottomRight"
      overlayClassName="appeon-basic-column-setting__cloumn-list"
      @visible-change="handleSettingPopoverChange"
    >
      <setting-outlined class="operate-icon" />
      <template #title>
        <a-checkbox
          v-model:checked="indexChecked"
          @change="emit('update:checked', indexChecked)"
          >{{ t('system.list.indexColumn') }}</a-checkbox
        >
        <a-checkbox
          v-model:checked="selectChecked"
          @change="emit('change-select', selectChecked)"
          >{{ t('system.list.selectColumn') }}</a-checkbox
        >
        <a type="link" class="columns-reset-btn" @click="reset">{{
          t('system.reset')
        }}</a>
      </template>
      <template #content>
        <a-row id="sortable" ref="sortRef">
          <a-col :span="16" v-for="item in sortColumns" :key="item.dataIndex">
            <DragOutlined class="table-column-drag-icon" />
            <a-checkbox v-model:checked="item.checked">{{
              item.title
            }}</a-checkbox>
          </a-col>
        </a-row>
      </template>
    </a-popover>
  </a-tooltip>
</template>

<style lang="less" scoped>
.operate-icon {
  margin-right: 12px;

  &.anticon,
  & .anticon {
    font-size: 20px;
  }
}

#sortable {
  .ant-col {
    height: 30px;
  }

  .table-column-drag-icon {
    cursor: move;
    margin-right: 10px;
  }
}
</style>
