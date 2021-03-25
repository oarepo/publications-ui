<template lang="pug">
  q-page.full-height.flex.flex-center
    .row.justify-center.q-pt-lg
      q-card.q-mb-xl.col-10.q-pa-lg.bg-grey-3(flat clickable)
        q-card-section(horizontal)
          .row.full-width.items-baseline.justify-between
            .text-h5.wrap.row.q-gutter-md
              span.text-accent {{ article.id }}
              q-separator(color="primary" vertical)
              span {{ article.title.en }}
        q-separator(spaced)
        q-card-section.bg-grey-4
          .row
            q-chip.col-auto.text-white(color="primary" v-for="c in article.authors", :key="c.full_name")
              q-avatar.no-padding(v-if="c.identifiers" icon="lab la-orcid" size="xl")
                q-tooltip() {{ Object.keys(c.identifiers)[0] }}
              span {{ c.full_name }}
                q-tooltip(v-if="c.affiliations") {{ c.affiliations.map((a => a.name)).join(', ') }}
              span.on-right.text-overline.text-warning(v-if="c.identifiers") {{ c.identifiers.orcid }}
        q-card-section.bg-white
          .text-overline.text-uppercase.text-accent {{ $t('label.abstract') }}
          p(v-html="$sanitize(article.abstract.en)")
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
            q-chip(v-for="d in article.datasets" :key="d")
              a(v-bind:href="createUrl(d)") {{ d }}

        .text-overline.text-uppercase.text-accent.q-mt-md JSON Metadata
        pre.q-pa-md.bg-dark.text-code.text-white.wrap.overflow-auto(:style="{ maxWidth: '90vw' }") {{ article }}
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'

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
  components: {},
  methods: {
    createUrl (url) {
      const host = window.location.host
      var newUrl = url.replace(host, '')
      return newUrl
    }
  }
})
class ArticleDraftDetail extends Vue {
  meta () {
    return {
      title: this.draftId
    }
  }

  get needOwner () {
    // TODO: check if the logged in user is owner of the dataset
    return true
  }

  download (file) {
    window.open(file.url, '_blank')
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
