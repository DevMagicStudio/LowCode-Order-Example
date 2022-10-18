import { defineComponent, toRefs, unref } from 'vue'
import { Modal } from 'ant-design-vue';
import { basicProps } from '../props'
import { useModalDragMove } from '../hooks/useModalDrag'
import { useAttrs } from '@/hooks/web/useAttrs';
import { extendSlots } from '@/utils/helper/tsx';

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel', 'ok'],
  setup(props, { slots, emit }) {
    const { visible, draggable, destroyOnClose } = toRefs(props)
    const attrs = useAttrs()
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable,
    })

    const onCancel = (e: Event) => {
      emit('cancel', e);
    }

    const onOk = (e: Event) => {
      emit('ok', e);
    }

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel, onOk }
      return <Modal { ...propsData }>{ extendSlots(slots) }</Modal>
    }
  }
})
