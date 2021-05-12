<template lang="pug">
q-page.full-height(padding)
  create-dataset-form
</template>
<script>
import {defineComponent} from 'vue'
import CreateDatasetForm from '@/components/form/CreateDatasetForm'

export default defineComponent({
  name: 'CreateForm',
  components: {CreateDatasetForm},
})
</script>
<style lang="sass">
</style>
