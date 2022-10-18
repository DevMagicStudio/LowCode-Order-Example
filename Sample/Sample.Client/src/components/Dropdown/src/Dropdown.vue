<template>
  <a-dropdown :trigger="trigger" v-bind="$attrs" overlayClassName="header-lang-dropdown">
    <slot></slot>
    <template #overlay>
      <a-menu :selectedKeys="selectedKeys">
        <template v-for="item in dropMenuList" :key="`${item.event}`">
          <a-menu-item
            v-bind="getAttr(item.event)"
            @click="handleClickMenu(item)"
          >
            {{ item.text }}
          </a-menu-item>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { DropMenu } from './typing.ts'
import { GlobalOutlined } from '@ant-design/icons-vue'
const props = defineProps({
  popconfirm: Boolean,
  trigger: {
    type: [Array] as PropType<('contextmenu' | 'click' | 'hover')[]>,
    default: () => {
      return ['contextmenu']
    }
  },
  dropMenuList: {
    type: Array as PropType<(DropMenu & Recordable)[]>,
    default: () => []
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})

const emit = defineEmits(['menuEvent'])

const handleClickMenu = (item: DropMenu) => {
  const { event } = item
  const menu = props.dropMenuList.find(ele => `${ele.event}` === `${event}`)
  emit('menuEvent', menu)
  item.onClick?.()
}

const getAttr = (key: string | number) => ({ key })
</script>
