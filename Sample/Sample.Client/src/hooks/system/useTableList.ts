import { ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useHttp } from '@/hooks/web/useHttp'
import { BasicPageParams, BasicTableColumn } from '@/types'

const { t } = useI18n()
const setColumnsData = function <T = any>(
  data: BasicTableColumn<T>[]
): BasicTableColumn<T>[] {
  return data.map((item: BasicTableColumn<T>, index) => {
    item.fixed = false
    item.checked = true
    item.align = 'center'
    item.rank = index
    return item
  })
}
export function useTableList<T = any>(data: BasicTableColumn<T>[]) {
  const columns: BasicTableColumn<T>[] = setColumnsData<T>(data)
  const tableData = ref()
  const total = ref()
  const pageParams = ref<BasicPageParams>({ pageNum: 1, pageSize: 10 })

  function getData<T = any>(api: Function, searchParams: T) {
    const getListHttp = useHttp(t('system.api.apiRequestFailed'))

    return async function () {
      const params: BasicPageParams & T = {
        ...pageParams.value,
        ...searchParams
      }
      const res = await api(params)
      getListHttp(res, () => {
        tableData.value = res.data
        total.value = res.total
      })
    }
  }

  return { columns, tableData, total, pageParams, getData }
}

export default useTableList
