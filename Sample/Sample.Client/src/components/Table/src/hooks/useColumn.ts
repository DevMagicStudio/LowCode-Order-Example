import { ref, reactive } from 'vue'
import { BasicTableColumn, BasicPageParams } from '@/types'
import { useI18n } from '@/hooks/web/useI18n'

type Key = string | number

const { t } = useI18n()

export function useColumn<T = any>(pageParams?: BasicPageParams) {
  const actionsColumnData: BasicTableColumn = {
    title: t('component.upload.operating'),
    dataIndex: 'actions',
    fixed: 'right',
    width: 165,
    align: 'center'
  }

  const createIndexColumn = function () {
    if (pageParams) {
      return {
        title: t('component.table.index'),
        width: 80,
        align: 'center',
        fixed: true,
        customRender: data =>
          `${(pageParams.pageNum - 1) * pageParams.pageSize + data.index + 1}`
      } as BasicTableColumn
    }
  }
  const indexColumnData: BasicTableColumn | undefined = createIndexColumn()

  const indexColumnChecked = ref<boolean>(false)
  const selectColumnChecked = ref<boolean>(true)

  const selected = reactive<{ selectedRowKeys: Key[]; selectedRows: T[] }>({
    selectedRowKeys: [],
    selectedRows: []
  })

  const onSelectChange = (keys: Key[], rows: T[]) => {
    selected.selectedRowKeys.splice(0, selected.selectedRowKeys.length, ...keys)
    selected.selectedRows.splice(0, selected.selectedRows.length, ...rows)
  }

  const selectColumnData = ref<null | {
    selectedRowKeys: Key[]
    onChange: (keys: Key[], rows: T[]) => void
  }>({
    selectedRowKeys: selected.selectedRowKeys,
    onChange: onSelectChange
  })

  const onChangeSelectColumn = (checked: boolean) => {
    selectColumnData.value = checked
      ? {
          selectedRowKeys: selected.selectedRowKeys,
          onChange: onSelectChange
        }
      : null
  }

  return {
    actionsColumnData,
    indexColumnData,
    indexColumnChecked,
    selectColumnChecked,
    selectColumnData,
    onChangeSelectColumn
  }
}
