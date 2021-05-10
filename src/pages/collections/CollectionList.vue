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
  .column.q-mt-md.q-gutter-y-lg(v-if="collection.records.length")
    dataset-list-entry.col.cursor-pointer.non-selectable(
      v-for="record in collection.records" :key="record.id"
      :loading="!collection.loaded"
      :item="record"
      @detail="navigateDetail(record)"
      @click.native="navigateDetail(record)")
</template>
<script>
import {defineComponent} from 'vue'
import DatasetListEntry from '@/components/datasets/list/DatasetListEntry'
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'CollectionList',
  props: {
    collection: Object,
  },
  components: {
    // Logo,
    DatasetListEntry,
    // NoDataPlaceholder,
    // FacetList,
    // Pagination
  },
  setup () {
    const router = useRouter()

    function pathFromUrl(url) {
      return new URL(url).pathname
    }

    function navigateDetail(record) {
      router.push(pathFromUrl(record.links.self))
    }

    return {navigateDetail}
  }
})
</script>
<style lang="sass">
</style>
