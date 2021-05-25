<template lang="pug">
.row.q-gutter-lg
  q-card.q-pa-sm.bg-grey-3(v-if="files.length > 0" v-for="f in files" :key="f.file_id")
    q-card-section(horizontal)
      .column.justify-start.text-dark
        .col-auto.text-subtitle1.q-btn--no-uppercase {{ f.key }}
        p.col-auto.no-margin.text-overline.text-uppercase.text-dark-primary {{ $t('label.size') }}
        p.col-grow.text-caption {{ Math.round(f.size/1024) }} kb
      q-card-actions(vertical)
        q-btn(rounded color="primary" flat icon="file_download" @click="download(f)")
  .text-grey-7.text-caption.col-auto.self-center(v-else) {{ $t('message.noFiles') }}
.row.q-mt-md(v-if="canUpload")
  upload-data(:files="dataset.http.data.links.files")
</template>

<script>
import UploadData from '@/components/form/steps/UploadData'
import {computed, defineComponent} from 'vue'

export default defineComponent({
  name: 'DatasetFiles',
  components: {UploadData},
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    function download (file) {
      window.open(`${file.url}?download`, '_blank')
    }

    const files = computed(() => {
      return props.dataset.metadata['_files'] || []
    })

    // TODO: add check of auth/state need provides
    const canUpload = computed(() => {
      return props.dataset.metadata['oarepo:draft']
    })

    const uploadUrl = computed(() => {
      return props.dataset.http.data.links.files
    })

    return {download, files, canUpload, uploadUrl}
  }
})
</script>

<style lang="sass">
</style>
