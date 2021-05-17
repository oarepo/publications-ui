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
    :label="$t('label.keywords')")
  multilingual-editor-list.col(
    ref="additionalTitles"
    empty
    filled
    v-model="basicInfo.additional_titles"
    :label="$t('label.additionalTitles')")
  stepper-nav(has-prev=false @next="onNext")
</template>
<script>
import {defineComponent, reactive, ref, watch} from 'vue'
import useValidation from '@/composables/useValidation'
import useNotify from '@/composables/useNotify'
import StepperNav from "@/components/navigation/StepperNav";

export default defineComponent({
  name: 'BasicInfo',
  components: {StepperNav},
  emits: ['update:modelValue', 'next'],
  props: {
    modelValue: Object
  },
  setup (props, ctx) {
    const {required} = useValidation()
    const {notifyError} = useNotify()

    const title = ref(null)
    const abstract = ref(null)
    const keywords = ref(null)
    const additionalTitles = ref(null)

    const basicInfo = reactive({})

    watch (basicInfo, () => {
      ctx.emit('update:modelValue', basicInfo)
    })

    const onNext = () => {
      title.value.validate()
      abstract.value.validate()
      keywords.value.validate()
      additionalTitles.value.validate()

      if (title.value.hasError) {
        notifyError('error.validationFail')
        return
      }

      ctx.emit('next')
    }

    return { basicInfo, required, title, abstract, keywords, additionalTitles, onNext }
  }
})
</script>
<style lang="sass" scoped>
</style>
