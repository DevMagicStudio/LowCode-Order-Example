import { ref, unref, nextTick } from 'vue'
import { useHttp } from '../web/useHttp'
import { useI18n } from '../web/useI18n'
import { isFunction } from '@/utils/is'
import { message } from 'ant-design-vue'
import { useModal as useBasicModal } from '@/components/Modal'

const { t } = useI18n()

export function useModal<T = any>(
  formRef?: any,
  api?: any,
  callback?: Function
) {
  const [register, { openModal, closeModal }] = useBasicModal()

  const bindValue = {
    destroyOnClose: true,
    width: '45%',
    bodyStyle: { overflow: 'auto', maxHeight: '78vh' },
    okText: t('system.modal.confirm'),
    cancelText: t('system.modal.cancel'),
    closeFunc: () => {
      visible.value = false
      return Promise.resolve(true)
    }
  }
  const visible = ref<boolean>(false)
  const currentItem = ref<T>()

  const onChange = function (row?: T) {
    if (row) {
      currentItem.value = { ...row }
    }
    visible.value = !visible.value
    unref(visible) ? openModal() : closeModal()
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
    closeModal()
  }

  const successCallback = function () {
    callback && callback()
    onClose()
  }

  return {
    visible,
    bindValue,
    register,
    currentItem,
    onChange,
    onClose,
    onConfirm
  }
}

export default useModal
