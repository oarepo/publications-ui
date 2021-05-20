<template lang="pug">
q-splitter(v-model="spl")
  template(v-slot:after)
    q-toolbar
      q-toolbar-title(shrink).text-h5 Metadata
    q-card(flat)
      q-card-section
        pre.bg-dark.text-code.text-white.text-bold.q-pa-md {{ formData }}
  template(v-slot:before)
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
        :title="$t('label.forms.identifiers')"
        :caption="$t('label.forms.identifiersCaption')"
        :done="step > steps.IDENTIFIERS")
        identifiers(s
          v-model="formData"
          @next="step = steps.AUTHORS"
          @prev="step = steps.BASIC")
      q-step(
        icon="groups"
        :name="steps.AUTHORS"
        :title="$t('label.forms.authorsContributors')")
        authors-contributors(
          v-model="formData"
          @prev="step = steps.IDENTIFIERS"
          @next="step = steps.UPLOAD")
      q-step(
        icon="cloud_upload"
        :name="steps.UPLOAD"
        :title="$t('label.forms.uploadData')")
</template>

<script>
import {defineComponent, ref} from 'vue'
import UploadData from '@/components/form/steps/UploadData'
import BasicInfo from '@/components/form/steps/BasicInfo'
import Identifiers from '@/components/form/steps/Identifiers'
import AuthorsContributors from '@/components/form/steps/AuthorsContributors'

export const steps = Object.freeze({
  BASIC: 1,
  IDENTIFIERS: 2,
  AUTHORS: 3,
  UPLOAD: 4
})

export default defineComponent({
  name: 'CreateDatasetForm',
  components: {AuthorsContributors, BasicInfo, UploadData, Identifiers},
  setup () {
    const formData = ref({
      // TODO: migrate to taxonomy terms
      resource_type: `${window.location.origin}/2.0/taxonomies/resourceType/datasets`
    })
    const spl = 70
    const step = ref(steps.BASIC)

    return {formData, step, steps, spl}
  }
})
</script>

<style lang="sass" scoped>

</style>
