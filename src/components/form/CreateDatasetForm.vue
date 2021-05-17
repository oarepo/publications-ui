<template lang="pug">
q-stepper(
  flat
  v-model="step"
  vertical
  color="primary"
  animated)
  q-step(
    :name="steps.BASIC"
    :title="$t('label.forms.basicInfo')")
    basic-info(v-model="formData")
    pre.text-code {{ formData }}
    q-stepper-navigation
      q-btn(label='Next' @click="step = steps.UPLOAD")
  q-step(
    :name="steps.UPLOAD"
    :title="$t('label.forms.uploadData')")
</template>

<script>
import {defineComponent, ref} from 'vue'
import UploadData from '@/components/form/steps/UploadData'
import BasicInfo from '@/components/form/steps/BasicInfo'

export const steps = Object.freeze({
      UPLOAD: 'upload', BASIC: 'basicInfo', AUTHORS: 'authors' })

export default defineComponent({
  name: 'CreateDatasetForm',
  components: {BasicInfo, UploadData},
  setup () {
    const formData = ref({})

    const step = ref(steps.BASIC)

    return {formData, step, steps}
  }
})
</script>

<style lang="sass" scoped>

</style>
