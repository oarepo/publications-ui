<template lang="pug">
.column.q-col-gutter-md
  stepper-nav(has-prev @next="onNext" @prev="$emit('prev')")
</template>
<script>
import {defineComponent, reactive, ref, watch} from 'vue'
import StepperNav from '@/components/navigation/StepperNav'
import useNotify from '@/composables/useNotify'

export default defineComponent({
  name: 'Authors',
  components: {StepperNav},
  emits: ['update:modelValue', 'prev', 'next'],
  props: {
    modelValue: Object
  },
  setup (props, ctx) {
    const {notifyError} = useNotify()

    const model = reactive({...props.modelValue, creators: []})
    const input = ref(null)

    watch (model, () => {
      ctx.emit('update:modelValue', model)
    })

    function onNext () {
      const res = input.value.validate()

      if (res !== true) {
        notifyError(res)
        return
      }

      ctx.emit('next')
    }

    return {model, input, onNext}
  }
})
</script>
<style lang="sass" scoped>
</style>
