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
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    console.log(props.record)
    const {uppy} = useUploader(props.record)
    return {uppy}
  }
})
</script>

<style lang="sass" scoped>
</style>
