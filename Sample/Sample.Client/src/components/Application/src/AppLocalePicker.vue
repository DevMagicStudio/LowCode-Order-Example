<template>
  <Dropdown
    placement="bottom"
    :trigger="['hover']"
    :selectedKeys="selectedKeys"
    :dropMenuList="localeArray"
    @menu-event="handleMenuEvent"
  >
    <span :class="[{ 'click-box': className }]">
      <img
        class="translate"
        v-if="isBlack"
        src="@/assets/svg/translate-black.svg"
      />
      <img class="translate" v-else src="@/assets/svg/translate-white.svg" />
    </span>
  </Dropdown>
</template>

<script lang="ts" setup>
import { Dropdown, DropMenu } from '@/components/Dropdown'
import { ref, watchEffect, unref, computed } from 'vue'
import { localeList } from '@/layout/settings/localeSetting'
import { useLocale } from '@/locales/useLocale'

const localeArray = localeList
const selectedKeys = ref<string[]>([])
const { getLocale, changeLocale } = useLocale()
const props = defineProps({
  reload: { type: Boolean },
  isBlack: { type: Boolean },
  className: { type: Boolean, default: false }
})
watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

async function toggleLocale(lang: LocaleType | string) {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}

function handleMenuEvent(menu: DropMenu) {
  if (unref(getLocale) === menu.event) {
    return
  }
  toggleLocale(menu.event as string)
}
</script>

<style lang="less" scoped>
.translate {
  width: 16px;
  cursor: pointer;
}
.click-box {
  padding: 0px 10px;
  width: 100%;
  display: inline-block;
  height: 100%;
}

</style>

<style lang="less">
  html[data-theme="dark"] .header-lang-dropdown .ant-dropdown-menu-item-selected {
    background-color: #111b26!important;
  }
</style>

