<template lang="pug">
.row.q-gutter-lg
  q-card.q-pa-sm.bg-grey-3(v-for="f in files" :key="f.file_id")
    q-card-section(horizontal)
      .column.justify-start
        .col-auto.text-subtitle {{ f.key }}
        p.col-auto.no-margin.text-overline.text-uppercase.text-accent {{ $t('label.size') }}
        p.col-grow.text-caption {{ Math.round(f.size/1024) }} kb
      q-card-actions(vertical)
        q-avatar.cursor-pointer(icon="las la-download" @click="download(f)")
  OARepoUploader(v-if="canUpload" :url="uploadUrl" :multipart-threshold="multipartTreshold"
    :label="$t('action.upload')" auto-upload hide-upload-btn ref="uploader"
    :max-concurrency="10" :headers="uploaderHeaders" @uploaded="uploadDone")
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator'
import UploaderMixin from 'src/mixins/UploaderMixin'

export default @Component({
  name: 'DatasetFiles',
  props: {
    recordApi: Object,
    dataset: Object,
    files: Array,
    multipartTreshold: {
      type: Number,
      default: 0 // TODO: bump to something higher after we fix the single-part uploads
    }
  }
})
class DatasetFiles extends Mixins(UploaderMixin) {
  download (file) {
    window.open(`${file.url}?download`, '_blank')
  }

  // TODO: add check of auth/state need provides
  get canUpload () {
    return this.dataset['oarepo:draft']
  }

  uploadDone (info) {
    this.recordApi.reload()
    this.fileUploaded(info)
  }

  get uploadUrl () {
    return this.recordApi.record.value.links.files
  }
}
</script>

<style lang="sass">
</style>
