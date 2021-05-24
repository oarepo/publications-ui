<template lang="pug">
dashboard(:uppy="uppy")
</template>

<script>
import { Dashboard } from '@uppy/vue'
import {defineComponent} from 'vue'
import useUploader from '@/composables/useUploader'

export default defineComponent({
  name: 'UploadData',
  components: {Dashboard},
  setup () {
    const {uppy} = useUploader()
    return {uppy}
  }
})
</script>

<style lang="sass" scoped>
</style>
