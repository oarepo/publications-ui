<template lang="pug">
q-page.q-mx-lg-xl(padding)
  .row.justify-between.items-center.q-col-gutter-x-lg.q-mt-md.q-mt-lg-xl.q-mb-md
    .col-auto
      .text-h3.gt-md {{ $t('section.datasetList') }}
      .text-h4.lt-lg.gt-sm.q-mt-none.q-mb-lg {{ $t('section.datasetList') }}
      .text-h6.lt-md.q-mt-none.q-mb-md {{ $t('section.datasetList') }}
    .col-auto.items-center
      q-btn(
        stretch
        flat
        color="dark"
        icon="cloud_upload"
        :bla="{ name: `cesnet/draft-datasets/upload`}"
        :label="$t('action.upload')")
        q-tooltip {{ $t('action.uploadDataset') }}
  .column.q-mt-md.q-gutter-y-lg(v-if="items.length")
    div(v-for="item in items" :key="item.id")
      dataset-list-entry.col.cursor-pointer.non-selectable(
        :loading="!loaded"
        :item="item"
        @detail="navigateDetail"
        @click.native="navigateDetail(item)")
</template>
<script>
import {defineComponent} from 'vue'
import DatasetListEntry from '@/components/datasets/list/DatasetListEntry'

export default defineComponent({
  name: 'DatasetList',
  props: {
    collection: Object,
  },
  components: {
    // Logo,
    DatasetListEntry,
    // NoDataPlaceholder,
    // FacetList,
    // Pagination
  }
})
</script>
<style lang="sass">
</style>
