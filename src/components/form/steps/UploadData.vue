<template lang="pug">
OARepoUploader(
  :url="uploadUrl"
  :multipart-threshold="multipartTreshold"
  :label="$t('action.upload')"
  auto-upload
  hide-upload-btn
  ref="uploader"
  :max-concurrency="concurrency"
  :headers="uploaderHeaders"
  @uploaded="uploaded")
</template>
<script>
import {computed, defineComponent, ref} from 'vue'
import useUploader from '@/composables/useUploader'

export default defineComponent({
  name: 'UploadData',
  props: {

    uploadUrl: String
  },
  setup() {
    const {multipartTreshold, concurrency, uploaderHeaders} = useUploader()

    const uploader = ref()

    const canUpload = computed(() => {
      // TODO: add proper check of auth/state need provides
      return this.dataset['oarepo:draft']
    })

    function uploaded() {
      uploader.value.reset()
    }

    return {canUpload, uploaded, uploader, uploaderHeaders, concurrency, multipartTreshold}
  }
})
</script>
<style lang="sass" scoped>
</style>
