<template lang="pug">
q-stepper(
  flat
  keep-alive
  v-model="step"
  doneIcon="done"
  done-color="positive"
  vertical
  color="primary"
  animated)
  q-step(
    icon="info"
    :name="steps.BASIC"
    :title="$t('label.forms.basicInfo')"
    :done="step > steps.BASIC"
    done-icon="done"
    done-color="positive")
    basic-info(
      v-model="formData"
      @next="step = steps.IDENTIFIERS")
  q-step(
    icon="tag"
    :name="steps.IDENTIFIERS"
    :title="$t('label.forms.identifiers')")
    identifiers(
      v-model="formData"
      @next="step = steps.AUTHORS"
      @prev="step = steps.BASIC")
  q-step(
    icon="groups"
    :name="steps.AUTHORS"
    :title="$t('label.forms.authors')")
  q-step(
    :name="steps.UPLOAD"
    :title="$t('label.forms.uploadData')")
</template>

<script>
import {defineComponent, ref} from 'vue'
import UploadData from '@/components/form/steps/UploadData'
import BasicInfo from '@/components/form/steps/BasicInfo'
import Identifiers from '@/components/form/steps/Identifiers'

export const steps = Object.freeze({
  BASIC: 1,
  IDENTIFIERS: 2,
  AUTHORS: 3
})

export default defineComponent({
  name: 'CreateDatasetForm',
  components: {BasicInfo, UploadData, Identifiers},
  setup () {
    const formData = ref({})

    const step = ref(steps.BASIC)

    return {formData, step, steps}
  }
})
</script>

<style lang="sass" scoped>

</style>
