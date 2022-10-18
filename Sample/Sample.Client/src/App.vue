<script setup lang="ts">
import { useLocale } from '@/locales/useLocale'
import 'dayjs/locale/zh-cn'
const { getAntdLocale } = useLocale()
</script>

<template>
  <a-config-provider :locale="getAntdLocale">
    <!-- <router-view>
      <template #default="{ Component }">
        <transition name="fade-scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </template>
    </router-view> -->
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>
