import { defineStore } from 'pinia'
import { store } from '@/store'

export const usePermissionStore = defineStore({
  id: 'appeon-permission'
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
