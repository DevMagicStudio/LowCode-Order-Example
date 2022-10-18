import { ref } from 'vue'
import { useHttp } from '../web/useHttp'
import { useI18n } from '../web/useI18n'
import { isFunction } from '@/utils/is'
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash'

const { t } = useI18n()

export function useDrawer<T = any>(
  formRef?: any,
  api?: any,
  callback?: Function
) {
  const visible = ref<boolean>(false)
  const currentItem = ref<T>()
  const onShow = function (row?: T) {
    if (row) {
      currentItem.value = cloneDeep(row)
    }
    visible.value = true
  }
  const onConfirm = function <T = any>(error: string, success?: string) {
    const handlerResult = useHttp(error, success)

    return async function () {
      if (!isFunction(api)) {
        throw new Error('"api" is not a function!')
      }
      if (!formRef) {
        throw new Error('"formRef" is undefined')
      }
      const result: T = await formRef.value.handleOk()
      if (!result) {
        message.warning(t('system.form.warning'))
        return
      }
      const res = await api(result, currentItem.value?.id)
      handlerResult(res, successCallback)
    }
  }

  const onClose = function () {
    visible.value = false
  }

  const successCallback = function () {
    callback && callback()
    onClose()
  }

  return {
    visible,
    currentItem,
    onShow,
    onClose,
    onConfirm
  }
}

export default useDrawer
