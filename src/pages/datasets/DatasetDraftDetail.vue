<template lang="pug">
  q-page.full-height.flex.flex-center
    .row.justify-between.items-center.q-col-gutter-x-lg.q-mt-md.q-mt-lg-xl.q-mb-md
      .col-12
        .text-h3.gt-md {{ $t('section.datasetDetail') }}
        .text-h4.lt-lg.gt-sm.q-mt-none.q-mb-lg {{ $t('section.datasetDetail') }}
        .text-h6.lt-md.q-mt-none.q-mb-md {{ $t('section.datasetDetail') }}
    .row.justify-center
      q-card.q-mb-xl.col-10.q-pa-lg.bg-grey-3(flat clickable)
        q-card-section(horizontal)
          .row.full-width.items-baseline.justify-between
            .text-h5.wrap.row.q-gutter-md
              span.text-accent {{ dataset.id }}
              q-separator(color="primary" vertical)
              span {{ dataset.titles[0].en }}
        q-separator(spaced)
        q-card-section.bg-grey-4
          .row
            q-chip.col-auto.text-white(color="primary" v-for="c in dataset.creators", :key="c.name")
              q-avatar.no-padding(v-if="c.identifiers" icon="lab la-orcid" size="xl")
                q-tooltip() {{ Object.keys(c.identifiers)[0] }}
              span {{ c.name }}
                q-tooltip(v-if="c.affiliations") {{ c.affiliations.map((a => a.name)).join(', ') }}
              span.on-right.text-overline.text-warning(v-if="c.identifiers") {{ c.identifiers.orcid }}
        q-card-section.bg-white
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
        .text-overline.text-uppercase.text-accent.q-mt-md JSON Metadata
        pre.q-pa-md.bg-dark.text-code.text-white.wrap.overflow-auto(:style="{ maxWidth: '90vw' }") {{ dataset }}
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'DatasetDraftDetail',
  props: {
    record: Object,
    loading: Boolean,
    recordApi: Object
  },
  components: {}
})
class DatasetDraftDetail extends Vue {
  meta () {
    return {
      title: this.draftId
    }
  }

  download (file) {
    window.open(file.url, '_blank')
  }

  get dataset () {
    return (this.record && this.record.metadata) || {}
  }

  get datasetId () {
    return this.dataset && this.dataset.id
  }
}
</script>
<style lang="sass">
</style>
