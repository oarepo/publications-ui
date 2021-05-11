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
  .column.q-mt-md(v-if="collection.records.length")
    //q-table.bg-grey-3(
    //  flat
    //  :data="collection.records"
    //  :columns="columns"
    //  row-key="id"
    //  :pagination.sync="pagination"
    //  :loading="!collection.loaded"
    //  binary-state-sort
    //)
    dataset-list-entry.col.cursor-pointer.non-selectable(
      v-for="record in collection.records" :key="record.id"
      :loading="!collection.loaded"
      :item="record"
      @detail="navigateDetail(record)"
      @click.native="navigateDetail(record)")
    facet-list(
      :collection="collection"
      v-model:activeFacets="activeFacets")
</template>
<script>
import {defineComponent} from 'vue'
import FacetList from '@/components/search/facets/FacetList'
import DatasetListEntry from '@/components/datasets/list/DatasetListEntry'
import {useRouter} from 'vue-router'
import {useContext} from 'vue-context-composition'
import {facets} from '@/contexts/facets'

export default defineComponent({
  name: 'CollectionList',
  props: {
    collection: Object,
  },
  components: {
    // Logo,
    DatasetListEntry,
    FacetList,
    // NoDataPlaceholder,
    // Pagination
  },
  setup () {
    const router = useRouter()
    const {activeFacets} = useContext(facets)

    function pathFromUrl(url) {
      return new URL(url).pathname
    }

    function navigateDetail(record) {
      router.push(pathFromUrl(record.links.self))
    }

    return {navigateDetail, activeFacets}
  }
})
</script>
<style lang="sass">
</style>
