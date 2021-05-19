<template lang="pug">
.column.q-col-gutter-md
  base-input.col(
    ref="title"
    filled
    v-model="basicInfo.title"
    :rules="[required($t('error.validation.required'))]"
    :label="$t('label.titles')"
    input-class="text-h5")
  multilingual-editor.col(
    ref="abstract"
    filled
    v-model="basicInfo.abstract"
    :rules="[required($t('error.validation.required'))]"
    :label="$t('label.abstract')")
  chips-select.col(
    ref="keywords"
    filled
    v-model="basicInfo.keywords"
    :label="$t('label.forms.keywords')")
  multilingual-editor-list.col(
    ref="additionalTitles"
    empty
    v-model="basicInfo.additional_titles"
    :label="$t('label.forms.additionalTitles')")
  stepper-nav(has-prev=false @next="onNext")
</template>
<script>
import {defineComponent, reactive, ref, watch} from 'vue'
import useValidation from '@/composables/useValidation'
import useNotify from '@/composables/useNotify'
import StepperNav from '@/components/navigation/StepperNav'

export default defineComponent({
  name: 'BasicInfo',
  components: {StepperNav},
  emits: ['update:modelValue', 'next'],
  dprops: {
    modelValue: Object
  },
  setup(props, ctx) {
    const {required} = useValidation()
    const {notifyError} = useNotify()

    const title = ref(null)
    const abstract = ref(null)
    const keywords = ref(null)
    const additionalTitles = ref(null)

    const basicInfo = reactive({})

    watch(basicInfo, () => {
      ctx.emit('update:modelValue', basicInfo)
    })

    const onNext = () => {
      const tr = title.value.validate()
      const abr = abstract.value.validate()
      const kr = keywords.value.validate()
      const atr = additionalTitles.value.validate()

      if (tr !== true ||
          abr !== true ||
          kr !== true ||
          atr !== true) {
        notifyError('error.validationFail')
        return
      } else {
        ctx.emit('next')
      }
    }

    return {basicInfo, required, title, abstract, keywords, additionalTitles, onNext}
  }
})
</script>
<style lang="sass" scoped>
</style>
