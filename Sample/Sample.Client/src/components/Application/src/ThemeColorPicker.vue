<template>
  <div :class="prefixClass">
    <template v-for="color in colorList || []" :key="color">
      <span
        @click="handleClick(color)"
        :class="[
          `${prefixClass}__item`,
          {
            [`${prefixClass}__item--active`]: props.defaultValue === color
          }
        ]"
        :style="{ background: color }"
      >
        <CheckOutlined
          :class="{
            'checked-black': props.whiteList.includes(props.defaultValue)
          }"
        />
      </span>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { CheckOutlined } from '@ant-design/icons-vue'
import { prefixCls } from '@/types/settings'

const props = defineProps({
  colorList: {
    type: Array as PropType<string[]>,
    defualt: []
  },
  defaultValue: {
    type: String as PropType<string>
  },
  event: {
    type: String as PropType<string>
  },
  whiteList: {
    type: Array as PropType<string[]>,
    default: () => {
      return ['#ffffff']
    }
  }
})

const emit = defineEmits(['change'])

const prefixClass = `${prefixCls}-setting-theme-picker`

const handleClick = (color: string) => {
  emit('change', props.event, color)
}
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-setting-theme-picker';

.@{prefix-cls} {
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0;
  justify-content: space-around;

  &__item {
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 2px;

    svg {
      display: none;
    }

    &--active {
      border: 1px solid lighten(@primary-color, 10%);

      svg {
        display: inline-block;
        margin: 0 0 3px 3px;
        font-size: 12px;
        fill: @white;
      }

      .checked-black {
        svg {
          fill: lighten(@primary-color, 10%);
        }
      }
    }
  }
}
</style>
