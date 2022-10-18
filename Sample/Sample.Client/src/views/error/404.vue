<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  status?: number
  title?: string
  subTitle?: string
}
const props = withDefaults(defineProps<Props>(), {
  status: 400,
  title: '400',
  subTitle: 'system.exception.subTitle404'
})
</script>

<template>
  <a-result
    :status="props.status"
    :title="props.title"
    :sub-title="t(props.subTitle)"
  >
    <template #extra>
      <a-button class="frame third" type="primary" @click="$router.push('/')">
        {{ t('system.exception.backHome') }}
      </a-button>
    </template>
  </a-result>
</template>

<style lang="less" scoped></style>
