<script setup lang="ts">
import { ref, unref, computed } from 'vue'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/store/modules/theme'
import { useLoginAccountStoreWithOut } from '@/store/modules/login'

const { t } = useI18n()

const themeStore = useThemeStore()
const isHeaderbgWhite = computed(
  (): boolean => themeStore.getThemeColor.headerColor === '#ffffff'
)

const loginAccountStore = useLoginAccountStoreWithOut()
const username = loginAccountStore.getUsername

//logout mock
const confirmVisible = ref<boolean>(false)
const logoutConfirm = () => {
  confirmVisible.value = true
}

const logoutLoading = ref<boolean>(false)
const logout = () => {
  logoutLoading.value = true
  setTimeout(async () => {
    await loginAccountStore.logout({ logoutId: username }, true)
    logoutLoading.value = false
  }, 1000)
}
</script>

<template>
  <a-dropdown class="user-dropdown">
    <span
      :class="[
        'click-box',
        {
          'user-dropdown-unlight': unref(isHeaderbgWhite)
        }
      ]"
    >
      <!-- <img
          src="https://vue-pure-admin.vercel.app.assets/avatars.596f7aa0.jpg"
          alt=""
        /> -->
      <a-avatar size="small" style="margin-right: 4px">
        <template #icon>
          <user-outlined />
        </template>
      </a-avatar>
      <span style="font-size: 14px">{{ username }}</span>
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a href="javascript:;" @click.prevent="logoutConfirm()">
            <logout-outlined />
            {{ t('layout.header.dropdownItemLoginOut') }}
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <a-modal
    v-model:visible="confirmVisible"
    :title="t('system.login.logoutNotificationTitle')"
    :confirm-loading="logoutLoading"
    @ok="logout()"
    :cancelText="t('system.login.cancelText')"
    :okText="t('system.login.okText')"
  >
    {{ t('system.login.logoutNotificationDesc') }}
  </a-modal>
</template>

<style lang="less" scoped>
.user-dropdown {
  display: flex;
  align-items: center;
  height: 48px;
}

.user-dropdown-unlight {
  :deep(.ant-avatar) {
    background-color: #ccc;
    color: #fff;
  }
}

.click-box {
  padding: 0px 10px;
}
</style>
