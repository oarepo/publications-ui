<template lang="pug">
q-page(padding).q-pa-xl.full-height.flex.flex-center
  q-card.q-mb-xl.col-10.bg-grey-3(clickable)
    q-card-section(horizontal).q-pt-lg.q-px-lg.q-pb-md
      .row.full-width.items-baseline.justify-between
        .text-h5.no-wrap.row.q-gutter-md
          span.text-accent {{ dataset.id }}
          q-separator(color="primary" vertical)
          span {{ dataset.titles[0].en }}
    dataset-action-bar(v-if="!loading" :dataset="dataset" :record="record" :recordApi="recordApi")
    q-separator
    q-card-section.q-pa-lg.bg-grey-4
      .row
        q-chip.col-auto.text-white(color="primary" v-for="c in dataset.creators", :key="c.name")
          q-avatar.no-padding(v-if="c.identifiers" icon="lab la-orcid" size="xl")
            q-tooltip() {{ Object.keys(c.identifiers)[0] }}
          span {{ c.name }}
            q-tooltip(v-if="c.affiliations") {{ c.affiliations.map((a => a.name)).join(', ') }}
          span.on-right.text-overline.text-warning(v-if="c.identifiers") {{ c.identifiers.orcid }}
    q-card-section.q-pa-lg.bg-white
      .text-overline.text-uppercase.text-accent {{ $t('label.abstract') }}
      p(v-html="$sanitize(dataset.abstract.description.en)")
      .text-overline.text-uppercase.text-accent {{ $t('label.identifiers') }}
      .row
        q-chip(v-for="i in dataset.identifiers" :key="i.identifier")
          q-avatar(color="primary" font-size="1rem" size="lg")
            strong.text-caption.text-white.text-bold {{ i.scheme }}
          span {{ i.identifier }}
      .text-overline.text-uppercase.text-accent.q-mt-md {{ $t('label.license') }}
      .row
        q-chip(v-for="r in dataset.rights" :key="r.right") {{ r.identifier }}
      .text-overline.text-uppercase.text-accent.q-mt-md {{ $t('label.files') }}
      .row.q-gutter-lg
        q-card.q-pa-sm.bg-grey-3(v-for="f in dataset['_files']" :key="f.file_id")
          q-card-section(horizontal)
            .column.justify-start
              .col-auto.text-subtitle {{ f.key }}
              p.col-auto.no-margin.text-overline.text-uppercase.text-accent {{ $t('label.size') }}
              p.col-grow.text-caption {{ Math.round(f.size/1024) }} kb
            q-card-actions(vertical)
              q-avatar.cursor-pointer(icon="las la-download" @click="download(f)")
    metadata-dropdown(:metadata="dataset")
</template>
<script>
import {Component, Mixins} from 'vue-property-decorator'
import DatasetActionBar from 'components/datasets/item/DatasetActionBar'
import MetadataDropdown from 'components/common/MetadataDropdown'
import {CommunityMixin} from 'src/mixins/Community'

export default @Component({
  name: 'DatasetDraftDetail',
  props: {
    record: Object,
    loading: Boolean,
    recordApi: Object,
    recordId: {
      type: String,
      required: true
    }
  },
  components: {
    DatasetActionBar,
    MetadataDropdown
  },
})
class DatasetDraftDetail extends Mixins(CommunityMixin) {
  get dataset() {
    return (this.record && this.record.metadata) || {titles: [{en: ''}], abstract: {description: {en: ''}}}
  }

  get datasetId() {
    return this.dataset && this.dataset.id
  }

  download(file) {
    window.open(`${file.url}?download`, '_blank')
  }
}
</script>
<style lang="sass">
</style>
