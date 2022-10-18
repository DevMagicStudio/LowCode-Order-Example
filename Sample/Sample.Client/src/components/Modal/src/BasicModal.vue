<template>
  <Modal v-bind="getBindValue" @cancel="handleCancel" @ok="handleOk">
    <slot></slot>
    <template
      #[item]="data"
      v-for="item in Object.keys(omit($slots, 'default'))"
    >
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>

<script lang="ts">
import type { ModalProps, ModalMethods } from './typing'
import {
  defineComponent,
  ref,
  unref,
  watchEffect,
  computed,
  // useAttrs,
  getCurrentInstance,
  watch
} from 'vue'
import { deepMerge } from '@/utils'
import { isFunction } from '@/utils/is'
import Modal from './components/Modal'
import { omit } from 'lodash-es'
import { basicProps } from './props'

export default defineComponent({
  name: 'BasicModal',
  components: { Modal },
  inheritAttrs: false,
  props: basicProps,
  emits: ['update:visible', 'register', 'visible-change', 'cancel', 'ok'],
  setup(props, { emit, attrs }) {
    const visibleRef = ref(false)
    const propsRef = ref<Partial<ModalProps> | null>(null)

    const modalMethods: ModalMethods = {
      setModalProps,
      emitVisible: undefined
    }

    const instance = getCurrentInstance()
    if (instance) {
      emit('register', modalMethods, instance.uid)
    }

    const getMergeProps = computed((): Recordable => {
      return {
        ...props,
        ...(unref(propsRef) as any)
      }
    })

    watchEffect(() => {
      visibleRef.value = !!props.visible
    })

    function setModalProps(props: Partial<ModalProps>): void {
      // Keep the last setModalProps
      propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)
      if (Reflect.has(props, 'visible')) {
        visibleRef.value = !!props.visible
      }
    }

    watch(
      () => unref(visibleRef),
      v => {
        emit('visible-change', v)
        emit('update:visible', v)
        instance && modalMethods.emitVisible?.(v, instance.uid)
      },
      {
        immediate: false
      }
    )

    const getBindValue = computed((): Recordable => {
      const attr = {
        ...attrs,
        ...unref(getMergeProps),
        visible: unref(visibleRef)
      }
      return attr
    })

    async function handleCancel(e: Event) {
      e?.stopPropagation()
      if (props.closeFunc && isFunction(props.closeFunc)) {
        const isClose: boolean = await props.closeFunc()
        visibleRef.value = !isClose
        return
      }

      visibleRef.value = false
      emit('cancel', e)
    }

    function handleOk(e: Event) {
      emit('ok', e)
    }

    return {
      visibleRef,
      propsRef,
      getBindValue,
      omit,
      handleCancel,
      handleOk
    }
  }
})

/* const name = 'BasicModal'
const attrs = useAttrs()
const emits = defineEmits([
  'update:visible',
  'register',
  'visible-change',
  'cancel'
])
const props = defineProps(basicProps) */

/* const visibleRef = ref(false)
const propsRef = ref<Partial<ModalProps> | null>(null)

const modalMethods: ModalMethods = {
  setModalProps,
  emitVisible: undefined
}

const instance = getCurrentInstance()
if (instance) {
  emits('register', modalMethods, instance.uid)
}

const getMergeProps = computed((): Recordable => {
  return {
    ...props,
    ...(unref(propsRef) as any)
  }
})

watchEffect(() => {
  visibleRef.value = !!props.visible
})

function setModalProps(props: Partial<ModalProps>): void {
  // Keep the last setModalProps
  propsRef.value = deepMerge(unref(propsRef) || ({} as any), props)
  if (Reflect.has(props, 'visible')) {
    visibleRef.value = !!props.visible
  }
}

watch(
  () => unref(visibleRef),
  v => {
    emits('visible-change', v)
    emits('update:visible', v)
    instance && modalMethods.emitVisible?.(v, instance.uid)
  },
  {
    immediate: false
  }
)

const getBindValue = computed((): Recordable => {
  const attr = {
    ...attrs,
    ...unref(getMergeProps),
    visible: unref(visibleRef)
  }
  return omit(attr, 'title')
})

async function handleCancel(e: Event) {
  e?.stopPropagation()
  if (props.closeFunc && isFunction(props.closeFunc)) {
    const isClose: boolean = await props.closeFunc()
    visibleRef.value = !isClose
    return
  }

  visibleRef.value = false
  emits('cancel', e)
} */
</script>
