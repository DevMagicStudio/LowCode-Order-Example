import { useRoute, useRouter } from 'vue-router'
import { getMeuns } from '@/router/menus'

export default function useNavBar() {
  const route = useRoute()
  const menus = getMeuns()

  const { currentRoute } = useRouter()

  return {
    route,
    menus,
    currentRoute
  }
}

export function getAllParentPath() {}
