<template lang="pug">
  q-page(padding).q-pa-xl.full-height.flex.flex-center
    q-card.q-mb-xl.col-10.bg-grey-3(clickable)
      q-card-section(horizontal).q-pt-lg.q-px-lg.q-pb-md
        .row.full-width.items-baseline.justify-between
          .text-h5.wrap.row.q-gutter-md
            span.text-accent {{ article.id }}
            q-separator(color="primary" vertical)
            span {{ title }}
      q-separator
      q-card-section.q-pa-lg.bg-grey-4
        .row
          q-chip.col-auto.text-white(color="primary" v-for="c in article.authors", :key="c.full_name")
            q-avatar.no-padding(v-if="c.identifiers" icon="lab la-orcid" size="xl")
              q-tooltip() {{ Object.keys(c.identifiers)[0] }}
            span {{ c.full_name }}
              q-tooltip(v-if="c.affiliations") {{ c.affiliations.map((a => a.name)).join(', ') }}
            span.on-right.text-overline.text-warning(v-if="c.identifiers") {{ c.identifiers.orcid }}
      q-card-section.q-pa-lg.bg-white
        .text-overline.text-uppercase.text-accent {{ $t('label.abstract') }}
        p(v-html="$sanitize( abstract )")
        .text-overline.text-uppercase.text-accent {{ $t('label.identifiers') }}
        .row
          q-chip(v-for="i in article.alternative_identifiers" :key="i.identifier")
            q-avatar(color="primary" font-size="1rem" size="lg")
              strong.text-caption.text-white.text-bold {{ i.scheme }}
            span {{ i.value }}
        .text-overline.text-uppercase.text-accent.q-mt-md {{ $t('label.documentType') }}
          .row
          q-chip() {{ article.document_type}}
        .text-overline.text-uppercase.text-accent.q-mt-md {{ $t('label.datasets') }}
          .row
          q-chip(v-for="d in datasetRefs" :key="d.pid_value")
            router-link(:to="datasetLink(d)") {{ d.pid_value }}
      metadata-dropdown(:metadata="article")
</template>
<script>
import { Component, Mixins } from 'vue-property-decorator'
import { CommunityMixin } from 'src/mixins/Community'
import MetadataDropdown from 'components/common/MetadataDropdown'

export default @Component({
  name: 'ArticleDraftDetail',
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
    MetadataDropdown
  }
})
class ArticleDraftDetail extends Mixins(CommunityMixin) {
  datasetLink (d) {
    return {
      name: `${this.article._primary_community}/${d['oarepo:draft'] ? 'draft-' : ''}dataset/record`,
      params: { recordId: d.pid_value }
    }
  }

  keys (data) {
    var keys = []
    for (var k in data) {
      keys.push(k)
    }
    return keys
  }

  get datasetRefs () {
    const result = []
    const map = new Map()
    for (const dataset of this.article.datasets) {
      if (!map.has(dataset.pid_value)) {
        map.set(dataset.pid_value, true)
        result.push(dataset)
      }
    }
    return result
  }

  get title () {
    var title = this.article.title
    var langs = this.keys(title)

    if ('en' in langs) {
      return title.en
    } else return title[langs[0]]
  }

  get abstract () {
    var abstract = this.article.abstract
    if (abstract === '') { // abstract is not required
      return ''
    }
    var langs = this.keys(abstract)
    if ('en' in langs) {
      return abstract.en
    } else return abstract[langs[0]]
  }

  get article () {
    return (this.record && this.record.metadata) || {}
  }

  get articleId () {
    return this.article && this.article.id
  }
}
</script>
<style lang="sass">
</style>
