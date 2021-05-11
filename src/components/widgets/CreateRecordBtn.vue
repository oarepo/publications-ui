<template lang="pug">
q-btn.col-auto(
  stretch
  flat
  color="dark"
  icon="cloud_upload"
  :bla="{ name: `cesnet/draft-datasets/upload`}"
  :label="$t('action.upload')")
  q-tooltip {{ $t('action.uploadDataset') }}
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CreateRecordBtn"
})
</script>
