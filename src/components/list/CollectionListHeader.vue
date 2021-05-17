<template lang="pug">
.row.justify-between.items-center.q-col-gutter-x-lg.q-mt-md.q-mt-lg-xl.q-mb-md
  .col-auto
    .column
      .col.text-h3.gt-md {{ $t('section.datasetList') }}
      .col.text-h4.lt-lg.gt-sm.q-mt-none.q-mb-lg {{ $t('section.datasetList') }}
      .col.text-h6.lt-md.q-mt-none.q-mb-md {{ $t('section.datasetList') }}
      .col.q-pl-xs.text-primary.text-subtitle2 {{ $tc('label.recordsFound', collection.recordsCount) }}
  .col-auto.items-center
    .row.justify-end.no-wrap
      page-size-select.col-auto
      sort-select.col-auto
      create-record-btn.col-auto
</template>
<script>
import {defineComponent} from 'vue'
import SortSelect from '@/components/widgets/select/SortSelect'
import CreateRecordBtn from '@/components/widgets/button/CreateRecordBtn'
import PageSizeSelect from '@/components/widgets/select/PageSizeSelect'

export default defineComponent({
  name: 'CollectionListHeader',
  components: {PageSizeSelect, CreateRecordBtn, SortSelect},
  props: {
    collection: {
      type: Object,
      required: true
    }
  }
})
</script>
<style lang="sass">
</style>
