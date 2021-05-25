<template lang="pug">
dashboard(:uppy="uppy" :props="dashboardProps")
</template>

<script>
import { Dashboard } from '@uppy/vue'
import {defineComponent, ref} from 'vue'
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

    const dashboardProps = ref({
      metaFields: [{
        id: 'caption', name: "Caption", placeholder: "Briefly describe what the file contains"
      }]
    })

    return {uppy, dashboardProps}
  }
})
</script>

<style lang="sass" scoped>
</style>
